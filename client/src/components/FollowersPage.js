import React from "react";

const FollowersPage = ({ followers, onFollowerClick, onBack }) => {
  return (
    <div className="followers-page">
      <button onClick={onBack}>← Back to Repositories</button>
      <h3>Followers</h3>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id} onClick={() => onFollowerClick(follower)}>
            <img src={follower.avatar_url} alt="Follower Avatar" />
            <h4>{follower.login}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersPage;
