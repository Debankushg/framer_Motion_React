import React, { useState } from "react";
import { createJob } from "../../service/Jobs";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const JobPostForm = () => {
  const authorID = JSON.parse(localStorage.getItem("user")).id;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    jobTitle: "",
    position: "",
    department: "",
    vacancies: "",
    closingDate: "",
    skills: [],
    jobPostAuthor: "",
    jobDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createJobPost = async (form) => {
    try {
      const response = await createJob(form);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Job post created successfully!");
        navigate("/job-applications-list");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const addSkill = () => {
    if (
      form.skillInput.trim() &&
      !form.skills.includes(form.skillInput.trim())
    ) {
      setForm((prev) => ({
        ...prev,
        skills: [...prev.skills, form.skillInput.trim()],
        skillInput: "",
      }));
    }
  };

  const removeSkill = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      jobPostAuthor: authorID,
    };
    createJobPost(data);
    // Reset form
    setForm({
      jobTitle: "",
      position: "",
      department: "",
      vacancies: "",
      closingDate: "",
      skills: [],
      jobPostAuthor: "",
      jobDescription: "",
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "#24242424" }}
    >
      <form
        className="bg-[#333333] text-white rounded-lg shadow-lg p-8 max-w-4xl w-full space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Create Job Post
        </h2>

        {/* Grid container for inputs - 3 columns with gap */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Job Title */}
          <div className="flex flex-col">
            <label htmlFor="jobTitle" className="mb-1 font-medium">
              Job Title
            </label>
            <input
              id="jobTitle"
              name="jobTitle"
              type="text"
              value={form.jobTitle}
              onChange={handleChange}
              placeholder="Senior Software Engineer"
              className="rounded-md border border-gray-600 bg-[#242424] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Position */}
          <div className="flex flex-col">
            <label htmlFor="position" className="mb-1 font-medium">
              Position
            </label>
            <select
              id="position"
              name="position"
              value={form.position}
              onChange={handleChange}
              className="rounded-md border border-gray-600 bg-[#242424] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select position
              </option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label htmlFor="department" className="mb-1 font-medium">
              Department
            </label>
            <input
              id="department"
              name="department"
              type="text"
              value={form.department}
              onChange={handleChange}
              placeholder="Engineering"
              className="rounded-md border border-gray-600 bg-[#242424] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Vacancies */}
          <div className="flex flex-col">
            <label htmlFor="vacancies" className="mb-1 font-medium">
              Vacancies
            </label>
            <input
              id="vacancies"
              name="vacancies"
              type="number"
              min={1}
              value={form.vacancies}
              onChange={handleChange}
              placeholder="3"
              className="rounded-md border border-gray-600 bg-[#242424] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Closing Date */}
          <div className="flex flex-col">
            <label htmlFor="closingDate" className="mb-1 font-medium">
              Closing Date
            </label>
            <input
              id="closingDate"
              name="closingDate"
              type="date"
              value={form.closingDate}
              onChange={handleChange}
              className="rounded-md border border-gray-600 bg-[#242424] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        {/* Skills */}
        <div className="flex flex-col">
          <label htmlFor="skillInput" className="mb-1 font-medium">
            Skills
          </label>
          <div className="flex space-x-2">
            <input
              id="skillInput"
              name="skillInput"
              type="text"
              value={form.skillInput}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="Add skill and press Enter"
              className="flex-grow rounded-md border border-gray-600 bg-[#242424] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500  "
            />
            <button
              type="button"
              onClick={addSkill}
              className="bg-amber-500 hover:bg-amber-600 rounded-md px-4 py-2 font-semibold transition cursor-pointer"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {form.skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center space-x-1 bg-amber-600 text-white rounded-full px-3 py-1 text-sm"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  aria-label={`Remove skill ${skill}`}
                  className="hover:text-black cursor-pointer`"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Job Description - full width */}
        <div className="flex flex-col">
          <label htmlFor="jobDescription" className="mb-1 font-medium">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            rows={5}
            value={form.jobDescription}
            onChange={handleChange}
            placeholder="We are looking for a Senior Software Engineer with 5+ years experience in full-stack development..."
            className="w-full rounded-md border border-gray-600 bg-[#242424] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 py-3 rounded-md font-semibold transition cursor-pointer"
          //   onClick={handleSubmit}
        >
          Submit Job Post
        </button>
      </form>
    </div>
  );
};

export default JobPostForm;
