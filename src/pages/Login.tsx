import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../features/auth/schema";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import type { User } from "../types/user";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    const savedUserString = localStorage.getItem("user");

    if (!savedUserString) {
      alert("User not registered!");
      return;
    }

    const savedUser = JSON.parse(savedUserString) as User;

    if (
      savedUser.email === data.email &&
      savedUser.password === data.password
    ) {
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row text-white">
      <div
        className="hidden md:flex md:w-1/2 h-full flex-col justify-center px-20
        bg-linear-to-br from-[#0f766e] via-[#0b3b5b] to-[#020617]"
      >
        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl font-bold mb-6">
          P
        </div>

        <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
        <p className="text-gray-300 text-lg max-w-md leading-relaxed">
          Continue your journey and manage your tasks effortlessly with
          ProManage.
        </p>

        <ul className="flex gap-6 mt-6 text-sm text-gray-300">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Stay organized
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            Track progress
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
            Achieve goals
          </li>
        </ul>
      </div>

      <div
        className="flex-1 h-full flex flex-col items-center justify-center
        bg-linear-to-br from-[#020617] via-[#020617] to-[#0f172a] px-6"
      >
        <div className="md:hidden w-16 h-16 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl font-bold mb-8">
          P
        </div>

        <div className="w-full max-w-md">
          <div className="bg-[#020617]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-1">
              Sign in to your account
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Welcome back! Please enter your details.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Email"
                placeholder="name@example.com"
                {...register("email")}
                error={errors.email?.message}
              />

              <Input
                label="Password"
                type="password"
                {...register("password")}
                error={errors.password?.message}
              />

              <Button
                type="submit"
                className="w-full bg-linear-to-r from-blue-500 to-indigo-600"
              >
                Login
              </Button>
            </form>

            <p className="text-sm text-gray-400 mt-6 text-center">
              Don’t have an account?
              <Link to="/" className="text-blue-400 ml-1 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
