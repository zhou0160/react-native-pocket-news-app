import React from "react"
import { View, TextInput, ScrollView, Text } from "react-native"

export default function SlideBar(props) {

    const style = {
        text:{
            paddingHorizontal: 16,
            fontSize: 20,
            color: '#aaa'
        }
    }

    return(
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection:'row'}}>
                <Text style={{...style.text, fontWeight:'700', color: '#3196e2'}}>General</Text>
                <Text style={style.text}>Entertainment</Text>
                <Text style={style.text}>Business</Text>
                <Text style={style.text}>Health</Text>
                <Text style={style.text}>Science</Text>
                <Text style={style.text}>Technology</Text>
                <Text style={style.text}>Sports</Text>
            </View>
        </ScrollView>
    )
}
