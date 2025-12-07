import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        {...props}
        className={`w-full px-3 py-2 rounded-md bg-gray-900/30 border ${
          error ? "border-red-500" : "border-gray-700"
        } focus:border-blue-500 outline-none`}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};
