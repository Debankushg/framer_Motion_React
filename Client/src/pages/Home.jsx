import React from "react";
import Card from "../components/Card";
import * as motion from "motion/react-client";
import Middle from "./Middle";
import Contact from "./Contact";

const Home = () => {
  const part1 = "Welcome to Coffee ";

  const splitText = (text) => Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      <div className="bg-[#242424] h-screen py-10">
        <div className="flex items-center flex-col justify-center h-screen ">
          <motion.h1 className="text-3xl font-bold text-white p-6">
            {/* Animate first part */}
            <motion.span
              style={{ display: "inline-block" }}
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {splitText(part1).map((char, i) => (
                <motion.span
                  key={i}
                  variants={child}
                  className="inline-block text-6xl"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>

            {/* Animate second part with amber color */}
            <motion.span
              className="text-amber-500 text-3xl"
              style={{ display: "inline-block" }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              Coder to Framer
            </motion.span>
          </motion.h1>
          <div className="flex items-center justify-center px-24">
            <motion.p
              className="text-white p-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 3 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
              mi sed ligula imperdiet venenatis. Morbi nisl mauris, hendrerit in
              tempor ullamcorper, feugiat sed lacus. Praesent odio nisi, rutrum
              sed justo ut, molestie tincidunt ex. Vestibulum luctus, lorem sit
              amet porta tempus, lectus elit aliquet enim, ac cursus risus nibh
              eget magna. Aliquam maximus augue id dapibus fermentum. Nulla
              facilisi. Etiam bibendum mollis lorem, vitae pharetra ex tempus
              et. Proin dictum sapien id odio pharetra, sed lobortis quam
              ullamcorper. Duis lacinia, eros eu finibus lacinia, nisi diam
              imperdiet neque, ut vehicula quam nunc nec sapien. Praesent mi
              tortor, ornare id erat id, gravida facilisis ex. Sed sollicitudin
              quam non felis tempor condimentum.
            </motion.p>
            <motion.p
              className="text-white p-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 3 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
              mi sed ligula imperdiet venenatis. Morbi nisl mauris, hendrerit in
              tempor ullamcorper, feugiat sed lacus. Praesent odio nisi, rutrum
              sed justo ut, molestie tincidunt ex. Vestibulum luctus, lorem sit
              amet porta tempus, lectus elit aliquet enim, ac cursus risus nibh
              eget magna. Aliquam maximus augue id dapibus fermentum. Nulla
              facilisi. Etiam bibendum mollis lorem, vitae pharetra ex tempus
              et. Proin dictum sapien id odio pharetra, sed lobortis quam
              ullamcorper. Duis lacinia, eros eu finibus lacinia, nisi diam
              imperdiet neque, ut vehicula quam nunc nec sapien. Praesent mi
              tortor, ornare id erat id, gravida facilisis ex. Sed sollicitudin
              quam non felis tempor condimentum.
            </motion.p>
          </div>
          <Card />
        </div>
      </div>
      <Middle />

      <Contact />
    </>
  );
};

export default Home;
