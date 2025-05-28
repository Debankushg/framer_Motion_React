import React, { useState, useEffect } from "react";
import {
  getProfile,
  updateProfile,
  uploadProfileImage,
} from "../../service/Profile";
import ProfileUpdate from "../../components/ProfileUpdate";
import { SquarePen } from "lucide-react";
import ProfileImageModal from "../../components/ProfileImageModal";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("profileDetails");
  const [isFormVisible, setFormVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState();
  const userId = JSON.parse(localStorage.getItem("user")).id;

  const fetchData = async () => {
    try {
      const response = await getProfile(userId);
      setData(response);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  useEffect(() => {
    if (!userId) return;

    fetchData();
  }, [userId]);

  const showSection = (section) => {
    setActiveSection(section);
  };

  const showAddAddressModal = () => setFormVisible(true);
  const closeAddAddressModal = () => setFormVisible(false);

  const saveAddress = async (updatedData) => {
    try {
      const savedData = await updateProfile(userId, updatedData);
      if (savedData) {
        fetchData();
      }
      // Close modal
      closeAddAddressModal();
    } catch (error) {
      console.error("Error updating profile:", error);
      // Optionally show user-friendly error message here
    }
  };

  const handleSaveImage = async (file) => {
    // You can upload this file via API here
    console.log("Saving image file:", file);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const savedImage = await uploadProfileImage(userId, formData);
      console.log("Image saved:", savedImage);

      if (savedImage) {
        fetchData();
      }
    } catch (error) {
      toast.error("Error updating profile:", error);
      // Optionally show user-friendly error message here
    }
  };

  return (
    <section className="my-10">
      <div className="container mx-auto bg-[#242424] p-6 rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/3">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-8 shadow-xl max-w-sm mx-auto">
              <div className="flex flex-col items-center text-center relative">
                <img
                  src={
                    data?.user?.image
                      ? data?.user?.image
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Admin"
                  className="rounded-full border-4 border-green-400 w-28 h-28  object-cover shadow-md"
                />
                <SquarePen
                  size={20}
                  className="absolute right-[30%] top-[40%] text-green-400 cursor-pointer"
                  onClick={() => setEditMode(true)}
                />

                <div className="mt-5">
                  <h4 className="text-xl font-extrabold text-white tracking-wide">
                    {data?.user?.fullname || "Anonymous"}
                  </h4>
                  <p className="text-green-400 mt-1 font-medium">
                    {data?.mobile || "No contact"}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {data?.country || "Unknown"}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  className={`py-3 px-5 rounded-lg text-left font-semibold text-sm transition-colors duration-300 ease-in-out
        ${
          activeSection === "profileDetails"
            ? "bg-green-600 text-white shadow-lg"
            : "bg-gray-800 text-gray-300 hover:bg-green-600 hover:text-white"
        }`}
                  onClick={() => showSection("profileDetails")}
                >
                  Profile Information
                </button>

                <button
                  className={`py-3 px-5 rounded-lg text-left font-semibold text-sm transition-colors duration-300 ease-in-out
        ${
          activeSection === "addressBook"
            ? "bg-green-600 text-white shadow-lg"
            : "bg-gray-800 text-gray-300 hover:bg-green-600 hover:text-white"
        }`}
                  onClick={() => showSection("addressBook")}
                >
                  Address Book
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            {activeSection === "profileDetails" && (
              <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-xl p-8 shadow-lg mx-auto">
                <h5 className="text-2xl font-extrabold mb-6 text-indigo-400 border-b-2 border-indigo-600 pb-2">
                  Profile Information
                </h5>
                <div className="space-y-4 text-gray-200">
                  <p>
                    <strong className="text-indigo-300 font-semibold">
                      Name:
                    </strong>{" "}
                    <span className="text-white font-medium">
                      {data?.user?.fullname || "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong className="text-indigo-300 font-semibold">
                      Email:
                    </strong>{" "}
                    <span className="text-white font-medium">
                      {data?.user?.email || "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong className="text-indigo-300 font-semibold">
                      Contact:
                    </strong>{" "}
                    <span className="text-white font-medium">
                      {data?.mobile || "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong className="text-indigo-300 font-semibold">
                      Date of Birth:
                    </strong>{" "}
                    <span className="text-white font-medium">
                      {data?.dob || "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong className="text-indigo-300 font-semibold">
                      Gender:
                    </strong>{" "}
                    <span className="text-white font-medium capitalize">
                      {data?.gender || "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong className="text-indigo-300 font-semibold">
                      City:
                    </strong>{" "}
                    <span className="text-white font-medium capitalize">
                      {data?.city || "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong className="text-indigo-300 font-semibold">
                      State:
                    </strong>{" "}
                    <span className="text-white font-medium capitalize">
                      {data?.state || "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong className="text-indigo-300 font-semibold">
                      Preference:
                    </strong>{" "}
                    <span className="text-white font-medium capitalize">
                      {data?.preference || "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong className="text-indigo-300 font-semibold">
                      Skills:
                    </strong>{" "}
                    <span className="text-white font-medium">
                      {data?.skills?.length ? data.skills.join(", ") : "N/A"}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {activeSection === "addressBook" && (
              <div className="bg-[#333333] rounded-lg p-6">
                <h5 className="text-xl font-bold mb-4">Address Book</h5>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                  onClick={showAddAddressModal}
                >
                  Add Address
                </button>
                <div id="addressList"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isFormVisible && (
        <ProfileUpdate
          data={data}
          closeAddAddressModal={closeAddAddressModal}
          saveAddress={saveAddress}
          setData={setData}
        />
      )}

      {editMode && (
        <ProfileImageModal
          isOpen={editMode}
          onClose={() => setEditMode(false)}
          onSave={handleSaveImage}
        />
      )}
    </section>
  );
};

export default Profile;
