import React from "react";
import { Card, Button, Tag, Space, Divider, Alert } from "antd";
import { 
  EditOutlined, 
  DeleteOutlined, 
  CheckCircleOutlined,
  UserOutlined,
  BookOutlined,
  TrophyOutlined,
  AimOutlined,
  ClockCircleOutlined,
  GlobalOutlined
} from "@ant-design/icons";
import { UserInfo } from "../../../../utils/profileApi";

interface ProfileViewProps {
  userInfo: UserInfo;
  onEdit: () => void;
  onDelete: () => void;
  onGetAiPrompt: () => void;
  aiPrompt: string;
  getEducationLevelText: (level: string) => string;
  getGenderText: (gender: string) => string;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userInfo,
  onEdit,
  onDelete,
  onGetAiPrompt,
  aiPrompt,
  getEducationLevelText,
  getGenderText,
}) => {
  return (
    <div className="space-y-6">
      {/* Temel Bilgiler */}
      <Card className="shadow-2xl border-0 rounded-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-ktp_black dark:text-ktp_white mb-2">
              Temel Bilgiler
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Kişisel ve eğitim bilgileriniz
            </p>
          </div>
          <Space>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={onEdit}
              className="bg-ktp_delft_blue hover:bg-ktp_federal_blue"
            >
              Düzenle
            </Button>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={onDelete}
            >
              Sil
            </Button>
          </Space>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <UserOutlined className="text-ktp_delft_blue text-xl" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cinsiyet</p>
                <p className="font-semibold text-ktp_black dark:text-ktp_white">
                  {getGenderText(userInfo.gender)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BookOutlined className="text-ktp_delft_blue text-xl" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Eğitim Seviyesi</p>
                <p className="font-semibold text-ktp_black dark:text-ktp_white">
                  {getEducationLevelText(userInfo.educationLevel)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <TrophyOutlined className="text-ktp_delft_blue text-xl" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Kariyer Hedefi</p>
                <p className="font-semibold text-ktp_black dark:text-ktp_white">
                  {userInfo.careerGoal}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <AimOutlined className="text-ktp_delft_blue text-xl" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Mevcut Durum</p>
                <p className="font-semibold text-ktp_black dark:text-ktp_white">
                  {userInfo.currentStatus}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ClockCircleOutlined className="text-ktp_delft_blue text-xl" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Müsait Çalışma Zamanı</p>
                <p className="font-semibold text-ktp_black dark:text-ktp_white">
                  {userInfo.availableStudyTime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <GlobalOutlined className="text-ktp_delft_blue text-xl" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tercih Edilen Dil</p>
                <p className="font-semibold text-ktp_black dark:text-ktp_white">
                  {userInfo.preferredLanguage === "tr" ? "Türkçe" : "İngilizce"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* İlgi Alanları */}
      <Card className="shadow-2xl border-0 rounded-2xl">
        <h3 className="text-xl font-bold text-ktp_black dark:text-ktp_white mb-4">
          İlgi Alanları
        </h3>
        <div className="flex flex-wrap gap-2">
          {userInfo.interests.map((interest, index) => (
            <Tag key={index} color="blue" className="px-3 py-1 text-sm">
              {interest}
            </Tag>
          ))}
        </div>
      </Card>

      {/* Güçlü Yönler */}
      <Card className="shadow-2xl border-0 rounded-2xl">
        <h3 className="text-xl font-bold text-ktp_black dark:text-ktp_white mb-4">
          Güçlü Yönler
        </h3>
        <div className="flex flex-wrap gap-2">
          {userInfo.strengths.map((strength, index) => (
            <Tag key={index} color="green" className="px-3 py-1 text-sm">
              {strength}
            </Tag>
          ))}
        </div>
      </Card>

      {/* Geliştirilmesi Gereken Konular */}
      <Card className="shadow-2xl border-0 rounded-2xl">
        <h3 className="text-xl font-bold text-ktp_black dark:text-ktp_white mb-4">
          Geliştirilmesi Gereken Konular
        </h3>
        <div className="flex flex-wrap gap-2">
          {userInfo.weaknesses.map((weakness, index) => (
            <Tag key={index} color="orange" className="px-3 py-1 text-sm">
              {weakness}
            </Tag>
          ))}
        </div>
      </Card>

      {/* Öğrenme Hedefleri */}
      <Card className="shadow-2xl border-0 rounded-2xl">
        <h3 className="text-xl font-bold text-ktp_black dark:text-ktp_white mb-4">
          Öğrenme Hedefleri
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {userInfo.learningGoals}
        </p>
      </Card>

      {/* AI Prompt Bölümü */}
      <Card className="shadow-2xl border-0 rounded-2xl">
        <div className="text-center">
          <h3 className="text-xl font-bold text-ktp_black dark:text-ktp_white mb-2">
            AI Entegrasyonu
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Profil bilgilerinizi AI'a göndererek kişiselleştirilmiş öneriler alın
          </p>
          <Button
            type="primary"
            size="large"
            icon={<CheckCircleOutlined />}
            onClick={onGetAiPrompt}
            className="bg-green-500 hover:bg-green-600"
          >
            AI Prompt'u Al
          </Button>
        </div>
      </Card>
    </div>
  );
};