export default function Settings() {
  const user = JSON.parse(localStorage.getItem("user") || "");

  return (
    <div className="h-full w-full p-6 text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">⚙️Settings</h1>
        <p className="text-gray-400">Manage your account preferences</p>
      </div>

      <div className="flex flex-col gap-6 max-w-3xl">
        <div className="bg-[#1e293b] rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            🙍‍♀️Profile <br />
            <span className="text-sm font-light text-gray-300 font-sans">
              {" "}
              Manage your account preferences
            </span>
          </h2>
          <div className="space-y-4">
            <input
              className="w-full bg-[#0f172a] p-3 rounded-lg"
              value={user.fullName || ""}
              disabled
            />
            <input
              className="w-full bg-[#0f172a] p-3 rounded-lg"
              value={user.email || ""}
              disabled
            />
            <button className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg transition">
              💾Save Changes
            </button>
          </div>
        </div>

        {/* Appearance Card */}
        <div className="bg-[#1e293b] rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Appearance <br />
            <span className="text-base font-normal text-gray-300">
              {" "}
              Customize how Management looks
            </span>
          </h2>
          <h1 className="mb-3 font-bold text-lg ">🎨 Theme</h1>
          <div className=" flex  justify-center gap-4">
            <div className="w-1/2 border border-gray-600 hover:border-blue-500 p-4 rounded-lg cursor-pointer">
              <p className="font-medium">☀️Light</p>
              <p className="text-gray-400 text-sm">Bright and clean</p>
            </div>

            <div className="w-1/2  border border-blue-600 hover:border-blue-500 p-4 rounded-lg cursor-pointer bg-[#0f172a]">
              <p className="font-medium">🌙Dark</p>
              <p className="text-gray-400 text-sm">Easy on the eyes</p>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-[#1e293b] rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <p className="text-gray-400 flex justify-between">
            <span className="text-lg font-bold">Account ID :</span>{" "}
            <span className="text-white">174e0dc3...</span>
          </p>
          <hr className="mt-2 border-gray-400 border-t-1" />
          <br />
          <p className="text-gray-400 flex justify-between ">
            <span className="text-lg font-bold">Member since :</span>{" "}
            <span className="text-white">December 7, 2025</span>
          </p>
          <hr className="mt-3 border-gray-400 border-t-1" />
        </div>
      </div>
    </div>
  );
}
