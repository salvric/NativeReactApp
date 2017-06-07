import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import data from './data';
import coffeeShopStyle from './coffeeShopStyle';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#444'
  },
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 20 : 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class CoffeeShop extends Component {
  constructor(props){
    super(props);
    this.state = { likes: this.props.likes };
  }
  addLike = () => {
    this.setState({ likes: (this.state.likes + 1) }, () => {
      console.log(this.state.likes);
    });
  };
  shouldComponentUpdate() {
    return this.state.likes % 2;
  };
  render() {
    return (
      <View style={coffeeShopStyle.container}>
        <Image source={{ uri: this.props.image }} style={coffeeShopStyle.image} />
        <Text style={coffeeShopStyle.likes}>{this.state.likes}</Text>
        <View style={coffeeShopStyle.dataWrapper} >
          <View style={coffeeShopStyle.descriptionWrapper} >
            <Text style={coffeeShopStyle.location}>{this.props.location}</Text>
            <Text style={coffeeShopStyle.author}>{this.props.author}</Text>
          </View>
          <TouchableOpacity onPress={this.addLike} >
            <Text style={coffeeShopStyle.likeButton}>Like</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.main}>
        <ScrollView style={coffeeShopStyle.container}>
          {data.allShops.map((item, idx) => {
            return <CoffeeShop {...item} key={idx} />
          })}          
        </ScrollView>
      </View>
    );
  }
}
