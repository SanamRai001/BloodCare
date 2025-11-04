const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const getBloodRequests = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value);
      }
    });

    const response = await fetch(
      `${API_BASE_URL}/api/blood-requests?${queryParams}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch requests");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
