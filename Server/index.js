const express = require("express");
const db = require("./db");
const cors = require("cors");
const Attendance = require("./attendance");
const Members = require("./members");
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/members", async (req, res) => {
  const { committee } = req.query;
  try {
    const members = committee
      ? await Members.findAll({ where: { committee } })
      : await Members.findAll();
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/members/:id", async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const member = await Members.findByPk(id);
      if (!member) return res.status(404).json({ message: "Member not found" });
      res.status(200).send(member);
    } catch (err) {
      res.json({ error: err });
    }
  } else {
    res.status(404).send("Task not found");
  }
});

app.post("/members", async (req, res) => {
  const { name, committee } = req.body;
  try {
    const newMember = await Members.create({ name, committee });
    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/members/:id", async (req, res) => {
  const { id } = req.params;
  const { name, committee } = req.body;
  try {
    const member = await Members.findByPk(id);
    if (!member) return res.status(404).json({ message: "Member not found" });

    member.name = name || member.name;
    member.committee = committee || member.committee;
    await member.save();
    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/members/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Members.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "Member not found" });

    res.status(200).json({ message: `Member with ID = ${id} deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/attendance", async (req, res) => {
  const { committee, session } = req.query;

  try {
    const attendanceData = await Attendance.findAll({
      include: {
        model: Members,
        where: committee ? { committee } : {},
        attributes: ["name", "committee"],
      },
      where: session ? { session } : {},
    });

    res.status(200).json(attendanceData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/attendance/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const attendanceData = await Attendance.findAll({
      where: { memberId: id },
    });
    res.status(200).json(attendanceData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/attendance", async (req, res) => {
  const { memberId, session } = req.body;

  if (!session) {
    return res.status(400).json({ message: "session is required" });
  }
  try {
    const existing = await Attendance.findOne({ where: { memberId, session } });
    if (existing) {
      return res.status(200).json({
        message: "Attendance already recorded for this session and member.",
      });
    }
    const attendance = await Attendance.create({ memberId, session });
    res.status(201).json({
      message: "Attendance recorded successfully",
      data: attendance,
    });
  } catch (err) {
    console.error("Error creating attendance:", err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/attendance/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Attendance.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ message: "Attendance not found" });
    res.status(200).json({ message: `Attendance deleted Successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, async () => {
  await db.sync({ force: false, alter: true });
  console.log("The table for the User model was just created!");
  console.log("Server is running on port 3000");
});
