import React, { useState } from "react";

const ProfileImageModal = ({ isOpen, onClose, onSave, imageUrl }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create preview URL
    }
  };

  // Handle save button click
  const handleSave = () => {
    if (selectedFile) {
      onSave(selectedFile);
      onClose(); // Close modal after save
    } else {
      alert("Please select an image before saving.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
        {/* Modal */}
        <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full text-white">
          <h2 className="text-xl font-semibold mb-4">Update Profile Image</h2>

          {/* Image preview */}
          <div className="mb-4">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center mx-auto text-gray-400 text-center">
                No image selected
              </div>
            )}
          </div>

          {/* File input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block mx-auto mb-6 cursor-pointer justify-center bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileImageModal;
