import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav";

function Member() {
  const { id } = useParams();
  const [memberData, setMemberData] = useState(false);
  const [session, setSessions] = useState([]);
  const [foundID, setFoundID] = useState(true);

  useEffect(() => {
    async function fetchMemberData() {
      try {
        const response = await axios.get(
          `http://192.168.100.43:3000/members/${id}`
        );
        setMemberData(response.data);
      } catch (err) {
        console.error("Error:", err);
        setFoundID(false);
      }
    }
    fetchMemberData();
  }, [id]);

  useEffect(() => {
    async function fetchSessionData() {
      try {
        const response = await axios.get(
          `http://192.168.100.43:3000/attendance/${id}`
        );
        setSessions(response.data);
      } catch (err) {
        console.error("Error:", err);
        setFoundID(false);
      }
    }
    fetchSessionData();
  }, [id]);

  function handleChange(e) {
    setMemberData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function UpdateData(e) {
    e.preventDefault();
    let updateBTN = document.getElementById("submit");
    updateBTN.innerText = "loading...";
    updateBTN.setAttribute("disabled", "true");
    try {
      await axios.patch(`http://192.168.100.43:3000/members/${id}`, memberData);
      alert("Data updated Successfully");
    } catch (err) {
      console.error("Error: ", err);
    } finally {
      updateBTN.innerText = "Update";
      updateBTN.removeAttribute("disabled");
    }
  }

  async function Delete(sessionId) {
    try {
      await axios.delete(`http://192.168.100.43:3000/attendance/${sessionId}`);
      setSessions((prev) => prev.filter((e) => e.id !== sessionId));
    } catch (err) {
      console.error("Error deleting session:", err);
    }
  }

  if (!foundID) {
    return <Navigate to={"*"} replace />;
  }

  if (!memberData) {
    return (
      <div className="flex ">
        <Nav />
        <div className="loader absolute top-[40%] left-[55%]"></div>
      </div>
    );
  }

  return (
    <div className="flex ">
      <Nav />
      <form className=" flex flex-col items-center [&_input]:rounded [&_select]:rounded w-[90%] px-4 mt-4">
        <div className="flex flex-col mx-4 my-2 w-full">
          <label htmlFor="name" className="text-2xl font-bold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border border-gray-200 h-[40px] w-full p-2"
            onChange={handleChange}
            value={memberData.name}
          />
        </div>
        <div className="w-full">
          <label htmlFor="Committee" className="text-2xl font-bold">
            Committee
          </label>
          <select
            name="committee"
            id="committee"
            className="border border-gray-200 h-[40px] w-full p-2"
            onChange={handleChange}
            value={memberData.committee}
          >
            <option value="Technical">Technical</option>
            <option value="Video">Video</option>
            <option value="SMM">SMM</option>
            <option value="Graphics">Graphics</option>
            <option value="PR&FR">PR&FR</option>
          </select>
        </div>
        <div className="grid grid-cols-4 gap-4 my-4 w-full">
          {session.map((e) => (
            <div
              key={e.id}
              className=" py-2 px-2 bg-orange-500 rounded-lg justify-between flex text-white"
            >
              <p className="text-2xl font-bold">{e.session}</p>
              <button
                onClick={() => Delete(e.id)}
                className="text-lg py-1 px-2 bg-red-700 rounded-lg "
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={UpdateData}
          id="submit"
          className="bg-[#700608] rounded-lg text-white p-2 text-xl w-full mt-4 hover:bg-[#222]"
        >
          Update
        </button>
        <Link
          to={"/"}
          className="bg-[#700608] block rounded-lg text-white p-2 text-xl w-full text-center mt-2 hover:bg-[#222]"
        >
          Back
        </Link>
      </form>
    </div>
  );
}

export default Member;
