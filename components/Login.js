import React from 'react'
import {Text, View, TextInput} from 'react-native'
import {Button} from 'react-native-elements'
import axios from 'axios'
import styles from './styles'
import Message from './Message'

const _fail = 'Invalid credentials.'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            status: ''
        }
    }

    login() {
        const {username, password} = this.state
        axios
            .post(`https://fuelup.azurewebsites.net/login?username=${username}&password=${password}`)
            .then(response => {
                console.log('Received login response.')
                if (response.status == 200) {
                    console.log('Status 200.')
                    this.props.navigation.navigate('chooser', {
                        userId: response.data.userId
                    })
                } else this.setState({status: _fail})
            })
            .catch(() => {
                this.setState({status: _fail})
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textHuge}>Fuel Up</Text>
                <Text style={styles.textNormal}>Username</Text>
                <TextInput
                    onChangeText={val => this.setState({username: val})}
                    editable={true}
                    // keyboardType={'email-address'}
                    style={styles.input}
                />
                <Text style={styles.textNormal}>Password</Text>
                <TextInput
                    onChangeText={val => this.setState({password: val})}
                    editable={true}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <Button onPress={() => this.login()} title="Log In" styles={styles.primary}/>
                <Message style={styles.failure} text={this.state.status}/>
            </View>
        )
    }
}
