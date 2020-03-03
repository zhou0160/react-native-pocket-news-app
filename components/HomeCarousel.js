import React, {Component} from 'react';
import Carousel, { Pagination }  from 'react-native-snap-carousel';
import { Image, View, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class MyCarousel extends Component {

    state = {
        activeSlide:0,
    }

    get pagination () {
        return (
            <Pagination
              dotsLength={this.props.data.length}
              activeDotIndex={this.state.activeSlide}
              containerStyle={{position:"relative", bottom: 15}}
              dotStyle={{
                  width: 20,
                  height: 5,
                  borderRadius: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.92)'
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.9}
            />
        );
    }

    _renderItem = ({item, index}) => {
        return (
            <View style={{position:'relative'}}>
                <Image source={{uri:item.urlToImage}} style={{height:250, width: Dimensions.get('window').width}} resizeMode="cover"/>
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.5)']} style={{position:'absolute', top:0, left:0, bottom:0, right:0}}>
                    <Text style={{position:'absolute', bottom:15, paddingHorizontal:15, fontSize:18, fontWeight: '600', color:'white'}}>{item.title}</Text>
                </LinearGradient>
            </View>
        );
    }

    render () {
        return (
            <View style={{height:270, overflow:'hidden'}}>
                <View>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.props.data}
                        renderItem={this._renderItem}
                        sliderWidth={Dimensions.get('window').width}
                        itemWidth={Dimensions.get('window').width}
                        onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                    />
                </View>
                { this.pagination }
            </View>
        );
    }
}