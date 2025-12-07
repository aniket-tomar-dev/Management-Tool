export const Button = ({ children, ...props }: any) => {
  return (
    <button
      {...props}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
    >
      {children}
    </button>
  );
};
