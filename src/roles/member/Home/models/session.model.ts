// Çalışma Oturumu Modeli
export interface StudySessionRequest {
  technique: {
    id: string;
    name: string;
    workDuration: number; // dakika cinsinden
    breakDuration: number; // dakika cinsinden
  };
  studyArea: string;
  educationLevel: string;
  startTime?: string; // ISO format: "2024-01-15T13:30:00Z"
  maxParticipants?: number; // default: 2
}

// Teknikler için süre yapılandırması
export const TECHNIQUE_CONFIGS = {
  pomodoro: {
    id: "pomodoro",
    name: "Pomodoro Tekniği",
    workDuration: 25,
    breakDuration: 5,
  },
  "52-17": {
    id: "52-17",
    name: "52/17 Tekniği",
    workDuration: 52,
    breakDuration: 17,
  },
  "time-blocking": {
    id: "time-blocking",
    name: "Time Blocking",
    workDuration: 60,
    breakDuration: 15,
  },
  eisenhower: {
    id: "eisenhower",
    name: "Eisenhower Matrisi",
    workDuration: 45,
    breakDuration: 10,
  },
};

// JSON Örnekleri:

// 1. Pomodoro Tekniği ile İngilizce çalışmak
/*
{
  "technique": {
    "id": "pomodoro",
    "name": "Pomodoro Tekniği",
    "workDuration": 25,
    "breakDuration": 5
  },
  "studyArea": "İngilizce",
  "educationLevel": "Üniversite",
  "startTime": "2024-01-15T13:30:00Z",
  "maxParticipants": 2
}
*/

// 2. 52/17 Tekniği ile Data Mining çalışmak
/*
{
  "technique": {
    "id": "52-17",
    "name": "52/17 Tekniği",
    "workDuration": 52,
    "breakDuration": 17
  },
  "studyArea": "Data Mining",
  "educationLevel": "Üniversite",
  "startTime": "2024-01-15T14:00:00Z",
  "maxParticipants": 2
}
*/

// 3. Time Blocking ile Diferansiyel Denklem çalışmak
/*
{
  "technique": {
    "id": "time-blocking",
    "name": "Time Blocking",
    "workDuration": 60,
    "breakDuration": 15
  },
  "studyArea": "Diferansiyel Denklem",
  "educationLevel": "Üniversite",
  "startTime": "2024-01-15T15:00:00Z",
  "maxParticipants": 2
}
*/

