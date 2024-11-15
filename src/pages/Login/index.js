import { View, Text, ScrollView, ImageBackground, TouchableWithoutFeedback, Alert, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts } from '../../utils'
import { Image } from 'react-native'
import { MyButton, MyGap, MyInput } from '../../components'
import { api_token, apiURL, getData, MYAPP, storeData } from '../../utils/localStorage'
import { showMessage } from 'react-native-flash-message'
import axios from 'axios'
import MyLoading from '../../components/MyLoading'

export default function Login({ navigation }) {

    const [kirim, setKirim] = useState({
        api_token: api_token,
        username: '',
        password: '',
    });

    const [comp, setComp] = useState({});



    const [loading, setLoading] = useState(false)

    const handleLogin = () => {
        const requiredFields = [
            { field: kirim.username, message: "Mohon isi Username!" },
            { field: kirim.password, message: "Mohon isi Password!" },

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

        console.log(kirim);
        setLoading(true);
        axios
            .post(apiURL + 'login', kirim)
            .then(response => {
                if (response.data.status === 200) {
                    setLoading(true);
                    console.log(response.data);
                    Alert.alert(MYAPP, "Login Berhasil!");
                    storeData('user', response.data.data)
                    navigation.replace('MainApp');
                } else if (response.data.status === 404) {
                    setLoading(false)
                    console.log(response.data);
                    showMessage({
                        type: 'default',
                        color: 'white',
                        backgroundColor: colors.danger,
                        message: "Maaf Username atau Password salah!"
                    })
                } else {
                    setLoading(false);
                    showMessage({
                        type: 'default',
                        color: 'white',
                        backgroundColor: colors.danger,
                        message: "Kesalahan jaringan!"
                    })
                }
            })
            .catch(error => {
                setLoading(false);
                console.error("Terjadi kesalahan dari server!", error);
                showMessage({
                    type: "default",
                    color: "white",
                    backgroundColor: colors.danger,
                    message: "Terjadi kesalahan di server, coba lagi nanti."
                });
            })

    }

    useEffect(() => {
        axios.post(apiURL + 'company').then(res => {
            console.log(res.data.data);
            setComp(res.data.data)
        })
    }, [])

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            {loading && <MyLoading />}

            <ScrollView>
                <View style={{
                    padding: 10,
                    backgroundColor: colors.primary,
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                    alignItems: 'center',
                    height: 150,
                }}>
                    <Image style={{
                        width: 79,
                        height: 79,
                        alignSelf: 'center',
                        marginTop: '7%'
                    }} source={require('../../assets/logologin.png')} />
                </View>


                <View style={{
                    padding: 10,

                }}>

                    <Text style={{
                        fontFamily: fonts.primary[700],
                        fontSize: 30,
                        textAlign: "center",
                        color: colors.primary,
                    }}>Masuk</Text>



                    {/* form */}

                    <View style={{
                        padding: 10,
                        marginTop: '20%'
                    }}>

                        {/* USERNAME */}
                        <View>
                            <MyInput
                                label="Username"
                                placeholder="Isi Username"
                                value={kirim.username}
                                onChangeText={(x) => setKirim({ ...kirim, 'username': x })}
                            />
                        </View>

                        {/* passowrd */}
                        <View style={{
                            marginTop: 15
                        }}>
                            <MyInput
                                label="Password"
                                placeholder="Isi Password"
                                secureTextEntry={true}
                                value={kirim.password}
                                onChangeText={(x) => setKirim({ ...kirim, 'password': x })}
                            />
                        </View>

                        {/* button */}
                        <View>
                            <MyButton onPress={handleLogin} title="Masuk" />
                        </View>

                    </View>


                    {/* register */}

                    <View style={{
                        padding: 10,
                        marginTop: "25%"
                    }}>

                        {/* register */}
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
                            <View>
                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    textAlign: "center"
                                }}>
                                    Belum memiliki akun? Silakan <Text style={{
                                        color: colors.primary,
                                    }}>Daftar</Text>
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <MyGap jarak={20} />
                        {/* lupa kata sandi */}
                        <TouchableWithoutFeedback onPress={() => {
                            Linking.openURL('https://wa.me/' + comp.tlp + '?text=Halo *Admin* Saya lupa kata sandi . . .')
                        }}>
                            <View>
                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    textAlign: "center",
                                    color: colors.primary
                                }}>
                                    Lupa Kata Sandi </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </View>
            </ScrollView>

        </View>
    )
}