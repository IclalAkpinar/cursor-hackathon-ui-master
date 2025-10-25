import { AxiosError } from 'axios';
import { translations } from '../translations/error';
import { axios } from '../utils/axios';


export const UsePatch = async <T, B = any>(url: string, body: Partial<B>) => 
{  let response: { error: boolean; data?: T; message?: string } = { error: false };

  try {
    const res = await axios.patch(url, body);
    response.data = res.data.result.data;
  } catch (error) {
    response.error = true;

    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data;
      let errorMessage = errorResponse?.error?.message || errorResponse?.message || 'Güncelleme sırasında hata oluştu';

      errorMessage = errorMessage.replace(/E11000 duplicate key error collection.*index: phone_1.*\{ phone: "[^"]+" \}/, 'E11000 duplicate key error phone_1');
      errorMessage = errorMessage.replace(/E11000 duplicate key error collection.*index: email_1.*\{ email: "[^"]+" \}/, 'E11000 duplicate key error email_1');
      errorMessage = errorMessage.replace(/E11000 duplicate key error collection.*index: name_1.*\{ name: "[^"]+" \}/, 'E11000 duplicate key error name_1');
      errorMessage = errorMessage.replace(/E11000 duplicate key error collection.*index: identityNumber_1.*\{ name: "[^"]+" \}/, 'E11000 duplicate key error identityNumber_1');
      errorMessage = errorMessage.replace(/E11000 duplicate key error collection.*index: teamLogo_1.*\{ teamLogo: "[^"]+" \}/, 'Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: team-managenment-service.teamInfo index: teamLogo_1');
      errorMessage = errorMessage.replace(/E11000 duplicate key error collection.*index: teamName_1.*\{ teamName: "[^"]+" \}/, 'E11000 duplicate key error teamName_1');

      const translationKey = Object.keys(translations).find(key => errorMessage.includes(key));

      response.message = translationKey ? translations[translationKey] : errorMessage;
    } else {
      response.message = 'Güncelleme sırasında hata oluştu';
    }
  }

  return response;
};