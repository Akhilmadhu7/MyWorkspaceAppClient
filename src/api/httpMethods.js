import axios from "axios";

export const httpGet = async ({url, headers, params}) => {
    
    headers = {
        ...headers,
        "accept": "application/json"
    }

    try{
        const response = await axios.get(url, {headers, params});
        console.log("GET response:", response.data);
        return response;
    } catch (error) {  
        console.error("GET error:", error.response ? error.response.data : error.message);
    }
}

export const httpPost = async ({url, data, headers, }) => {
    headers = {
        ...headers,
        "accept": "application/json",
        "Content-Type": "application/json"
    }

    try{

        const response = await axios.post(url, data, {headers});
        console.log("POST response:", response.data);
        return response;

    } catch (error) {
        console.error("POST error:", error.response ? error.response.data : error.message); 
    }
}