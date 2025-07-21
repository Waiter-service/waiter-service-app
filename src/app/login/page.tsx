"use client";
import Button from "@/components/button/Button";
import { usePostLoginBar } from "@/queries/hooks/usePostLoginBar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [user, setUser] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });
  const { mutateAsync } = usePostLoginBar();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await mutateAsync(user);
      console.log("Access Token:", data.access_token);

      document.cookie = `access_token=${data.access_token}; path=/;`;

      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-[45px]">Digital Waiter</h1>
        <p className="text-[20px]">Prijavite se za nastavak</p>
        <input
          type="text"
          placeholder="Korisničko ime"
          className="mt-4 p-2 border border-neutral-800 rounded-lg w-[300px] focus:outline-none focus:border-neutral-500 transition-colors duration-200"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Lozinka"
          className="mt-4 p-2 border border-neutral-800 rounded-lg w-[300px] focus:outline-none focus:border-neutral-500 transition-colors duration-200"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Button
          variant="darkGray"
          className="w-full py-[10px] mt-[30px] rounded-2xl border-neutral-700"
          onClick={handleSubmit}
        >
          Prijavi se
        </Button>
      </div>
    </div>
  );
}