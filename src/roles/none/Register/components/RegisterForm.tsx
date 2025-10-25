import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsePost } from "../../../../hooks";
import { registerDataType } from "../models/register.data";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (formData: registerDataType) => {
    setLoading(true);
    const { confirmPassword, ...data } = formData;
    
    const response = await UsePost<boolean, Omit<registerDataType, 'confirmPassword'>>(
      "/auth/register",
      data
    );
    
    if (response.error) {
      message.error(response.errorMessage || "Kayıt işlemi başarısız! Tekrar deneyiniz", 3);
      setLoading(false);
    } else if (response.data) {
      message.success("Kayıt başarılı! E-posta adresinizi kontrol ediniz.", 3);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const loginClick = () => {
    navigate("/login");
  };

  return (
    <Form
      size="large"
      initialValues={{ remember: true }}
      onFinish={handleRegister}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<registerDataType>
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
      
      <Form.Item<registerDataType>
        label={<span className="dark:text-white">Şifre</span>}
        name="password"
        rules={[
          { required: true, message: "Lütfen şifrenizi giriniz!" },
          { min: 6, message: "Şifre en az 6 karakter olmalıdır!" },
        ]}
      >
        <Input.Password
          style={{
            backgroundColor: "var(--ant-input-bg)",
          }}
          className="dark:text-white"
        />
      </Form.Item>

      <Form.Item
        label={<span className="dark:text-white">Şifreyi Onayla</span>}
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Lütfen şifrenizi onaylayınız!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Şifreler uyuşmuyor!"));
            },
          }),
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
          Zaten hesabın var mı?
          <span
            onClick={loginClick}
            className="text-ktp_black dark:text-ktp_white font-semibold underline text-sm w-full sm:w-auto px-2 cursor-pointer hover:text-[#4096ff] dark:hover:text-[#4096ff]"
          >
            Giriş Yap
          </span>
        </span>
      </div>
      
      <div className="mb-0">
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full bg-ktp_delft_blue hover:bg-ktp_federal_blue border-0 h-12 text-base font-medium"
          >
            Kayıt Ol
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};