import React, { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { CountDownModal } from "./TimeoutModal";
import { APP_TIMEOUT, routes } from "../../config";
import { useLocation } from "react-router";
import styles from "./styles";

const IdleTimerComponent = () => {
  const location = useLocation();

  //   const timeout = APP_TIMEOUT.idle;
  // const location = useLocation();
  const timeout = 10000;
  const [idleOrActive, setIdleOrActive] = useState("app-active");

  const onIdle = () => {
    CountDownModal();
    setIdleOrActive("app-idle");
  };

  const onActive = () => {
    setIdleOrActive("app-active");
  };

  useIdleTimer({
    timeout,
    onIdle,
    onActive,
  });

  return (
    <div>
      <CountDownModal />
    </div>
  );
};

export default IdleTimerComponent;
