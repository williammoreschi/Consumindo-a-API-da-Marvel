import React, { Component } from 'react';
import api from '../services/api';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
export default class Home extends Component {
    static navigationOptions = {
        title:"Heroes",
        headerTitleStyle: { 
            textAlign:"center", 
            flex:1 
        }
    }

    state = {
        data: [],
        dataInfo:{}
    }

    componentDidMount(){
        this.loadCharacters()
    }

    loadCharacters = async () => {
        const response = await api.get();
        const data = response.data.data.results;
        const dataInfo = response.data.data;
        this.setState({ data:[... this.state.data, ... data], dataInfo:dataInfo });
    }

    renderItem = ({item}) =>{
        return  (
            <TouchableOpacity 
            onPress={()=> this.props.navigation.navigate('Hero',{hero: item}) } 
            style={styles.itemContainer} >
                <Image style={styles.itemImage} source={{uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }} />
                <Text style={styles.itemText} >{item.name}</Text>
            </TouchableOpacity>
        )   
    }

    render() {
    return (
        <View style={styles.container}>
            <FlatList
            contentContainerStyle={styles.list}
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor = { (item, index) => index.toString() }
            onEndReachedThreshold={0.1}
            >
            </FlatList>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fafafa",
    },
    list:{
        padding:0
    },
    itemContainer:{
        flexDirection:'row', 
        padding: 10, 
        alignItems:'center',
        borderColor:'#fdfdfd',
        borderTopWidth:1,
    },
    itemImage:{
        height: 50,
        width: 50,
        borderRadius: 25
    },
    itemText:{
        marginLeft: 10,
        color:'#504a4a'
    }
})