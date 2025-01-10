const routes = require("express").Router();
const {
  GetUserByUsername,
  FindMutualFriends,
  GetUsersSortBy,
  UpdateUserFields,
  SoftDeleteUser,
  SearchUser,
} = require("../controllers/github_user.controller");

routes.post("/", GetUserByUsername);
routes.post("/:username/friends", FindMutualFriends);
routes.get("/search", SearchUser);
routes.delete("/:username", SoftDeleteUser);
routes.put("/:username", UpdateUserFields);
routes.get("/", GetUsersSortBy);

module.exports = routes;
