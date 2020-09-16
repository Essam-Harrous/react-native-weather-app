import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'
import Axios from 'axios';

import WeatherInfo from './componenets/WeatherInfo'

const WEATHER_API_KEY = '657d49701e2d06b2ea90bed9fba3274c' ;
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?' ;
export default function App() {
  const [currentWeather, setCurrentWeather] = useState(null)  

  useEffect(() => {
  Location.requestPermissionsAsync().then(res => {
    if(res.status != 'granted') {
      alert('Allow Location is needed')
      return
    }
    return Location.getCurrentPositionAsync()
  }).then(res => {
    let {latitude, longitude} = res.coords
    return Axios.get(`${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`)
  }).then(res => {
    setCurrentWeather(res.data)
  }).catch(err => {
    console.log(err.message)
  })
  }, [])

  if(currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <WeatherInfo currentWeather={currentWeather} />
        </View>
      </View>
    );
  }else {
    return (
      <View style={styles.container}>
        <Text>Fetching weather data....</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  }
});
