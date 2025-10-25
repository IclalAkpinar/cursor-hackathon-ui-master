import OriginalAxios from "axios";

export const profileApi = OriginalAxios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// API Response Types
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface UserInfo {
  _id: string;
  userId: string;
  gender: "male" | "female";
  educationLevel: "primary_school" | "middle_school" | "high_school" | "undergraduate" | "graduate" | "doctorate" | "other";
  careerGoal: string;
  currentStatus: string;
  interests: string[];
  weaknesses: string[];
  strengths: string[];
  learningGoals: string;
  availableStudyTime: string;
  preferredLanguage: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserInfoCreate {
  gender: "male" | "female";
  educationLevel: "primary_school" | "middle_school" | "high_school" | "undergraduate" | "graduate" | "doctorate" | "other";
  careerGoal: string;
  currentStatus: string;
  interests: string[];
  weaknesses: string[];
  strengths: string[];
  learningGoals: string;
  availableStudyTime: string;
  preferredLanguage: string;
}

export interface AiPromptResponse {
  prompt: string;
}