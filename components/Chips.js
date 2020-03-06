import React from 'react'
import { View, Text, TouchableOpacity} from 'react-native';
import { Icon } from "react-native-elements";

export default function Loading(props){
    return (
        <TouchableOpacity onPress={()=>{props.useRencentSearch(props.searchItem)}}>
        <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center', paddingLeft:20, paddingRight:13, paddingVertical:9, backgroundColor:'#ddd',marginRight:15, borderRadius:50, marginBottom:15}}>
            <Text style={{fontWeight:'400',marginRight:15, fontSize:13, opacity:0.7}}>{props.searchItem}</Text>
            <TouchableOpacity onPress={() => props.deleteRecentSearch(props.searchItem)}>
                <Icon type="feather" name='x' containerStyle={{opacity:0.4}} size={15}/>
            </TouchableOpacity>
        </View>
        </TouchableOpacity>
    )
}