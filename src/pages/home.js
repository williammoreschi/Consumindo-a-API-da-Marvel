import React, { Component } from 'react';
import api from '../services/api';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
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
        dataInfo:{},
        offset: 0,
        loading: false,
    }

    componentDidMount(){
        this.loadHeroes()
    }

    loadHeroes = async (offset=0) => {
        this.setState({ loading: true });
        const response = await api.get(`&offset=${offset}`);
        const data = response.data.data.results;
        const dataInfo = response;
        this.setState({ data:[... this.state.data, ... data], dataInfo, offset, loading: false });
     }

    loadMore = () => {
        const {offset,dataInfo} = this.state;
        if(this.state.dataInfo.data.data.total <= offset){
            return;
        }
        const offsetNumber = offset + 10;
        this.loadHeroes(offsetNumber);
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

    renderFooter = () => {
    return (
        <View style={styles.loading}>
        <ActivityIndicator size="small" color="#e23636" />
        </View>
    );
    }

    render() {
    return (
        <View style={styles.container}>
            <FlatList
            contentContainerStyle={styles.list}
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor = { (item, index) => item.id+'-'+item.name }
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter}
            >
            </FlatList>
        </View>
    );
  };

}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fafafa",
    },
    list:{
        padding: 0,
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
    },
    loading: {
        alignSelf: 'center',
        marginVertical: 20
    }
})