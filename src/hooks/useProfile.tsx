import { useState, useEffect } from "react";
import { profileApi, ApiResponse, UserInfo, UserInfoCreate, AiPromptResponse } from "../utils/profileApi";

export const useProfile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching user info...");
      
      const response = await profileApi.get<ApiResponse<UserInfo>>("/user-info");
      console.log("Fetch response:", response.data);
      
      if (response.data.status) {
        setUserInfo(response.data.data);
        console.log("User info loaded:", response.data.data);
      } else {
        // Profil yoksa hata verme, sadece null bırak
        setUserInfo(null);
        setError(null);
        console.log("No user info found");
      }
    } catch (err: any) {
      console.error("Fetch user info error:", err);
      console.error("Error response:", err.response?.data);
      // 404 veya profil yoksa hata verme, sadece null bırak
      if (err.response?.status === 404 || err.response?.status === 401) {
        setUserInfo(null);
        setError(null);
        console.log("User not found or not authenticated");
      } else {
        setError(err.response?.data?.message || "Profil bilgileri alınamadı");
      }
    } finally {
      setLoading(false);
    }
  };

  const createUserInfo = async (data: UserInfoCreate) => {
    try {
      setLoading(true);
      setError(null);
      console.log("Creating user info with data:", data);
      
      const response = await profileApi.post<ApiResponse<UserInfo>>("/user-info", data);
      console.log("Create response:", response.data);
      
      if (response.data.status) {
        setUserInfo(response.data.data);
        return { success: true, data: response.data.data };
      } else {
        setError(response.data.message);
        return { success: false, error: response.data.message };
      }
    } catch (err: any) {
      console.error("Create user info error:", err);
      console.error("Error response:", err.response?.data);
      const errorMessage = err.response?.data?.message || "Profil oluşturulamadı";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateUserInfo = async (data: Partial<UserInfoCreate>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await profileApi.patch<ApiResponse<UserInfo>>("/user-info", data);
      
      if (response.data.status) {
        setUserInfo(response.data.data);
        return { success: true, data: response.data.data };
      } else {
        setError(response.data.message);
        return { success: false, error: response.data.message };
      }
    } catch (err: any) {
      console.error("Update user info error:", err);
      const errorMessage = err.response?.data?.message || "Profil güncellenemedi";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const deleteUserInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await profileApi.delete<ApiResponse<{ deleted: boolean }>>("/user-info");
      
      if (response.data.status) {
        setUserInfo(null);
        return { success: true };
      } else {
        setError(response.data.message);
        return { success: false, error: response.data.message };
      }
    } catch (err: any) {
      console.error("Delete user info error:", err);
      const errorMessage = err.response?.data?.message || "Profil silinemedi";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getAiPrompt = async () => {
    try {
      const response = await profileApi.get<ApiResponse<AiPromptResponse>>("/user-info/ai-prompt");
      
      if (response.data.status) {
        return { success: true, data: response.data.data.prompt };
      } else {
        return { success: false, error: response.data.message };
      }
    } catch (err: any) {
      console.error("Get AI prompt error:", err);
      const errorMessage = err.response?.data?.message || "AI prompt alınamadı";
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return {
    userInfo,
    loading,
    error,
    fetchUserInfo,
    createUserInfo,
    updateUserInfo,
    deleteUserInfo,
    getAiPrompt,
  };
};