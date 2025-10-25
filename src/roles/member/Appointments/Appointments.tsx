import React, { useState, useEffect } from "react";
import { Card, Button, Tag, message, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { 
  ClockCircleOutlined, 
  PlayCircleOutlined,
  CalendarOutlined,
  HourglassOutlined,
  CheckCircleOutlined,
  BookOutlined,
  ProfileOutlined
} from "@ant-design/icons";

interface Appointment {
  id: string;
  userName: string;
  technique: string;
  area: string;
  level: string;
  startTime: string;
  status: "pending" | "accepted" | "in-progress";
  countdown: number; // saniye cinsinden
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
};

// Kullanıcıya maskot ata veya varsayılan avatar kullan
const getMascot = (userName: string): string => {
  return USER_MASCOTS[userName] || "👤";
};

export const Appointments: React.FC = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // Demo randevuları - her zaman onaylı ve görünür
    const ahmetAppointment: Appointment = {
      id: "1",
      userName: "Ahmet",
      technique: "Pomodoro Tekniği",
      area: "İngilizce",
      level: "Üniversite",
      startTime: "13:30",
      status: "accepted",
      countdown: 1500, // 25 dakika
    };

    const ayseAppointment: Appointment = {
      id: "demo-2",
      userName: "Ayşe",
      technique: "52/17 Tekniği",
      area: "Data Mining",
      level: "Üniversite",
      startTime: "14:00",
      status: "accepted",
      countdown: 3120, // 52 dakika
    };

    // localStorage'dan randevuları oku
    const savedAppointments = localStorage.getItem("appointments");
    if (savedAppointments) {
      const parsed = JSON.parse(savedAppointments);
      // Demo randevularını kontrol et ve ekle
      const hasAhmet = parsed.some((apt: Appointment) => apt.id === "1");
      const hasAyse = parsed.some((apt: Appointment) => apt.id === "demo-2");
      
      let finalAppointments = [...parsed];
      
      if (!hasAhmet) {
        finalAppointments.unshift(ahmetAppointment);
      }
      if (!hasAyse) {
        finalAppointments.splice(1, 0, ayseAppointment);
      }
      
      setAppointments(finalAppointments);
    } else {
      // Varsayılan örnek randevular
      const defaultAppointments: Appointment[] = [
        {
          id: "1",
          userName: "Ahmet",
          technique: "Pomodoro Tekniği",
          area: "İngilizce",
          level: "Üniversite",
          startTime: "13:30",
          status: "accepted",
          countdown: 1500, // 25 dakika
        },
        {
          id: "demo-2",
          userName: "Ayşe",
          technique: "52/17 Tekniği",
          area: "Data Mining",
          level: "Üniversite",
          startTime: "14:00",
          status: "accepted",
          countdown: 3120, // 52 dakika
        },
        {
          id: "3",
          userName: "Mehmet",
          technique: "Time Blocking",
          area: "Algoritma",
          level: "Üniversite",
          startTime: "15:00",
          status: "accepted",
          countdown: 3600, // 60 dakika
        },
        {
          id: "4",
          userName: "Zeynep",
          technique: "Eisenhower Matrisi",
          area: "Makine Öğrenmesi",
          level: "Üniversite",
          startTime: "16:00",
          status: "accepted",
          countdown: 2700, // 45 dakika
        },
      ];
      setAppointments(defaultAppointments);
      localStorage.setItem("appointments", JSON.stringify(defaultAppointments));
    }
  }, []);

  const handleStartSession = (appointmentId: string) => {
    message.success("Oturum başlatılıyor...");
    navigate(`/session/${appointmentId}`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ktp_white via-purple-50 to-blue-50 dark:from-ktp_black dark:via-ktp_gray dark:to-ktp_gray p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mb-4">
            <CalendarOutlined className="text-3xl text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-3 text-ktp_black dark:text-ktp_white">
            Randevularım
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Bugünkü çalışma planınız ve yaklaşan oturumlarınız
          </p>
        </div>

        {/* Stats Section */}
        {appointments.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="text-center shadow-md border-0 bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
              <div className="text-3xl font-bold">{appointments.length}</div>
              <div className="text-sm opacity-90">Toplam Randevu</div>
            </Card>
            <Card className="text-center shadow-md border-0 bg-gradient-to-br from-green-500 to-emerald-500 text-white">
              <div className="text-3xl font-bold">
                {appointments.filter(a => a.status === "accepted").length}
              </div>
              <div className="text-sm opacity-90">Onaylanan</div>
            </Card>
            <Card className="text-center shadow-md border-0 bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
              <div className="text-3xl font-bold">
                {appointments.filter(a => a.status === "pending").length}
              </div>
              <div className="text-sm opacity-90">Beklemede</div>
            </Card>
          </div>
        )}

        {/* Appointments List */}
        {appointments.length === 0 ? (
          <Card className="shadow-lg border-0">
            <Empty
              description={
                <span className="text-gray-500 dark:text-gray-400">
                  Henüz randevunuz bulunmuyor. Çalışma arkadaşı bulmak için ana sayfaya dönün!
                </span>
              }
            />
          </Card>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card 
                key={appointment.id} 
                hoverable 
                className="mb-4 shadow-md hover:shadow-xl transition-all duration-300 border-0 overflow-hidden"
                style={{
                  background: appointment.status === "accepted" 
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,247,255,0.95) 100%)'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,248,240,0.95) 100%)',
                }}
              >
                <div className="flex items-center justify-between gap-6">
                  {/* Left Section - User Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative">
                      <div 
                        className="flex items-center justify-center border-2 shadow-md rounded-full hover:scale-110 transition-transform duration-300"
                        style={{ 
                          width: '64px', 
                          height: '64px',
                          fontSize: '36px',
                          backgroundColor: appointment.status === "accepted" 
                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                            : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                          borderColor: appointment.status === "accepted" ? '#667eea' : '#f5576c'
                        }}
                      >
                        {getMascot(appointment.userName)}
                      </div>
                      {appointment.status === "accepted" && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-ktp_gray animate-pulse"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-ktp_black dark:text-ktp_white">
                          {appointment.userName}
                        </h3>
                        {appointment.status === "accepted" ? (
                          <Tag 
                            color="success" 
                            icon={<CheckCircleOutlined />}
                            className="text-xs"
                          >
                            Onaylandı
                          </Tag>
                        ) : (
                          <Tag 
                            color="warning" 
                            icon={<HourglassOutlined />}
                            className="text-xs"
                          >
                            Beklemede
                          </Tag>
                        )}
                      </div>
                      
                      {/* Technique Badge */}
                      <div className="mb-2">
                        <Tag 
                          color="processing" 
                          className="text-sm font-semibold px-3 py-1"
                        >
                          {appointment.technique}
                        </Tag>
                      </div>
                      
                      {/* Area and Level */}
                      <div className="flex gap-2 mb-2">
                        <Tag color="success" className="text-sm">
                          📚 {appointment.area}
                        </Tag>
                        <Tag color="warning" className="text-sm">
                          🎓 {appointment.level}
                        </Tag>
                      </div>
                      
                      {/* Time Info */}
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <ClockCircleOutlined className="text-purple-500" />
                        <span className="text-sm font-medium">
                          Başlangıç: <span className="font-bold text-purple-600 dark:text-purple-400">{appointment.startTime}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Section - Actions */}
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    {appointment.status === "accepted" && (
                      <Button
                        type="primary"
                        size="large"
                        icon={<PlayCircleOutlined />}
                        onClick={() => handleStartSession(appointment.id)}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-500 border-0 shadow-md hover:shadow-lg transition-all duration-300"
                        style={{ 
                          height: '50px',
                          borderRadius: '12px',
                          fontSize: '16px',
                          fontWeight: '600',
                          padding: '0 32px'
                        }}
                      >
                        Oturumu Başlat
                      </Button>
                    )}
                    {appointment.status === "pending" && (
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 mb-2">
                          <HourglassOutlined className="text-2xl text-white" />
                        </div>
                        <Tag color="warning" className="px-4 py-1">
                          Beklemede
                        </Tag>
                      </div>
                    )}
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

