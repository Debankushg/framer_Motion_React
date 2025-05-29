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

export const getEmployeeList = async (search) => {
  const response = await fetch(
    `${baseUrl}/user-info${search && `?search=${search}`}`
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
