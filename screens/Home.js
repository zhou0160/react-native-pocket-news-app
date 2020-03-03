import React from 'react';
import { View,Text ,RefreshControl, ScrollView, Dimensions } from 'react-native';
import HomeCarousel from '../components/HomeCarousel'
import NewsCard from '../components/NewsCard'
import Header from '../components/Header'

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
        data.articles.splice(0,1)
      }
      this.setState({articles: data.articles, refreshing: false, headlines})
    })
  }

  onRefresh = () => {
    this.setState({refreshing:true})
    this.getNewsList()
  }

  componentDidMount(){
    this.getNewsList()
  }

  render(){
    const newsList = this.state.articles.map((article, index) => <NewsCard key={index} article={article}/>)

    return(
      <View style={{flex:1, backgroundColor:'#f4f4f4'}}>
        <Header header={"Canada News"}/>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }
        >
          <View>
            <View style={{justifyContent:'center', alignContent:'center'}}>
              <HomeCarousel data={this.state.headlines}/>
            </View>
            <View style={{width:Dimensions.get('window').width*0.95, alignSelf: 'center', marginTop: 30, flexDirection:'row', justifyContent:'space-between', alignItems:'baseline'}}>
              <Text style={{ fontWeight:'700', fontSize:24}}>Explore Recent</Text>
              <Text style={{color:'#3196e2', fontSize:12}}>Read More</Text>
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
