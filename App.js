import React from 'react';
import Home from './screens/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'

import Category from './screens/Category'
import News from './screens/News'
import WebWebsite from './screens/WebWebsite'
import NewsList from './screens/NewsList'
import Search from './screens/Search'
import Profile from './screens/Profile'

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
    initialRouteName="Home"
    >
      <HomeStack.Screen name="Home" component={Home}/>
      <HomeStack.Screen name="News" component={News}/>
      <HomeStack.Screen name="News Website" component={WebWebsite}/>
    </HomeStack.Navigator>
  );
}

const CategoryStack = createStackNavigator();

function CategoryStackScreen() {
  return (
    <CategoryStack.Navigator initialRouteName="Category">
      <CategoryStack.Screen name="Category" component={Category} />
      <CategoryStack.Screen name="NewsList" component={NewsList} options={{headerTitle:'News List'}}/>
      <CategoryStack.Screen name="News" component={News}/>
      <CategoryStack.Screen name="News Website" component={WebWebsite}/>
    </CategoryStack.Navigator>
  );
}

const SearchStack = createStackNavigator();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator initialRouteName="Search">
      <SearchStack.Screen name="Search" component={Search} />
      <SearchStack.Screen name="NewsList" component={NewsList} options={{headerTitle:'News List'}}/>
      <SearchStack.Screen name="News" component={News}/>
      <SearchStack.Screen name="News Website" component={WebWebsite}/>
    </SearchStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="News" component={News}/>
      <ProfileStack.Screen name="News Website" component={WebWebsite}/>
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => {
          let tabBarVisible = true;

          if(route?.state?.index){
            if (route.state.index > 0) {
              tabBarVisible = false;
            }
          }

          return {
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Category') {
                iconName = focused ? 'book' : 'book-outline';
              } else if (route.name === 'Search') {
                iconName = 'magnify';
              }else if (route.name === 'Profile') {
                iconName = focused ? 'account' : 'account-outline';
              }
              return <Icon name={iconName} size={size} color={color} type='material-community'/>;
            },
            tabBarVisible
        }}} 
        tabBarOptions={{
            activeTintColor: '#3196e2',
            inactiveTintColor: 'gray'
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Category" component={CategoryStackScreen} />
        <Tab.Screen name="Search" component={SearchStackScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
