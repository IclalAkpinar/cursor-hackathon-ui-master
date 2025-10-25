import React, { useState, useEffect } from "react";
import { Card, Button, Progress, Modal, Input, message, Tag, Avatar, Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { SendOutlined, ClockCircleOutlined, TeamOutlined, ThunderboltOutlined } from "@ant-design/icons";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isActive: boolean;
  studyArea: string;
}

export const Session: React.FC = () => {
  const navigate = useNavigate();
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [isWorking, setIsWorking] = useState(true);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 dakika = 1500 saniye
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [breakStartTime, setBreakStartTime] = useState<Date | null>(null);
  
  // Mock katılımcılar - gerçek veri API'den gelecek
  const [participants] = useState<Participant[]>([
    { id: "1", name: "Ayşe Yılmaz", avatar: "👩‍💻", isActive: true, studyArea: "İngilizce" },
    { id: "2", name: "Sen", avatar: "👨‍💻", isActive: true, studyArea: "İngilizce" },
    { id: "3", name: "Mehmet Demir", avatar: "🧑‍💻", isActive: true, studyArea: "İngilizce" },
  ]);

  useEffect(() => {
    // Çalışma oturumu başlatıldığında (sadece start screen kapandıktan sonra)
    if (!showStartScreen) {
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
    }
  }, [showStartScreen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatBreakTime = (date: Date | null) => {
    if (!date) return "--:--";
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
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

  const handleStartSession = () => {
    // Mola saatini hesapla (25 dakika sonra)
    const now = new Date();
    const breakTime = new Date(now.getTime() + 25 * 60 * 1000);
    setBreakStartTime(breakTime);
    setShowStartScreen(false);
  };

  return (
    <div className="min-h-screen bg-ktp_white dark:bg-ktp_black p-6">
      <div className="max-w-4xl mx-auto">
        {/* Başlangıç Ekranı */}
        {showStartScreen ? (
          <div className="text-center py-12">
            {/* Başlık */}
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-ktp_delft_blue">Odaklanma</span>
              <span className="text-teal-500">& İşbirliği</span>
              <span className="text-ktp_delft_blue"> Platformu</span>
            </h1>
            
            {/* Alt Başlık */}
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
              Pomodoro tekniği ile verimli çalışın, tartışma oturumlarıyla öğrenin
            </p>

            {/* Özellik Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Odaklanma Modu */}
              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-ktp_delft_blue rounded-full flex items-center justify-center mb-4">
                    <ThunderboltOutlined className="text-white text-2xl" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Odaklanma Modu
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    25 dakikalık kesintisiz çalışma seansları ile maksimum verim
                  </p>
                </div>
              </Card>

              {/* Tartışma Oturumları */}
              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mb-4">
                    <TeamOutlined className="text-white text-2xl" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Tartışma Oturumları
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    30 dakikalık interaktif tartışmalarla daha derin öğrenme
                  </p>
                </div>
              </Card>

              {/* Zaman Yönetimi */}
              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-ktp_delft_blue rounded-full flex items-center justify-center mb-4">
                    <ClockCircleOutlined className="text-white text-2xl" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Zaman Yönetimi
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Otomatik zamanlayıcılar ile zamanınızı etkin kullanın
                  </p>
                </div>
              </Card>
            </div>

            {/* Oturumu Başlat Butonu */}
            <Button
              type="primary"
              size="large"
              onClick={handleStartSession}
              className="bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 border-0 text-white px-12 py-6 text-lg font-semibold shadow-lg flex items-center gap-3 mx-auto"
            >
              <ThunderboltOutlined className="text-white text-xl" />
              Oturumu Başlat
            </Button>
          </div>
        ) : (
          /* Çalışma Oturumu Ekranı */
          isWorking ? (
          <div className="text-center py-8">
            {/* Başlık */}
            <div className="mb-6">
              <div className="inline-block mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <ThunderboltOutlined className="text-white text-4xl" />
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-ktp_delft_blue to-blue-600">
                Odaklanma Zamanı
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Kesintisiz çalışma modu aktif
              </p>
            </div>

            {/* Geri Sayım Kartı */}
            <div className="max-w-2xl mx-auto mb-8">
              <Card className="border-0 shadow-2xl" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <div className="py-6">
                  {/* Büyük Geri Sayım */}
                  <div className="text-7xl font-mono font-bold text-white mb-5 tracking-wider">
                    {formatTime(timeLeft)}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="max-w-sm mx-auto mb-5">
                    <Progress
                      percent={progress}
                      strokeColor={{
                        "0%": "#ffffff",
                        "100%": "#fbbf24",
                      }}
                      strokeWidth={8}
                      showInfo={false}
                      trailColor="rgba(255,255,255,0.3)"
                    />
                  </div>

                  {/* Motivasyon Mesajı */}
                  <div className="flex items-center justify-center gap-2 mt-5">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                    <p className="text-white text-base font-semibold">
                      Rahatsız edilmeyeceksiniz - Odaklanın!
                    </p>
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Katılımcılar Bölümü */}
            <div className="max-w-2xl mx-auto mb-6">
              <Card className="border-0 shadow-lg">
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TeamOutlined className="text-ktp_delft_blue text-xl" />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Bu Oturumu Takip Edenler
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {participants.length} kişi birlikte çalışıyor
                  </p>
                </div>
                
                <div className="flex justify-center items-center gap-6 py-4">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex flex-col items-center">
                      <Badge dot color="green" offset={[-5, 5]}>
                        <Avatar
                          size={64}
                          style={{ 
                            backgroundColor: participant.name === "Sen" ? '#667eea' : '#14b8a6',
                            fontSize: '28px'
                          }}
                        >
                          {participant.avatar}
                        </Avatar>
                      </Badge>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2 max-w-[100px] truncate">
                        {participant.name}
                      </p>
                      <Tag color="blue" className="mt-1">
                        {participant.studyArea}
                      </Tag>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Alt İstatistikler */}
            <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
              <Card className="border-0 shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-ktp_delft_blue">{Math.floor(progress)}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Tamamlanan</div>
                </div>
              </Card>
              <Card className="border-0 shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-500">{25 - Math.floor(timeLeft / 60)}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Geçen Dakika</div>
                </div>
              </Card>
              <Card className="border-0 shadow-lg">
                <div className="text-center">
                  <ClockCircleOutlined className="text-2xl text-orange-500 mb-2" />
                  <div className="text-xl font-bold text-orange-500">{formatBreakTime(breakStartTime)}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Sonraki Mola</div>
                </div>
              </Card>
            </div>

            {/* Oturumu Sonlandır Butonu */}
            <Button
              danger
              size="large"
              onClick={handleEndSession}
              className="mt-4 px-8"
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
        )
        )}
      </div>
    </div>
  );
};

