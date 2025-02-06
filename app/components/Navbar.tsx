"use clinet";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Divide } from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {}
  };

  return (
    <div>
      <button onClick={handleSignOut}></button>

      {session ? (
        <div>Welcome</div>
      ) : (
        <div>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
