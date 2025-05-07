export default function CommitteeCard({
  icon,
  title,
  IsActive,
  handleCommittee,
}) {
  return (
    <button
      onClick={handleCommittee}
      className={`flex h-12 w-36 items-center justify-center rounded-full border p-2 ${
        IsActive && "bg-blue-600 "
      }`}
    >
      <p className="text-2xl">{icon}</p>
      <p className={`text-lg font-bold ${IsActive && "text-white"}`}>{title}</p>
    </button>
  );
}
