import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';

export default function WebWebsite(props){
    return (
        <WebView
          source={{uri: props.route.params}}
        />    
    );
}