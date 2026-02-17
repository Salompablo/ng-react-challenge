import JobList from "./components/JobList";

function App() {
  return (
    <div className="App">
      <header style={styles.header}>
        <h1>Job Portal</h1>
        <p>Select a position and apply with your GitHub repository.</p>
      </header>

      <main>
        <JobList />
      </main>
    </div>
  );
}

const styles = {
  header: {
    backgroundColor: "#24292e",
    color: "white",
    padding: "20px",
    textAlign: "center",
    marginBottom: "30px",
  },
};

export default App;
