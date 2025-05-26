import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import toast from "react-hot-toast";

const Contact = () => {
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true });
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await toast.loading("Loading...", {
      duration: 2000,
    });
    toast.success("Form submitted successfully!");
    toast.error("Error in Form!", { icon: "🔥" });
    console.log(contact);
  };

  return (
    <div className="min-h-screen bg-[#242424] text-gray-300 flex items-center  px-6 py-16">
      <motion.div
        ref={formRef}
        initial={{ opacity: 0, y: 200 }}
        animate={isInView && { opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="max-w-3xl w-1/2 bg-[#1f1f1f] rounded-xl shadow-lg p-10"
      >
        <h2
          className="text-4xl font-semibold text-amber-400 mb-6 tracking-wide"
          id="contact-section"
        >
          Get in Touch
        </h2>
        <p className="mb-8 text-gray-400 leading-relaxed">
          I’d love to hear from you! Whether you have a question, want to work
          together, or just want to say hi, feel free to drop a message below.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-gray-400 font-medium"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your full name"
              className="w-full bg-[#2c2c2c] text-gray-200 placeholder-gray-500 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-gray-400 font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full bg-[#2c2c2c] text-gray-200 placeholder-gray-500 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              onChange={(e) =>
                setContact({ ...contact, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-gray-400 font-medium"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              placeholder="Write your message here..."
              className="w-full bg-[#2c2c2c] text-gray-200 placeholder-gray-500 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 transition resize-none"
              onChange={(e) =>
                setContact({ ...contact, message: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold py-3 rounded-md transition cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </motion.div>
      <div className=" w-1/2 p-10 min-h-screen  ">
        <motion.img
          src="/coffeeBeans.png"
          alt="Image"
          className="w-full h-full my-[10%] object-cover"
          ref={formRef}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={isInView && { opacity: 1, x: 40, y: 50 }}
          exit={{ opacity: 0, x: 0, y: 100 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default Contact;
