import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete, MdPersonAdd } from "react-icons/md";
import SessionsPopup from "./sessions_popup";

function Table({ committee }) {
  const [tableData, setTableData] = useState([]);
  const [DataFetched, setDataFetched] = useState(false);
  const [memberID, setMemberID] = useState(-1);
  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get(
          `http://192.168.100.43:3000/members${
            committee != "All" ? `?committee=${committee}` : ""
          }`
        );
        setTableData(response.data);
        setDataFetched(true);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
    fetchData();
  }, [committee]);
  async function Delete(id) {
    try {
      await axios.delete(`http://192.168.100.43:3000/members/${id}`);
      setTableData(tableData.filter((student) => student.id !== id));
      alert(`Student with ID: ${id} deleted Successfully`);
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
  if (DataFetched && !tableData.length) {
    return (
      <div className="flex items-center justify-center w-full my-24">
        <p className="text-3xl font-bold">No data Found</p>
      </div>
    );
  }
  return (
    <div className="w-full">
      <table className="w-full mt-[20px]  border-collapse [&_tr]:border-y-[1px] [&_tr]:border-[#eee] table-auto">
        <thead>
          <tr className=" text-[20px] [&_th]:text-center [&_th]:py-[10px] [&_th]:px-[20px] [&_th]:overflow-hidden [&_th]:whitespace-nowrap [&_th]:text-clip">
            <th>ID</th>
            <th>Name</th>
            <th>Committee</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((e, i) => (
            <tr
              key={i}
              className="text-[18px] [&_td]:text-center [&_td]:py-[10px] [&_td]:px-[20px] [&_td]:whitespace-nowrap [&_td]:text-clip"
            >
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.committee}</td>
              <td>
                <div className="flex justify-center items-center gap-1 text-[18px] text-white bg-orange-600 text-md rounded p-1 px-2">
                  <button onClick={() => setMemberID(e.id)}>Attend</button>
                </div>
              </td>
              <td className="flex gap-2 text-[17px] text-white">
                <button
                  className="flex items-center bg-red-500 text-md rounded p-1"
                  onClick={() => Delete(e.id)}
                >
                  <MdDelete />
                  Delete
                </button>
                <Link
                  className="flex items-center gap-1 bg-green-500 text-md rounded p-1 px-2"
                  to={`/Members/ID/${e.id}`}
                >
                  <MdPersonAdd />
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {memberID != -1 && (
        <SessionsPopup onClose={() => setMemberID(-1)} memberID={memberID} />
      )}
    </div>
  );
}
export default Table;
