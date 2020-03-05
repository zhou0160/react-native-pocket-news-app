import React from 'react'
import { View, Text, ActivityIndicator} from 'react-native';

export default function Loading(){
    return(
        <View style={{            
            position: 'absolute',
            top:0,
            left:0,
            right:0,
            bottom:0,
            backgroundColor:'rgba(225, 225, 225, 0.6)',
            justifyContent:'center',
            alignItems:'center'
        }}>
            <View style={{backgroundColor:'rgba(0, 0, 0, 0.2)', paddingHorizontal:40, paddingVertical: 30 , borderRadius: 8}}> 
                <ActivityIndicator size="large" color="#1478C7" />
                <Text style={{marginTop:20, opacity: 0.8, color:'white'}}>Loading...</Text>
            </View>
        </View>
    )
}