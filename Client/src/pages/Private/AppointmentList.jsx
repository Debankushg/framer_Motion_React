import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getEmployeeList, deleteEmployee } from "../../service/appointment";
import Pagination from "../../components/Pagination";

const AppointmentList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [limit, setLimit] = useState(4);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);

  React.useEffect(() => {
    fetchData(limit, offset, search);
  }, [limit, offset]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchData(limit, offset, search);
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [search, limit, offset]);

  const handleEdit = (data) => {
    navigate(`/create-appointment`, { state: { data } });
  };

  const fetchData = async (limit, offset, search) => {
    try {
      const response = await getEmployeeList({ limit, offset, search });
      setEmployees(response?.data);
      setTotal(response?.totalCount);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // console.log(limit, offset, search, employees, total);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      toast.success("Employee deleted successfully");
      fetchData("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-[#242424] min-h-screen text-gray-300">
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-3xl font-semibold mb-6 text-white">
          Company Employees
        </h1>
        <div className="flex gap-2 items-center">
          <div className="flex items-center rounded">
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
              placeholder="Search employees"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className="bg-gray-800 hover:bg-gray-700 text-white cursor-pointer py-2 px-4 rounded"
            onClick={() => navigate("/create-appointment")}
          >
            Add Employee
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-md font-medium uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-md font-medium uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-md font-medium uppercase tracking-wider">
                Foundation Year
              </th>
              <th className="px-6 py-3 text-left text-md font-medium uppercase tracking-wider">
                Joining Date
              </th>
              <th className="px-6 py-3 text-left text-md font-medium uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-center text-md font-medium uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-center text-md font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#333333] divide-y divide-gray-700">
            {employees?.length > 0 ? (
              employees.map((data) => (
                <tr
                  key={data?._id}
                  className="hover:bg-gray-800 transition-colors duration-200 text-sm"
                >
                  <td className="px-6 py-4 whitespace-nowrap tracking-wider font-semibold">
                    {data?.companyName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data?.employeeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data?.foundationYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(data?.joiningDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data?.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex justify-center">
                    <img
                      src={data?.image}
                      alt={data?.employeeName}
                      className="h-12 w-12 rounded-full object-cover border border-gray-700"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center space-x-3">
                    <button
                      className="bg-amber-500 hover:bg-amber-600 px-3 py-1 rounded text-sm font-medium transition cursor-pointer text-[#242424]"
                      onClick={() => handleEdit(data)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-medium transition cursor-pointer"
                      onClick={() => handleDelete(data?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        limit={limit}
        offset={offset}
        total={total}
        onPageChange={setOffset}
        onLimitChange={setLimit}
      />
    </div>
  );
};

export default AppointmentList;
