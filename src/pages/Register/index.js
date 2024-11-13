import { View, Text, ScrollView, ImageBackground, TouchableWithoutFeedback, Alert } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts } from '../../utils'
import { Image } from 'react-native'
import { MyButton, MyGap, MyInput } from '../../components'
import { showMessage } from 'react-native-flash-message'
import axios from 'axios'
import { api_token, apiURL, MYAPP, storeData } from '../../utils/localStorage'

export default function Register({navigation}) {

    const [kirim, setKirim] = useState({
        api_token: api_token,
        namaLengkap: '',
        namaApotek: '',
        alamatApotek: '',
        linkApotek: '',
        nomorSIA: '',
        nomorSIPA: '',
        nomorWA: '',
        username: '',
        password: '',
        repassword: ''
    });

    const handleRegister  = () => {
        const requiredFields = [
            { field: kirim.namaLengkap, message: "Mohon isi Nama Lengkap!" },
            { field: kirim.namaApotek, message: "Mohon isi Nama Apotek!" },
            { field: kirim.alamatApotek, message: "Mohon isi Alamat Apotek!" },
            { field: kirim.linkApotek, message: "Mohon isi Link Apotek!" },
            { field: kirim.nomorSIA, message: "Mohon isi Nomor SIA!" },
            { field: kirim.nomorSIPA, message: "Mohon isi Nomor SIPA!" },
            { field: kirim.nomorWA, message: "Mohon isi Nomor WhatsApps!" },
            { field: kirim.username, message: "Mohon isi Username!" },
            { field: kirim.password, message: "Mohon isi Password!" },
            { field: kirim.repassword, message: "Mohon isi Konfirmasi Password!" },
        ];

        for (let i = 0; i < requiredFields.length; i++) {
            if (requiredFields[i].field.length === 0) {
                showMessage({
                    type: "default",
                    color: 'white',
                    backgroundColor: colors.danger,
                    message: requiredFields[i].message
                });
                return;
            }
        }

        if (kirim.password != kirim.repassword) {
            showMessage({
                type: "default",
                color: 'white',
                backgroundColor: colors.danger,
                message: 'Password & Konfirmasi Password tidak sama!'
            })
           
        } else if (kirim.nomorWA.length > 13) {
            showMessage({
                type: "default",
                color: 'white',
                backgroundColor: colors.danger,
                message: 'Nomor WhatsApp terlalu panjang. Mohon periksa kembali nomor Anda.'
            });
        } else if (kirim.nomorWA.length < 12 ) {
            showMessage({
                type: "default",
                color: 'white',
                backgroundColor: colors.danger,
                message: 'Nomor WhatsApp harus memiliki 9 hingga 14 digit.'
            });
        } else {
            console.log(kirim);
            axios
            .post(apiURL + 'register', kirim)
            .then(response => {
                if(response.data.status === 200) {
                    console.log(response.data);
                    storeData('user', kirim);
                    navigation.replace("Login");
                    Alert.alert(MYAPP, "Selamat!, Anda berhasil daftar!");
                } else if (response.data.status  === 404) {
                    showMessage({
                        type: 'default',
                        color: 'white',
                        backgroundColor: colors.danger,
                        message: "Username sudah ada!"
                    })
                } else {
                    showMessage({
                        type: 'default',
                        color: 'white',
                        backgroundColor: colors.danger,
                        message: "Kesalahan Jaringan"
                    });
                }
                
            })
            .catch(error => {
                console.error("Terjadi kesalahan dari server!", error);
                showMessage({
                    type: "default",
                    color: "white",
                    backgroundColor: colors.danger,
                    message: "Terjadi kesalahan di server, coba lagi nanti."
                });
            })
        }
        
    }

    return (
        <View style={{
            flex:1,
            backgroundColor:colors.white
        }}>
        
        <ScrollView>
           <View style={{
            padding:10,
            backgroundColor:colors.primary,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius:50,
            alignItems:'center',
            height: 150,
           }}>
            <Image style={{
                width:79,
                height:79,
                alignSelf:'center',
                marginTop:'7%'
            }} source={require('../../assets/logologin.png')}/>
           </View>
    
    
           <View style={{
            padding:10,
    
           }}>
    
            <Text style={{
                fontFamily:fonts.primary[700],
                fontSize:30,
                textAlign:"center",
                color:colors.primary,
            }}>Daftar</Text>
    
    
    
            {/* form */}
    
            <View style={{
                padding:10,
                marginTop:'20%'
            }}>


               {/*  nama lengkap dan gelar */}
               <View>
            <MyInput 
            label="Nama Lengkap & Gelar" 
            placeholder="Isi Nama Lengkap & Gelar"
            value={kirim.namaLengkap}
            onChangeText={(x) => setKirim({...kirim, 'namaLengkap': x})}    
            />
            </View>

            
            {/* nama apotek */}
            <View style={{
                marginTop:15
            }}>
            <MyInput 
            label="Nama Apotek" 
            placeholder="Isi Nama Apotek"
            value={kirim.namaApotek}
            onChangeText={(x) => setKirim({...kirim, 'namaApotek': x})}
            />
            </View>


            {/* alamat apotek */}
            <View style={{
                marginTop:15
            }}>
            <MyInput 
            label="Alamat Apotek" 
            placeholder="Isi Alamat Apotek"
            value={kirim.alamatApotek}
            onChangeText={(x) => setKirim({...kirim, 'alamatApotek': x})}
            />
            </View>

            
            {/*Link Google Maps Apotek */}
            <View style={{
                marginTop:15
            }}>
            <MyInput 
            label="Link Google Maps Apotek" 
            placeholder="Isi Link Google Maps Apotek"
            value={kirim.linkApotek}
            onChangeText={(x) => setKirim({...kirim, 'linkApotek' : x})}
            />
            </View>

            
            {/* Nomor SIA */}
            <View style={{
                marginTop:15
            }}>
            <MyInput 
            label="Nomor SIA" 
            placeholder="Nomor SIA" 
            keyboardType='numeric'
            value={kirim.nomorSIA}
            onChangeText={(x) => setKirim({...kirim, 'nomorSIA' : x})}
            />
            </View>

            
            {/* Nomor SIPA */}
            <View style={{
                marginTop:15
            }}>
            <MyInput 
            label="Nomor SIPA" 
            placeholder="Nomor SIPA" 
            keyboardType='numeric'
            value={kirim.nomorSIPA}
            onChangeText={(x) => setKirim({...kirim, 'nomorSIPA': x})}
            />
            </View>

            
            {/* Nomor WhatsApp */}
            <View style={{
                marginTop:15
            }}>
            <MyInput 
            label="Nomor WhatsApp" 
            placeholder="Nomor WhatsApp" 
            keyboardType='numeric'
            value={kirim.nomorWA}
            onChangeText={(x) => setKirim({...kirim, 'nomorWA': x})}
            />
            </View>
    
            {/* USERNAME */}
            <View style={{
                marginTop:15
            }}>
            <MyInput 
            label="Username" 
            placeholder="Isi Username"
            value={kirim.username}
            onChangeText={(x) => setKirim({...kirim, 'username': x})}
            />
            </View>
     
            {/* passowrd */}
            <View style={{
                marginTop:15
            }}>
            <MyInput 
            label="Buat Kata Sandi" 
            placeholder="Isi Buat Kata Sandi" 
            secureTextEntry={true}
            value={kirim.password}
            onChangeText={(x) => setKirim({...kirim,'password' : x})}
            />
            </View>

              {/* passowrd */}
              <View style={{
                marginTop:15
            }}>
            <MyInput 
            label="Konfirmasi Buat Kata Sandi" 
            placeholder="Isi Konfirmasi Kata Sandi" 
            secureTextEntry={true}
            value={kirim.repassword}
            onChangeText={(x) => setKirim({...kirim, 'repassword': x})}
            />
            </View>
    
    
            {/* button */}
            <View>
                <MyButton onPress={handleRegister}  title="Daftar"/>
            </View>
    
            </View>
    
    
            {/* register */}
    
            <View style={{
                padding:10,
                marginTop:"10%"
            }}>
    
            {/* register */}
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                <View>
                    <Text style={{
                        fontFamily:fonts.primary[600],
                        textAlign:"center"
                    }}>
                   Sudah memiliki akun? Silakan  <Text style={{
                        color:colors.primary,
                    }}>Masuk</Text>
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            </View>
    
           </View>
        </ScrollView>
        
        </View>
      )
    }