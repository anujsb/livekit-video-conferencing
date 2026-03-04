"use client";

import {
  LiveKitRoom,
  useTracks,
  VideoTrack,
  RoomAudioRenderer,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function StudioLayout() {
  const tracks = useTracks([Track.Source.Camera]);

  if (tracks.length === 0)
    return <div className="text-white">Waiting for participants...</div>;

  const [mainTrack, ...otherTracks] = tracks;

  return (
    <div className="flex flex-col bg-black h-screen text-white">
      
      {/* Main Speaker */}
      <div className="flex flex-1 justify-center items-center">
        <div className="shadow-2xl rounded-2xl w-[70%] overflow-hidden">
          <VideoTrack trackRef={mainTrack} />
        </div>
      </div>

      {/* Guests */}
      <div className="flex justify-center gap-4 p-4">
        {otherTracks.map((track) => (
          <div key={track.participant.identity} className="rounded-xl w-48 overflow-hidden">
            <VideoTrack trackRef={track} />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-6 p-4 border-gray-800 border-t">
        <span className="bg-red-600 px-4 py-2 rounded-lg">● Live</span>
        <span>🎤 Mic</span>
        <span>📷 Camera</span>
        <span>🖥 Share</span>
      </div>

      <RoomAudioRenderer />
    </div>
  );
}

export default function RoomPage() {
  const params = useParams();
  const roomName = params?.roomName as string;
  const [token, setToken] = useState<string>();

  useEffect(() => {
    if (!roomName) return;

    fetch(`/api/token?room=${roomName}&username=Host`)
      .then((res) => res.json())
      .then((data) => setToken(data.token));
  }, [roomName]);

  if (!token) return <div className="p-10">Loading...</div>;

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      connect
      video
      audio
      className="h-screen"
    >
      <StudioLayout />
    </LiveKitRoom>
  );
}