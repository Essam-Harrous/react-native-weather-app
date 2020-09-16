import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'

const WeatherInfo = ({currentWeather}) => {
    const {
        main: {temp},
        name,
        weather: [details]
    } = currentWeather
    const {icon, description, main} = details
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`
    return (
        <View style={style.weatherInfo}>
            <Text> {name} </Text>
            <Image style={style.weatherIcon} source={{uri: iconUrl}}/>
            <Text> {temp} </Text>
            <Text style={style.weatherDes}> {description} </Text>
            <Text> {main} </Text>
        </View>
    )
}

const style = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center'
    },
    weatherDes: {
        textTransform: 'capitalize'
    },
    weatherIcon: {
        width: 100,
        height: 100
    }
})

export default WeatherInfo
