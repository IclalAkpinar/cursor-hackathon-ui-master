import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { UsePost } from "../../../../../hooks";
import { getMailData } from "../models/get.mail";

export const GetMailForm = () => {
  const navigate = useNavigate();

  const forgotMail = async (formData: getMailData) => {
    const response = await UsePost<boolean, getMailData>(
      "/auth/forgot-password",
      formData
    );
    if (response.error) message.error("E-mail adresi hatalı", 3);
    else {
      message.success(
        "E-posta adresinize şifre sıfırlama bağlantısı gönderilmiştir. Bağlantı 15 dakika geçerlidir. Lütfen e-postanızı kontrol ediniz.",
        3
      );
      setTimeout(() => {
        navigate("/");
      });
    }
  };

  return (
    <Form
      size="large"
      initialValues={{ remember: true }}
      onFinish={forgotMail}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<getMailData>
        label={
          <span className="dark:text-white">
            Takım E-posta adresinizi giriniz:
          </span>
        }
        name="email"
        rules={[
          { required: true, message: "Lütfen e-posta adresinizi giriniz!" },
          { type: "email", message: "Geçerli bir e-posta adresi giriniz!" },
        ]}
      >
        <Input
          style={{
            backgroundColor: "var(--ant-input-bg)",
          }}
          className="dark:text-white"
        />
      </Form.Item>

      <div className="mb-0">
        <Form.Item wrapperCol={{ span: 24 }} className="mt-8">
          <Button
            color="primary"
            variant="outlined"
            htmlType="submit"
            className="w-full text-lg text-ktp_black font-medium dark:bg-black dark:text-white dark:hover:bg-black dark:focus:bg-black py-5 dark:border-ktp_delft_blue"
            style={{
              borderWidth: "1.5px",
              fontSize: "1.1rem",
              transition: "all 0.3s ease",
              backgroundColor: "var(--ant-input-bg)",
            }}
          >
            Şifremi Sıfırla
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
