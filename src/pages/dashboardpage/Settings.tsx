import { useEffect, useState } from "react";

export default function Settings() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [fullName, setFullName] = useState(user.fullName || "");
  const [email, setEmail] = useState(user.email || "");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setFullName(userData.fullName || "");
    setEmail(userData.email || "");
  }, []);

  return (
    <div className="h-full w-full p-4 sm:p-6 text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">⚙️ Settings</h1>
        <p className="text-gray-400">Manage your account preferences</p>
      </div>

      <div className="flex flex-col gap-6 max-w-3xl w-full">
        <div className="bg-[#1e293b] rounded-xl p-5 sm:p-6">
          <h2 className="text-xl font-semibold mb-4">
            🙍‍♀️ Profile
            <br />
            <span className="text-sm font-light text-gray-300">
              Manage your account preferences
            </span>
          </h2>

          <div className="space-y-4">
            <input
              className="w-full bg-[#0f172a] p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
            />

            <input
              className="w-full bg-[#0f172a] p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <button
              className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg transition w-full sm:w-auto"
              onClick={() => {
                const updatedUser = { ...user, fullName, email };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                alert("Changes saved!");
              }}
            >
              💾 Save Changes
            </button>
          </div>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-5 sm:p-6">
          <h2 className="text-xl font-semibold mb-4">
            Appearance
            <br />
            <span className="text-base font-normal text-gray-300">
              Customize how Management looks
            </span>
          </h2>

          <h1 className="mb-3 font-bold text-lg">🎨 Theme</h1>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="flex-1 border border-gray-600 hover:border-blue-500 p-4 rounded-lg cursor-pointer">
              <p className="font-medium">☀️ Light</p>
              <p className="text-gray-400 text-sm">Bright and clean</p>
            </div>

            <div className="flex-1 border border-blue-600 hover:border-blue-500 p-4 rounded-lg cursor-pointer bg-[#0f172a]">
              <p className="font-medium">🌙 Dark</p>
              <p className="text-gray-400 text-sm">Easy on the eyes</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1e293b] rounded-xl p-5 sm:p-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>

          <p className="text-gray-400 flex justify-between">
            <span className="text-lg font-bold">Account ID:</span>
            <span className="text-white">174e0dc3...</span>
          </p>
          <hr className="mt-2 border-gray-700" />

          <br />

          <p className="text-gray-400 flex justify-between">
            <span className="text-lg font-bold">Member since:</span>
            <span className="text-white">December 7, 2025</span>
          </p>
          <hr className="mt-3 border-gray-700" />
        </div>
      </div>
    </div>
  );
}
