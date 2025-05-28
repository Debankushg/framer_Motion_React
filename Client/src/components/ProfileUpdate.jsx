import React, { useState, useEffect } from "react";

const ProfileUpdate = ({
  data,
  saveAddress,
  closeAddAddressModal,
  setData,
}) => {
  const [skillsInput, setSkillsInput] = useState(
    data?.skills?.join(", ") || ""
  );

  // Sync skillsInput when data.skills changes externally
  useEffect(() => {
    setSkillsInput(data?.skills?.join(", ") || "");
  }, [data?.skills]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Prevent email update
    if (id === "email") return;

    if (id === "skills") {
      setSkillsInput(value); // update local string state only here
      return;
    }

    if (id === "dob") {
      setData({
        ...data,
        dob: value,
      });
      return;
    }

    // Special handling for fullname which is inside data.user.fullname
    if (id === "fullname" || id === "name") {
      setData({
        ...data,
        user: {
          ...data.user,
          fullname: value,
        },
      });
      return;
    }

    // For other fields, update at top-level
    setData({
      ...data,
      [id]: value,
    });
  };

  // On form submit, prevent default and call saveAddress with updated data
  const onSubmit = (e) => {
    e.preventDefault();
    const skillsArray = skillsInput
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    saveAddress({ ...data, skills: skillsArray });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
        <div className="bg-[#333333] p-8 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Add Address</h2>
            <button
              onClick={closeAddAddressModal}
              className="text-3xl font-bold text-gray-300 hover:text-white transition"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Full Name (readonly) */}
              <div>
                <label
                  htmlFor="fullname"
                  className="block mb-2 text-sm font-semibold text-gray-300"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  value={data?.user?.fullname || ""}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-600 bg-gray-800 px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Email (readonly) */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-semibold text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={data?.user?.email || ""}
                  readOnly
                  className="w-full rounded border border-gray-600 bg-gray-800 px-4 py-2 text-gray-300 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Mobile */}
              <div>
                <label
                  htmlFor="mobile"
                  className="block mb-2 text-sm font-semibold text-gray-300"
                >
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  required
                  pattern="[0-9]{10,15}"
                  value={data?.mobile || ""}
                  placeholder="Enter mobile number"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-600 bg-gray-800 px-4 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dob"
                  className="block mb-2 text-sm font-semibold text-gray-300"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  required
                  value={data?.dob ? data.dob.split("T")[0] : ""}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-600 bg-gray-800 px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-semibold text-gray-300"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  required
                  value={data?.gender || ""}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-600 bg-gray-800 px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Preference */}
              <div>
                <label
                  htmlFor="preference"
                  className="block mb-2 text-sm font-semibold text-gray-300"
                >
                  Preference
                </label>
                <select
                  id="preference"
                  required
                  value={data?.preference || ""}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-600 bg-gray-800 px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled>
                    Select preference
                  </option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-semibold text-gray-300"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  required
                  value={data?.city || ""}
                  placeholder="Enter city"
                  onChange={handleChange}
                  className="w-full rounded border border-gray-600 bg-gray-800 px-4 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* State */}
              <div>
                <label
                  htmlFor="state"
                  className="block mb-2 text-sm font-semibold text-gray-300"
                >
                  State
                </label>
                <select
                  id="state"
                  required
                  value={data?.state || ""}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-600 bg-gray-800 px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled>
                    Select state
                  </option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="State 2">State 2</option>
                  <option value="State 3">State 3</option>
                </select>
              </div>

              {/* Country (readonly) */}
              <div>
                <label
                  htmlFor="country"
                  className="block mb-2 text-sm font-semibold text-gray-300"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  value={data?.country || "India"}
                  readOnly
                  className="w-full rounded border border-gray-600 bg-gray-800 px-4 py-2 text-gray-300 cursor-not-allowed focus:outline-none"
                />
              </div>
            </div>

            {/* Skills - full width */}
            <div>
              <label
                htmlFor="skills"
                className="block mb-2 text-sm font-semibold text-gray-300"
              >
                Skills (comma separated)
              </label>
              <input
                type="text"
                id="skills"
                value={skillsInput}
                placeholder="e.g. design, hair cutting"
                onChange={handleChange}
                className="w-full rounded border border-gray-600 bg-gray-800 px-4 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-center gap-6 mt-8">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded shadow-lg transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={closeAddAddressModal}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-8 py-3 rounded shadow-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
