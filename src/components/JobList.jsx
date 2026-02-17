import { useState, useEffect } from "react";
import JobItem from "./JobItem";
import { getJobs } from "../services/jobsService";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        setError("Unable to load positions. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobData();
  }, []);

  if (isLoading)
    return <div style={styles.centerText}>Loading positions...</div>;
  if (error)
    return <div style={{ ...styles.centerText, color: "red" }}>{error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Open Positions</h2>
      <div style={styles.list}>
        {jobs.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  centerText: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "1.2rem",
  },
};

export default JobList;
