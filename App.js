import React from 'react';
import Home from './screens/Home'
import { View,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'

import Category from './screens/Category'
import News from './screens/News'
import WebWebsite from './screens/WebWebsite'

function Profile() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
      </View>
    );
}

function Search() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Search!</Text>
      </View>
    );
}


const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
    initialRouteName="Home"
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="News" component={News} />
      <HomeStack.Screen name="News Website" component={WebWebsite} />
    </HomeStack.Navigator>
  );
}

const CategoryStack = createStackNavigator();

function CategoryStackScreen() {
  return (
    <CategoryStack.Navigator
    initialRouteName="Category"
    >
      <CategoryStack.Screen name="Category" component={Category} />
    </CategoryStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Category') {
                iconName = 'book';
              } else if (route.name === 'Search') {
                iconName = 'search';
              }else if (route.name === 'Profile') {
                iconName = 'user';
              }
              return <Icon name={iconName} size={size} color={color} type='feather'/>;
            },
        })} 
        tabBarOptions={{
            activeTintColor: '#3196e2',
            inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Category" component={CategoryStackScreen} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
