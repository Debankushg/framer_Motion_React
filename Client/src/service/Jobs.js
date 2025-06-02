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
  const response = await fetch(`${baseUrl}/job-posts/${id}`);
  const result = await response.json();
  return result;
};

export const applyJob = async (formData) => {
  const response = await fetch(`${baseUrl}/job-posts/apply`, {
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  return result;
};

export const appliedJobList = async (JobId, limit, offset) => {
  const response = await fetch(
    `${baseUrl}/job-posts/appliedJobs/${JobId}/?limit=${limit}&offset=${offset}`
  );
  const result = await response.json();
  return result;
};

export const appliedCandidateList = async () => {
  const response = await fetch(`${baseUrl}/appliedJobs`);
  const result = await response.json();
  return result;
};
