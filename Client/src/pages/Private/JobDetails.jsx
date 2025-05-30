import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobDetails } from "../../service/Jobs";

const JobDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getJobDetails(id);
        setData(response);
      } catch (err) {
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  if (!data) return <p>Loading job details...</p>;

  const {
    jobTitle,
    position,
    department,
    vacancies,
    closingDate,
    skills,
    jobDescription,
    jobPostAuthor,
    createdAt,
  } = data;
  const formattedClosingDate = new Date(closingDate).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const formattedCreatedAt = new Date(createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <div className="min-h-screen p-6 bg-[#242424] text-amber-500 font-sans">
      <div className="max-w-4xl mx-auto bg-[#333333] rounded-lg shadow-lg p-8 space-y-6">
        {/* Header */}
        <header className="border-b border-amber-500 pb-4">
          <h1 className="text-4xl font-bold">{jobTitle}</h1>
          <p className="mt-1 text-lg">
            <span className="font-semibold">Position:</span> {position}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Department:</span> {department}
          </p>
        </header>

        {/* Job Info */}
        <section className="grid grid-cols-2 gap-6">
          <div className="bg-[#242424] p-4 rounded-md border border-amber-500">
            <h2 className="text-xl font-semibold mb-2">Vacancies</h2>
            <p className="text-2xl">{vacancies}</p>
          </div>

          <div className="bg-[#242424] p-4 rounded-md border border-amber-500">
            <h2 className="text-xl font-semibold mb-2">Closing Date</h2>
            <p className="text-2xl">{formattedClosingDate}</p>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-semibold mb-3 border-b border-amber-500 pb-2">
            Required Skills
          </h2>
          <ul className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <li
                key={skill}
                className="bg-[#242424] px-4 py-2 rounded-full border border-amber-500 text-lg font-medium"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>

        {/* Description */}
        <section>
          <h2 className="text-2xl font-semibold mb-3 border-b border-amber-500 pb-2">
            Job Description
          </h2>
          <p className="whitespace-pre-line leading-relaxed">
            {jobDescription}
          </p>
        </section>

        {/* Author and dates */}
        <footer className="border-t border-amber-500 pt-4 text-sm flex flex-col md:flex-row md:justify-between">
          <div>
            <p>
              <span className="font-semibold">Posted by:</span>{" "}
              {jobPostAuthor.fullname} (
              <a
                href={`mailto:${jobPostAuthor.email}`}
                className="underline text-amber-400 hover:text-amber-300"
              >
                {jobPostAuthor.email}
              </a>
              )
            </p>
          </div>
          <div className="mt-2 md:mt-0">
            <p>
              <span className="font-semibold">Posted on:</span>{" "}
              {formattedCreatedAt}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default JobDetails;
