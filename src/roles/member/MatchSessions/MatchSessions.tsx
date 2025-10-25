import React, { useEffect, useState } from "react";
import { Card, Button, Tag, message, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { 
  ClockCircleOutlined, 
  BookOutlined, 
  TeamOutlined,
  CheckCircleOutlined,
  PlayCircleOutlined
} from "@ant-design/icons";

interface Session {
  id: string;
  userName: string;
  technique: string;
  techniqueId: string;
  area: string;
  level: string;
  startTime: string;
  duration: number;
  isPrivate: boolean;
  currentParticipants: number;
  maxParticipants: number;
}

// Kullanıcı maskotları - her kullanıcıya tatlı bir karakter
const USER_MASCOTS: Record<string, string> = {
  "Ahmet": "🐻",
  "Ayşe": "🐰",
  "Mehmet": "🦊",
  "Zeynep": "🐼",
  "Ali": "🐸",
  "Fatma": "🐱",
  "Mustafa": "🦁",
  "Ayşegül": "🐶",
  "Burak": "🐨",
  "Elif": "🦄",
  "Can": "🐭",
  "Merve": "🐧",
  "Deniz": "🐬",
  "Arda": "🦉",
  "Ceren": "🦋",
  "Emre": "🐯",
  "Gizem": "🦄",
  "Hakan": "🐺",
  "Irmak": "🐿️",
  "Kaan": "🦆",
  "Leyla": "🐨",
};

// Kullanıcıya maskot ata veya varsayılan avatar kullan
const getMascot = (userName: string): string => {
  return USER_MASCOTS[userName] || "👤";
};

// Teknik ID'den teknik ismine mapping
const TECHNIQUE_NAMES: Record<string, string> = {
  "pomodoro": "Pomodoro Tekniği",
  "52-17": "52/17 Tekniği",
  "time-blocking": "Time Blocking",
  "eisenhower": "Eisenhower Matrisi",
};

export const MatchSessions: React.FC = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [userPreferences, setUserPreferences] = useState<any>(null);
  const [allSessions, setAllSessions] = useState<Session[]>([]);

  useEffect(() => {
    // LocalStorage'dan kullanıcı tercihlerini al
    const prefs = localStorage.getItem("studyPreferences");
    if (prefs) {
      setUserPreferences(JSON.parse(prefs));
    }

    // Mock data - gerçek uygulamada API'den gelecek
    // Her teknik ve alan kombinasyonu için oturumlar oluşturuldu
    const users = ["Ahmet", "Ayşe", "Mehmet", "Zeynep", "Ali", "Fatma", "Mustafa", "Ayşegül", "Burak", "Elif", "Deniz", "Arda", "Ceren", "Emre", "Gizem", "Hakan", "Irmak", "Kaan", "Leyla", "Mert"];
    const areas = ["İngilizce", "Data Mining", "Diferansiyel Denklem", "Algoritma", "Veri Yapıları", "Makine Öğrenmesi", "Web Geliştirme", "Mobil Geliştirme"];
    const techniques = [
      { id: "pomodoro", name: "Pomodoro Tekniği", duration: 25 },
      { id: "52-17", name: "52/17 Tekniği", duration: 52 },
      { id: "time-blocking", name: "Time Blocking", duration: 60 },
      { id: "eisenhower", name: "Eisenhower Matrisi", duration: 45 },
    ];
    const levels = ["İlkokul", "Ortaokul", "Lise", "Üniversite", "Yüksek Lisans"];
    
    let sessionId = 1;
    const mockSessions: Session[] = [];
    
    // Her teknik ve alan kombinasyonu için oturumlar oluştur
    techniques.forEach((technique, techIndex) => {
      areas.forEach((area, areaIndex) => {
        // Her alan için farklı seviyelerden oturumlar
        const level = levels[techIndex % levels.length];
        const currentId = sessionId;
        const hour = 9 + Math.floor(currentId / 3);
        const minute = (currentId * 15) % 60;
        const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        mockSessions.push({
          id: String(sessionId++),
          userName: users[(techIndex * areas.length + areaIndex) % users.length],
          technique: technique.name,
          techniqueId: technique.id,
          area: area,
          level: level,
          startTime: startTime,
          duration: technique.duration,
          isPrivate: false,
          currentParticipants: Math.floor(Math.random() * 2),
          maxParticipants: 2,
        });
      });
    });

    // Tüm oturumları sakla
    setAllSessions(mockSessions);

    // Seçilen tercihlere göre filtreleme
    if (prefs) {
      const prefsObj = JSON.parse(prefs);
      
      // Önce tam eşleşmeleri bul
      let filtered = mockSessions.filter(
        (session) =>
          session.techniqueId === prefsObj.technique &&
          session.area === prefsObj.area &&
          session.level === prefsObj.level
      );
      
      // Eğer tam eşleşme yoksa, teknik ve alan eşleşmelerini göster
      if (filtered.length === 0) {
        filtered = mockSessions.filter(
          (session) =>
            session.techniqueId === prefsObj.technique &&
            session.area === prefsObj.area
        );
      }
      
      // Hala boşsa, sadece teknik eşleşmelerini göster
      if (filtered.length === 0) {
        filtered = mockSessions.filter(
          (session) => session.techniqueId === prefsObj.technique
        );
      }
      
      // En azından birkaç sonuç göster
      if (filtered.length === 0) {
        filtered = mockSessions.slice(0, 10);
      }
      
      setSessions(filtered);
    } else {
      setSessions(mockSessions);
    }
  }, []);

  const handleJoinRequest = (sessionId: string) => {
    // Seçilen oturumu bul - allSessions kullan
    const selectedSession = allSessions.find(s => s.id === sessionId);
    
    if (selectedSession) {
      // Oturumu localStorage'a kaydet
      const existingAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
      const newAppointment = {
        id: selectedSession.id,
        userName: selectedSession.userName,
        technique: selectedSession.technique,
        area: selectedSession.area,
        level: selectedSession.level,
        startTime: selectedSession.startTime,
        status: "accepted" as const,
        countdown: selectedSession.duration * 60, // dakikayı saniyeye çevir
      };
      
      existingAppointments.push(newAppointment);
      localStorage.setItem("appointments", JSON.stringify(existingAppointments));
      
      message.success("Oturum randevularınıza eklendi!");
      
      // Navigate to appointments page
      setTimeout(() => {
        navigate("/appointments");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ktp_white via-ktp_white to-blue-50 dark:from-ktp_black dark:via-ktp_gray dark:to-ktp_gray p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-ktp_delft_blue to-ktp_federal_blue mb-4">
            <TeamOutlined className="text-3xl text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-3 text-ktp_black dark:text-ktp_white">
            Çalışma Arkadaşı Bul
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {userPreferences ? (
              <>
                <BookOutlined className="mr-2" />
                {TECHNIQUE_NAMES[userPreferences.technique] || userPreferences.technique} ile <span className="font-semibold text-ktp_delft_blue">{userPreferences.area}</span> çalışan arkadaşlarını bul
              </>
            ) : (
              "Aynı hedeflerle çalışan arkadaşlarını keşfet"
            )}
          </p>
        </div>

        {/* Sessions List */}
        {sessions.length === 0 ? (
          <Card className="shadow-lg border-0">
            <Empty
              description={
                <span className="text-gray-500 dark:text-gray-400">
                  Henüz uygun oturum bulunamadı. Biraz sonra tekrar kontrol et!
                </span>
              }
            />
          </Card>
        ) : (
          <div className="space-y-4">
            {sessions.map((session, index) => (
              <Card 
                key={session.id} 
                hoverable 
                className="mb-4 shadow-md hover:shadow-xl transition-all duration-300 border-0 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,247,255,0.95) 100%)',
                }}
              >
                <div className="flex items-center justify-between gap-6">
                  {/* Left Section - User Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative">
                      <div 
                        className="flex items-center justify-center border-2 border-ktp_delft_blue shadow-md rounded-full bg-gradient-to-br from-blue-100 to-purple-100 hover:scale-110 transition-transform duration-300"
                        style={{ 
                          width: '64px', 
                          height: '64px',
                          fontSize: '36px'
                        }}
                      >
                        {getMascot(session.userName)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-ktp_gray animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-ktp_black dark:text-ktp_white">
                          {session.userName}
                        </h3>
                        <Tag 
                          color="success" 
                          icon={<CheckCircleOutlined />}
                          className="text-xs"
                        >
                          Aktif
                        </Tag>
                      </div>
                      
                      {/* Technique Badge */}
                      <div className="mb-2">
                        <Tag 
                          color="processing" 
                          className="text-sm font-semibold px-3 py-1"
                        >
                          {session.technique}
                        </Tag>
                      </div>
                      
                      {/* Area and Level */}
                      <div className="flex gap-2 mb-2">
                        <Tag color="success" className="text-sm">
                          📚 {session.area}
                        </Tag>
                        <Tag color="warning" className="text-sm">
                          🎓 {session.level}
                        </Tag>
                        <Tag color="purple" className="text-sm">
                          👥 {session.currentParticipants}/{session.maxParticipants}
                        </Tag>
                      </div>
                      
                      {/* Time Info */}
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <ClockCircleOutlined className="text-ktp_delft_blue" />
                        <span className="text-sm font-medium">
                          Başlangıç: <span className="font-bold text-ktp_delft_blue">{session.startTime}</span>
                        </span>
                        <span className="mx-2">•</span>
                        <span className="text-sm">
                          Süre: <span className="font-semibold">{session.duration} dk</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Section - Action Button */}
                  <div className="flex-shrink-0">
                    <Button
                      type="primary"
                      size="large"
                      icon={<PlayCircleOutlined />}
                      onClick={() => handleJoinRequest(session.id)}
                      className="bg-gradient-to-r from-ktp_delft_blue to-ktp_federal_blue hover:from-ktp_federal_blue hover:to-ktp_delft_blue border-0 shadow-md hover:shadow-lg transition-all duration-300"
                      style={{ 
                        height: '50px',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                        padding: '0 32px'
                      }}
                    >
                      Randevuya Ekle
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

