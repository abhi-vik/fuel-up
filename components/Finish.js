import React from 'react'
import {Text, ScrollView, View} from 'react-native'
import {Button, Divider} from 'react-native-elements'
import styles from './styles'
import _ from 'lodash'

export default class Finish extends React.Component {

    render() {
        return (
            <View style={_.assign({display: "flex", flexDirection: "column", flex: 1}, styles.container)}>
                <View style={_.assign({flex: 1, padding: 20}, styles.container)}>
                    <Text style={_.assign({fontSize: 25, paddingTop: 50}, {})}>
                        Great!
                    </Text>
                    <Text style={_.assign({paddingTop: 15}, styles.textBig)}>
                        You can pick up your stuff from Window Number 2.
                    </Text>
                    <Divider/>
                    <Text style={_.assign({paddingTop: 10}, styles.textBig)}>
                        We're glad to be of service!
                    </Text>
                </View>
            </View>
        )
    }
}
