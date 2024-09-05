import { ref, reactive } from 'vue';
import { GeoResponse } from '../Models/GeoResponse';
import { OpenStreetMapResponse } from '../Models/OpenStreetMapResponse';
import { isIP } from 'is-ip';
import isValidDomain from 'is-valid-domain';
import { fetchGeoData, fetchLocationData } from '../services/apiService';

export default function useGeoLocation() {
    const info = reactive({
        ip: '',
        location: '',
        timezone: '',
        isp: '',
    })

    const location = reactive({
        lat: 0,
        lon: 0
    })

    const pending = ref(false)
    const errorMessage = ref('')
    const showError = ref(false)
    let lastSubmit = ''

    const getPosition = (ipOrDomain: string | null = null, ignoreRepeat: boolean = false) => {
        if (ipOrDomain == lastSubmit && !ignoreRepeat) return

        let endpoint = 'country';

        if (ipOrDomain && ipOrDomain !== '') {
            if (isIP(ipOrDomain)) {
                endpoint += `?ipAddress=${ipOrDomain}`
            } else if (isValidDomain(ipOrDomain)) {
                endpoint += `?domain=${ipOrDomain}`
            } else {
                showErrorWithMessage('Invalid IP or domain')
                return
            }
        }

        clearInfo();
        pending.value = true
        fetchGeoData(endpoint)
            .then((data) => {
                updateInfo(data);
                return fetchLocationData(info.location)
            })
            .then((data) => {
                updateLocation(data[0])
                if(ipOrDomain != null) lastSubmit = ipOrDomain
            })
            .catch((err) => handleApiError(err, ipOrDomain))
            .finally(() => pending.value = false)
    };

    const clearInfo = () => {
        info.ip = ''
        info.location = ''
        info.timezone = ''
        info.isp = ''
    };

    const updateInfo = (data: GeoResponse) => {
        info.ip = data.ip
        info.location = `${data.location.region}, ${data.location.country}`
        info.timezone = data.location.timezone
        info.isp = data.isp
    };

    const updateLocation = (locationData: OpenStreetMapResponse[0]) => {
        location.lat = Number(locationData.lat)
        location.lon = Number(locationData.lon)
    };

    const handleApiError = (err: any, ipOrDomain: string | null) => {
        if (err.response.status === 400) {
            showErrorWithMessage(`'${ipOrDomain}' not found`)
            getPosition(lastSubmit, true)
        }
    };

    const showErrorWithMessage = (message: string) => {
        errorMessage.value = message
        showError.value = true
        setTimeout(() => (showError.value = false), 4000)
    };

    return { info, location, getPosition, showError, errorMessage, pending }
}
