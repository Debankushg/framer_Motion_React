import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToggle() {
  const [show, setShow] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      const isVisible = rect.top < viewportHeight && rect.bottom > 0;

      setShow(isVisible);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll); // to handle viewport resize

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex h-auto bg-[#242424] overflow-hidden py-10 relative"
    >
      <div className=" w-1/2 p-10 min-h-screen relative  text-right">
        <AnimatePresence>
          {show && (
            <>
              <motion.img
                src="/cofeeMug.png"
                alt="Image"
                className="w-full h-auto my-[10%]"
                initial={{ opacity: 0, x: 0, y: 100 }}
                animate={{ opacity: 1, x: 0, y: -50 }}
                exit={{ opacity: 0, x: 0, y: 100 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {show && (
          <motion.h1
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="text-left py-6 uppercase mt-[20%] absolute right-[5%]"
            style={{ pointerEvents: "auto" }}
          >
            <span
              className="text-[#424242] text-9xl font-serif font-bold font-georgia tracking-wider"
              style={{
                WebkitTextStroke: "2px #f59e0b",
              }}
            >
              Coffee
            </span>{" "}
            <span className="text-amber-500 text-6xl font-bold">Coder</span>
          </motion.h1>
        )}
      </AnimatePresence>
      <div className="w-1/2 p-10 min-h-screen absolute right-0 flex mt-[20%] text-white items-end">
        <motion.p
          className="text-left"
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 20, x: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus
          nec nisl eget eleifend. Suspendisse ultricies lorem ante. Morbi auctor
          efficitur vehicula. Sed commodo, quam eget rutrum convallis, eros
          mauris gravida quam, id interdum turpis turpis sit amet mi.
          Suspendisse magna erat, cursus id malesuada hendrerit, hendrerit vitae
          dolor. In aliquam odio est, eget molestie nunc varius in. Fusce eu
          lorem tortor. Duis quis blandit mauris. Suspendisse et euismod massa.
          Vestibulum tempor dolor id massa sagittis interdum. Etiam congue
          libero eu nisl hendrerit lobortis. Phasellus et ante ullamcorper,
          congue mauris ac, accumsan nibh. Praesent lobortis sem in facilisis
          placerat. Praesent quis odio in ante porta sollicitudin non accumsan
          neque. Nulla tempor pulvinar blandit. Nulla viverra feugiat quam vitae
          venenatis. Aenean eget tincidunt libero. Praesent pellentesque lorem
          vitae interdum facilisis. Nullam vulputate, sem id aliquam vulputate,
          magna ante ultricies enim, ac placerat sem elit non quam. Mauris sit
          amet finibus enim, luctus rutrum tortor. Donec porttitor nunc eu ante
          vehicula condimentum.
        </motion.p>
      </div>
    </div>
  );
}
