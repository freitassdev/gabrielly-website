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
  console.log(res)
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

export default api;