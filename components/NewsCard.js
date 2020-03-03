import React from "react"
import { View, TextInput, Dimensions, Image, Text } from "react-native"

export default function NewsCard(props) {
    const publishedAt = timeSince(new Date(props.article.publishedAt))

    function timeSince(date) {
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
          return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
          return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
          return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
          return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
          return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    return (
        <View style={{width: Dimensions.get('window').width*0.95, height:130, flexDirection:'row', overflow:'hidden', borderBottomWidth:1,borderBottomColor: '#ddd', alignItems:'center', justifyContent:'center'}}>
            <Image source={{uri: props.article.urlToImage}} style={{flex:2, height:95, borderRadius: 4}} resizeMode="cover"/>
            <View style={{justifyContent:'space-between', flex:4, paddingLeft:15, height:95}}>
                <Text numberOfLines={3} style={{fontWeight:'600', fontSize:16}}>{props.article.title}</Text>
                <View style={{flexDirection:'row',alignSelf:'flex-end', justifyContent:'space-between',width:'100%'}}>
                    <Text style={{fontSize:12, color:'#3196e2'}}>{props.article.source.name}</Text>
                    <Text style={{color:'#aaa', fontSize:12}}>{publishedAt} ago</Text>
                </View>
            </View>
        </View>
    )
}