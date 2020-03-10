import React from 'react';
import { View,Text ,RefreshControl, ScrollView, Dimensions, StatusBar } from 'react-native';
import HomeCarousel from '../components/HomeCarousel'
import NewsCard from '../components/NewsCard'

export default class Home extends React.Component {

  state = {
    headlines:[],
    refreshing:false,
    articles:[]
  }

  getNewsList = (page) => {
    const url = `http://newsapi.org/v2/top-headlines?country=ca&page=${page}&pageSize=40&apiKey=d8cb19fc85ac40f287bf8c1a0ef6fffe`
    fetch(url)
    .then(res => res.json())
    .then(data => {
      let headlines = []
      for(let i = 0; i < 5; i++){
        headlines.push(data.articles[i])
      }
      data.articles.splice(0, 5)
      if(page == 1){
        this.setState({articles: data.articles, refreshing: false, headlines})
      } else {
        this.setState({articles: [...this.state.articles, ...data.articles], refreshing: false, headlines})
      }
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
    this.getNewsList(1)
  }

  render(){
    let page = 1
    const deviceWidth = Dimensions.get('window').width

    const newsList = this.state.articles.map((article, index) => <NewsCard width={deviceWidth*0.9} key={index} article={article} goToNews={this.goToNews}/>)


    return(
      <View style={{flex:1, backgroundColor:'#f4f4f4'}}>
        <StatusBar barStyle="dark-content" />
        <ScrollView ref="_scrollView"
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }>
          <View>
            <View style={{justifyContent:'center', alignContent:'center',marginTop:10, width:deviceWidth*0.9, alignSelf:'center'}}>

              <View style={{width:deviceWidth*0.9, alignSelf: 'center', marginTop: 14, marginBottom:18, flexDirection:'row', justifyContent:'space-between', alignItems:'baseline'}}>
                <Text style={{ fontWeight:'300', fontSize:30, letterSpacing:0}}>Top Headlines</Text>
                <Text style={{color:'#3196e2', fontSize:12, fontWeight:'300'}}>Read More</Text>
              </View>
              
              <HomeCarousel data={this.state.headlines} goToNews={this.goToNews}/>
            </View>
            <View style={{width:deviceWidth*0.9, alignSelf: 'center', marginTop: 20, marginBottom:6,flexDirection:'row', justifyContent:'space-between', alignItems:'baseline'}}>
              <Text style={{ fontWeight:'300', fontSize:30, letterSpacing:0}}>Latest</Text>
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
