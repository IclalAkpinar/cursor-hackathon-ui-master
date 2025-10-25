import React, { useState, useEffect } from "react";
import { Card, Button, Progress, Modal, Input, message, Tag } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { MessageOutlined, SendOutlined } from "@ant-design/icons";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

export const Session: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isWorking, setIsWorking] = useState(true);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 dakika = 1500 saniye
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    // Çalışma oturumu başlatıldığında
    const workTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsWorking(false);
          clearInterval(workTimer);
          message.success("Çalışma oturumu tamamlandı! Şimdi tartışma zamanı.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(workTimer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: "Sen",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleEndSession = () => {
    Modal.confirm({
      title: "Oturumu Sonlandır",
      content: "Oturumu sonlandırmak istediğinize emin misiniz?",
      onOk: () => {
        message.success("Oturum sonlandırıldı.");
        navigate("/appointments");
      },
    });
  };

  return (
    <div className="min-h-screen bg-ktp_white dark:bg-ktp_black p-6">
      <div className="max-w-4xl mx-auto">
        {/* Çalışma Oturumu Ekranı */}
        {isWorking ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-ktp_black dark:text-ktp_white">
              🎯 Odaklanma Zamanı
            </h1>
            <Card className="mb-6">
              <div className="text-6xl font-mono font-bold text-ktp_delft_blue mb-4">
                {formatTime(timeLeft)}
              </div>
              <Progress
                percent={progress}
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                showInfo={false}
              />
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Rahatsız edilmeyeceksiniz - Odaklanın!
              </p>
            </Card>
            <Button
              danger
              onClick={handleEndSession}
              className="mt-4"
            >
              Oturumu Sonlandır
            </Button>
          </div>
        ) : (
          /* Tartışma Oturumu Ekranı */
          <div>
            <h1 className="text-3xl font-bold mb-6 text-ktp_black dark:text-ktp_white">
              💬 Tartışma Zamanı
            </h1>
            <Card>
              <div className="mb-4">
                <Tag color="green" className="mb-2">
                  30 dakika tartışma süresi
                </Tag>
                <p className="text-gray-600 dark:text-gray-400">
                  Çalıştığınız konular hakkında konuşun ve tartışın.
                </p>
              </div>

              {/* Chat Bölümü */}
              <div className="border rounded-lg p-4 mb-4" style={{ height: "400px", overflowY: "auto" }}>
                {messages.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    Henüz mesaj yok. İlk mesajı siz gönderin!
                  </div>
                ) : (
                  <div className="space-y-2">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-2 rounded ${
                          msg.sender === "Sen"
                            ? "bg-blue-100 dark:bg-blue-900 ml-auto text-right"
                            : "bg-gray-100 dark:bg-gray-800"
                        }`}
                        style={{ maxWidth: "70%" }}
                      >
                        <div className="font-semibold">{msg.sender}</div>
                        <div>{msg.text}</div>
                        <div className="text-xs text-gray-500">{msg.timestamp}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mesaj Gönderme */}
              <div className="flex gap-2">
                <Input
                  placeholder="Mesajınızı yazın..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onPressEnter={handleSendMessage}
                  size="large"
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                  className="bg-ktp_delft_blue hover:bg-ktp_federal_blue"
                >
                  Gönder
                </Button>
              </div>

              <Button
                danger
                onClick={handleEndSession}
                className="mt-4"
              >
                Oturumu Sonlandır
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

