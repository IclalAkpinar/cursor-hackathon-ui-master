import React, { useEffect, useState } from "react";
import { Card, Button, Avatar, Tag, message, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { 
  UserOutlined, 
  ClockCircleOutlined, 
  BookOutlined, 
  TeamOutlined,
  CheckCircleOutlined,
  SendOutlined 
} from "@ant-design/icons";

interface Session {
  id: string;
  userName: string;
  technique: string;
  area: string;
  level: string;
  startTime: string;
  duration: number;
  isPrivate: boolean;
}

export const MatchSessions: React.FC = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [userPreferences, setUserPreferences] = useState<any>(null);

  useEffect(() => {
    // LocalStorage'dan kullanıcı tercihlerini al
    const prefs = localStorage.getItem("studyPreferences");
    if (prefs) {
      setUserPreferences(JSON.parse(prefs));
    }

    // Mock data - gerçek uygulamada API'den gelecek
    const mockSessions: Session[] = [
      {
        id: "1",
        userName: "Ahmet",
        technique: "Pomodoro Tekniği",
        area: "İngilizce",
        level: "Üniversite",
        startTime: "13:30",
        duration: 25,
        isPrivate: false,
      },
      {
        id: "2",
        userName: "Ayşe",
        technique: "52/17 Tekniği",
        area: "Data Mining",
        level: "Üniversite",
        startTime: "14:00",
        duration: 52,
        isPrivate: false,
      },
      {
        id: "3",
        userName: "Mehmet",
        technique: "Time Blocking",
        area: "Diferansiyel Denklem",
        level: "Üniversite",
        startTime: "15:00",
        duration: 60,
        isPrivate: false,
      },
    ];

    // Seçilen tercihlere göre filtreleme
    if (prefs) {
      const prefsObj = JSON.parse(prefs);
      const filtered = mockSessions.filter(
        (session) =>
          session.technique.includes(prefsObj.technique) ||
          session.area === prefsObj.area ||
          session.level === prefsObj.level
      );
      setSessions(filtered);
    } else {
      setSessions(mockSessions);
    }
  }, []);

  const handleJoinRequest = (sessionId: string) => {
    message.success("Katılım isteği gönderildi!");
    // Burada API çağrısı yapılacak
    // Navigate to appointments page
    setTimeout(() => {
      navigate("/appointments");
    }, 1000);
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
                {userPreferences.technique} ile <span className="font-semibold text-ktp_delft_blue">{userPreferences.area}</span> çalışan arkadaşlarını bul
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
                      <Avatar 
                        size={64} 
                        icon={<UserOutlined />}
                        className="border-2 border-ktp_delft_blue shadow-md"
                        style={{ backgroundColor: '#243568' }}
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-ktp_gray"></div>
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
                      icon={<SendOutlined />}
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
                      Katılım İste
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

