import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../features/auth/schema";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/login");
  };

  return (
    <div className="h-screen w-screen flex text-white">
      <div
        className="w-1/2 h-full flex flex-col justify-center px-20
        bg-gradient-to-br from-[#0f766e] via-[#0b3b5b] to-[#020617]"
      >
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-12 h-12 rounded-xl bg-gradient-to-br
            from-blue-500 to-indigo-600 flex items-center justify-center
            text-xl font-bold"
          >
            P
          </div>
          <h1 className="text-4xl font-bold">Welcome Back</h1>
        </div>

        <p className="text-gray-300 text-lg max-w-md leading-relaxed">
          Continue your journey and manage your tasks effortlessly with
          ProManage.
        </p>

        <ul className="flex gap-6 mt-10 text-sm text-gray-300">
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
        className="w-1/2 h-full flex items-center justify-center
        bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a]"
      >
        <div
          className="w-full max-w-md bg-[#020617]/70 backdrop-blur
          border border-white/10 rounded-2xl p-8 shadow-xl"
        >
          <h2 className="text-2xl font-semibold mb-1">Create an account</h2>
          <p className="text-sm text-gray-400 mb-6">
            Get started with ProManage today
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Full name"
              placeholder="John Doe"
              {...register("fullName")}
              error={errors.fullName?.message}
            />

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

            <Input
              label="Confirm password"
              type="password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600"
            >
              Create account
            </Button>
          </form>

          <p className="text-sm text-gray-400 mt-6 text-center">
            Already have an account?
            <Link to="/login" className="text-blue-400 ml-1 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
