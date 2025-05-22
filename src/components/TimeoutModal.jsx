import React, { useState, useEffect, useRef } from "react";

const TimeoutModal = () => {
  const APP_TIMEOUT = {
    idle: 1000 * 60 * 0.1,
    warning: 10,
  };

  // const play = () => {
  //   const audio = new Audio("/bubble.mp3");
  //   audio.play().catch((e) => console.log("Audio play error:", e));
  // };

  const [showModal, setShowModal] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(APP_TIMEOUT.warning);
  const timerRef = useRef(null);
  const workerRef = useRef(null);
  const idleTimeoutRef = useRef(null);
  const audioRef = useRef(null);
  const userInteracted = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio("/bubble.mp3");
    audioRef.current.loop = true; // enable loop
  }, []);

  // Play audio only if user interacted before
  // const playSound = () => {
  //   if (audioRef.current && userInteracted.current) {
  //     audioRef.current.play().catch(() => {
  //       // ignore autoplay errors
  //     });
  //   }
  // };

  const handleLogout = () => {
    cleanup();
    console.log("User logged out due to inactivity");
    // your logout logic here
  };

  const handleStayLoggedIn = () => {
    cleanup();
    console.log("User stayed logged in");
    startIdleTimer();
  };

  const cleanup = () => {
    setShowModal(false);
    clearTimeout(idleTimeoutRef.current);
    clearInterval(timerRef.current);
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const startIdleTimer = () => {
    idleTimeoutRef.current = setTimeout(() => {
      setShowModal(true);
      setSecondsLeft(APP_TIMEOUT.warning);
      startCountdown(APP_TIMEOUT.warning);
      if (audioRef.current) {
        audioRef.current
          .play()
          .catch((e) => console.log("Audio play error:", e));
      }
    }, APP_TIMEOUT.idle);
  };

  const startCountdown = (seconds) => {
    if (window.Worker) {
      if (workerRef.current) workerRef.current.terminate();

      workerRef.current = new Worker(`${window.location.origin}/timeWorker.js`);
      workerRef.current.onmessage = (e) => {
        setSecondsLeft(e.data);
      };
      timerRef.current = setInterval(() => {
        seconds -= 1;
        if (seconds <= 0) {
          handleLogout();
        } else {
          workerRef.current.postMessage(seconds);
        }
      }, 1000);
      workerRef.current.postMessage(seconds);
    } else {
      let s = seconds;
      timerRef.current = setInterval(() => {
        s -= 1;
        setSecondsLeft(s);
        if (s <= 0) {
          handleLogout();
        }
      }, 1000);
    }
  };

  // Set userInteracted on first user gesture
  useEffect(() => {
    const onUserInteraction = () => {
      userInteracted.current = true;
      window.removeEventListener("click", onUserInteraction);
      window.removeEventListener("keydown", onUserInteraction);
    };
    window.addEventListener("click", onUserInteraction);
    window.addEventListener("keydown", onUserInteraction);

    startIdleTimer();

    const resetIdleTimer = () => {
      setShowModal(false);

      if (countdownIntervalRef.current)
        clearInterval(countdownIntervalRef.current);

      // Stop audio when user is active again
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      startIdleTimer();
    };

    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("keydown", resetIdleTimer);

    return () => {
      cleanup();
      window.removeEventListener("click", onUserInteraction);
      window.removeEventListener("keydown", onUserInteraction);
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("keydown", resetIdleTimer);
    };
  }, []);

  if (!showModal) return null;

  return (
    <>
      {/* <audio ref={audioRef} src="/bubble.mp3" preload="auto" /> */}
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-80 shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-4">
            It looks like you’re away!
          </h2>
          <p className="mb-6">
            We’ll log you out in{" "}
            <span className="font-bold">{secondsLeft}</span> seconds.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleLogout}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-6 rounded"
            >
              Logout
            </button>
            <button
              onClick={handleStayLoggedIn}
              className="bg-[#242424] hover:bg-[#1f1f1f] text-white font-semibold py-2 px-6 rounded"
            >
              Stay Logged In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeoutModal;
