import React from "react";

const RepositoryListPage = ({
  userData,
  repositories,
  followers,
  onRepoClick,
  onViewFollowers,
  onBack,
}) => {
  return (
    <div className="repository-list-page">
      <button onClick={onBack}>← Back</button>
      <div className="user-info">
        <img src={userData.avatar_url} alt="User Avatar" />
        <h2>{userData.name || userData.login}</h2>
        <p>{userData.bio}</p>
        <button onClick={onViewFollowers}>
          View Followers ({followers.length})
        </button>
      </div>
      <h3>Repositories</h3>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id} onClick={() => onRepoClick(repo)}>
            <div>
              <h4>{repo.name}</h4>
              <p>{repo.description || "No description provided."}</p>
            </div>
            <span>★ {repo.stargazers_count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoryListPage;
