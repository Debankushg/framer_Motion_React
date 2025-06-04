const baseUrl = "http://localhost:3000";

export const createMeeting = async (data) => {
  const response = await fetch(`${baseUrl}/calender`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

export const getMeetingDetails = async () => {
  const response = await fetch(`${baseUrl}/calender`);
  const result = await response.json();
  return result;
};

export const updateMeeting = async (id, data) => {
  const response = await fetch(`${baseUrl}/calender/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};
