import React, { useState } from "react";

const ServiceModal = ({ setOpen, loading }) => {
  const [selectedService, setSelectedService] = useState(""); // track selected

  const handleSubmit = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setSelectedService(e.target.value);
  };

  // Different text per service
  const renderContent = () => {
    switch (selectedService) {
      case "coffee":
        return (
          <p>
            Coffee fuels creativity and keeps the ideas flowing. Enjoy the
            perfect brew while coding. Coffee fuels creativity and keeps the
            ideas flowing. Enjoy the perfect brew while coding. Coffee fuels
            creativity and keeps the ideas flowing. Enjoy the perfect brew while
            coding.
          </p>
        );
      case "code":
        return (
          <p>
            Dive deep into clean, efficient, and scalable code crafted just for
            you. Dive deep into clean, efficient, and scalable code crafted just
            for you. Dive deep into clean, efficient, and scalable code crafted
            just for you.
          </p>
        );
      case "restaurant":
        return (
          <p>
            Experience delightful dining with our expertly crafted restaurant
            solutions. Experience delightful dining with our expertly crafted
            restaurant solutions. Experience delightful dining with our expertly
            crafted restaurant solutions. Experience delightful dining with our
            expertly crafted restaurant solutions.
          </p>
        );
      case "others":
        return (
          <p>
            {" "}
            Experience delightful dining with our expertly crafted restaurant
            solutions. Experience delightful dining with our expertly crafted
            restaurant solutions. Experience delightful dining with our expertly
            crafted restaurant solutions. Experience delightful dining with our
            expertly crafted restaurant solutions.Explore other unique services
            tailored to your diverse needs.
          </p>
        );
      default:
        return (
          <p className="min-h-[300px]">
            Please select a service to see more details here.
          </p>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-table-head flex rounded-2xl w-[800px] p-6 ">
        <div className=" bg-amber-500 w-1/2 p-6 rounded-tl-2xl rounded-bl-2xl">
          <h1 className="text-3xl font-bold text-white text-center p-2">
            Services
          </h1>
          <ul>
            {[
              { label: "Coffee", value: "coffee" },
              { label: "Code", value: "code" },
              { label: "Restaurant", value: "restaurant" },
              { label: "Others", value: "others" },
            ].map(({ label, value }) => (
              <li className="mb-4" key={value}>
                <label className="flex items-center cursor-pointer space-x-3 ">
                  <input
                    type="radio"
                    name="service"
                    value={value}
                    className="form-radio h-5 w-5 cursor-pointer text-black"
                    onChange={handleChange}
                    checked={selectedService === value}
                  />
                  <span className="text-white font-medium">{label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2 bg-[#242424] min-h-[300px]     text-white p-6 rounded-tr-2xl rounded-br-2xl">
          <span
            className="flex justify-end  cursor-pointer"
            onClick={() => setOpen(false)}
          >
            X
          </span>
          {renderContent()}
          <div className="flex justify-end items-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-gray-700 text-white rounded-3xl text-center cursor-pointer hover:bg-gray-800"
              onClick={handleSubmit}
              disabled={!selectedService} // disable if nothing selected
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
