import OriginalAxios from "axios";

export const axios = OriginalAxios.create({
    baseURL: "http://localhost:3001",

  withCredentials: true,
});
