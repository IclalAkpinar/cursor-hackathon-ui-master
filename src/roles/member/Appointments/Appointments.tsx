import React, { useState, useEffect } from "react";
import { Card, Button, Avatar, Tag, message } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, ClockCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";

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

export const Appointments: React.FC = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      userName: "Ahmet",
      technique: "Pomodoro Tekniği",
      area: "İngilizce",
      level: "Üniversite",
      startTime: "13:30",
      status: "accepted",
      countdown: 1800, // 30 dakika
    },
    {
      id: "2",
      userName: "Ayşe",
      technique: "52/17 Tekniği",
      area: "Data Mining",
      level: "Üniversite",
      startTime: "14:00",
      status: "pending",
      countdown: 3600,
    },
  ]);

  const handleStartSession = (appointmentId: string) => {
    message.success("Oturum başlatılıyor...");
    navigate(`/session/${appointmentId}`);
  };

  const CountdownDisplay = ({ appointment }: { appointment: Appointment }) => {
    const [timeLeft, setTimeLeft] = useState(appointment.countdown);

    useEffect(() => {
      if (timeLeft <= 0) {
        message.success("Oturum başladı!");
        handleStartSession(appointment.id);
        return;
      }

      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }, [timeLeft, appointment.id]);

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
      <div className="flex items-center gap-2">
        <ClockCircleOutlined />
        <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-ktp_white dark:bg-ktp_black p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-ktp_black dark:text-ktp_white">
          Randevularım
        </h1>

        {appointments.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Henüz randevunuz bulunmuyor.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar size={48} icon={<UserOutlined />} />
                    <div>
                      <h3 className="text-lg font-semibold text-ktp_black dark:text-ktp_white">
                        {appointment.userName}
                      </h3>
                      <div className="flex gap-2 mt-2">
                        <Tag color="blue">{appointment.technique}</Tag>
                        <Tag color="green">{appointment.area}</Tag>
                        <Tag color="orange">{appointment.level}</Tag>
                      </div>
                      <div className="mt-2 text-gray-600 dark:text-gray-400">
                        Başlangıç: {appointment.startTime}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {appointment.status === "accepted" && (
                      <>
                        <CountdownDisplay appointment={appointment} />
                        <Button
                          type="primary"
                          icon={<PlayCircleOutlined />}
                          onClick={() => handleStartSession(appointment.id)}
                          className="bg-ktp_delft_blue hover:bg-ktp_federal_blue"
                        >
                          Başlat
                        </Button>
                      </>
                    )}
                    {appointment.status === "pending" && (
                      <Tag color="warning">Beklemede</Tag>
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

