import React, { useState }  from "react"
import { View, TextInput, Dimensions } from "react-native"
import { Icon } from 'react-native-elements'

export default function SearchBar(props) {

    const [isFocused, setIsFocused] = useState(false);

    const focusedStyle = {
        borderBottomColor:'#3196e2', 
        borderBottomWidth: isFocused? 2 : 0, 
        backgroundColor: isFocused? 'white' :'#ddd'
    }

    return(
        <View style={{height: 60, justifyContent:'center', alignItems:'center', position:'relative'}}>
            <TextInput style={{height:40, width: Dimensions.get('window').width * 0.9,  borderRadius: 4, paddingLeft: 15, fontSize: 16, ...focusedStyle}} placeholder="Search" placeholderTextColor='#777' onFocus={()=>setIsFocused(true)} onBlur={()=>setIsFocused(false)} onChange={props.onChange} 
            onSubmitEditing={props.enter} value={props.value}/>
            <Icon name='search' containerStyle={{position:'absolute', right: Dimensions.get('window').width * 0.07, opacity: 0.4}}/>
        </View>
    )
}