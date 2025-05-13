import { Link, NavLink } from "react-router-dom";
import logo from "../../public/180daraga-B9qyHRiz.png";
export default function Nav() {
  return (
    <div className="min-h-screen bg-[#222222] py-4 flex flex-col gap-4 items-center min-w-[17%]">
      <img src={logo} alt="180 Daraga Logo" className="size-24" />
      <ul className="flex flex-col gap-2 w-full text-white text-lg">
        <li>
          <NavLink to="/" className="block px-2 py-2 mx-2 rounded">
            Members
          </NavLink>
        </li>
        <li>
          <NavLink to="/Attendance" className="block px-2 py-2 mx-2 rounded">
            Attendance
          </NavLink>
        </li>
        <li>
          <NavLink to="/AddMember" className="block px-2 py-2 mx-2 rounded">
            Add Member
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
