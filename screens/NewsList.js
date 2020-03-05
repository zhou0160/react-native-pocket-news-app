import React from "react"
import { View, Dimensions, Text, ScrollView } from "react-native"
import NewsCard from '../components/NewsCard'

export default class NewsList extends React.Component {

    state = {
        articles:[],
        totalResults:0
    }

    getNewsList = (page) => {
        const category = this.props.route.params
        const url = `http://newsapi.org/v2/top-headlines?country=ca&category=${category.toLowerCase()}&page=${page}&apiKey=d8cb19fc85ac40f287bf8c1a0ef6fffe`
        console.log(url)
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

    componentDidMount(){
        this.getNewsList(1)
    }

    render(){

        let page = 1
        const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
            const paddingToBottom = 20;
            return layoutMeasurement.height + contentOffset.y >=
              contentSize.height - paddingToBottom;
        };

        const category = this.props.route.params

        const deviceWidth = Dimensions.get('window').width

        const newsList = this.state.articles.map((article, index) => <NewsCard key={index} article={article} goToNews={this.goToNews}/>)
    
        return(
            <ScrollView   
            onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                    page++
                    this.getNewsList(page)
                }
            }}
            scrollEventThrottle={400}>
            <View>
                <View style={{width:deviceWidth*0.9, alignSelf: 'center', marginTop: 14, marginBottom:18, flexDirection:'row', justifyContent:'space-between', alignItems:'baseline'}}>
                    <Text style={{ fontWeight:'300', fontSize:30, letterSpacing:0}}>{category}</Text>
                    <Text style={{color:'#3196e2', fontSize:12, fontWeight:'300'}}>{this.state.totalResults} Results</Text>
                </View>
                <View style={{ alignItems:'center', marginTop: 0}}>
                    {newsList}
                </View>
            </View>
            </ScrollView>
        )
    }
}