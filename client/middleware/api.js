import { SERVER_URI } from "@/utils/uri";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Tạo instance axios
const apiClient = axios.create({
    baseURL: SERVER_URI,
});

// Hàm lấy Access Token từ AsyncStorage
const getAccessToken = async () => {
    try {
        const token = await AsyncStorage.getItem('access_token');
        return token;
    } catch (error) {
        console.error('Error fetching access token:', error);
        return null;
    }
};

// Hàm lấy Refresh Token từ AsyncStorage
const getRefreshToken = async () => {
    try {
        const token = await SecureStore.getItemAsync('refreshToken');
        return token;
    } catch (error) {
        console.error('Lỗi khi lấy Refresh Token:', error);
        return null;
    }
};

// Thêm Access Token vào mỗi request qua interceptor
apiClient.interceptors.request.use(
    async (config) => {
        const token = await getAccessToken();  // Lấy Access Token từ AsyncStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;  // Thêm token vào header Authorization
        }
        return config;  // Tiến hành request
    },
    (error) => {
        return Promise.reject(error);  // Xử lý lỗi nếu có
    }
);

// Xử lý phản hồi (response) và làm mới Access Token nếu cần thiết
apiClient.interceptors.response.use(
    (response) => {
        // Nếu response thành công, trả về dữ liệu như bình thường
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Kiểm tra nếu lỗi là do Access Token hết hạn (401)
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;  // Đánh dấu rằng đã thử làm mới token một lần

            // Lấy Refresh Token từ AsyncStorage
            const refreshToken = await getRefreshToken();

            if (refreshToken) {
                try {
                    // Gửi Refresh Token tới server để lấy Access Token mới
                    const response = await axios.post(`${SERVER_URI}/refresh`, {
                        refreshToken: refreshToken,
                    });

                    const newAccessToken = response.data.access_token;
                    const newRefreshToken = response.data.refresh_token;

                    // Lưu lại Access Token và Refresh Token mới vào AsyncStorage
                    await AsyncStorage.setItem('access_token', newAccessToken);
                    if (newRefreshToken) {
                        await AsyncStorage.setItem('refresh_token', newRefreshToken);
                    }

                    // Cập nhật lại Authorization header với Access Token mới
                    originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;

                    // Gửi lại request ban đầu với Access Token mới
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    console.error('Error refreshing token:', refreshError);
                    // Nếu Refresh Token cũng hết hạn hoặc có lỗi, người dùng cần đăng nhập lại
                    await handleLogout();
                    return Promise.reject(refreshError);
                }
            }
        }

        // Nếu không phải lỗi 401 hoặc lỗi khác, trả về lỗi gốc
        return Promise.reject(error);
    }
);

export default apiClient;
