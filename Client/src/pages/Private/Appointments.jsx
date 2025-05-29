import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { createEmployee, updateEmployee } from "../../service/appointment";
import { useNavigate, useLocation } from "react-router-dom";

const Appointments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({});

  const [imagePreview, setImagePreview] = useState(""); // For image preview URL
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Example API data loading
    const apiData = {
      id: location.state?.data?._id,
      companyName: location.state?.data?.companyName,
      foundationYear: location.state?.data?.foundationYear,
      employeeName: location.state?.data?.employeeName,
      joiningDate: location.state?.data?.joiningDate,
      department: location.state?.data?.department,
      image: location.state?.data?.image, // URL from API
    };
    setFormData(apiData);
    setImagePreview(apiData.image); // set preview to the URL string
  }, [location.state?.data]);

  // Simple validation
  const validate = () => {
    const errs = {};
    if (!formData.companyName) errs.companyName = "Company Name is required";
    if (!formData.foundationYear)
      errs.foundationYear = "Foundation Year is required";
    else if (!/^\d{4}$/.test(formData.foundationYear))
      errs.foundationYear = "Enter a valid year";
    if (!formData.employeeName) errs.employeeName = "Employee Name is required";
    if (!formData.joiningDate) errs.joiningDate = "Joining Date is required";
    if (!formData.department) errs.department = "Department is required";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create image preview URL for uploaded file
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const createEmployeeApi = async (formData) => {
    // If you need to send multipart/form-data (because of image file), use FormData:
    const data = new FormData();

    // Append all fields
    data.append("companyName", formData.companyName);
    data.append("foundationYear", formData.foundationYear);
    data.append("employeeName", formData.employeeName);
    data.append("joiningDate", formData.joiningDate);
    data.append("department", formData.department);

    // For image, check if it's a File object or a string (URL)
    if (formData.image && formData.image instanceof File) {
      data.append("employeeImage", formData.image);
    }

    try {
      await createEmployee(data);
      toast.success("Form submitted successfully!");
      navigate("/appointments");
    } catch (error) {
      throw error;
    }
  };

  const updateEmployeeApi = async (formData) => {
    const data = new FormData();

    // Append all fields
    data.append("companyName", formData.companyName);
    data.append("foundationYear", formData.foundationYear);
    data.append("employeeName", formData.employeeName);
    data.append("joiningDate", formData.joiningDate);
    data.append("department", formData.department);

    // For image, check if it's a File object or a string (URL)
    if (formData.image && formData.image instanceof File) {
      data.append("employeeImage", formData.image);
    }

    try {
      await updateEmployee(formData?.id, data);
      toast.success("Form updated successfully!");
      navigate("/appointments");
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length === 0) {
      if (formData.id) {
        updateEmployeeApi(formData);
      } else {
        createEmployeeApi(formData);
      }
      setImagePreview("");
      setFormData({});
    } else {
      setErrors(errs);
    }
  };

  // api.js or inside your component file

  return (
    <div className=" bg-[#242424] flex items-center justify-between p-6">
      {/* <div> */}
      <img
        src={"/coffeeCoder.png"}
        alt="Preview"
        className="w-[40%] rounded-full"
      />
      {/* </div> */}
      <div className="w-2/3">
        <h2 className="text-3xl text-amber-500 font-semibold mb-6 text-center">
          Employee Form
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-[#333333] text-white rounded-lg shadow-lg p-8 grid grid-cols-2 gap-4 w-full"
        >
          {/* Company Name */}
          <div className="mb-4">
            <label htmlFor="companyName" className="block mb-2 font-medium">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={`w-full p-2 rounded bg-[#242424] border ${
                errors.companyName ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter company name"
            />
            {errors.companyName && (
              <p className="text-red-500 mt-1 text-sm">{errors.companyName}</p>
            )}
          </div>

          {/* Foundation Year */}
          <div className="mb-4">
            <label htmlFor="foundationYear" className="block mb-2 font-medium">
              Foundation Year <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="foundationYear"
              name="foundationYear"
              value={formData.foundationYear}
              onChange={handleChange}
              min="1800"
              max={new Date().getFullYear()}
              className={`w-full p-2 rounded bg-[#242424] border ${
                errors.foundationYear ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g. 1999"
            />
            {errors.foundationYear && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.foundationYear}
              </p>
            )}
          </div>

          {/* Employee Name */}
          <div className="mb-4">
            <label htmlFor="employeeName" className="block mb-2 font-medium">
              Employee Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="employeeName"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              className={`w-full p-2 rounded bg-[#242424] border ${
                errors.employeeName ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter employee name"
            />
            {errors.employeeName && (
              <p className="text-red-500 mt-1 text-sm">{errors.employeeName}</p>
            )}
          </div>

          {/* Joining Date */}
          <div className="mb-4">
            <label htmlFor="joiningDate" className="block mb-2 font-medium">
              Joining Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="joiningDate"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              className={`w-full p-2 rounded bg-[#242424] border ${
                errors.joiningDate ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.joiningDate && (
              <p className="text-red-500 mt-1 text-sm">{errors.joiningDate}</p>
            )}
          </div>

          {/* Department */}
          <div className="mb-4">
            <label htmlFor="department" className="block mb-2 font-medium">
              Department <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`w-full p-2 rounded bg-[#242424] border ${
                errors.department ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter department"
            />
            {errors.department && (
              <p className="text-red-500 mt-1 text-sm">{errors.department}</p>
            )}
          </div>

          {/* Image URL */}
          <div className="mb-6 col-span-2">
            <label htmlFor="image" className="block mb-2 font-medium">
              Employee Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#242424] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Show preview if imagePreview exists */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Employee Preview"
                className="mt-4 max-w-xs rounded shadow-md"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-700  text-white font-semibold py-3 rounded transition-colors  translate-x-[50%] cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Appointments;
