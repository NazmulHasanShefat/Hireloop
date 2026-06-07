"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
    const router = useRouter()
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in"); // Redirect your user here
        },
      },
    });
  };
  return (
    <button
      onClick={handleSignOut}
      className="rounded-xl cursor-pointer bg-violet-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
    >
      Sign Out
    </button>
  );
}
