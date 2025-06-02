import React, { useState } from "react";
import { applyJob } from "../service/Jobs";
import { toast } from "react-hot-toast";

const ApplyJobModal = ({ isOpen, onClose, jobId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    file: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const appliedJobs = async (data) => {
    try {
      const response = await applyJob(data);
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!formData.file) newErrors.file = "File is required";
    else if (
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(formData.file.type)
    ) {
      newErrors.file = "Only PDF or DOC files are allowed";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("message", formData.message);
      data.append("file", formData.file);
      data.append("jobId", jobId);
      console.log("Submitted:", data);
      appliedJobs(data);
      onClose(); // Optionally close the modal
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#242424] rounded-2xl w-[800px] p-8 text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Apply for Job</h2>
          <button onClick={onClose} className="text-white text-xl">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#333333] text-white border border-gray-600 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#333333] text-white border border-gray-600 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 rounded bg-[#333333] text-white border border-gray-600 focus:outline-none"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm">
              Upload Resume (PDF/DOC)
            </label>
            <input
              type="file"
              name="file"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#333333] file:text-white hover:file:bg-[#444444]"
            />
            {errors.file && (
              <p className="text-red-500 text-sm mt-1">{errors.file}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-700 text-white font-semibold py-2 rounded cursor-pointer"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobModal;
