export const getCurrentLocation = async()=>{
    try {
        if(!navigator.geolocation){
            throw new Error("Geo location is not supported in the browser");
        }

        const position = await new Promise((resolve, reject)=>{
            navigator.geolocation.getCurrentPosition(resolve,reject);
        })

        const {latitude, longitude} = position.coords;

        return {
            lat: latitude,
            lon: longitude
        }
    } catch (error) {
        console.error("Error in getting device location",error);
        throw error;
    }
}