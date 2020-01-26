import React from 'react'
import {Text, View, Button, ScrollView, ActivityIndicator, TextInput} from 'react-native'
import {Button as FlatButton, SearchBar, Divider, Image} from 'react-native-elements'
import styles from './styles'
import Listing from './Listing'
import axios from 'axios'
import _ from 'lodash'


export default class Home extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            fetched: false,
            data: null,
            summary: false
        }
        this.fetch()
    }

    fetch() {
        axios.get(`https://fuelup.azurewebsites.net/getInventory/6`).then(response => {
            this.setState({
                fetched: true,
                data: response.data
            })
        })
    }

    render() {
        const items = this.state.data
        console.log(items)

        if (!this.state.summary) {
            let body

            if (this.state.fetched === false) {
                // when nothing is loaded
                body = <ActivityIndicator size="large" styles={styles.primary}/>
            } else {
                // main data
                body = [
                    <Text
                        key="reserveHeader"
                        style={{padding: 10, borderColor: '#ced4da', borderWidth: 1, fontSize: 15}}
                    >
                        Pick up some items while you wait
                    </Text>,
                    <SearchBar
                        key="itemSearchBar"
                        lightTheme={true}
                        placeholder="Type Here..."
                        onChangeText={_.noop}
                    />,
                    <View key="banner" style={{backgroundColor: 'black', padding: 15}}>
                        <Text style={{color: 'white'}}>
                            Get 10 cents off on the gallon the next time you visit if you buy
                            $10 worth of supplies today!
                        </Text>
                    </View>,
                    <ScrollView key="cardContainer" contentContainerStyle={{paddingBottom: 20}}>
                        {_.map(items, item => <Listing item={item} key={item.itemId}/>)}
                    </ScrollView>
                ]
            }

            // home container
            return (
                <View style={{flex: 1}}>
                    <View style={styles.header}>
                        <FlatButton
                            onPress={() => {
                                this.setState({summary: true})
                            }}
                            title="Continue"
                        />
                    </View>
                    {body}
                </View>
            )
        } else {
            console.log(items)

            const result = _.chain(items)
                .filter(item => item.order)
                .map(item => item.price * item.order)
                .sum()
                .value()

            return (
                <View style={_.assign({display: "flex", flexDirection: "column", flex: 1}, styles.container)}>
                    <View style={_.assign({flex: 1, padding: 20}, styles.container)}>
                        <Text style={_.assign({fontSize: 25, paddingTop: 50}, styles.right)}>
                            Fuel: $20.81
                        </Text>
                        <Text style={_.assign({fontSize: 25, paddingTop: 15}, styles.right)}>
                            Convenience store items: ${result.toFixed(2)}
                        </Text>
                        <Divider/>
                        <Text style={_.assign({fontSize: 25, paddingVertical: 15}, styles.right)}>
                            Total: ${(20.81 + result).toFixed(2)}</Text>
                        <Button
                            onPress={() => {
                                this.props.navigation.navigate('finish')
                            }}
                            title="Complete Payment"
                        />
                    </View>
                </View>
            )
        }
    }
}
