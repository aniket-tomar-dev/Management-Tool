export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const getTime = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";

    return "Good Evening";
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">
        {getTime()}, {user.fullName} 👋
      </h1>
      <p className="text-gray-400 mb-6">
        Here's what's happening with your projects today
      </p>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-sm text-gray-400">Total Projects</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-sm text-gray-400">Recent Projects</h3>
          <p className="text-gray-400 mt-2">No projects yet</p>
        </div>
      </div>
    </>
  );
}
