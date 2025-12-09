export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const stats = [
    { title: "Total Projects", value: 1, icon: "📁" },
    { title: "Completed Tasks", value: "0/0", icon: "✅" },
    { title: "Completion Rate", value: "0%", icon: "⏱️" },
    { title: "Overdue Tasks", value: 0, icon: "⚠️" },
  ];

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

      <div className="h-40 grid grid-cols-4 gap-6 mb-8">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white/5 p-6 rounded-xl border border-white/10 flex justify-between items-center"
          >
            <div>
              <h3 className="text-sm text-gray-400">{item.title}</h3>
              <p className="text-2xl font-bold mt-2">{item.value}</p>
            </div>
            <div className="text-2xl bg-blue-500/20 p-3 rounded-lg">
              {item.icon}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Recent Projects</h3>
            <button className="text-blue-400 text-sm">View all →</button>
          </div>

          <div className="h-25 flex items-center gap-3">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-yellow-400 text-black font-semibold">
              {user.fullName?.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{user.fullName}</p>
              <p className="text-sm text-gray-400">0/0 tasks completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center">
          <div className="text-4xl mb-3">🕒</div>
          <p className="text-gray-400">No upcoming deadlines</p>
        </div>
      </div>
    </>
  );
}
