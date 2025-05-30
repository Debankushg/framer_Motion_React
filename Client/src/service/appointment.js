const baseUrl = "http://localhost:3000";

export const updateEmployee = async (id, formData) => {
  const response = await fetch(`${baseUrl}/user-info/${id}`, {
    method: "PUT",
    body: formData,
  });
  const result = await response.json();
  return result;
};
export const createEmployee = async (formData) => {
  const response = await fetch(`${baseUrl}/user-info`, {
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  return result;
};

export const getEmployeeList = async ({ limit, offset, search }) => {
  console.log(limit, offset, search, "uyzgsxcuysgcyugsv");

  const params = new URLSearchParams();

  if (limit !== undefined) params.append("limit", limit);
  if (offset !== undefined) params.append("offset", offset);

  // Make sure search is a string and not a function
  if (typeof search === "string" && search.trim() !== "") {
    params.append("search", search);
  }

  const queryString = params.toString();
  const response = await fetch(
    `${baseUrl}/user-info${queryString ? `?${queryString}` : ""}`
  );
  const result = await response.json();
  return result;
};

export const deleteEmployee = async (id) => {
  const response = await fetch(`${baseUrl}/user-info/${id}`, {
    method: "DELETE",
  });
  const result = await response.json();
  return result;
};
