import { tempResponseDataType } from "../models/default.req.res";
import { translations } from "../translations/error";
import { axios } from "../utils/axios";

export const UsePost = async <T, B = any>(url: string, body: B) => {
  let response: {
    [x: string]: any;
    error: boolean;
    data: T | undefined;
  } = {
    error: false,
    data: undefined,
  };

  try {
      const res: tempResponseDataType<T> | null = await axios.post(
      `${url}`,
      body
    );    response.data = res?.data.result.data || res?.data?.result?.data;
  } catch (error: any) {
    response.error = true;
    const errorMessage =
      error.response?.data?.result?.message ||
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      "Bilinmeyen bir hata oluştu";

    const duplicateValuesRegex = /Duplicate values found: (.+?)\.\s?$/;
    const match = errorMessage.match(duplicateValuesRegex);

    if (match) {
      const details = match[1];

      const detailsArray = details
        .split(". ")
        .map((item: string) => item.trim());

      const formattedDetails = detailsArray
        .map((detail: string) => {
          const [type, value] = detail
            .split(": ")
            .map((part: string) => part.trim());
          switch (type) {
            case "Emails":
              return `E-posta adresi (${value}) zaten mevcut!`;
            case "Phones":
              return `Telefon numarası (${value}) zaten mevcut!`;
            case "IdentityNumbers":
              return `Kimlik numarası (${value}) zaten mevcut!`;
            default:
              return `${type} (${value}) zaten mevcut!`;
          }
        })
        .join(" ");

      response.errorMessage = `${formattedDetails}`;
    } else {
      // Check for team-specific errors
      const teamExistRegex = /(A team with the same .* already exists\.)/;
      const teamMatch = errorMessage.match(teamExistRegex);

      if (teamMatch) {
        const teamErrorMessage = teamMatch[0];

        if (
          teamErrorMessage.includes("teamName") &&
          teamErrorMessage.includes("teamLogo")
        ) {
          response.errorMessage =
            "Bu isim ve logo ile kayıtlı bir takım zaten mevcut!";
        } else if (teamErrorMessage.includes("teamName")) {
          response.errorMessage = "Bu isimle kayıtlı bir takım zaten mevcut!";
        } else if (teamErrorMessage.includes("teamLogo")) {
          response.errorMessage = "Bu logo ile kayıtlı bir takım zaten mevcut!";
        } else {
          response.errorMessage = teamErrorMessage;
        }
      } else {
        const personExistRegex = [
          {
            regex:
              /Error creating team person: A person with the same identityNumber already exists in this team\./,
            message:
              "Bu takımda aynı kimlik numarasına sahip bir kişi zaten mevcut!",
          },
          {
            regex:
              /Error creating team person: A person with the same phone already exists in this team\./,
            message:
              "Bu takımda aynı telefon numarasına sahip bir kişi zaten mevcut!",
          },
          {
            regex:
              /Error creating team person: A person with the same email already exists in this team\./,
            message:
              "Bu takımda aynı e-posta adresine sahip bir kişi zaten mevcut!",
          },
          {
            regex:
              /Error creating team person: A person with the same phone, identityNumber already exists in this team\./,
            message:
              "Bu takımda aynı telefon numarasına ve kimlik numarasına sahip bir kişi zaten mevcut!",
          },
          {
            regex:
              /Error creating team person: A person with the same email, phone already exists in this team\./,
            message:
              "Bu takımda aynı telefon numarasına ve e-posta adresine sahip bir kişi zaten mevcut!",
          },
          {
            regex:
              /Error creating team person: A person with the same email, identityNumber already exists in this team\./,
            message:
              "Bu takımda aynı kimlik numarasına ve e-posta adresine sahip bir kişi zaten mevcut!",
          },
          {
            regex:
              /Error creating team person: A person with the same email, phone, identityNumber already exists in this team\./,
            message:
              "Bu takımda aynı kimlik numarasına, e-posta adresine ve telefon numarasına sahip bir kişi zaten mevcut!",
          },
          {
            regex:
              /Error creating team person: Faculty is required for higher education levels\./,
            message: "Fakülte girmeniz gerekli!",
          },
          {
            regex:
              /Error creating team person: Faculty is required for higher education levels\./,
            message: "Fakülte ismi girmeniz gerekli!",
          },
          {
            regex:
              /Error creating team person: Department name is required for higher education levels\./,
            message: "Departman ismi girmeniz gerekli!",
          },
        ];

        for (const { regex, message } of personExistRegex) {
          const personMatch = errorMessage.match(regex);
          if (personMatch) {
            response.errorMessage = message;
            break;
          }
        }

        if (!response.errorMessage) {
          response.errorMessage = translations[errorMessage] || errorMessage;
        }
      }
    }
  }

  return response;
};
