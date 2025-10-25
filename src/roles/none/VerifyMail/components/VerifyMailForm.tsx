import { Button, Form, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { UsePostRole } from "../../../../hooks";
import { verifyMailData } from "../models/verify.mail";
import { useState } from "react";

export const VerifyMailForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleVerifyMail = async (formData: verifyMailData) => {
    setLoading(true);
    const response = await UsePostRole<boolean, verifyMailData>(
      `auth/verify-email/${id}`,
      formData
    );
    setLoading(false);

    if (response.error) {
      const errorMessage =
        response.errorMessage || "Bir hata oluştu. Lütfen tekrar deneyiniz.";

      if (errorMessage.includes("token")) {
        message.error(
          "E-posta doğrulama bağlantınızın süresi dolmuş veya geçersiz olmuştur. Lütfen yeniden deneyiniz.",
          3
        );
        navigate("/register");
      } else {
        message.error(errorMessage, 3);
      }
    } else {
      message.success(
        "E-posta doğrulamanız başarıyla tamamlanmıştır. Artık hesabınıza giriş yapabilirsiniz.",
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
      onFinish={handleVerifyMail}
      autoComplete="off"
      layout="vertical"
    >
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
            {loading ? "Doğrulanıyor..." : "E-postamı Doğrula"}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
