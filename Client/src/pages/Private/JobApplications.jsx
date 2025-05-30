import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../../service/Jobs";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination";

const JobApplications = ({ onApply }) => {
  const [jobListings, setJobListings] = useState([]);
  const [limit, setLimit] = useState(4);
  const [offset, setOffset] = useState(0);
  const [sortOrder, setSortOrder] = useState(""); // e.g., 'asc' or 'desc'
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(""); // e.g., job type filter like "fulltime"

  const navigate = useNavigate();

  // Debounced fetch whenever search/filter/sortOrder/limit/offset changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchJobListings();
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [search, filter, sortOrder, limit, offset]);

  const fetchJobListings = async () => {
    try {
      const response = await getJobs({
        search,
        filter,
        sortOrder,
        limit,
        offset,
      });
      setJobListings(response || []);
    } catch (error) {
      toast.error(error.message || "Failed to fetch jobs");
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchJobListings();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-[#333333] rounded-lg shadow-md text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Job Listings</h1>

        <div className="flex items-center rounded gap-4">
          <div className="flex flex-col ">
            <label
              htmlFor="searchInput"
              className="text-white px-3 cursor-pointer select-none"
            >
              Search
            </label>
            <input
              type="text"
              id="searchInput"
              value={search}
              className="bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-r px-3 py-2 w-48"
              placeholder="Search jobs"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="searchInput"
              className="text-white px-3 cursor-pointer select-none"
            >
              Filter by
            </label>
            <select
              className="bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-r px-3 py-2 w-48"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
            </select>
          </div>

          <button
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2 rounded-md transition cursor-pointer ml-2"
            onClick={() => navigate("/create-job-post")}
          >
            Create Job
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-left">
              <th className="px-4 py-3 border border-gray-700">Job Title</th>
              <th className="px-4 py-3 border border-gray-700">Position</th>
              <th className="px-4 py-3 border border-gray-700">Vacancies</th>
              <th className="px-4 py-3 border border-gray-700">Closing Date</th>
              <th className="px-4 py-3 border border-gray-700">Department</th>
              <th className="px-4 py-3 border border-gray-700 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {jobListings?.posts?.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  No job postings available.
                </td>
              </tr>
            ) : (
              jobListings?.posts?.map((job) => (
                <tr
                  key={job._id || job.id} // depending on your data
                  className="hover:bg-[#444444] border border-gray-700"
                >
                  <td
                    className="px-4 py-3 border border-gray-700 font-bold cursor-pointer"
                    onClick={() =>
                      navigate(`/job-details/${job._id || job.id}`)
                    }
                  >
                    {job.jobTitle}
                  </td>
                  <td className="px-4 py-3 border border-gray-700">
                    {job.position}
                  </td>
                  <td className="px-4 py-3 border border-gray-700">
                    {job.vacancies}
                  </td>
                  <td className="px-4 py-3 border border-gray-700">
                    {job.closingDate
                      ? new Date(job.closingDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 border border-gray-700">
                    {job.department}
                  </td>
                  <td className="px-4 py-3 border border-gray-700 text-center">
                    <button
                      onClick={() => onApply(job._id || job.id)}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1 rounded-md transition"
                    >
                      Apply
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        limit={limit}
        offset={offset}
        total={jobListings?.totalCount}
        onPageChange={setOffset}
        onLimitChange={setLimit}
      />
    </div>
  );
};

export default JobApplications;
