import React from 'react';
import Home from './screens/Home'
import { View,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'

function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
}

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
                iconName = 'person';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
        })} 
        tabBarOptions={{
            activeTintColor: '#3196e2',
            inactiveTintColor: 'gray',
            style:{height:88, paddingTop:10}
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Category" component={SettingsScreen} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
