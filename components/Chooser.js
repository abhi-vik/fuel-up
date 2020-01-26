import React from 'react'
import {View, Text, Picker} from 'react-native'
import styles from './styles'
import _ from 'lodash'

export default class Chooser extends React.Component {
    render() {
        return (
            <View style={_.assign({}, styles.center, styles.container)}>
                <Text style={_.assign({}, styles.center, styles.textHuge)}>Which pump are you at?</Text>
                <Picker
                    selectedValue="1"
                    onValueChange={() => {
                        this.props.navigation.navigate('home')
                    }}>
                    <Picker.Item label="1" value="1"/>
                    <Picker.Item label="2" value="2"/>
                    <Picker.Item label="3" value="3"/>
                    <Picker.Item label="4" value="4"/>
                </Picker>
            </View>
        )
    }
}
