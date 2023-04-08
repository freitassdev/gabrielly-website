import axios from "axios"

export const api = axios.create({
  baseURL: "https://gaby-server.onrender.com"
});

export async function getUser_UserGuilds() {
  const res = await api.get(`/api/get?key=${localStorage.getItem("key")}&id=${localStorage.getItem("id")}&infoTypes=userInfo,guilds`);
  return res;
}

export async function getUser() {
  console.log("a")
  const res = await api.get(`/api/get?key=${localStorage.getItem("key")}&id=${localStorage.getItem("id")}&infoTypes=userInfo`);
  return res;
}

export async function getUser_Guilds_GuildRoles(guildId) {
  const res = await await api.get(`/api/get?key=${localStorage.getItem("key")}&id=${localStorage.getItem("id")}&infoTypes=userInfo,guildRoles,guilds&guild=${guildId}`);
  console.log(res)
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