import Table from "../components/members_table";
import Nav from "../components/Nav";
import { useState } from "react";
import CommitteesList from "../components/committees_list";
export default function Members() {
  const [committee, setCommittee] = useState("All");
  return (
    <div className="flex gap-4">
      <Nav />
      <div className="main flex flex-col w-full items-center">
        <CommitteesList setCommittee={setCommittee} />
        <Table committee={committee} />
      </div>
    </div>
  );
}
