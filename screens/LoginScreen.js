import React from 'react'
import { Button, TextInput, View } from 'react-native'

function LoginScreen({navigation}) {
  return (
    <View>
      <Button onPress={() => navigation.navigate("WeightTracker")} title='weightTracker'/>
    </View>
  )
}

export default LoginScreen