import OriginalAxios from "axios";

export const axios = OriginalAxios.create({
    baseURL: "https://localhost:3001",

  withCredentials: true,
});
