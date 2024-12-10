import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { Color, colors } from '../../utils/colors';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';
import SweetAlert from 'react-native-sweet-alert';
import MyLoading from '../../components/MyLoading';

export default function AccountEdit({ navigation, route }) {


    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        setLoading(true);
        console.log(kirim);
        axios.post(apiURL + 'update_profile', kirim).then(res => {
            console.log(res.data)

            setLoading(false);

            if (res.data.status == 200) {
                SweetAlert.showAlertWithOptions({
                    title: MYAPP,
                    subTitle: res.data.message,
                    style: 'success',
                    cancellable: true
                },
                    callback => {
                        storeData('user', res.data.data);
                        navigation.replace('MainApp');
                    });


            }
        })
    }

    useEffect(() => {
        setKirim({
            ...kirim,
            newfoto_user: null,
        })
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
        }}>
            <MyHeader title="Edit Profile" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                paddingHorizontal: 20,
            }}>




                {/*  nama lengkap dan gelar */}
                <View>
                    <MyInput
                        label="Nama Lengkap & Gelar"
                        placeholder="Isi Nama Lengkap & Gelar"
                        value={kirim.nama_lengkap}
                        onChangeText={(x) => setKirim({ ...kirim, 'nama_lengkap': x })}
                    />
                </View>


                {/* nama apotek */}
                <View style={{
                    marginTop: 15
                }}>
                    <MyInput
                        label="Nama Apotek"
                        placeholder="Isi Nama Apotek"
                        value={kirim.nama_apotek}
                        onChangeText={(x) => setKirim({ ...kirim, 'nama_apotek': x })}
                    />
                </View>


                {/* alamat apotek */}
                <View style={{
                    marginTop: 15
                }}>
                    <MyInput
                        label="Alamat Apotek"
                        placeholder="Isi Alamat Apotek"
                        value={kirim.alamat_apotek}
                        onChangeText={(x) => setKirim({ ...kirim, 'alamat_apotek': x })}
                    />
                </View>


                {/*Link Google Maps Apotek */}
                <View style={{
                    marginTop: 15
                }}>
                    <MyInput
                        label="Link Google Maps Apotek"
                        placeholder="Isi Link Google Maps Apotek"
                        value={kirim.link_maps}
                        onChangeText={(x) => setKirim({ ...kirim, 'link_maps': x })}
                    />
                </View>


                {/* Nomor SIA */}
                <View style={{
                    marginTop: 15
                }}>
                    <MyInput
                        label="Nomor SIA"
                        placeholder="Nomor SIA"
                
                        value={kirim.nomor_sia}
                        onChangeText={(x) => setKirim({ ...kirim, 'nomor_sia': x })}
                    /> 
                </View>


                {/* Nomor SIPA */}
                <View style={{
                    marginTop: 15
                }}>
                    <MyInput
                        label="Nomor SIPA"
                        placeholder="Nomor SIPA"

                        value={kirim.nomor_sipa}
                        onChangeText={(x) => setKirim({ ...kirim, 'nomor_sipa': x })}
                    />
                </View>


                {/* Nomor WhatsApp */}
                <View style={{
                    marginTop: 15
                }}>
                    <MyInput
                        label="Nomor WhatsApp"
                        placeholder="Nomor WhatsApp"
                        keyboardType='numeric'
                        value={kirim.nomor_wa}
                        onChangeText={(x) => setKirim({ ...kirim, 'nomor_wa': x })}
                    />
                </View>

                {/* USERNAME */}
                <View style={{
                    marginTop: 15
                }}>
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
                        label="Buat Kata Sandi"
                        placeholder="Kosongkan jika tidak diubah"
                        secureTextEntry={true}
                        value={kirim.newpassword}
                        onChangeText={(x) => setKirim({ ...kirim, 'newpassword': x })}
                    />
                </View>


                {!loading && <MyButton warna={colors.secondary} colorText={colors.white} iconColor={colors.white} onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
                <MyGap jarak={20} />
            </ScrollView>
            {loading && <MyLoading />}
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})