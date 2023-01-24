import axios from "axios"

export const api = axios.create({
  baseURL: "https://api.gabrielly.website"
});

export async function getUserGuilds() {
  const res = await api.get(`/getguilds?key=${localStorage.getItem("key")}&id=${localStorage.getItem("id")}`);
  return res;
}

export async function getUser() {
  const res = await api.get(`/getuser?key=${localStorage.getItem("key")}&id=${localStorage.getItem("id")}`);
  return res;
}

export async function getGuildRoles(guildId) {
  const res = await api.get(`/getroles?key=${localStorage.getItem("key")}&id=${localStorage.getItem("id")}&guild=${guildId}`);
  return res;
}

export async function getAutoroleRoles(guildId) {
  const res = await api.get(`/getrolesdb?key=${localStorage.getItem("key")}&id=${localStorage.getItem("id")}&guild=${guildId}`);
  return res;
}

export async function getAllDatabase(guildId) {
  const res = await api.get(`/getdb?key=${localStorage.getItem("key")}&id=${localStorage.getItem("id")}&guild=${guildId}`);
  return res;
}

export async function getUserDb(userId) {
  const res = await api.get(`/getuserdb?key=${localStorage.getItem("key")}&id=${localStorage.getItem("id")}&uId=${userId}`);
  return res;
}

export default api;