import React from "react"
import { View, TextInput, Dimensions } from "react-native"
import { Icon } from 'react-native-elements'

export default function SearchBar(props) {

    return(
        <View style={{height: 60, justifyContent:'center', alignItems:'center', position:'relative'}}>
            <TextInput style={{height:40, width: Dimensions.get('window').width * 0.95, backgroundColor:'#eee', borderRadius: 4, paddingLeft: 15, fontSize: 16}} placeholder="Search"/>
            <Icon name='search' containerStyle={{position:'absolute', right: Dimensions.get('window').width * 0.04, opacity: 0.3}}/>
        </View>
    )
}