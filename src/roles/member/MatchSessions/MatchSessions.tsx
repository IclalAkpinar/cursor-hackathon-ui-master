import React, { useEffect, useState } from "react";
import { Card, Button, Avatar, Tag, message } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, ClockCircleOutlined } from "@ant-design/icons";

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
    <div className="min-h-screen bg-ktp_white dark:bg-ktp_black p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-ktp_black dark:text-ktp_white">
          Mevcut Oturumlar
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {userPreferences &&
            `${userPreferences.technique} tekniği ile ${userPreferences.area} çalışan kullanıcılar`}
        </p>

        {sessions.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Henüz uygun oturum bulunamadı. Daha sonra tekrar deneyin.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <Card key={session.id} hoverable className="mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar size={48} icon={<UserOutlined />} />
                    <div>
                      <h3 className="text-lg font-semibold text-ktp_black dark:text-ktp_white">
                        {session.userName}
                      </h3>
                      <div className="flex gap-2 mt-2">
                        <Tag color="blue">{session.technique}</Tag>
                        <Tag color="green">{session.area}</Tag>
                        <Tag color="orange">{session.level}</Tag>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400">
                        <ClockCircleOutlined />
                        <span>
                          {session.startTime} • {session.duration} dakika
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    type="primary"
                    onClick={() => handleJoinRequest(session.id)}
                    className="bg-ktp_delft_blue hover:bg-ktp_federal_blue"
                  >
                    Katılım İste
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

