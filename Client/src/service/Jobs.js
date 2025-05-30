const baseUrl = "http://localhost:3000";

export const createJob = async (data) => {
  const response = await fetch(`${baseUrl}/job-posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

export const getJobs = async ({ limit, offset, search, filter, sortOrder }) => {
  const params = new URLSearchParams();

  if (limit !== undefined) params.append("limit", limit);
  if (offset !== undefined) params.append("offset", offset);
  if (search) params.append("search", search);
  if (filter) params.append("position", filter);
  if (sortOrder) params.append("sortOrder", sortOrder);

  const url = `${baseUrl}/job-posts${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const response = await fetch(url);
  return response.json();
};

export const getJobDetails = async (id) => {
  console.log(id);

  const response = await fetch(`${baseUrl}/job-posts/${id}`);
  const result = await response.json();
  return result;
};
