export default function Settings() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="h-full w-full p-6 text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-gray-400">Manage your account preferences</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#1e293b] rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="space-y-4">
            <input
              className="w-full bg-[#0f172a] p-3 rounded-lg"
              value={user.name || ""}
              disabled
            />
            <input
              className="w-full bg-[#0f172a] p-3 rounded-lg"
              value={user.email || ""}
              disabled
            />
            <button className="bg-blue-500 px-5 py-2 rounded-lg">
              Save Changes
            </button>
          </div>
        </div>
        <div className="bg-[#1e293b] rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Appearence</h2>
          <div className="space-y-4">
            <div className="border border-blue-500 p-4 rounded-lg">
              Light <p className="text-gray-400 text-sm">Bright and clean</p>
            </div>
            <div className="border border-blue-500 p-4 rounded-lg">
              Dark <p className="text-gray-400 text-sm">Easy on the eyes</p>
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-[#1e293b] rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <p className="text-gray-400">
            Member since : <span className="text-white">December 7 , 2025</span>
          </p>
        </div>
      </div>
    </div>
  );
}
