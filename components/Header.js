import React from "react"
import { Header, Left, Right, Body, Title} from 'native-base';


export default function SearchBar(props) {
    return(
        <Header>
            <Left/>
                <Body>
                    <Title>{props.header}</Title>
                </Body>
            <Right />
        </Header>
    )
}