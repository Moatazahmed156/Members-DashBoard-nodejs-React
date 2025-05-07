import Nav from "../components/Nav";
import axios from "axios";
import { useState } from "react";
import { BaseURL } from "../data/base_url";
export default function AddMember() {
  const [memberData, setMemberData] = useState({
    name: "",
    committee: "technical",
  });

  function handleChange(e) {
    setMemberData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function AddMember() {
    try {
      await axios.post(`${BaseURL}/members`, memberData);
      alert("Member add successfully");
    } catch (err) {
      console.error("Error: ", err);
    }
  }
  return (
    <div className="flex ">
      <Nav />
      <form
        onSubmit={AddMember}
        className=" flex flex-col items-center [&_input]:rounded [&_select]:rounded w-[90%] px-4 mt-4"
      >
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
        <button
          id="submit"
          className="bg-[#700608] rounded-lg text-white p-2 text-xl w-full mt-4 hover:bg-[#222]"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
