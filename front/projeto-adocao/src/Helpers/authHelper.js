
import axios from "axios";

export async function checarLogin() {
    const id = getUserId();
    if (id !== false) {
        const response = await axios.post("http://127.0.0.1:8000/api/verify/", {
            token: localStorage.getItem("accessToken")
        }).catch((error) => {
            console.error(error);
        });

        if (response.status !== 200) {
            console.log(response);
            return false;
        }
        return true;
    }
    else {
        return false;
    }
}
export function getUserId() {
    if (localStorage.getItem("accessToken") === null) {
        return false;
    }
    else {
        const tokenPayload = localStorage.getItem("accessToken").split(".")[1];
        const tokenPayLoadJSON = JSON.parse(atob(tokenPayload));
        const userId = tokenPayLoadJSON.user_id;
        return userId;
    }
}


