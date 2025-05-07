import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div>
      <div className=" flex flex-col gap-4 items-center justify-center min-h-[100vh] font-bold">
        <h1 className="text-5xl text-center max-md:text-4xl">NOT FOUND😔</h1>
        <p className="text-5xl text-center max-md:text-4xl">404</p>
        <Link
          to="/"
          className="mt-4 px-16  py-2 hover:bg-[#700608] border border-2 border-gray-300 rounded-2xl rounded hover:bg-[#700608] hover:text-white"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
