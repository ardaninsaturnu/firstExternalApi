import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class App extends Component {
  
  state = {
    username: '',
    repos: [],
  }

  _handleChange = (evt) => {
    this.setState({
      username: evt.nativeEvent.text
    });
  }

  _getUserRepos = (username) => {
    username = username.toLowerCase().trim();
    const url = `https://api.github.com/users/${username}/repos`;
    return fetch(url).then((res) => res.json());
  }

  _handleSubmit = () => {
    this._getUserRepos(this.state.username)
      .then((res) => {
        this.setState({repos: res});
      });
  }

  _renderRepos = () => {
    return (
      <ScrollView style={styles.responseWraper}>
        {
          this.state.repos.map((repo, i) => {
            return (
              <View key={i} style={styles.response}>
                <Text style={styles.buttonText}>{i}. {JSON.stringify(repo.name)}</Text>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }
  
  render() {
    return (

      
      <ScrollView style={styles.container}>
        
        <Image source={{uri: 'https://octodex.github.com/images/daftpunktocat-guy.gif'}}
       style={{width: 380, height: 400}} />
        

        <Text style={styles.label}>GitHub Username</Text>
        <TextInput
          placeholder="Enter your github username"
          style={styles.input}
          onChange={this._handleChange}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={this._handleSubmit}>

          <Text style={styles.buttonText}>View Results</Text>
        </TouchableOpacity>

        {this._renderRepos()}

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 18,
    marginBottom: 13,
  },
  input: {
    width: screenWidth - 40,
    height: 60,
    paddingHorizontal: 10,
    paddingVertical: 20,
    fontSize: 18,
    borderColor: '#EFEFEF',
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor:'#263238',
    borderColor: '#263238',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    alignSelf: 'center',
  },

  responseWraper:{
    marginBottom:40
  },

  response:{
    backgroundColor:'#FFD83A',
    marginTop:10,
    paddingVertical:20,
    borderRadius: 8
    
  }
});