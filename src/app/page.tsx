"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [room, setRoom] = useState("");

  return (
    <div className="flex flex-col justify-center items-center gap-6 h-screen">
      <h1 className="font-bold text-4xl">
        LiveKit Video Platform Demo
      </h1>

      <div className="flex gap-2">
        <Input
          placeholder="Enter Room Name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <Button onClick={() => router.push(`/room/${room}`)}>
          Join
        </Button>
      </div>
    </div>
  );
}