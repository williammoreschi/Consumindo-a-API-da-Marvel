import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, Dimensions, Text } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('screen').width;
export default class Hero extends Component {
    static navigationOptions = {
        title: 'Description'
    }

    render() {
        const { hero } = this.props.navigation.state.params
        return (
            <ScrollView>
            <Image 
                    source={{uri: `${hero.thumbnail.path}.${hero.thumbnail.extension}`}} 
                    style={styles.heroImage}
                />
                <Text style={styles.heroName} >{hero.name}</Text>
                <Text style={styles.heroDescription} >{hero.description}</Text>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    heroImage:{
        width:SCREEN_WIDTH, 
        height:SCREEN_WIDTH
    },
    heroName:{
        padding:10,
        fontSize:20
    },
    heroDescription:{
        padding:10
    }
})