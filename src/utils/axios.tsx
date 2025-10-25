import OriginalAxios from "axios";

export const axios = OriginalAxios.create({
    baseURL: "https://kale.kapsul.org.tr/tms",

  withCredentials: true,
});
