import React, { useEffect, useState, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useLocation } from "react-router";
import { TimeoutModal } from "./TimeoutModal";

const IdleTimerComponent = ({ children, setToken }) => {
  const [idleOrActive, setIdleOrActive] = useState("app-active");
  const [showModal, setShowModal] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const audioRef = useRef(null);

  // Listen for first user interaction (to allow audio playback)
  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true);
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  // Play/pause audio based on showModal state and user interaction
  useEffect(() => {
    if (showModal && userInteracted && idleOrActive === "app-idle") {
      if (!audioRef.current) {
        audioRef.current = new Audio("/bubble.mp3");
        audioRef.current.loop = true;
      }
      audioRef.current.play().catch((e) => {
        console.log("Audio play failed:", e);
      });
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [showModal, userInteracted, idleOrActive]);

  const onIdle = () => {
    setShowModal(true);
    setIdleOrActive("app-idle");
  };

  const onActive = () => {
    // setShowModal(false);
    setIdleOrActive("app-active");
  };

  useIdleTimer({
    onIdle,
    onActive,
    timeout: 1000 * 60 * 20,
    crossTab: true,
    leaderElection: true,
    syncTimers: 200,
  });

  return (
    <div>
      {children}
      {showModal && (
        <TimeoutModal onClose={() => setShowModal(false)} setToken={setToken} />
      )}
    </div>
  );
};

export default IdleTimerComponent;
