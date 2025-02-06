"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between p-4 bg-gray-900 text-white">
      <Link href="/" className="text-xl font-bold">MyApp</Link>

      <div className="space-x-4">
        {session ? (
          <>
            <span>Welcome, {session.user?.email}</span>
            <button onClick={() => signOut()} className="px-3 py-1 bg-red-600 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="px-3 py-1 bg-blue-600 rounded">Login</Link>
            <Link href="/register" className="px-3 py-1 bg-green-600 rounded">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
