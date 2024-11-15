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
} from 'react-native';
import { windowWidth, fonts, MyDimensi } from '../../utils/fonts';
import { getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { Color, colors } from '../../utils/colors';
import { MyButton, MyGap, MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { ScrollView } from 'react-native';

export default function ({ navigation, route }) {
    const [user, setUser] = useState({});
    const [com, setCom] = useState({});
    const isFocused = useIsFocused();
    const [wa, setWA] = useState('');
    const [open, setOpen] = useState(false);



    useEffect(() => {


        if (isFocused) {
            getData('user').then(res => {
                console.log(res)
                setOpen(true);
                setUser(res);

            });
        }




    }, [isFocused]);



    const btnKeluar = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
            {
                text: 'Batal',
                style: "cancel"
            },
            {
                text: 'Keluar',
                onPress: () => {
                    storeData('user', null);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Splash' }],
                    });
                }
            }
        ])
    };

    const MyList = ({ label, value }) => {
        return (
            <View
                style={{
                    padding: 10
                }}>
                <Text
                    style={{
                        fontFamily: fonts.primary[600],
                        color: colors.black,
                        marginLeft: 10,
                        marginBottom: 10
                    }}>
                    {label}
                </Text>
                <View style={{
                    padding: 10,
                    backgroundColor: colors.white,
                    borderRadius: 50,
                    borderWidth: 0.5,
                    height: 40
                }}>
                    <Text
                        style={{
                            fontFamily: fonts.primary[700],
                            color: colors.primary,
                            paddingLeft: 10
                        }}>
                        {value}
                    </Text>
                </View>

            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>


            <MyHeader title="Profile" onPress={() => navigation.goBack()} />
            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}
            <ScrollView showsVerticalScrollIndicator={false}>
                {open &&

                    <View style={{
                        margin: 5,
                        flex: 1,
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                        </View>
                        <View style={{ padding: 10, }}>
                            <MyList label="Nama Lengkap & Gelar" value={user.nama_lengkap} />
                            <MyList label="Nama Apotek" value={user.nama_apotek} />
                            <MyList label="Alamat Apotek" value={user.alamat_apotek} />
                            <MyList label="Link Google Maps Apotek" value={user.link_maps} />
                            <MyList label="No SIA" value={user.nomor_sia} />
                            <MyList label="Nomor SIPA" value={user.nomor_sipa} />
                            <MyList label="Nomor WhatsApp" value={user.nomor_wa} />
                            <MyList label="Username" value={user.username} />

                        </View>
                        {/* data detail */}
                    </View>

                }
                <View style={{
                    padding: 20,
                }}>
                    <MyButton warna={colors.primary} title="Edit Profile" onPress={() => navigation.navigate('AccountEdit', user)} />
                    <MyGap jarak={10} />
                    <MyButton onPress={btnKeluar} warna={colors.keluar} title="Log Out" Icons="log-out-outline" iconColor={colors.white} colorText={colors.white} />
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
