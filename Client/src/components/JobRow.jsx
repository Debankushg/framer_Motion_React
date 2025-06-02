import React from "react";
import { Link } from "react-router-dom";

const JobRow = ({
  title,
  companyName,
  department,
  foundedOn,
  candidateName,
  file,
  email,
  positions,
  img,
}) => {
  return (
    <tr className="border-b border-gray-100">
      <td className="py-4 pr-4 gap-4 items-center flex">
        {img && (
          <img
            className="w-[38px] h-[38px] rounded-full"
            src={img}
            alt="User"
          />
        )}{" "}
        {title}
      </td>
      {companyName && (
        <td className="py-4 px-4 text-gray-100">{companyName}</td>
      )}
      {foundedOn && <td className="py-4 px-4 text-gray-100">{foundedOn}</td>}
      {candidateName && (
        <td className="py-4 px-4 text-gray-100">{candidateName}</td>
      )}
      {department && <td className="py-4 px-4 text-gray-100">{department}</td>}
      {positions && <td className="py-4 px-4 text-gray-100">{positions}</td>}
      {email && <td className="py-4 px-4 text-gray-100">{email}</td>}
      {file && (
        <td className="py-4 pl-4">
          <Link
            to={file}
            className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full"
          >
            Download
          </Link>
        </td>
      )}
    </tr>
  );
};

export default JobRow;
