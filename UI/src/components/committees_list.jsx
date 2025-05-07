import { useState } from "react";
import CommitteeCard from "../components/committee_card";

export default function CommitteesList({ setCommittee }) {
  const [active, setActive] = useState(1);

  return (
    <div className="mt-6 flex gap-6">
      <CommitteeCard
        icon="🔍"
        title="ALL"
        IsActive={active == 1}
        handleCommittee={() => {
          setCommittee("All");
          setActive(1);
        }}
      />
      <CommitteeCard
        icon="🧠"
        title="Technical"
        IsActive={active == 2}
        handleCommittee={() => {
          setCommittee("Technical");
          setActive(2);
        }}
      />
      <CommitteeCard
        icon="🤝"
        title="PR&FR"
        IsActive={active == 3}
        handleCommittee={() => {
          setCommittee("PR%26FR");
          setActive(3);
        }}
      />
      <CommitteeCard
        icon="🎬"
        title="Video"
        IsActive={active == 4}
        handleCommittee={() => {
          setCommittee("Video");
          setActive(4);
        }}
      />
      <CommitteeCard
        icon="🎨"
        title="Graphics"
        IsActive={active == 5}
        handleCommittee={() => {
          setCommittee("Graphics");
          setActive(5);
        }}
      />
      <CommitteeCard
        icon="📱"
        title="SMM"
        IsActive={active == 6}
        handleCommittee={() => {
          setCommittee("SMM");
          setActive(6);
        }}
      />
    </div>
  );
}
