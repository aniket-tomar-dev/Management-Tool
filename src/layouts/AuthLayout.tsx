import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* LEFT SIDE */}
      <div className="w-1/2 bg-[#0d1117] text-white flex flex-col justify-center px-16">
        <h1 className="text-4xl font-bold mb-4">ProManage</h1>
        <p className="text-gray-300 text-lg">
          Streamline your projects, boost productivity, and achieve your goals
          with our intuitive task management platform.
        </p>
      </div>

      {/* RIGHT SIDE (FORMS) */}
      <div className="w-1/2 flex items-center justify-center bg-[#0b0f14]">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
