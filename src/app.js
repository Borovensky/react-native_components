import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
 
class App extends Component {

    state = {
        loggedIn: null
    };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyB19hf48rgS9FEkggDgcwCHZgspYWb4ix4',
            authDomain: 'authentication-c06e6.firebaseapp.com',
            databaseURL: 'https://authentication-c06e6.firebaseio.com',
            projectId: 'authentication-c06e6',
            storageBucket: 'authentication-c06e6.appspot.com',
            messagingSenderId: '1088176063449'
        });
        
        firebase.auth().onAuthStateChanged((user) => {

            if(user){
                this.setState({loggedIn: true});
            } else {
                this.setState({loggedIn: false});
            }

        });
        
    }

    renderContent(){

        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log out
                        </Button>
                    </CardSection>
                );
            case false:
                return <LoginForm />;
            default: 
                return <Spinner size='large' />
        }   


        if(this.state.loggedIn){
            return(
                <CardSection>
                    <Button>
                        Log out
                    </Button>
                </CardSection>
            );
        }

        return <LoginForm />

    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;