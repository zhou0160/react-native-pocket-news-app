import React from "react"
import CategoryCard from '../components/CategoryCard'
import { View, ScrollView,Dimensions } from "react-native"

export default class Category extends React.Component {
    state={
        categoris:[
            {
                name:'General',
                image: 'https://images.unsplash.com/photo-1555402665-bca600a7b817?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
            },
            {
                name:'Business',
                image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80'
            },
            {
                name:'Entertainment',
                image: 'https://images.unsplash.com/photo-1499446006265-e90482c49025?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1825&q=80'
            },
            {
                name:'Health',
                image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80'
            },
            {
                name:'Science',
                image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2104&q=80'
            },
            {
                name:'Sports',
                image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80'
            },
            {
                name:'Technology',
                image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80'
            },
        ]
    }

    render(){
        const deviceWidth = Dimensions.get('window').width
        const categorisList = this.state.categoris.map(category => <CategoryCard key={category.name} data={category}/>)
        return(
            
                <View>
                    <ScrollView>
                    <View style={{width:deviceWidth*0.9, alignSelf:'center', marginTop:18}}>
                        {categorisList}
                    </View>
                    </ScrollView>
                </View>
        )
    }
}