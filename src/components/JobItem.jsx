import { useState } from "react";
import { applyToJob } from "../services/jobsService";
import styles from "./JobItem.module.css";

const CANDIDATE_PROFILE = {
  uuid: "047e9d14-907b-4373-9bb6-bfe6a900d8f8",
  candidateId: "74077925005",
  firstName: "Pablo",
  lastName: "Salom Pita",
};

const JobItem = ({ job }) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!repoUrl.trim()) return;

    setStatus("submitting");
    setErrorMessage("");

    const payload = {
      uuid: CANDIDATE_PROFILE.uuid,
      jobId: job.id,
      candidateId: CANDIDATE_PROFILE.candidateId,
      repoUrl: repoUrl,
    };

    try {
      await applyToJob(payload);
      setStatus("success");
      setRepoUrl("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred.");
    }
  };

  if (status === "success") {
    return (
      <div className={`${styles.card} ${styles.successCard}`}>
        <div className={styles.successMessage}>
          <h3>Application Sent!</h3>
          <p>Good luck, {CANDIDATE_PROFILE.firstName}.</p>
          <button
            onClick={() => setStatus("idle")}
            className={styles.resetButton}
          >
            Submit another application (Debug)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{job.title}</h3>
        <span className={styles.jobId}>ID: {job.id}</span>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor={`repo-${job.id}`} className={styles.label}>
            GitHub Repository URL:
          </label>
          <input
            id={`repo-${job.id}`}
            type="url"
            placeholder="https://github.com/your-username/your-repo"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            disabled={status === "submitting"}
            required
            className={styles.input}
          />
        </div>

        {status === "error" && (
          <p className={styles.errorText}>{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className={styles.button}
        >
          {status === "submitting" ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default JobItem;
