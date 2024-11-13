import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';

import { Icon } from 'react-native-elements';
import { Linking } from 'react-native';


const MyMenu = ({ onPress, img, label, backgroundColor, desc }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth / 4,
        height: windowWidth / 4,
      }}>
        <View style={{
          backgroundColor: backgroundColor,
          borderRadius: 12,
          width: windowWidth / 4,
          height: windowWidth / 4,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'

        }}>
          <Image source={img} style={{
            width: windowWidth / 5, height: windowWidth / 5,
          }} />
        </View>
        <Text style={{
          marginTop: 10,
          color: colors.black,
          ...fonts.caption,
          textAlign: 'center',
          maxWidth: '85%'
        }}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default function Home({ navigation, route }) {
  const [user, setUser] = useState({});

  const __getUser = () => {
    getData('user').then(u => {
      setUser(u)
    })
  }

  const handlePress = () => {
    // Ganti URL dengan link yang ingin kamu buka
    Linking.openURL('https://www.alodokter.com/obat-a-z')
      .catch((err) => console.error('Failed to open URL', err));
  };


  useEffect(() => {
    __getUser();
  }, [])
  return (
    <ImageBackground source={require('../../assets/bghome.png')} style={{
      flex: 1,
      backgroundColor: colors.white,
      width: "100%",
      height: "100%"
    }}>

    {/* header */}
    <View style={{
      padding:10,
      flexDirection:"row",
      justifyContent:'space-between',
      alignItems:"center",
      marginTop:20,
  
    }}>

    <View>
      <Text style={{
        fontFamily:fonts.primary[600],
        fontSize:15,

      }}>Selamat datang, {user.username}</Text>
      <Text style={{
        fontFamily:fonts.primary[800],
        fontSize:13,
        color:colors.gray
      }}>{user.namaApotek}</Text>
    </View>

    <View>
      <Image style={{
        width:52,
        height:52,
        tintColor:colors.primary
      }} source={require('../../assets/logologin.png')}/>
    </View>

    </View>


    <View style={{
      padding:10,
   
    }}>

{/* slider */}
    <View style={{
      padding:10,
      alignItems:"center"
    }}>
<Image style={{
  width:337,
  height:182,

}} source={require('../../assets/slider_1.png')}/>
    </View>

  {/* menu */}
    <View style={{
      padding:10,
    }}>
 <TouchableWithoutFeedback onPress={() => navigation.navigate('InputSwamedikasi')}>
        <View style={{
          padding:10,
          backgroundColor:colors.white,
          borderRadius:10,
          marginTop:20

        }}>
          <Text style={{
            fontFamily:fonts.primary[600],
            fontSize:25,
            textAlign:'center'
          }}>Input E-Swamedikasi</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => navigation.navigate('RiwayatPelayanan')}>
        <View style={{
          padding:10,
          backgroundColor:colors.white,
          borderRadius:10,
          marginTop:20

        }}>
          <Text style={{
            fontFamily:fonts.primary[600],
            fontSize:25,
            textAlign:'center'
          }}>Riwayat Pelayanan</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={{
          padding:10,
          backgroundColor:colors.white,
          borderRadius:10,
          marginTop:20

        }}>
          <Text style={{
            fontFamily:fonts.primary[600],
            fontSize:25,
            textAlign:'center'
          }}>Referensi</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
     
    </View>
    

    </ImageBackground>
  )
}

const styles = StyleSheet.create({})