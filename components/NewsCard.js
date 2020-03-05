import React from "react"
import { View, Dimensions, Image, Text ,TouchableWithoutFeedback } from "react-native"

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
    const imagePlaceholder = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'

    return (
      <TouchableWithoutFeedback onPress={()=>{props.goToNews(props.article)}}>
        <View style={{width: Dimensions.get('window').width*0.9, height:100, flexDirection:'row', overflow:'hidden', borderBottomWidth:1,borderBottomColor: '#ddd', alignItems:'center', justifyContent:'center'}}>

            <View style={{justifyContent:'space-between', flex:5, paddingRight:15, height:75}}>
                <Text numberOfLines={3} style={{fontWeight:'500', fontSize:13}}>{props.article.title}</Text>
                <View style={{flexDirection:'row',alignSelf:'flex-end', justifyContent:'space-between',width:'100%'}}>
                    <Text style={{fontSize:10, color:'#3196e2', fontWeight:'300'}}>{props.article.source.name}</Text>
                    <Text style={{color:'#aaa', fontSize:10, fontWeight:'300'}}>{publishedAt} ago</Text>
                </View>
            </View>
          
            <Image source={{uri: props.article.urlToImage?  props.article.urlToImage : imagePlaceholder}} style={{flex:2, height:75, borderRadius: 4}} resizeMode="cover"/>
        </View>
        </TouchableWithoutFeedback>
    )
}