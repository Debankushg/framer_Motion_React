import React, { useState } from "react";
import ServiceModal from "../components/ServiceModal";

const services = [
  {
    title: "Custom Software Development",
    description:
      "Tailored software solutions crafted to perfectly fit your business needs, using the latest technologies.",
    icon: (
      <svg
        className="w-10 h-10 text-yellow-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-3 0-5 2-5 5a5 5 0 0010 0c0-3-2-5-5-5z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v6" />
      </svg>
    ),
  },
  {
    title: "API Integration",
    description:
      "Seamlessly connect your applications with external services and platforms to expand functionality.",
    icon: (
      <svg
        className="w-10 h-10 text-yellow-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Tech Consulting",
    description:
      "Get expert advice to optimize your tech stack, architecture, and processes for better productivity.",
    icon: (
      <svg
        className="w-10 h-10 text-yellow-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20h12" />
      </svg>
    ),
  },
];

export default function ServicePage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#242424] via-[#868585] to-[#242424] font-sans text-gray-900 py-5">
        {/* Header */}
        <header className="bg-yellow-800 shadow-lg py-12 px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide font-mono">
            Coffee & Code Services
          </h1>
          <p className="max-w-2xl mx-auto text-yellow-200 text-lg md:text-xl">
            Brewed to perfection for developers and businesses who love great
            code with great coffee.
          </p>
        </header>

        {/* Services Section */}
        <section
          className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3 cursor-pointer"
          onClick={showLoading}
        >
          {services.map(({ title, description, icon }) => (
            <div
              key={title}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-6">{icon}</div>
              <h3 className="text-2xl font-semibold mb-3 font-mono">{title}</h3>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>
          ))}
        </section>

        {/* Call to Action */}
        <section className="bg-yellow-700 text-yellow-50 text-center py-12 px-6 rounded-t-3xl shadow-inner mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4 font-mono">
            Ready to elevate your project with a perfect blend of coffee & code?
          </h2>
          <a
            href="/#contact-section"
            className="inline-block mt-4 px-8 py-3 bg-yellow-300 text-yellow-900 font-bold rounded-full shadow-lg hover:bg-yellow-400 transition-colors"
          >
            Get in Touch
          </a>
        </section>
      </div>
      {open && <ServiceModal open={open} setOpen={setOpen} loading={loading} />}
    </>
  );
}
