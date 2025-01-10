import React, { useState } from "react";
import "../App.css";

const userData = {
  login: "GUDDU434",
  name: "UDDU ALI",
  avatar_url: "https://avatars.githubusercontent.com/u/99042645?v=4",
  bio: "I am a FULL STACK WEB DEVELOPER specializing in MERN STACK from Masai school Bengaluru, Karnataka",
  company: "Masai School",
  blog: "https://GUDDU434.github.io/",
  location: "Mumbai, Maharashtra",
  public_repos: 16,
  followers: 15,
  following: 13,
  html_url: "https://github.com/GUDDU434",
};

const repos = [
  {
    id: 1,
    name: "repo1",
    description: "This is a description.",
    stargazers_count: 10,
    html_url: "#",
  },
  {
    id: 2,
    name: "repo2",
    description: "This is another repo.",
    stargazers_count: 5,
    html_url: "#",
  },
];
const UserProfile = () => {
  const [selectedRepo, setSelectedRepo] = useState(null);

  return (
    <div className="github-page">
      <header className="navbar">
        <div className="container">
          <h1 className="navbar-title">GitHub User Finder</h1>
        </div>
      </header>

      <div className="container">
        <aside className="sidebar">
          <div className="profile-card">
            <img src={userData.avatar_url} alt="avatar" className="avatar" />
            <h2>{userData.name || userData.login}</h2>
            <p className="bio">{userData.bio}</p>
            <p className="info">
              <strong>Location:</strong> {userData.location || "Not Available"}
            </p>
            <p className="info">
              <strong>Company:</strong> {userData.company || "Not Available"}
            </p>
            <p className="info">
              <strong>Website:</strong>{" "}
              {userData.blog ? (
                <a
                  href={userData.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {userData.blog}
                </a>
              ) : (
                "Not Available"
              )}
            </p>
            <div className="stats">
              <div>
                <strong>Repositories</strong>
                <p>{userData.public_repos}</p>
              </div>
              <div>
                <strong>Followers</strong>
                <p>{userData.followers}</p>
              </div>
              <div>
                <strong>Following</strong>
                <p>{userData.following}</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="content">
          {!selectedRepo ? (
            <>
              <h2>Repositories</h2>
              <ul className="repo-list">
                {repos.map((repo) => (
                  <li
                    key={repo.id}
                    className="repo-item"
                    onClick={() => setSelectedRepo(repo)}
                  >
                    <div>
                      <h3>{repo.name}</h3>
                      <p>{repo.description || "No description available"}</p>
                    </div>
                    <div>
                      <span>★ {repo.stargazers_count}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="repo-detail">
              <button
                className="back-btn"
                onClick={() => setSelectedRepo(null)}
              >
                ← Back to Repositories
              </button>
              <h2>{selectedRepo.name}</h2>
              <p>{selectedRepo.description}</p>
              <a
                href={selectedRepo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
