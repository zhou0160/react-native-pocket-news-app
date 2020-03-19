import React, {Component} from 'react';
import Carousel, { Pagination }  from 'react-native-snap-carousel';
import { Image, View, Text, Dimensions ,TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class MyCarousel extends Component {

    state = {
        activeSlide:0
    }

    get pagination () {
        return (
            <Pagination
              dotsLength={this.props.data.length}
              activeDotIndex={this.state.activeSlide}
              containerStyle={{position:"relative", bottom: 36}}
              dotStyle={{
                  width: 4,
                  height: 4,
                  borderRadius: 10,
                  backgroundColor: 'rgba(0, 0, 0, 1)'
              }}
              inactiveDotOpacity={0.3}
              inactiveDotScale={0.8}
            />
        );
    }

    _renderItem = ({item, index}) => {
    const imagePlaceholder = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
    const imageSrc = item.urlToImage ? item.urlToImage : imagePlaceholder

        return (
            <TouchableWithoutFeedback onPress={()=>{this.props.goToNews(item)}}>
            <View style={{position:'relative', borderRadius:4, overflow:'hidden', backgroundColor:'white', elevation:6}}>
                <Image source={{uri: imageSrc}} style={{height:200, width: Dimensions.get('window').width*0.9}} resizeMode="cover"/>
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)']} style={{position:'absolute', top:0, left:0, bottom:0, right:0}}>
                    <Text numberOfLines={3} style={{position:'absolute', bottom:15, paddingHorizontal:15, fontSize:16, fontWeight: '500', color:'white'}}>{item.title.toUpperCase()}</Text>
                </LinearGradient> 
            </View>
            </TouchableWithoutFeedback>
        );
    }
    

    static getDerivedStateFromError(error) {
        return {hasImage:false}
    }

    render () {
        return (
            <View style={{height:230, overflow:'hidden', alignSelf:'center'}}>
                <View style={{ shadowColor: '#000', shadowOpacity: 0.4, shadowOffset: {width:3,height:3}, shadowRadius: 9}}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.props.data}
                        renderItem={this._renderItem}
                        sliderWidth={Dimensions.get('window').width}
                        itemWidth={Dimensions.get('window').width * 0.9}
                        onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                    />
                </View>
                { this.pagination }
            </View>
        );
    }
}