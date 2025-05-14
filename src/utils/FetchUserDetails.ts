import { jwtDecode } from "jwt-decode";
import { GlobalStore, userDetailsValue } from "@src/utils/GlobalStore";
import axiosInstance from "@src/api/authApi";

const useFetchUserDetails = () => {
    const { setUserDetails } = GlobalStore();

    const fetch = async () => {
        const token = sessionStorage.getItem("accessToken");
        const decodedToken = token != null ? jwtDecode(token) : userDetailsValue;

        try {
            const response = await axiosInstance.get("user-management/users/me/profile");
            const photoData = JSON.parse(response.data.photo);
            const photoPath = photoData[0]?.path;
            console.log('response: ', response.data.extension)
            setUserDetails({
                ...response.data,
                extension: response.data.extension == 'undefined' ? '' : response.data.extension,
                photo: photoPath,
                username: (decodedToken as any).sub
                
            });
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    return fetch;
};

export default useFetchUserDetails;
