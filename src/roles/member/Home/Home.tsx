import React, { useState } from "react";
import { Button, Card, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";

// Çalışma Teknikleri
const STUDY_TECHNIQUES = [
  { 
    id: "pomodoro", 
    name: "Pomodoro Tekniği", 
    description: "25 dakika çalış, 5 dakika mola",
    icon: "🍅",
    details: "Pomodoro tekniği, çalışma süresini 25 dakikalık bloklara bölen ve her blok arasında kısa molalar veren bir zaman yönetimi yöntemidir. Bu teknik, odaklanmayı artırır ve yorgunluğu azaltır.",
    benefits: [
      "Odaklanmayı artırır",
      "Yorgunluğu azaltır", 
      "Zamanı daha verimli kullanır",
      "Motivasyonu yüksek tutar"
    ],
    steps: [
      "25 dakika boyunca sadece bir göreve odaklan",
      "5 dakika mola ver",
      "4 pomodoro sonrası 15-30 dakika uzun mola",
      "Tekrarla"
    ]
  },
  { 
    id: "52-17", 
    name: "52/17 Tekniği", 
    description: "52 dakika çalış, 17 dakika mola",
    icon: "⏰",
    details: "52/17 tekniği, 52 dakika yoğun çalışma ve 17 dakika mola döngüsü kullanan bir çalışma yöntemidir. Bu süreler insan beyninin doğal ritmine uygun olarak tasarlanmıştır.",
    benefits: [
      "Beynin doğal ritmine uygun",
      "Daha uzun odaklanma süresi",
      "Verimliliği maksimize eder",
      "Yaratıcılığı destekler"
    ],
    steps: [
      "52 dakika boyunca kesintisiz çalış",
      "17 dakika tamamen dinlen",
      "Telefon ve dikkat dağıtıcıları kapat",
      "Döngüyü tekrarla"
    ]
  },
  { 
    id: "time-blocking", 
    name: "Time Blocking", 
    description: "Zaman bloklama yöntemi",
    icon: "📅",
    details: "Time blocking, gününüzü belirli zaman bloklarına bölerek her görev için ayrılmış zaman dilimleri oluşturma yöntemidir. Bu teknik, planlamayı kolaylaştırır ve verimliliği artırır.",
    benefits: [
      "Planlamayı kolaylaştırır",
      "Görevleri önceliklendirir",
      "Zaman kaybını önler",
      "Disiplin oluşturur"
    ],
    steps: [
      "Günlük görevlerini listele",
      "Her görev için zaman tahmini yap",
      "Takvimde bloklar oluştur",
      "Bloklara sadık kal"
    ]
  },
  { 
    id: "eisenhower", 
    name: "Eisenhower Matrisi", 
    description: "Önceliklendirme matrisi",
    icon: "🎯",
    details: "Eisenhower Matrisi, görevleri aciliyet ve önem derecesine göre dört kategoriye ayıran bir önceliklendirme aracıdır. Bu yöntem, hangi görevlere odaklanmanız gerektiğini belirlemenize yardımcı olur.",
    benefits: [
      "Görevleri önceliklendirir",
      "Zamanı daha iyi yönetir",
      "Stresi azaltır",
      "Hedeflere odaklanmayı sağlar"
    ],
    steps: [
      "Görevleri 4 kategoriye ayır",
      "Acil ve önemli: Hemen yap",
      "Önemli ama acil değil: Planla",
      "Acil ama önemli değil: Devret",
      "Ne acil ne önemli: Sil"
    ]
  },
];

// Çalışma Alanları
const STUDY_AREAS = [
  { name: "İngilizce", icon: "🇬🇧" },
  { name: "Data Mining", icon: "📊" },
  { name: "Diferansiyel Denklem", icon: "📐" },
  { name: "Algoritma", icon: "⚡" },
  { name: "Veri Yapıları", icon: "🏗️" },
  { name: "Makine Öğrenmesi", icon: "🤖" },
  { name: "Web Geliştirme", icon: "🌐" },
  { name: "Mobil Geliştirme", icon: "📱" },
];

// Eğitim Seviyeleri
const EDUCATION_LEVELS = [
  { 
    name: "İlkokul", 
    icon: "🎒",
    details: "İlkokul seviyesi, temel eğitimin başlangıcıdır. Bu dönemde çocuklar okuma, yazma, matematik ve temel bilimler konularında temel beceriler kazanır.",
    characteristics: [
      "Temel okuma-yazma becerileri",
      "Sayısal işlemler ve matematik",
      "Sosyal beceriler geliştirme",
      "Yaratıcılık ve hayal gücü"
    ],
    studyTips: [
      "Kısa süreli çalışma seansları (15-20 dakika)",
      "Oyunlaştırılmış öğrenme",
      "Görsel materyaller kullanma",
      "Düzenli tekrar yapma"
    ]
  },
  { 
    name: "Ortaokul", 
    icon: "📚",
    details: "Ortaokul seviyesi, temel eğitimin devamıdır. Bu dönemde öğrenciler daha karmaşık konularla tanışır ve analitik düşünme becerileri geliştirir.",
    characteristics: [
      "Analitik düşünme gelişimi",
      "Çoklu konu öğrenimi",
      "Sosyal ve duygusal gelişim",
      "Problem çözme becerileri"
    ],
    studyTips: [
      "Konu bazlı çalışma planı",
      "Not tutma alışkanlığı",
      "Grup çalışmaları",
      "Hedef belirleme"
    ]
  },
  { 
    name: "Lise", 
    icon: "🎓",
    details: "Lise seviyesi, üniversiteye hazırlık dönemidir. Bu dönemde öğrenciler daha derinlemesine konular öğrenir ve gelecek planları yapmaya başlar.",
    characteristics: [
      "Derinlemesine konu analizi",
      "Üniversite hazırlığı",
      "Kariyer planlaması",
      "Bağımsız öğrenme"
    ],
    studyTips: [
      "Uzun süreli çalışma seansları",
      "Test teknikleri öğrenme",
      "Zaman yönetimi",
      "Stres yönetimi"
    ]
  },
  { 
    name: "Üniversite", 
    icon: "🎓",
    details: "Üniversite seviyesi, uzmanlaşma dönemidir. Bu dönemde öğrenciler seçtikleri alanda derinlemesine bilgi sahibi olur ve araştırma becerileri geliştirir.",
    characteristics: [
      "Uzmanlaşma ve derinleşme",
      "Araştırma becerileri",
      "Kritik düşünme",
      "Profesyonel gelişim"
    ],
    studyTips: [
      "Araştırma metodları",
      "Kaynak tarama teknikleri",
      "Sunum becerileri",
      "Proje yönetimi"
    ]
  },
  { 
    name: "Yüksek Lisans", 
    icon: "🎓",
    details: "Yüksek lisans seviyesi, akademik derinleşme dönemidir. Bu dönemde öğrenciler belirli bir alanda uzmanlaşır ve orijinal araştırmalar yapar.",
    characteristics: [
      "Akademik uzmanlaşma",
      "Orijinal araştırma",
      "Tez yazımı",
      "Akademik yayın"
    ],
    studyTips: [
      "Akademik yazım teknikleri",
      "Literatür taraması",
      "Veri analizi",
      "Sunum ve savunma"
    ]
  },
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTechniqueData, setSelectedTechniqueData] = useState<any>(null);
  const [educationModalVisible, setEducationModalVisible] = useState(false);
  const [selectedEducationData, setSelectedEducationData] = useState<any>(null);

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

  const handleTechniqueClick = (technique: any) => {
    setSelectedTechniqueData(technique);
    setModalVisible(true);
  };

  const handleTechniqueSelect = (techniqueId: string) => {
    setSelectedTechnique(techniqueId);
    setModalVisible(false);
  };

  const handleEducationClick = (education: any) => {
    setSelectedEducationData(education);
    setEducationModalVisible(true);
  };

  const handleEducationSelect = (educationName: string) => {
    setSelectedLevel(educationName);
    setEducationModalVisible(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ktp_white via-blue-50 to-indigo-50 dark:from-ktp_black dark:via-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-ktp_delft_blue to-ktp_federal_blue bg-clip-text text-transparent">
            Çalışma Oturumu Başlat
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            En uygun çalışma tekniğini seçin ve verimli bir oturum başlatın
          </p>
        </div>

        {/* Çalışma Tekniği Seçimi */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-ktp_black dark:text-ktp_white mb-3">
              Çalışma Tekniğini Seç
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Kartlara tıklayarak detayları görüntüleyin ve seçiminizi yapın
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STUDY_TECHNIQUES.map((technique) => (
              <Card
                key={technique.id}
                hoverable
                className={`cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                  selectedTechnique === technique.id
                    ? "border-ktp_delft_blue border-2 shadow-lg scale-105"
                    : "border-gray-200 dark:border-gray-700 hover:border-ktp_delft_blue"
                }`}
                onClick={() => handleTechniqueClick(technique)}
                style={{
                  borderRadius: '16px',
                  boxShadow: selectedTechnique === technique.id 
                    ? '0 10px 25px rgba(59, 130, 246, 0.15)' 
                    : '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="text-center p-4">
                  <div className="text-4xl mb-4">{technique.icon}</div>
                  <h3 className="text-lg font-bold mb-2 text-ktp_black dark:text-ktp_white">
                    {technique.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {technique.description}
                  </p>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    selectedTechnique === technique.id
                      ? "bg-ktp_delft_blue text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}>
                    {selectedTechnique === technique.id ? "Seçildi" : "Detayları Gör"}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Çalışma Alanı Seçimi */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-ktp_black dark:text-ktp_white mb-3">
              Çalışma Alanını Seç
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hangi konuda çalışmak istiyorsunuz?
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {STUDY_AREAS.map((area) => (
              <Card
                key={area.name}
                hoverable
                className={`cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                  selectedArea === area.name
                    ? "border-ktp_delft_blue border-2 shadow-lg scale-105"
                    : "border-gray-200 dark:border-gray-700 hover:border-ktp_delft_blue"
                }`}
                onClick={() => setSelectedArea(area.name)}
                style={{
                  borderRadius: '16px',
                  boxShadow: selectedArea === area.name 
                    ? '0 10px 25px rgba(59, 130, 246, 0.15)' 
                    : '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="text-center p-4">
                  <div className="text-3xl mb-3">{area.icon}</div>
                  <h3 className="text-sm font-semibold text-ktp_black dark:text-ktp_white">
                    {area.name}
                  </h3>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                    selectedArea === area.name
                      ? "bg-ktp_delft_blue text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}>
                    {selectedArea === area.name ? "Seçildi" : "Seç"}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Eğitim Seviyesi Seçimi */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-ktp_black dark:text-ktp_white mb-3">
              Eğitim Seviyeni Seç
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Mevcut eğitim seviyenizi seçin
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {EDUCATION_LEVELS.map((level) => (
              <Card
                key={level.name}
                hoverable
                className={`cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                  selectedLevel === level.name
                    ? "border-ktp_federal_blue border-2 shadow-lg scale-105"
                    : "border-gray-200 dark:border-gray-700 hover:border-ktp_federal_blue"
                }`}
                onClick={() => handleEducationClick(level)}
                style={{
                  borderRadius: '16px',
                  boxShadow: selectedLevel === level.name 
                    ? '0 10px 25px rgba(30, 64, 175, 0.15)' 
                    : '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="text-center p-4">
                  <div className="text-3xl mb-3">{level.icon}</div>
                  <h3 className="text-sm font-semibold text-ktp_black dark:text-ktp_white">
                    {level.name}
                  </h3>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                    selectedLevel === level.name
                      ? "bg-ktp_federal_blue text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}>
                    {selectedLevel === level.name ? "Seçildi" : "Detayları Gör"}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Başlat Butonu */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-ktp_delft_blue to-ktp_federal_blue rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <Button
              type="primary"
              size="large"
              onClick={handleStartSession}
              className="relative bg-gradient-to-r from-ktp_delft_blue to-ktp_federal_blue hover:from-ktp_federal_blue hover:to-ktp_delft_blue text-white px-20 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-0"
              style={{ height: '64px' }}
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl">🚀</span>
                <span>Oturumları Bul ve Başlat</span>
                <span className="text-2xl">✨</span>
              </span>
            </Button>
          </div>
        </div>

        {/* Çalışma Tekniği Modal */}
        <Modal
          title={
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedTechniqueData?.icon}</span>
              <span className="text-xl font-bold">{selectedTechniqueData?.name}</span>
            </div>
          }
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setModalVisible(false)}>
              İptal
            </Button>,
            <Button 
              key="select" 
              type="primary" 
              onClick={() => handleTechniqueSelect(selectedTechniqueData?.id)}
              className="bg-ktp_delft_blue hover:bg-ktp_federal_blue"
            >
              Bu Tekniği Seç
            </Button>
          ]}
          width={800}
          className="technique-modal"
        >
          <div className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {selectedTechniqueData?.details}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                <h4 className="font-bold text-ktp_delft_blue mb-3 flex items-center gap-2">
                  <span>✨</span> Faydaları
                </h4>
                <ul className="space-y-2">
                  {selectedTechniqueData?.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                <h4 className="font-bold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                  <span>📋</span> Adımlar
                </h4>
                <ol className="space-y-2">
                  {selectedTechniqueData?.steps.map((step: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Modal>

        {/* Eğitim Seviyesi Modal */}
        <Modal
          title={
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedEducationData?.icon}</span>
              <span className="text-xl font-bold">{selectedEducationData?.name}</span>
            </div>
          }
          open={educationModalVisible}
          onCancel={() => setEducationModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setEducationModalVisible(false)}>
              İptal
            </Button>,
            <Button 
              key="select" 
              type="primary" 
              onClick={() => handleEducationSelect(selectedEducationData?.name)}
              className="bg-ktp_federal_blue hover:bg-purple-600"
            >
              Bu Seviyeyi Seç
            </Button>
          ]}
          width={800}
          className="education-modal"
        >
          <div className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {selectedEducationData?.details}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
                <h4 className="font-bold text-purple-600 dark:text-purple-400 mb-3 flex items-center gap-2">
                  <span>🎯</span> Özellikler
                </h4>
                <ul className="space-y-2">
                  {selectedEducationData?.characteristics.map((characteristic: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>{characteristic}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
                <h4 className="font-bold text-orange-600 dark:text-orange-400 mb-3 flex items-center gap-2">
                  <span>💡</span> Çalışma İpuçları
                </h4>
                <ul className="space-y-2">
                  {selectedEducationData?.studyTips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

