
import { tempResponseDataType } from "../models/default.req.res";
import { translations } from "../translations/error";
import { axios } from "../utils/axios";

export const UsePostRole = async <T, B = any>(url: string, body: B) => {
  let response: {
    [x: string]: any;
    error: boolean;
    data: T | undefined;
    errorMessage?: string;
  } = {
    error: false,
    data: undefined,
  };

  try {
    const res: tempResponseDataType<T> | null = await axios.post(
      `${url}`,
      body
    );
  } catch (error: any) {
    response.error = true;
    response.errorMessage = "Bir hata oluştu!";
  }

  return response;
};

const parseErrorMessage = (errorData: any): string => {
  if (errorData?.error?.message) {
    const errorMessage = errorData.error.message;
    
    if (translations[errorMessage]) {
      return translations[errorMessage];
    }
    if (errorData.error.message.includes("email_1")) {
      return "Bu e-posta adresi ile zaten kayıtlı bir kullanıcı var. Lütfen tekrar deneyiniz.";
    } else if (errorData.error.message.includes("phone_1")) {
      return "Bu telefon numarası ile zaten kayıtlı bir kullanıcı var. Lütfen tekrar deneyiniz.";
    } else if (errorData.error.message.includes("name_1")) {
      return "Bu isim ile zaten kayıtlı bir kategori var.";
    } else if (errorData?.error.message === "Email already in use.") {
      return "Bu e-posta adresi ile zaten kayıtlı bir kullanıcı var. Lütfen tekrar deneyiniz.";
    } else if (errorData?.error.message === "Phone number already in use.") {
      return "Bu telefon numarası ile zaten kayıtlı bir kullanıcı var. Lütfen tekrar deneyiniz.";
    } else if (
      errorData?.error.message ===
      "Password must be at least 8 characters long."
    ) {
      return "Şifre en az 8 karakterden oluşmalıdır.";
    } else if (errorData?.error.message === "Invalid email format.") {
      return "Geçersiz e-posta formatı";
    }
    return "Bir hata oluştu: " + errorData.error.message;
  }
  return "Bir hata oluştu!";
};
