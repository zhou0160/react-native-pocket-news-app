import React from "react"
import { View, Dimensions, Text, ScrollView } from "react-native"
import NewsCard from '../components/NewsCard'

export default class NewsList extends React.Component {

    state = {
        articles:[],
        totalResults:0,
        title:''
    }

    getNewsList = (page) => {
        const data = this.props.route.params
        let url

        if(data.screen == 'search'){
            url = `http://newsapi.org/v2/everything?language=en&q=${data.data}&page=${page}&apiKey=d8cb19fc85ac40f287bf8c1a0ef6fffe`
            this.setState({title: `Search "${data.data}"`})
        } else {
            url = `http://newsapi.org/v2/everything?language=en&q=${data.toLowerCase()}&page=${page}&apiKey=d8cb19fc85ac40f287bf8c1a0ef6fffe`
            this.setState({title: `${this.props.route.params}`})
        }
        
        fetch(url)
        .then(res => res.json())
        .then(data => {
            if(page == 1){
                this.setState({articles: data.articles, totalResults : data.totalResults})
            }
            this.setState({articles: [...this.state.articles, ...data.articles], totalResults : data.totalResults})
        })
    }

    goToNews = (article) =>{
        this.props.navigation.navigate('News', article)
    }

    isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    };

    componentDidMount(){
        this.getNewsList(1)
    }

    render(){

        let page = 1

        const deviceWidth = Dimensions.get('window').width

        const newsList = this.state.articles.map((article, index) => <NewsCard width={Dimensions.get('window').width*0.9} key={Date.now()+index} article={article} goToNews={this.goToNews}/>)
    
        return(
            <ScrollView   
            onScroll={({nativeEvent}) => {
                if (this.isCloseToBottom(nativeEvent)) {
                    page++
                    this.getNewsList(page)
                }
            }}
            scrollEventThrottle={400}>
            <View>
                <View style={{width:deviceWidth*0.9, alignSelf: 'center', marginTop: 14, marginBottom:18, flexDirection:'row', justifyContent:'space-between', alignItems:'baseline'}}>
                    <Text style={{ fontWeight:'300', fontSize:30, letterSpacing:0}}>{this.state.title}</Text>
                    <Text style={{color:'#2e7df6', fontSize:12, fontWeight:'300'}}>{this.state.totalResults} Results</Text>
                </View>
                <View style={{ alignItems:'center', marginTop: 0}}>
                    {newsList}
                </View>
            </View>
            </ScrollView>
        )
    }
}