"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", { email, password, redirect: false });

    if (result?.ok) {
      router.push("/");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 bg-gray-700 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 bg-gray-700 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
