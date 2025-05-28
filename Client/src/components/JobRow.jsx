import React from "react";

const JobRow = ({
  title,
  id,
  department,
  appliedOn,
  expiresOn,
  status,
  img,
}) => {
  return (
    <tr className="border-b border-gray-100">
      <td className="py-4 pr-4 gap-2 items-center flex">
        {img && (
          <img
            className="w-[38px] h-[38px] rounded-full"
            src={img}
            alt="User"
          />
        )}{" "}
        {title}
      </td>
      <td className="py-4 px-4 text-gray-100">{id}</td>
      <td className="py-4 px-4 text-gray-100">{department}</td>
      <td className="py-4 px-4 text-gray-100">{appliedOn}</td>
      <td className="py-4 px-4 text-gray-100">{expiresOn}</td>
      {status && (
        <td className="py-4 pl-4">
          <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full">
            {status}
          </span>
        </td>
      )}
    </tr>
  );
};

export default JobRow;
