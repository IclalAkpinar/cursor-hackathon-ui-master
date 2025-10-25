import { Button, Form, Input, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { UsePost } from "../../../../../hooks";
import { resetPasswordData } from "../models/reset.password";

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleResetPassword = async (formData: resetPasswordData) => {
    const { newConfirmPassword, ...data } = formData;
    const response = await UsePost<boolean, resetPasswordData>(
      `auth/reset-password/${id}`,
      data
    );

    if (response.error) {
      if (response.errorMessage.includes("token")) {
        message.error(
          "Şifre sıfırlama bağlantınızın süresi dolmuş veya geçersiz olmuştur. Lütfen yeniden deneyiniz.",
          3
        );
        navigate("/getMail");
      } else {
        message.error(
          "Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.",
          3
        );
      }
      navigate("/");
    } else {
      message.success(
        "Şifreniz başarıyla değiştirilmiştir. Artık hesabınıza yeni şifrenizle giriş yapabilirsiniz.",
        3
      );
      setTimeout(() => {
        navigate("/login");
      });
    }
  };

  return (
    <Form
      size="large"
      initialValues={{ remember: true }}
      onFinish={handleResetPassword}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<resetPasswordData>
        label={<span className="dark:text-white">Yeni Şifre</span>}
        name="newPassword"
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

      <Form.Item
        label={<span className="dark:text-white">Yeni Şifreyi Onayla </span>}
        name="newConfirmPassword"
        dependencies={["newPassword"]}
        rules={[
          { required: true, message: "Lütfen şifrenizi onaylayınız!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
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
            Şifre Yenile
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
