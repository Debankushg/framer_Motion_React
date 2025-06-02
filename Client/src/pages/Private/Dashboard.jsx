import React, { useEffect, useState } from "react";
import { Users, Clock, ClipboardList } from "lucide-react";
import JobRow from "../../components/JobRow";
import OpportunityCard from "../../components/OpportunityCard";
import StatCard from "../../components/StatCard";
import { getEmployeeList } from "../../service/appointment";
import { useNavigate } from "react-router-dom";
import { appliedCandidateList } from "../../service/Jobs";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [appliedCandidate, setAppliedCandidate] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getEmployeeList("");
      setUsers(users?.data);
    };
    fetchUsers();
    const appliedJobList = async () => {
      const applications = await appliedCandidateList();
      setAppliedCandidate(applications);
    };

    appliedJobList();
  }, []);

  return (
    <div className="min-h-screen bg-[#242424] text-amber-50 px-4 py-8 ">
      {/* Stats Sectionss */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <StatCard
          icon={<ClipboardList size={24} className="text-amber-400" />}
          title="Total Opportunity"
          count="32"
          className="bg-[#333333]"
        />
        <StatCard
          icon={<ClipboardList size={24} className="text-amber-400" />}
          title="Hire Talent"
          count="12"
          className="bg-[#333333]"
        />
        <StatCard
          icon={<Clock size={24} className="text-amber-400" />}
          title="In-progress Talent"
          count="05"
          className="bg-[#333333]"
        />
        <StatCard
          icon={<Users size={24} className="text-amber-400" />}
          title="Total Vacancies"
          count="02"
          className="bg-[#333333]"
        />
      </div>

      {/* Recent Applied Jobs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8 mb-10">
        <section className="bg-[#333333] rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-amber-400">
              Recent Applied Jobs
            </h2>
            <button className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold">
              View All
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <table className="w-full table-auto text-amber-50">
            <thead>
              <tr className="border-b border-amber-700">
                <th className="pb-3 pr-6 text-left">Job Title</th>
                <th className="pb-3 px-6 text-left">Candidate Name</th>
                <th className="pb-3 px-6 text-left">Department</th>
                <th className="pb-3 px-6 text-left">Positions</th>
                <th className="pb-3 px-6 text-left">email</th>
                <th className="pb-3 pl-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appliedCandidate?.length > 0 &&
                appliedCandidate?.map((item) => (
                  <JobRow
                    title={item?.jobTitle}
                    department={item?.department}
                    email={item?.email}
                    positions={item?.position}
                    candidateName={item?.name}
                    file={item?.file}
                  />
                ))}
              {/* <JobRow
                title="Full Stack Software Developer"
                id="55245872"
                department="Development"
                appliedOn="10-02-25"
                expiresOn="25-03-25"
                status="In Progress"
              />
              <JobRow
                title="Full Stack Software Developer"
                id="55245872"
                department="Development"
                appliedOn="08-02-25"
                expiresOn="08-03-25"
                status="In Progress"
              />
              <JobRow
                title="Full Stack Software Developer"
                id="55245872"
                department="Development"
                appliedOn="05-02-25"
                expiresOn="20-03-25"
                status="In Progress"
              /> */}
            </tbody>
          </table>
        </section>

        <section className="bg-[#333333] rounded-lg p-6 shadow-lg flex flex-col justify-center items-center text-amber-400 font-semibold text-lg">
          <h2>Overall Hire Rate</h2>
          <p className="mt-4 text-amber-300 text-4xl font-bold">78%</p>
          <p className="mt-2 text-sm">Great progress this quarter!</p>
        </section>
      </div>

      {/* Opportunities Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Urgent Job Opportunities */}
        <section className="bg-[#333333] rounded-lg shadow-lg">
          <div className="flex justify-between items-center border-b border-amber-700 p-4">
            <h2 className="text-xl font-semibold text-amber-400">
              Urgent Job Opportunities
            </h2>
            <button className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold">
              View All
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="space-y-4 p-4">
            <OpportunityCard
              title="Full Stack Software Developer (PHP & Python)"
              company="Webflow"
              years="3-6 years"
              salary="3000-5000"
              location="New York"
            />
            <OpportunityCard
              title="Full Stack Software Developer (PHP & Python)"
              company="Webflow"
              years="3-6 years"
              salary="3000-5000"
              location="New York"
            />
          </div>
        </section>

        {/* Recent Applications */}
        <section className="bg-[#333333] rounded-lg shadow-lg">
          <div className="flex justify-between items-center border-b border-amber-700 p-4">
            <h2 className="text-xl font-semibold text-amber-400">
              Recent Applications
            </h2>
            <button
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-semibold"
              onClick={() => navigate("/appointments")}
            >
              View All
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="space-y-4 p-4 overflow-auto max-h-[350px]">
            <table className="w-full table-auto text-amber-50">
              <thead>
                <tr className="border-b border-amber-700">
                  <th className="pb-3 pr-6 text-left">Name</th>
                  <th className="pb-3 px-6 text-left">Company Name</th>
                  <th className="pb-3 px-6 text-left">Foundation Year</th>
                  <th className="pb-3 px-6 text-left">Department</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <JobRow
                    img={user.image}
                    title={user.employeeName}
                    companyName={user.companyName}
                    foundedOn={user.foundationYear}
                    department={user.department}
                  />
                ))}
                {/* <JobRow
                  img="/beans.png"
                  title="Brandy"
                  id="55245872"
                  department="Development"
                />
                <JobRow
                  img="/cofeeMug.png"
                  title="Brandy"
                  id="55245872"
                  department="Development"
                /> */}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
