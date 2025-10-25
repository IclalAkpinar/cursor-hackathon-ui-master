import React, { useState } from "react";
import { Button, Card, Select, message } from "antd";
import { useNavigate } from "react-router-dom";

// Çalışma Teknikleri
const STUDY_TECHNIQUES = [
  { id: "pomodoro", name: "Pomodoro Tekniği", description: "25 dakika çalış, 5 dakika mola" },
  { id: "52-17", name: "52/17 Tekniği", description: "52 dakika çalış, 17 dakika mola" },
  { id: "time-blocking", name: "Time Blocking", description: "Zaman bloklama yöntemi" },
  { id: "eisenhower", name: "Eisenhower Matrisi", description: "Önceliklendirme matrisi" },
];

// Çalışma Alanları
const STUDY_AREAS = [
  "İngilizce",
  "Data Mining",
  "Diferansiyel Denklem",
  "Algoritma",
  "Veri Yapıları",
  "Makine Öğrenmesi",
  "Web Geliştirme",
  "Mobil Geliştirme",
];

// Eğitim Seviyeleri
const EDUCATION_LEVELS = [
  "İlkokul",
  "Ortaokul",
  "Lise",
  "Üniversite",
  "Yüksek Lisans",
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const handleStartSession = () => {
    if (!selectedTechnique || !selectedArea || !selectedLevel) {
      message.warning("Lütfen tüm alanları doldurun!");
      return;
    }

    // Seçimleri localStorage'a kaydet
    localStorage.setItem("studyPreferences", JSON.stringify({
      technique: selectedTechnique,
      area: selectedArea,
      level: selectedLevel,
    }));

    navigate("/match-sessions");
  };

  return (
    <div className="min-h-screen bg-ktp_white dark:bg-ktp_black p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-ktp_black dark:text-ktp_white">
          Çalışma Oturumu Başlat
        </h1>

        {/* Çalışma Tekniği Seçimi */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-ktp_black dark:text-ktp_white">
            1. Çalışma Tekniğini Seç
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STUDY_TECHNIQUES.map((technique) => (
              <Card
                key={technique.id}
                hoverable
                className={`cursor-pointer transition-all ${
                  selectedTechnique === technique.id
                    ? "border-ktp_delft_blue border-2"
                    : ""
                }`}
                onClick={() => setSelectedTechnique(technique.id)}
              >
                <h3 className="text-lg font-semibold mb-2">{technique.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{technique.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Çalışma Alanı Seçimi */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-ktp_black dark:text-ktp_white">
            2. Çalışmak İstediğin Alanı Seç
          </h2>
          <Select
            placeholder="Çalışma alanı seçiniz"
            size="large"
            className="w-full"
            value={selectedArea}
            onChange={setSelectedArea}
            options={STUDY_AREAS.map((area) => ({ label: area, value: area }))}
          />
        </div>

        {/* Eğitim Seviyesi Seçimi */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-ktp_black dark:text-ktp_white">
            3. Eğitim Seviyeni Seç
          </h2>
          <Select
            placeholder="Eğitim seviyesi seçiniz"
            size="large"
            className="w-full"
            value={selectedLevel}
            onChange={setSelectedLevel}
            options={EDUCATION_LEVELS.map((level) => ({ label: level, value: level }))}
          />
        </div>

        {/* Başlat Butonu */}
        <div className="flex justify-center">
          <Button
            type="primary"
            size="large"
            onClick={handleStartSession}
            className="bg-ktp_delft_blue hover:bg-ktp_federal_blue text-white px-12 py-6 text-lg font-semibold"
          >
            Oturumları Bul
          </Button>
        </div>
      </div>
    </div>
  );
};

