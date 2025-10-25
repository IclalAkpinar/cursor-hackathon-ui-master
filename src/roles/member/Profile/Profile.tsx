import React, { useState } from "react";
import { Card, Button, message, Spin, Alert, Tabs, Tag, Space, Divider } from "antd";
import { 
  UserOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  PlusOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import { useProfile } from "../../../hooks/useProfile";
import { UserInfoCreate } from "../../../utils/profileApi";
import { ProfileForm } from "./components/ProfileForm";
import { ProfileView } from "./components/ProfileView";

const { TabPane } = Tabs;

export const Profile: React.FC = () => {
  const { userInfo, loading, error, createUserInfo, updateUserInfo, deleteUserInfo, getAiPrompt } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [aiPrompt, setAiPrompt] = useState<string>("");

  // Debug bilgileri
  console.log("Profile component render - userInfo:", userInfo);
  console.log("Profile component render - loading:", loading);
  console.log("Profile component render - error:", error);

  const handleCreate = async (data: UserInfoCreate | Partial<UserInfoCreate>) => {
    console.log("Profile create data:", data);
    const result = await createUserInfo(data as UserInfoCreate);
    if (result.success) {
      message.success("Profil başarıyla oluşturuldu!");
      setIsEditing(false);
    } else {
      message.error(result.error || "Profil oluşturulamadı");
    }
  };

  const handleUpdate = async (data: UserInfoCreate | Partial<UserInfoCreate>) => {
    const result = await updateUserInfo(data);
    if (result.success) {
      message.success("Profil başarıyla güncellendi!");
      setIsEditing(false);
    } else {
      message.error(result.error || "Profil güncellenemedi");
    }
  };

  const handleDelete = async () => {
    const result = await deleteUserInfo();
    if (result.success) {
      message.success("Profil başarıyla silindi!");
      setIsEditing(false);
    } else {
      message.error(result.error || "Profil silinemedi");
    }
  };

  const handleGetAiPrompt = async () => {
    const result = await getAiPrompt();
    if (result.success) {
      setAiPrompt(result.data || "");
      message.success("AI prompt başarıyla alındı!");
    } else {
      message.error(result.error || "AI prompt alınamadı");
    }
  };

  const getEducationLevelText = (level: string) => {
    const levels: { [key: string]: string } = {
      primary_school: "İlkokul",
      middle_school: "Ortaokul", 
      high_school: "Lise",
      undergraduate: "Üniversite",
      graduate: "Yüksek Lisans",
      doctorate: "Doktora",
      other: "Diğer"
    };
    return levels[level] || level;
  };

  const getGenderText = (gender: string) => {
    return gender === "male" ? "Erkek" : "Kadın";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ktp_white via-blue-50 to-indigo-50 dark:from-ktp_black dark:via-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center h-96">
            <Spin size="large" />
          </div>
        </div>
      </div>
    );
  }

  // Sadece gerçek hatalar için error göster, profil yoksa create ekranını göster
  if (error && error !== "Profil bilgileri alınamadı") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ktp_white via-blue-50 to-indigo-50 dark:from-ktp_black dark:via-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <Alert
            message="Hata"
            description={error}
            type="error"
            showIcon
            icon={<ExclamationCircleOutlined />}
            action={
              <Button size="small" onClick={() => window.location.reload()}>
                Tekrar Dene
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ktp_white via-blue-50 to-indigo-50 dark:from-ktp_black dark:via-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-ktp_delft_blue to-ktp_federal_blue rounded-2xl mb-4 shadow-2xl">
            <UserOutlined className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl font-bold text-ktp_black dark:text-ktp_white mb-2">
            Profilim
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Profil bilgilerinizi yönetin ve AI'a gönderin
          </p>
        </div>

        {!userInfo && !error ? (
          /* Profil Yok - Oluşturma Formu */
          <Card className="shadow-2xl border-0 rounded-2xl">
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlusOutlined className="text-4xl text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-ktp_black dark:text-ktp_white mb-2">
                Profil Oluştur
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                AI'ın size daha iyi öneriler sunabilmesi için profil bilgilerinizi oluşturun
              </p>
              <div className="space-y-3">
                <Button
                  type="primary"
                  size="large"
                  icon={<PlusOutlined />}
                  onClick={() => setIsEditing(true)}
                  className="bg-ktp_delft_blue hover:bg-ktp_federal_blue w-full"
                >
                  Profil Oluştur
                </Button>
                <Button
                  size="large"
                  onClick={async () => {
                    console.log("Testing API connection...");
                    try {
                      const response = await fetch("http://localhost:3001/health", {
                        credentials: "include",
                      });
                      const data = await response.json();
                      console.log("Health check response:", data);
                      message.info(`Backend durumu: ${data.message}`);
                    } catch (err) {
                      console.error("Health check error:", err);
                      message.error("Backend'e bağlanılamadı!");
                    }
                  }}
                  className="w-full"
                >
                  Backend Bağlantısını Test Et
                </Button>
                <Button
                  size="large"
                  onClick={async () => {
                    console.log("Testing user-info endpoint...");
                    try {
                      const response = await fetch("http://localhost:3001/user-info", {
                        credentials: "include",
                      });
                      const data = await response.json();
                      console.log("User-info response:", data);
                      message.info(`User-info durumu: ${data.message}`);
                    } catch (err) {
                      console.error("User-info error:", err);
                      message.error("User-info endpoint'ine bağlanılamadı!");
                    }
                  }}
                  className="w-full"
                >
                  User-Info Endpoint Test Et
                </Button>
              </div>
            </div>
          </Card>
        ) : userInfo ? (
          /* Profil Var - Görüntüleme ve Düzenleme */
          <Tabs defaultActiveKey="view" className="profile-tabs">
            <TabPane tab="Profil Görünümü" key="view">
              <ProfileView 
                userInfo={userInfo}
                onEdit={() => setIsEditing(true)}
                onDelete={handleDelete}
                onGetAiPrompt={handleGetAiPrompt}
                aiPrompt={aiPrompt}
                getEducationLevelText={getEducationLevelText}
                getGenderText={getGenderText}
              />
            </TabPane>
            <TabPane tab="AI Prompt" key="ai">
              <Card className="shadow-2xl border-0 rounded-2xl">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-ktp_black dark:text-ktp_white mb-2">
                    AI Prompt
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Bu metni AI'a göndererek kişiselleştirilmiş öneriler alabilirsiniz
                  </p>
                </div>
                
                <div className="mb-4">
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={handleGetAiPrompt}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    AI Prompt'u Al
                  </Button>
                </div>

                {aiPrompt && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                    <h4 className="font-semibold text-ktp_black dark:text-ktp_white mb-2">
                      AI Prompt Metni:
                    </h4>
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                      {aiPrompt}
                    </pre>
                    <Button
                      size="small"
                      onClick={() => navigator.clipboard.writeText(aiPrompt)}
                      className="mt-2"
                    >
                      Kopyala
                    </Button>
                  </div>
                )}
              </Card>
            </TabPane>
          </Tabs>
        ) : null}

        {/* Düzenleme Formu Modal */}
        {isEditing && (
          <ProfileForm
            userInfo={userInfo}
            onSave={userInfo ? handleUpdate : handleCreate}
            onCancel={() => setIsEditing(false)}
            isEdit={!!userInfo}
          />
        )}
      </div>
    </div>
  );
};