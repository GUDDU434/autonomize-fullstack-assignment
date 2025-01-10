import React from "react";

const RepositoryDetails = ({ repo, onBack }) => {
  return (
    <div className="repository-details">
      <button onClick={onBack}>← Back to Repositories</button>
      <h2>{repo.name}</h2>
      <p>{repo.description || "No description available."}</p>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
    </div>
  );
};

export default RepositoryDetails;
