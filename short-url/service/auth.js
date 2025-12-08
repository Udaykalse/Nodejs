const sessionIdToUserMap = new Map();

function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}

function getUser(user) {
  sessionIdToUserMap.get(user);
}

module.exports = {
  setUser,
  getUser,
};
