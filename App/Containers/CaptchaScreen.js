import React from 'react'
import { ScrollView, Text, TextInput, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import  CaptchaActions from '../Redux/CaptchaRedux'
import AppConfig from '../Config/AppConfig'

// Styles
import styles from './Styles/CaptchaScreenStyle'

class CaptchaScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      captcha: ''
    }
  }

  componentWillMount () {
    this.handleRefreshCaptcha()
  }

  handleRefreshCaptcha = () => {
    this.props.getCaptcha()
  }

  render () {
    const {captchaUrl} = this.props
    const {baseURL:{xiaocong:baseURL}} = AppConfig
    return (
      <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'center'}}>
        <View>
          <Text style={{height: 20}}>CaptchaScreen</Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.handleRefreshCaptcha}>
            <Image
              source={{uri: baseURL + captchaUrl}}
              style={{width: 120, height: 40}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{height: 40, width: 80}}>
            验证码：
          </Text>
          <TextInput
            style={{height: 40, width: 80, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({captcha: text})}
            value={this.state.captcha}
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const {captcha: {url: captchaUrl}} = state
  return {captchaUrl}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCaptcha: () => dispatch(CaptchaActions.captchaRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaptchaScreen)
