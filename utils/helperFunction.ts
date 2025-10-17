import {Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, PERMISSIONS, request } from 'react-native-permissions';

export async function requestLocationPermission() {
  try{
  if(Platform.OS === 'ios'){
    const Result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    if(Result !== 'granted'){
      let askResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      return Boolean(askResult === 'granted')
    }
    return true
  }
  else{
    let Result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    console.log('android',Result);
    if(Result !== 'granted'){
      let askResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      return askResult === 'granted';
    }
    return true
  }}catch (err){
    console.log(err)
  }
}

export async function getUserLocation() {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) return;
  return new Promise((resolve, reject)=>{

    Geolocation.getCurrentPosition(
      (pos) => {
         resolve(pos);
      },
      (error) => {
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  })
}

export function handleRecenter(mapRef:any, markerRegion:any){
  if (mapRef.current) {
    mapRef.current.animateToRegion(markerRegion, 500); // 500ms animation
  }
};