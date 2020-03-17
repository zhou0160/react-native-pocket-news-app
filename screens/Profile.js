import React from 'react';
import { View, Text ,Image, StyleSheet, Dimensions,AsyncStorage, ScrollView,RefreshControl } from 'react-native';
import { Tab, Tabs } from 'native-base';
import { Icon } from 'react-native-elements'
import Avarta from '../assets/Amber.png';
import NewsCard from '../components/NewsCard'

export default class Profiile extends React.Component {
    state = {
        recentView:[],
        savedNews:[],
        recentViewKey:'recentViewKey',
        savedNewsKey:'savedNewsKey',
        refreshing:false
    }

    getRecentList = async () => {
        try {
            const recentView = await AsyncStorage.getItem(this.state.recentViewKey);
            this.setState({refreshing:false})
            if (recentView !== null) {
                this.setState({recentView: JSON.parse(recentView)})
            } 
        }catch(error){
            console.log(error)
        }
    }

    goToNews = (article) =>{
        this.props.navigation.navigate('News', article)
    }

    onRefresh = () => {
        this.setState({refreshing:true})
        this.getRecentList()
    }

    styles = StyleSheet.create({
        tabStyle:{
            backgroundColor:'#fbfbfb'
        },
        textStyle:{
            color:'#aaa'
        },
        activeTabStyle:{
            backgroundColor: '#fff'
        },
        activeTextStyle:{
            color:'#3196e2',fontWeight:'700'
        },
        content:{
            borderRadius: 4,
            marginTop:10,
            marginBottom:25
        }
    })

    componentDidMount(){
        this.getRecentList()
    }

    render(){
        const deviceWidth = Dimensions.get('window').width
        const recentViewList = this.state.recentView.map((article, index) => <NewsCard width={deviceWidth*0.81} key={Date.now()+index} article={article} goToNews={this.goToNews}/>)

        return(
            <View style={{flex:1}}>
                <View style={{alignItems:'center', justifyContent:'center', flex:4,shadowOpacity: 0.07, shadowOffset: {width:2,height:2}, shadowRadius: 5}}>
                    <Image style={{width:110,height:110, borderRadius:500, borderColor:'white', borderWidth:8}} source={Avarta} resizeMode="cover"/>
                    <Text style={{ fontWeight:'300', fontSize:21, letterSpacing:0, marginTop:10}}>Amelia Bailey</Text>
                </View>
                <View style={{ alignSelf:'center',flex:8, width: deviceWidth*0.9}}>
                    <Tabs initialPage={0} 
                    tabBarUnderlineStyle={{backgroundColor:'#3196e2',height:3}}
                    tabContainerStyle={{backgroundColor:"rgba(0,0,0,0)", height:45, borderRadius:4, overflow:'hidden', elevation:0, borderWidth:0,alignSelf:'center'}}>
                        <Tab heading="Recent View" 
                        tabStyle={this.styles.tabStyle}
                        textStyle={this.styles.textStyle}
                        activeTabStyle={this.styles.activeTabStyle}
                        activeTextStyle={this.styles.activeTextStyle}
                        style={this.styles.content}
                        >
                            {this.state.recentView.length != 0
                            ?(<ScrollView
                                refreshControl={
                                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                                }
                            >
                            <View style={{paddingHorizontal:20}}>
                                {recentViewList}
                            </View></ScrollView>)
                            :(<View style={{justifyContent:'center',alignContent:'center', flex:1}}>
                                <View style={{marginBottom:20,backgroundColor:'#ccc', width:60,height:60,justifyContent:'center',alignItems:'center', borderRadius:100, alignSelf:'center'}}>
                                    <Icon name='book-open' size={30} color='white' type='feather'/>
                                </View>
                                <Text style={{textAlign:'center',color:'#aaa'}}>No Recent View now,</Text>
                                <Text  style={{textAlign:'center',color:'#aaa',marginTop:5}}>go and read news!</Text>
                            </View>)
                            }
                        </Tab>
                        <Tab heading="Saved News"
                        tabStyle={this.styles.tabStyle}
                        textStyle={this.styles.textStyle}
                        activeTabStyle={this.styles.activeTabStyle}
                        activeTextStyle={this.styles.activeTextStyle}
                        style={this.styles.content}
                        >
                            <View style={{justifyContent:'center',alignContent:'center', flex:1}}>
                                <View style={{marginBottom:20,backgroundColor:'#ccc', width:60,height:60,justifyContent:'center',alignItems:'center', borderRadius:100, alignSelf:'center'}}>
                                    <Icon name='bookmark' size={30} color='white' type='feather'/>
                                </View>
                                <Text style={{textAlign:'center',color:'#aaa'}}>No Saved News now,</Text>
                                <Text  style={{textAlign:'center',color:'#aaa',marginTop:5}}>read and save the news you like!</Text>
                            </View>
                        </Tab>
                    </Tabs>
                </View>
            </View>
        )
    }
}