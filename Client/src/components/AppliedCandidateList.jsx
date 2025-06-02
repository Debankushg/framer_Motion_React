import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { appliedJobList } from "../service/Jobs";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const AppliedCandidateList = ({
  jobTitle,
  position,
  department,
  setShowModal,
}) => {
  const [limit, setLimit] = useState(4);
  const [offset, setOffset] = useState(0);
  const { id } = useParams();
  const [candidateList, setCandidateList] = useState([]);
  const [totalcount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchCandidateList = async () => {
      try {
        const response = await appliedJobList(id, limit, offset);

        setCandidateList(response?.applications);
        setTotalCount(response?.totalCount);
      } catch (err) {
        toast.error("Failed to load candidate list");
      }
    };
    if (id) fetchCandidateList();
  }, [id, limit, offset]);
  return (
    <div className="max-w-4xl mx-auto bg-[#333333] rounded-lg shadow-lg p-8 space-y-6">
      <header className="border-b border-amber-500 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">{jobTitle}</h1>
          <button
            className="text-amber-500 p-4 bg-[#242424] rounded-lg cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            Job Details
          </button>
        </div>
        <div>
          <p className="mt-1 text-lg">
            <span className="font-semibold">Position:</span> {position}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Department:</span> {department}
          </p>
        </div>
      </header>

      <div className="min-h-screen p-6 bg-[#333333cc] text-white font-sans">
        <h1 className="text-3xl font-bold text-amber-500 mb-6">
          Candidates List
        </h1>

        <div className="overflow-x-auto rounded-lg shadow-lg bg-[#242424cc]">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr className="text-left">
                <th className="px-6 py-3 text-amber-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-amber-500 uppercase tracking-wider">
                  Email
                </th>

                <th className="px-6 py-3 text-amber-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-amber-500 uppercase tracking-wider">
                  Resume
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {candidateList?.length > 0 ? (
                candidateList.map((candidate) => (
                  <tr
                    key={candidate._id}
                    className="hover:bg-[#444444aa] transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-normal">
                      {candidate.name}
                    </td>
                    <td className="px-6 py-4 whitespace-normal">
                      {candidate.email}
                    </td>

                    <td className="px-6 py-4 whitespace-normal">
                      {new Date(candidate.appliedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-normal">
                      <a
                        href={candidate.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:underline"
                        download
                      >
                        View Resume
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="hover:bg-[#444444aa] transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-normal">
                    No Candidate Applied
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          limit={limit}
          offset={offset}
          total={totalcount}
          onPageChange={setOffset}
          onLimitChange={setLimit}
        />
      </div>
    </div>
  );
};

export default AppliedCandidateList;
