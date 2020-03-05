import React from "react"
import { View, Text, Image } from "react-native"


export default function Category(props) {
    const data = props.data
    return (
        <View style={{backgroundColor:'white',shadowColor: '#000', shadowOpacity: 0.07, shadowOffset: {width:3,height:3}, shadowRadius: 6, height:130, borderRadius:8, overflow:'hidden', justifyContent:'center', alignItems:'center', marginBottom:18}}>
            <Text style={{fontWeight:'300', fontSize:30, color:'white', zIndex:1, letterSpacing:2}}>{data.name}</Text>

            <View style={{backgroundColor:'#000', opacity: 0.35, position:'absolute', top:0, left:0, right:0, bottom:0}}></View>

            <Image blurRadius={0}
            style={{
                position:'absolute',
                top:0,
                left:0,
                right:0,
                bottom:0,
                zIndex:-1
            }} resizeMode="cover"
            source={{uri: data.image}}/>
        </View>
    )
}