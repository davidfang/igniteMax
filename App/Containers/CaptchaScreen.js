import React from 'react'
import { ScrollView, Text, TextInput, View, Image, Button, TouchableOpacity } from 'react-native'
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
    const { checkCode } = props
    this.state = {
      captcha: '',
      checkCode
    }
  }

  componentWillMount () {
    this.handleRefreshCaptcha()
  }

  /**
   * 刷新验证码
   */
  handleRefreshCaptcha = () => {
    this.props.getCaptcha()
  }
  /**
   * 校验验证码
   */
  handleCheckCaptcha = () => {
    let { captcha } = this.state
    const {hash1, hash2} = this.props

    captcha = captcha.toLowerCase()
    let a = 0
    for (let i = 0 ; i < captcha.length; i++) {
      a += captcha.charAt(i).charCodeAt()
    }
    console.log(a)
    if (a == hash1 || a == hash2){
      console.log({status:true, msg:'验证成功Ok'})
      alert('aaaa')
    } else {
      console.log({error:'验证失败error'})
      alert('bbbb')
    }


    //this.props.checkCaptcha(captcha)

  }

  render () {
    const {captchaUrl} = this.props
    const {baseURL: { api: baseURL}} = AppConfig
    return (
      <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'center'}}>
        <View>
          <Text style={{height: 20}}>CaptchaScreen</Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.handleRefreshCaptcha}>
            <TextInput
              style={{height: 40, width: 80, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({captcha: text})}
              value={this.state.captcha}
            />
            <Image
              source={{uri: baseURL + captchaUrl}}
              style={{width: 120, height: 40}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Button title="下一步" onPress={this.handleCheckCaptcha} />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const {captcha: {url: captchaUrl, checkCode , hash1 , hash2}} = state
  return {captchaUrl, checkCode, hash1, hash2}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCaptcha: () => dispatch(CaptchaActions.captchaRequest()),
    checkCaptcha: (code) => dispatch(CaptchaActions.captchaCheck(code))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaptchaScreen)
