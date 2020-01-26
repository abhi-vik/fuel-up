import React from 'react'
import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Chooser from './components/Chooser'
import Finish from './components/Finish'
import {YellowBox} from 'react-native'

YellowBox.ignoreWarnings(['Warning: ViewPagerAndroid has been extracted'])

const AuthTabNavigator = createMaterialTopTabNavigator(
    {
        login: Login,
        register: Register
    },
    {
        initialRouteName: 'login'
    }
)

const RootSwitchNavigator = createSwitchNavigator(
    {
        initial: AuthTabNavigator,
        chooser: Chooser,
        home: Home,
        finish: Finish
    },
    {
        initialRouteName: 'initial'
    }
)

const AppContainer = createAppContainer(RootSwitchNavigator)

export default class App extends React.Component {
    render() {
        return <AppContainer/>
    }
}
