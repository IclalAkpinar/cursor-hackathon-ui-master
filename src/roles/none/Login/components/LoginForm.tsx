import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsePost } from "../../../../hooks";
import { loginDataType } from "../models/login.data";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (formData: loginDataType) => {
    const response = await UsePost<boolean, loginDataType>(
      "/auth/login",
      formData
    );
    setLoading(true);
    if (response.error) {
      message.error("Şifre veya email hatalı! Tekrar Deneyiniz", 3);
      setLoading(false);
    } else if (response.data) {
      navigate("/");
      window.location.reload();
      setLoading(true);
    }
  };

  const registerClick = () => {
    navigate("/register");
  };

  const forgotPasswordClick = () => {
    navigate("/getMail");
  };

  return (
    <Form
      size="large"
      initialValues={{ remember: true }}
      onFinish={handleLogin}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<loginDataType>
        label={<span className="dark:text-white">E-posta</span>}
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
      <Form.Item<loginDataType>
        label={<span className="dark:text-white">Şifre</span>}
        name="password"
        rules={[
          { required: true, message: "Lütfen şifrenizi giriniz!" },
          { min: 8, message: "Şifre en az 8 karakter olmalıdır!" },
        ]}
      >
        <Input.Password
          style={{
            backgroundColor: "var(--ant-input-bg)",
          }}
          className="dark:text-white"
        />
      </Form.Item>
      <div className="flex flex-col sm:flex-row gap-y-4 justify-between items-start">
        <span className="text-gray-600 dark:text-gray-200">
          Hesabın yok mu?
          <span
            onClick={registerClick}
            className="text-ktp_black dark:text-ktp_white font-semibold underline text-sm w-full sm:w-auto px-2 cursor-pointer hover:text-[#4096ff] dark:hover:text-[#4096ff]"
          >
            Kayıt Ol
          </span>
        </span>
        <span
          onClick={forgotPasswordClick}
          className="text-gray-700 dark:text-white text-sm underline cursor-pointer hover:text-[#BA2038] dark:hover:text-[#BA2038] "
        >
          Şifremi Unuttum
        </span>
      </div>
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
            loading={loading}
            disabled={loading}
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
