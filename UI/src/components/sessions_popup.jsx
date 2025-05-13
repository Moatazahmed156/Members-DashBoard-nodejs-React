import axios from "axios";
import { useState } from "react";
import { BaseURL, header } from "../data/base_url";
export default function SessionsPopup({ onClose, memberID }) {
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const sessions = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  async function handleAttend(session) {
    try {
      let response = await axios.post(
        `${BaseURL}/attendance`,
        {
          memberId: memberID,
          session: `Session ${session}`,
        },
        header
      );
      setMessage(response.data.message);
      setSuccess(true);
    } catch (err) {
      console.error("Error: ", err);
    }
  }
  return (
    <div className="w-full h-screen flex items-center justify-center fixed top-0 left-0 z-50">
      <div className="flex flex-col gap-4 items-center justify-center bg-[#646262] rounded-lg min-w-[400px] min-h-[250px] max-w-[740px] text-white text-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-4xl font-bold"
        >
          X
        </button>
        {success ? (
          <p className="text-3xl text-white px-4 text-center">{message}</p>
        ) : (
          <div className="grid grid-cols-4 gap-4 p-6 mt-8">
            {sessions.map((e) => (
              <button
                onClick={() => handleAttend(e)}
                key={e}
                className="text-2xl py-2 px-6 bg-orange-500 rounded-lg"
              >
                Session {e}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
