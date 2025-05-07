import AttendanceTable from "../components/attendance_table";
import CommitteesList from "../components/committees_list";
import Nav from "../components/Nav";
import { useState } from "react";
export default function Attendance() {
  const [committee, setCommittee] = useState("All");

  return (
    <div className="flex gap-4">
      <Nav />
      <div className="main flex flex-col w-full items-center">
        <CommitteesList setCommittee={setCommittee} />
        <AttendanceTable committee={committee} />
      </div>
    </div>
  );
}
