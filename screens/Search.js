import React from "react"
import { View, Text, Dimensions, AsyncStorage ,TouchableWithoutFeedback, Image, ScrollView } from "react-native"
import SearchBar from '../components/SearchBar'
import Chips from '../components/Chips'
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements'


export default class Search extends React.Component {

    state={
        searchInput:'',
        recentSearch:[],
        recentSearchKey: 'recentSearchKey',
        hotNews:[]
    }

    getHotNews = () => {
        const today = new Date().toISOString().substr(0,10)
        const url = `http://newsapi.org/v2/everything?from=${today}sortBy=popularity&language=en&sources=cbc-news,financial-post,google-news-ca,the-globe-and-mail&apiKey=d8cb19fc85ac40f287bf8c1a0ef6fffe`
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const hotNews = data.articles.slice(0, 10)
            this.setState({hotNews})
        })
    }

    getRecentSearch = async () => {
        try {
            const value = await AsyncStorage.getItem(SrecentSearchKey);
            if (value !== null) {
                const recentSearch = JSON.parse(value)
                this.setState({recentSearch})
            }
          } catch (error) {
            // Error retrieving data
          }
    }

    handleSearch = (text) => {
        this.setState({searchInput:text.nativeEvent.text })
    }

    goToNewsList = async () =>{

        if(!this.state.searchInput){
            return
        }

        const newSearch = this.state.searchInput

        let oldList = this.state.recentSearch.filter(item => item != newSearch)

        const recentSearch = [newSearch, ...oldList].slice(0,10)

        try{
          await AsyncStorage.setItem(this.state.recentSearchKey, JSON.stringify(recentSearch))
        }catch(err){
            console.log(err)
        }

        const data = {
            screen: 'search',
            data: this.state.searchInput
        }
        this.props.navigation.navigate('NewsList', data)

        this.setState({recentSearch, searchInput: ''})

    }

    deleteRecentSearch = async (searchItem) => {
        const recentSearch = this.state.recentSearch.filter(item => item != searchItem)
        
        this.setState({recentSearch})

        try{
            await AsyncStorage.setItem(this.state.recentSearchKey, JSON.stringify(recentSearch))
        }catch(err){
            console.log(err)
        }
    }

    clearRecentSearch = async () => {
        const recentSearch = []

        this.setState({recentSearch})

        try{
            await AsyncStorage.setItem(this.state.recentSearchKey, JSON.stringify(recentSearch))
        }catch(err){
            console.log(err)
        }
    }

    useRencentSearch = async (keyWord) => {

        let oldList = this.state.recentSearch.filter(item => item != keyWord)

        const recentSearch = [keyWord, ...oldList]
        
        this.setState({recentSearch})

        try{
          await AsyncStorage.setItem(this.state.recentSearchKey, JSON.stringify(recentSearch))
        }catch(err){
            console.log(err)
        }

        const data = {
            screen: 'search',
            data: keyWord
        }
        this.props.navigation.navigate('NewsList', data)
    }

    goToNews = (article) =>{
        this.props.navigation.navigate('News', article)
    }

    _hotNews = (props) => {
    const imagePlaceholder = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'

        return (
            <TouchableWithoutFeedback onPress={()=>{this.goToNews(props.hotNews)}}>
            <View style={{position:'relative', borderRadius:4, overflow:'hidden', marginLeft:Dimensions.get('window').width*0.05}}>
                <Image source={{uri:props.hotNews.urlToImage ? props.hotNews.urlToImage : imagePlaceholder}} style={{height:150, width: Dimensions.get('window').width*0.8}} resizeMode="cover"/>
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)']} style={{position:'absolute', top:0, left:0, bottom:0, right:0}}>
                    <Text numberOfLines={3} style={{position:'absolute', bottom:15, paddingHorizontal:15, fontSize:16, fontWeight: '500', color:'white'}}>{props.hotNews.title}</Text>
                </LinearGradient> 
            </View>
            </TouchableWithoutFeedback>
        );
    }

    componentDidMount(){
        this.getRecentSearch()
        this.getHotNews()
    }

    render(){

    const deviceWidth = Dimensions.get('window').width
    const deviceHeight = Dimensions.get('window').height
    const recentSearchList = this.state.recentSearch.map((searchItem, index) => <Chips key={index} searchItem={searchItem} deleteRecentSearch={this.deleteRecentSearch} useRencentSearch={this.useRencentSearch}/>)
    const hotNewsList = this.state.hotNews.map((hotNews,index) => <this._hotNews hotNews={hotNews} key={Date.now()+index}/>)

    return(
        <View style={{flex:1, position:'relative'}}>
            <View style={{marginTop: 14}}>
                <SearchBar onChange={this.handleSearch} enter={this.goToNewsList} value={this.state.searchInput}/>
            </View>

            <View style={{ height:deviceHeight*0.4}}>
                <View style={{width:deviceWidth * 0.9, alignSelf: 'center', marginTop: 14, marginBottom:18, flexDirection:'row', justifyContent:'space-between', alignItems:'baseline'}}>
                    <Text style={{ fontWeight:'300', fontSize:20, letterSpacing:0}}>Recent Searches</Text>
                    <Text style={{color:'#3196e2', fontSize:12, fontWeight:'300'}} onPress={this.clearRecentSearch}>Clear</Text>
                </View>
                <View style={{flexDirection:'row', width:deviceWidth*0.9, alignSelf:'center', flexWrap:'wrap'}}>
                    {
                    this.state.recentSearch.length !=0
                    ?(<View>{recentSearchList}</View>)
                    :(<View style={{justifyContent:'center',alignContent:'center', flex:1, height:'100%'}}>
                        <View style={{marginBottom:20,backgroundColor:'#ccc', width:60,height:60,justifyContent:'center',alignItems:'center', borderRadius:100, alignSelf:'center'}}>
                            <Icon name='search' size={30} color='white' type='feather'/>
                        </View>
                        <Text style={{textAlign:'center',color:'#aaa'}}>No Recent Search now,</Text>
                        <Text  style={{textAlign:'center',color:'#aaa',marginTop:5}}>go and find the news you want!</Text>
                    </View>)
                    }
                </View>
            </View>


            <View style={{width: deviceWidth, alignSelf: 'center', marginTop: 14, marginBottom:24, flexDirection:'column', justifyContent:'space-between', alignItems:'baseline'}}>
                <Text style={{ fontWeight:'300', fontSize:20, letterSpacing:0, marginLeft:deviceWidth*0.05}}>Hot for Today</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection:'row',marginTop:24, marginRight:Dimensions.get('window').width*0.05}}>
                        {hotNewsList}
                    </View>
                </ScrollView>
            </View>
        </View>
    )}
}