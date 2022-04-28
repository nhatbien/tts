import { host } from "../helper/config"
import axios from 'axios'
class ServiceTTS {
    async zaloTts(data,keyzl) {

        const response = await axios.post('https://api.zalo.ai/v1/tts/synthesize', data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'apikey':  keyzl,
                },
            }
        )
            console.log(response);
        if (response && response.status === 200) {
            return response.data || {}
        }
        
    }
    async viettelTts(data) {

        const response = await axios.post('https://viettelgroup.ai/voice/api/tts/v1/rest/syn', data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'token': '-F0SMY5Osg6h7XmWAEwRFX5mXOEHBqaQOSglK6oILK74QOalzrx5VPr8BTSTqUTm'
                },
            }
        )

        if (response && response.status === 200) {
            return response.data || {}
        }

    }
    async saveTTS(data) {

        const response = await axios.post(host + "/tts/create", data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // 'token': '-F0SMY5Osg6h7XmWAEwRFX5mXOEHBqaQOSglK6oILK74QOalzrx5VPr8BTSTqUTm'
                },
            }
        )

        if (response && response.status === 200) {
            return response.data || {}
        }

    }
    async getAll(data) {
        console.log(data);
        const response = await axios.get(host + "/tts/all",
            {
                params: {
                    userid: data
                },
                headers: {
                    // 'token': '-F0SMY5Osg6h7XmWAEwRFX5mXOEHBqaQOSglK6oILK74QOalzrx5VPr8BTSTqUTm'
                },
            }
        )

        if (response && response.status === 200) {
            return response.data || {}
        }

    }
    async delete(data) {
        const response = await axios.post(host + "/tts/delete", data,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        }
        )

        if (response && response.status === 200) {
            return response.data || {}
        }

    }

}
export default new ServiceTTS();
