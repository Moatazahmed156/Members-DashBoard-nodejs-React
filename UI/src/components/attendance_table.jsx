import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete, MdPersonAdd } from "react-icons/md";
import { BaseURL, header } from "../data/base_url";

export default function AttendanceTable({ committee }) {
  const [tableData, setTableData] = useState([]);
  const [DataFetched, setDataFetched] = useState(false);
  const [filterSession, setFilterSession] = useState("Sessions");
  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get(
          `${BaseURL}/attendance?${
            committee != "All" ? `committee=${committee}` : ""
          }${filterSession != "Sessions" ? `&session=${filterSession}` : ""}`
        );
        setTableData(response.data);
        setDataFetched(true);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
    fetchData();
  }, [committee, filterSession]);
  async function Delete(id) {
    try {
      await axios.delete(`${BaseURL}/attendance/${id}`, header);
      setTableData(tableData.filter((student) => student.id !== id));
      alert(`Attendance deleted Successfully`);
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  }
  if (!DataFetched) {
    return (
      <div className="flex justify-center items-center my-24">
        <div className="loader"></div>
      </div>
    );
  }

  function handleFilterSession(e) {
    setFilterSession(e.target.value);
  }
  return (
    <div className="w-full">
      <table className="w-full mt-[20px]  border-collapse [&_tr]:border-y-[1px] [&_tr]:border-[#eee] table-auto">
        <thead>
          <tr className=" text-[20px] [&_th]:text-center [&_th]:py-[10px] [&_th]:px-[20px] [&_th]:overflow-hidden [&_th]:whitespace-nowrap [&_th]:text-clip">
            <th>Name</th>
            <th>Committee</th>
            <th>
              <select onChange={handleFilterSession} value={filterSession}>
                <option>Sessions</option>
                {Array.from({ length: 20 }, (_, i) => (
                  <option key={i} value={`Session ${i + 1}`}>
                    Session {i + 1}
                  </option>
                ))}
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((e, i) => (
            <tr
              key={i}
              className="text-[18px] [&_td]:text-center [&_td]:py-[10px] [&_td]:px-[20px] [&_td]:whitespace-nowrap [&_td]:text-clip"
            >
              <td>{e.Member.name}</td>
              <td>{e.Member.committee}</td>
              <td>{e.session}</td>
              <td className="flex gap-2 text-[17px] text-white">
                <button
                  className="flex items-center bg-red-500 text-md rounded p-1"
                  onClick={() => Delete(e.id)}
                >
                  <MdDelete />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
