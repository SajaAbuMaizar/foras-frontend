import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

interface SignInData {
  phone: string;
  password: string;
}

interface SignUpData {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  password: string;
  preferredLanguage: string;
}

interface PasswordResetData {
  phone: string;
  userType: string;
}

export const signInEmployer = async (data: SignInData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/employer/signin`,
      data
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    throw error;
  }
};

export const signUpEmployer = async (data: SignUpData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/employer/signup`,
      data
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    throw error;
  }
};

export const requestPasswordReset = async (data: PasswordResetData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/forgot-password`,
      data
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    throw error;
  }
};
