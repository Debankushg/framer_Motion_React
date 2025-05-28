const baseUrl = "http://localhost:3000";

export const getProfile = async (id) => {
  const response = await fetch(`${baseUrl}/profile/${id}`);
  const result = await response.json();
  return result;
};

export const updateProfile = async (id, data) => {
  const response = await fetch(`${baseUrl}/profile/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

export const uploadProfileImage = async (id, formData) => {
  const response = await fetch(`${baseUrl}/upload-image/${id}`, {
    method: "PUT",
    body: formData,
  });
  const result = await response.json();
  return result;
};
