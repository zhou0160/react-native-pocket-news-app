import React from 'react';
import { View,Text ,RefreshControl, ScrollView, Dimensions } from 'react-native';
import HomeCarousel from '../components/HomeCarousel'
import NewsCard from '../components/NewsCard'
import { LinearGradient } from 'expo-linear-gradient';

export default class Home extends React.Component {

  state = {
    headlines:[],
    refreshing:false,
    articles:[]
  }

  getNewsList = () => {
    const url = 'http://newsapi.org/v2/top-headlines?country=ca&apiKey=d8cb19fc85ac40f287bf8c1a0ef6fffe'
    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log('update')
      let headlines = []
      for(let i = 0; i < 5; i++){
        headlines.push(data.articles[i])
      }
      data.articles.splice(0, 5)
      this.setState({articles: data.articles, refreshing: false, headlines})
    })
  }

  onRefresh = () => {
    this.setState({refreshing:true})
    this.getNewsList()
  }

  goToNews = (article) =>{
    this.props.navigation.navigate('News', article)
  }

  componentDidMount(){
    this.getNewsList()
  }

  render(){
    const newsList = this.state.articles.map((article, index) => <NewsCard key={index} article={article} goToNews={this.goToNews}/>)
    const deviceWidth = Dimensions.get('window').width
    return(
      <View style={{flex:1, backgroundColor:'#f4f4f4'}}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }
        >
          <View>
            <View style={{justifyContent:'center', alignContent:'center',marginTop:10, width:deviceWidth*0.9, alignSelf:'center'}}>

              <View style={{width:deviceWidth*0.9, alignSelf: 'center', marginTop: 14, marginBottom:18, flexDirection:'row', justifyContent:'space-between', alignItems:'baseline'}}>
                <Text style={{ fontWeight:'200', fontSize:30}}>Top Headlines</Text>
                <Text style={{color:'#3196e2', fontSize:12, fontWeight:'300'}}>Read More</Text>
              </View>
              
              <HomeCarousel data={this.state.headlines} goToNews={this.goToNews}/>
            </View>
            <View style={{width:deviceWidth*0.9, alignSelf: 'center', marginTop: 20, marginBottom:6,flexDirection:'row', justifyContent:'space-between', alignItems:'baseline'}}>
              <Text style={{ fontWeight:'200', fontSize:30}}>Latest</Text>
              <Text style={{color:'#3196e2', fontSize:12, fontWeight:'300'}}>Read More</Text>
            </View>
            <View style={{ alignItems:'center', marginTop: 0}}>
              {newsList}
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }

}
