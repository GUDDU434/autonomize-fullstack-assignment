import React, { useState } from "react";
import RepositoryListPage from "./components/RepositoryListPage";
import RepositoryDetails from "./components/RepositoryDetails";
import FollowersPage from "./components/FollowersPage";
import "./index.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [currentView, setCurrentView] = useState("home");
  const [selectedRepo, setSelectedRepo] = useState(null);

  const handleSearch = async (user_name) => {
    try {
      const userRes = await fetch(`https://api.github.com/users/${user_name}`);
      const repoRes = await fetch(
        `https://api.github.com/users/${user_name}/repos`
      );
      const followersRes = await fetch(
        `https://api.github.com/users/${user_name}/followers`
      );

      if (userRes.ok && repoRes.ok && followersRes.ok) {
        const userData = await userRes.json();
        const repositories = await repoRes.json();
        const followers = await followersRes.json();

        setUserData(userData);
        setRepositories(repositories);
        setFollowers(followers);
        setCurrentView("repoList");
      } else {
        alert("User not found!");
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching data!");
    }
  };

  const handleRepoClick = (repo) => {
    setSelectedRepo(repo);
    setCurrentView("repoDetails");
  };

  const handleFollowerClick = async (follower) => {
    setUsername(follower.login);
    await handleSearch(follower.login);
  };

  return (
    <div className="app">
      {currentView === "home" && (
        <div className="home">
          <h1>GitHub User Finder</h1>
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => handleSearch(username)}>Search</button>
        </div>
      )}

      {currentView === "repoList" && (
        <RepositoryListPage
          userData={userData}
          repositories={repositories}
          followers={followers}
          onRepoClick={handleRepoClick}
          onViewFollowers={() => setCurrentView("followers")}
          onBack={() => setCurrentView("home")}
        />
      )}

      {currentView === "repoDetails" && (
        <RepositoryDetails
          repo={selectedRepo}
          onBack={() => setCurrentView("repoList")}
        />
      )}

      {currentView === "followers" && (
        <FollowersPage
          followers={followers}
          onFollowerClick={handleFollowerClick}
          onBack={() => setCurrentView("repoList")}
        />
      )}
    </div>
  );
};

export default App;
