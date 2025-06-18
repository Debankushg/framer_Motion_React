import React, { useState, useEffect } from "react";
import Joyride from "react-joyride";

// Tour Steps for all pages (you can modify it on a page-by-page basis)
const globalSteps = [
  {
    target: ".first-step",
    content: "Welcome to the first step of the tour!",
  },
  {
    target: ".second-step",
    content: "Here’s where the second step happens.",
  },
];

const TourGuide = ({ steps }) => {
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    // Show the tour only if it's not already completed
    const completed = localStorage.getItem("tourCompleted");
    if (!completed) setRunTour(true);
  }, []);

  const handleCallback = (data) => {
    // console.log("handleCallback", data);
    if (data.status === "finished" || data.status === "skipped") {
      localStorage.setItem("tourCompleted", true); // Mark the tour as completed
      setRunTour(false);
    }
  };

  function CustomTooltip(props) {
    const {
      backProps,
      closeProps,
      continuous,
      index,
      primaryProps,
      skipProps,
      step,
      tooltipProps,
    } = props;

    return (
      <div
        className="tooltip__body relative bg-gray-100 rounded-lg shadow-lg p-6 max-w-3xl"
        {...tooltipProps}
      >
        <button
          className="tooltip__close absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-900 focus:outline-none"
          {...closeProps}
        >
          &times;
        </button>
        {step.title && (
          <h4 className="tooltip__title text-xl font-semibold text-gray-800 mb-2">
            {step.title}
          </h4>
        )}
        <div className="tooltip__content text-gray-700 mb-4">
          {step.content}
        </div>
        <div className="tooltip__footer flex justify-between items-center">
          <button
            className="tooltip__button bg-gray-200 text-gray-800 rounded px-4 py-2 text-sm hover:bg-gray-300 transition duration-300"
            {...skipProps}
          >
            {skipProps.title}
          </button>
          <div className="tooltip__spacer flex space-x-2">
            {index > 0 && (
              <button
                className="tooltip__button bg-gray-200 text-gray-800 rounded px-4 py-2 text-sm hover:bg-gray-300 transition duration-300"
                {...backProps}
              >
                {backProps.title}
              </button>
            )}
            {continuous && (
              <button
                className="tooltip__button bg-blue-600 text-white rounded px-4 py-2 text-sm hover:bg-blue-700 transition duration-300"
                {...primaryProps}
              >
                {primaryProps.title}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setRunTour(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Start Tour
      </button>
      {runTour && (
        <Joyride
          steps={steps || globalSteps}
          run={runTour}
          continuous={true}
          showSkipButton={true}
          showBeacon={false}
          spotlightClicks={false}
          callback={handleCallback}
          tooltipComponent={CustomTooltip}
        />
      )}
    </div>
  );
};

export default TourGuide;
