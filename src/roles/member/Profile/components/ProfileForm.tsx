import React, { useState, useEffect } from "react";
import { 
  Form, 
  Input, 
  Select, 
  Button, 
  Card, 
  Space, 
  message,
  Modal,
  Divider
} from "antd";
import { 
  SaveOutlined, 
  CloseOutlined,
  PlusOutlined,
  MinusCircleOutlined
} from "@ant-design/icons";
import { UserInfo, UserInfoCreate } from "../../../../utils/profileApi";

const { Option } = Select;
const { TextArea } = Input;

interface ProfileFormProps {
  userInfo: UserInfo | null;
  onSave: (data: UserInfoCreate | Partial<UserInfoCreate>) => void;
  onCancel: () => void;
  isEdit: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  userInfo,
  onSave,
  onCancel,
  isEdit,
}) => {
  const [form] = Form.useForm();
  const [interests, setInterests] = useState<string[]>([]);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState("");
  const [newStrength, setNewStrength] = useState("");
  const [newWeakness, setNewWeakness] = useState("");

  useEffect(() => {
    if (userInfo) {
      form.setFieldsValue({
        gender: userInfo.gender,
        educationLevel: userInfo.educationLevel,
        careerGoal: userInfo.careerGoal,
        currentStatus: userInfo.currentStatus,
        learningGoals: userInfo.learningGoals,
        availableStudyTime: userInfo.availableStudyTime,
        preferredLanguage: userInfo.preferredLanguage,
      });
      setInterests(userInfo.interests);
      setStrengths(userInfo.strengths);
      setWeaknesses(userInfo.weaknesses);
    }
  }, [userInfo, form]);

  const handleSubmit = (values: any) => {
    const formData = {
      ...values,
      interests,
      strengths,
      weaknesses,
    };
    console.log("Form submit data:", formData);
    onSave(formData);
  };

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const removeInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  const addStrength = () => {
    if (newStrength.trim() && !strengths.includes(newStrength.trim())) {
      setStrengths([...strengths, newStrength.trim()]);
      setNewStrength("");
    }
  };

  const removeStrength = (index: number) => {
    setStrengths(strengths.filter((_, i) => i !== index));
  };

  const addWeakness = () => {
    if (newWeakness.trim() && !weaknesses.includes(newWeakness.trim())) {
      setWeaknesses([...weaknesses, newWeakness.trim()]);
      setNewWeakness("");
    }
  };

  const removeWeakness = (index: number) => {
    setWeaknesses(weaknesses.filter((_, i) => i !== index));
  };

  return (
    <Modal
      title={
        <div className="text-center">
          <h2 className="text-2xl font-bold text-ktp_black dark:text-ktp_white">
            {isEdit ? "Profil Düzenle" : "Profil Oluştur"}
          </h2>
        </div>
      }
      open={true}
      onCancel={onCancel}
      footer={null}
      width={800}
      className="profile-form-modal"
    >
      <Card className="border-0 shadow-none">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-6"
        >
          {/* Temel Bilgiler */}
          <div>
            <h3 className="text-lg font-semibold text-ktp_black dark:text-ktp_white mb-4">
              Temel Bilgiler
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="gender"
                label="Cinsiyet"
                rules={[{ required: true, message: "Cinsiyet seçiniz" }]}
              >
                <Select placeholder="Cinsiyet seçiniz">
                  <Option value="male">Erkek</Option>
                  <Option value="female">Kadın</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="educationLevel"
                label="Eğitim Seviyesi"
                rules={[{ required: true, message: "Eğitim seviyesi seçiniz" }]}
              >
                <Select placeholder="Eğitim seviyesi seçiniz">
                  <Option value="primary_school">İlkokul</Option>
                  <Option value="middle_school">Ortaokul</Option>
                  <Option value="high_school">Lise</Option>
                  <Option value="undergraduate">Üniversite</Option>
                  <Option value="graduate">Yüksek Lisans</Option>
                  <Option value="doctorate">Doktora</Option>
                  <Option value="other">Diğer</Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              name="careerGoal"
              label="Kariyer Hedefi"
              rules={[{ required: true, message: "Kariyer hedefinizi giriniz" }]}
            >
              <Input placeholder="Örn: Yazılım Geliştirici" />
            </Form.Item>

            <Form.Item
              name="currentStatus"
              label="Mevcut Durum"
              rules={[{ required: true, message: "Mevcut durumunuzu giriniz" }]}
            >
              <Input placeholder="Örn: Üniversite 3. sınıf öğrencisi" />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="availableStudyTime"
                label="Müsait Çalışma Zamanı"
                rules={[{ required: true, message: "Çalışma zamanınızı giriniz" }]}
              >
                <Input placeholder="Örn: Haftada 15 saat" />
              </Form.Item>

              <Form.Item
                name="preferredLanguage"
                label="Tercih Edilen Dil"
                rules={[{ required: true, message: "Dil tercihinizi seçiniz" }]}
              >
                <Select placeholder="Dil seçiniz">
                  <Option value="tr">Türkçe</Option>
                  <Option value="en">İngilizce</Option>
                </Select>
              </Form.Item>
            </div>
          </div>

          <Divider />

          {/* İlgi Alanları */}
          <div>
            <h3 className="text-lg font-semibold text-ktp_black dark:text-ktp_white mb-4">
              İlgi Alanları
            </h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="İlgi alanı ekleyin"
                  onPressEnter={addInterest}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={addInterest}
                  className="bg-ktp_delft_blue hover:bg-ktp_federal_blue"
                >
                  Ekle
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full"
                  >
                    <span className="text-sm text-blue-800 dark:text-blue-200">
                      {interest}
                    </span>
                    <Button
                      type="text"
                      size="small"
                      icon={<MinusCircleOutlined />}
                      onClick={() => removeInterest(index)}
                      className="text-blue-600 hover:text-red-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Divider />

          {/* Güçlü Yönler */}
          <div>
            <h3 className="text-lg font-semibold text-ktp_black dark:text-ktp_white mb-4">
              Güçlü Yönler
            </h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newStrength}
                  onChange={(e) => setNewStrength(e.target.value)}
                  placeholder="Güçlü yön ekleyin"
                  onPressEnter={addStrength}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={addStrength}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Ekle
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {strengths.map((strength, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full"
                  >
                    <span className="text-sm text-green-800 dark:text-green-200">
                      {strength}
                    </span>
                    <Button
                      type="text"
                      size="small"
                      icon={<MinusCircleOutlined />}
                      onClick={() => removeStrength(index)}
                      className="text-green-600 hover:text-red-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Divider />

          {/* Geliştirilmesi Gereken Konular */}
          <div>
            <h3 className="text-lg font-semibold text-ktp_black dark:text-ktp_white mb-4">
              Geliştirilmesi Gereken Konular
            </h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newWeakness}
                  onChange={(e) => setNewWeakness(e.target.value)}
                  placeholder="Geliştirilmesi gereken konu ekleyin"
                  onPressEnter={addWeakness}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={addWeakness}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Ekle
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {weaknesses.map((weakness, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900 px-3 py-1 rounded-full"
                  >
                    <span className="text-sm text-orange-800 dark:text-orange-200">
                      {weakness}
                    </span>
                    <Button
                      type="text"
                      size="small"
                      icon={<MinusCircleOutlined />}
                      onClick={() => removeWeakness(index)}
                      className="text-orange-600 hover:text-red-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Divider />

          {/* Öğrenme Hedefleri */}
          <div>
            <h3 className="text-lg font-semibold text-ktp_black dark:text-ktp_white mb-4">
              Öğrenme Hedefleri
            </h3>
            <Form.Item
              name="learningGoals"
              rules={[{ required: true, message: "Öğrenme hedeflerinizi giriniz" }]}
            >
              <TextArea
                rows={4}
                placeholder="Öğrenme hedeflerinizi detaylı olarak yazın..."
              />
            </Form.Item>
          </div>

          {/* Butonlar */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              icon={<CloseOutlined />}
              onClick={onCancel}
              size="large"
            >
              İptal
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              size="large"
              className="bg-ktp_delft_blue hover:bg-ktp_federal_blue"
            >
              {isEdit ? "Güncelle" : "Oluştur"}
            </Button>
          </div>
        </Form>
      </Card>
    </Modal>
  );
};