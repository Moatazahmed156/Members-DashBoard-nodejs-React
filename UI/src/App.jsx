import Members from "./pages/members";
import Attendance from "./pages/attendance";
import Member from "./pages/Member";
import NotFound from "./pages/NotFound";
import AddMember from "./pages/add_member";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Members />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/AddMember" element={<AddMember />} />
        <Route path="/Members/ID/:id" element={<Member />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
