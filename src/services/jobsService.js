const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

export const getJobs = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/jobs/get-list`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    throw error;
  }
};

export const applyToJob = async (applicationData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to submit application.");
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to apply:", error);
    throw error;
  }
};