import React from 'react'
import {View, Text, ActivityIndicator, TouchableNativeFeedback} from 'react-native'
import {Card, Image, Slider} from 'react-native-elements'
import _ from 'lodash'
import styles from './styles'

export default class Listing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0
        }
    }

    valueChange(value) {
        this.props.item.order = value
        this.setState({value})
    }

    render() {
        const item = this.props.item
        // const localReserve = (availableSpotCount > 0) ? this.props.reserve : _.noop
        return (
            <Card>
                <View style={styles.flexContainer}>
                    <Image
                        key={item.itemId}
                        source={{uri: item.imageUrl}}
                        style={{width: 150, height: 150}}
                        PlaceholderContent={<ActivityIndicator/>}
                    />
                    <View style={_.assign({}, styles.flexChild, {margin: 10})}>
                        <Text style={_.assign({}, styles.textHuge)}>{item.name}</Text>
                        <Text style={_.assign({}, styles.textBig)}>{'$' + item.price}</Text>
                        <Slider
                            minimumValue={0}
                            step={1}
                            maximumValue={item.quantity > 6 ? 6 : item.quantity}
                            value={this.state.value}
                            onValueChange={value => this.valueChange(value)}
                        />
                        <Text>Quantity: {this.state.value}</Text>
                    </View>
                </View>
            </Card>
        )
    }
}
