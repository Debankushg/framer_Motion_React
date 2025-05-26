import React from "react";
import { motion, AnimatePresence } from "framer-motion";
const About = () => {
  return (
    <div className="bg-[#242424] h-auto  overflow-hidden">
      <motion.h1
        className="text-3xl font-bold text-white text-center p-6"
        animate={{ scale: [1, 2, 2, 1, 1] }}
        transition={{ duration: 2 }}
      >
        About
      </motion.h1>
      <div className="flex items-center justify-between  px-6  z-10">
        <div className="w-1/2 h-screen">
          <motion.img
            src="/coffee.png"
            alt="Image"
            className="w-[80%] h-[80%] my-[10%] "
            initial={{ opacity: 0, x: -10, y: 0 }}
            animate={{ opacity: 1, x: 50, y: 0 }}
            exit={{ opacity: 0, x: 0, y: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
        <div className="w-1/2   h-screen text-amber-500 ">
          {" "}
          Lefficitur vehicula. Sed commodo, quam eget rutrum convallis, eros
          mauris gravida quam, id interdum turpis turpis sit amet mi.
          Suspendisse magna erat, cursus id malesuada hendrerit, hendrerit vitae
          dolor. In aliquam odio est, eget molestie nunc varius in. Fusce eu
          lorem tortor. Duis quis blandit mauris. Suspendisse et euismod massa.
          Vestibulum tempor dolor id massa sagittis interdum. Etiam congue
          libero eu nisl hendrerit lobortis. Phasellus et ante ullamcorper,
          congue mauris ac, accumsan nibh. Praesent lobortis sem in facilisis
          placerat. Praesent quis odio in csc ante porta sollicitudin non
          accumsan neque. Nulla tempor pulvinar blandit. Nulla viverra feugiat
          quam vitae venenatis. Aenean eget . pellentesque lorem vitae interdum
          facilisis. Nullam vulputate, sem id aliquam vulputate, magna ante
          ultricies enim, ac placerat sem elit non quam. Mauris sit amet finibus
          enim, luctus rutrum tortor. Donec porttitor nunc eu ante vehicula
          condimentum.
        </div>
      </div>
      <div className=" text-amber-500 p-4 h-screen">
        <div className="flex items-center justify-between  px-6  z-10">
          <div className="w-1/2   h-screen text-amber-500">
            {" "}
            Lefficitur vehicula. Sed commodo, quam eget rutrum convallis, eros{" "}
            mauris gravida quam, id interdum turpis turpis sit amet mi.
            Suspendisse magna erat, cursus id malesuada hendrerit, hendrerit
            vitae dolor. In aliquam odio est, eget molestie nunc varius in.
            Fusce eu lorem tortor. Duis quis blandit mauris. Suspendisse et
            euismod massa. Vestibulum tempor dolor id massa sagittis interdum.
            Etiam congue libero eu nisl hendrerit lobortis. Phasellus et ante
            ullamcorper, congue mauris ac, accumsan nibh. Praesent lobortis sem
            in facilisis placerat. Praesent quis odio in ante porta sollicitudin
            non accumsan neque. Nulla tempor pulvinar blandit. Nulla viverra
            feugiat quam vitae venenatis. Aenean eget tincidunt libero. Praesent
            pellentesque lorem vitae interdum facilisis. Nullam vulputate, sem
            id aliquam vulputate, magna ante ultricies enim, ac placerat sem
            elit non quam. Mauris sit amet finibus enim, luctus rutrum tortor.
            Donec porttitor nunc eu ante vehicula condimentum.
          </div>
          <div className="w-1/2 h-screen">
            <motion.img
              src="/coffeePlant.png"
              alt="Image"
              className="w-[80%] h-[80%] my-[10%] "
              initial={{ opacity: 0, x: 100, y: 0 }}
              animate={{ opacity: 1, x: 50, y: 0 }}
              exit={{ opacity: 0, x: 0, y: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
