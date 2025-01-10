const User = require("../modal/github_user.modal");
const axios = require("axios");
require("dotenv").config();

// Helper function to fetch GitHub data
async function fetchGitHubUser(username) {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    return response.data;
  } catch (error) {
    throw new Error("GitHub API call failed");
  }
}

exports.GetUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(200).json({
        message: "User already exists in the database",
        user: existingUser,
      });
    }

    const { user } = await fetchGitHubUser(username);

    const newUser = new User({
      login: user.login,
      avatar_url: user.avatar_url,
      username: user.login,
      name: user.name,
      location: user.location,
      blog: user.blog,
      bio: user.bio,
      public_repos: user.public_repos,
      public_gists: user.public_gists,
      followers: user.followers,
      following: user.following,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });

    await newUser.save();
    res.status(201).json({ message: "User saved successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.GetReposAndFollowers = async (req, res) => {
  const { username } = req.params;

  try {
    const repoRes = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    const followersRes = await axios.get(
      `https://api.github.com/users/${username}/followers`
    );

    res.status(200).json({
      message: "Repos and followers fetched successfully",
      repoRes: repoRes.data,
      followersRes: followersRes.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// 2. Find and save mutual friends
exports.FindMutualFriends = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const followers = await axios.get(
      `https://api.github.com/users/${username}/followers`
    );
    const following = await axios.get(
      `https://api.github.com/users/${username}/following`
    );

    const followersSet = new Set(followers.data.map((f) => f.login));
    const mutualFriends = following.data
      .filter((f) => followersSet.has(f.login))
      .map((f) => f.login);

    user.friends = mutualFriends;
    await user.save();

    res
      .status(200)
      .json({ message: "Mutual friends saved", friends: mutualFriends });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Search users
exports.SearchUser = async (req, res) => {
  const { username, location } = req.query;

  try {
    const query = { is_deleted: false };
    if (username) query.username = username;
    if (location) query.location = location;

    const users = await User.find(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Soft delete a user
exports.SoftDeleteUser = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { username },
      { is_deleted: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User soft deleted successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Update user fields
exports.UpdateUserFields = async (req, res) => {
  const { username } = req.params;
  const updates = req.body;

  try {
    const user = await User.findOneAndUpdate({ username }, updates, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. List users sorted by fields
exports.GetUsersSortBy = async (req, res) => {
  const { sortBy } = req.query;

  try {
    const users = await User.find({ is_deleted: false }).sort({ [sortBy]: 1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
