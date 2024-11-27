import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyButton, MyCalendar, MyHeader, MyInput, MyLoading, MyPicker } from '../../components'
import { showMessage } from 'react-native-flash-message';
import { Color, colors, fonts } from '../../utils';
import { apiURL, getData } from '../../utils/localStorage';
import moment from 'moment';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default function InputSwamedikasi({ navigation, route }) {
    const [visible, setVisible] = useState(false);
    const [kirim, setKirim] = useState({
        fid_pengguna: route.params.id_pengguna,
        nomor_telepon: '',
        nomor_doc: '',
        tanggal: new Date(),
        nama_pasien: '',
        tanggal_lahir: new Date(),
        jenis_kelamin: 'Laki-laki',
        alamat: '',
        isian: '',
        nama_pasien_sakit: '',
        gejala: '',
        lama_gejala: '',
        obat_minum: '',
        obat_lain: '',
        rekomendasi: '',
        obat: '',
        non_obat: '',
        referensi: '',
        hasil: '',

    })

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible);
    }

    const handleDateChange = (date) => {
        console.log("Tanggal yang dipilih:", date);
        setKirim({ ...kirim, tanggal: date });
    };

    const handleDateChangetanggal_lahir = (date) => {
        console.log("Tanggal yang dipilih:", date);
        setKirim({ ...kirim, tanggal_lahir: date });
    };

    const handleInput = () => {
        const requiredFields = [
            { field: kirim.nomor_telepon, message: "Mohon isi Nomor Telepon Pasien!" },
            { field: kirim.tanggal, message: "Mohon pilih Tanggal Swamedikasi!" },
            { field: kirim.nama_pasien, message: "Mohon isi Nama Pasien!" },
            { field: kirim.tanggal_lahir, message: "Mohon pilih Tanggal Lahir!" },
            { field: kirim.jenis_kelamin, message: "Mohon pilih Jenis Kelamin!" },
            { field: kirim.alamat, message: "Mohon isi Alamat Pasien!" },
            { field: kirim.isian, message: "Mohon isi Isian Apoteker!" },
            { field: kirim.nama_pasien_sakit, message: "Mohon isi Nama Pasien yang Sakit!" },
            { field: kirim.gejala, message: "Mohon isi Gejala yang Dirasakan!" },
            { field: kirim.lama_gejala, message: "Mohon isi Lama Gejala!" },
            { field: kirim.obat_minum, message: "Mohon isi Obat yang Telah Diminum untuk Mengatasi Gejala!" },
            { field: kirim.obat_lain, message: "Mohon isi Obat Lain yang Diminum untuk Non Gejala Saat ini!" },
            { field: kirim.rekomendasi, message: "Mohon isi Rekomendasi Apoteker" },
            { field: kirim.obat, message: "Mohon isi Obat" },
            { field: kirim.non_obat, message: "Mohon isi Non Obat!" },
            { field: kirim.referensi, message: "Mohon isi Referensi!" },
            { field: kirim.hasil, message: "Mohon isi Hasil Diskusi Terakhir!" },

        ];

        for (let i = 0; i < requiredFields.length; i++) {
            console.log(requiredFields[i].field.length == 0);
            if (requiredFields[i].field.length === 0) {
                showMessage({
                    type: "default",
                    color: 'white',
                    backgroundColor: colors.danger,
                    message: requiredFields[i].message
                });
                return;
            }

        };

        setLoading(true)
        axios.post(apiURL + 'insert_laporan', {
            ...kirim,
            umur: moment().diff(kirim.tanggal_lahir, 'year')
        }).then(res => {
            console.log(res.data);
            setLoading(false)
            if (res.data.status == 200) {
                navigation.goBack();
                showMessage({
                    type: 'success',
                    icon: 'success',
                    message: res.data.message
                })
            }
        })



    }


    const [user, setUser] = useState({});

    const [pasien, setPasien] = useState([])
    const __getUser = () => {
        getData('user').then(u => {
            setUser(u)
        })
    }

    const __getPasien = () => {
        axios.post(apiURL + 'get_pasien', {
            fid_pengguna: route.params.id_pengguna
        }).then(res => {

            setPasien(res.data)
        })
    }

    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.post(apiURL + 'get_last').then(res => {
            console.log(res.data);
            setKirim({
                ...kirim,
                nomor_doc: res.data
            })
        })
        __getUser();
        __getPasien();
    }, [])

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white,

        }}>
            <MyHeader title="Input Swamedikasi" />

            <ScrollView>
                <View style={{
                    padding: 10,

                }}>



                </View>

                <View style={{
                    padding: 20,
                    marginBottom: 10,


                }}>

                    <View style={{
                        padding: 10,

                    }}>

                        <View style={{
                            flexDirection: 'row',

                        }}>
                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1 }}>Nama Apotek</Text>
                            <Text style={{ flex: 0.1 }}>:</Text>
                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1.5 }}> {user.nama_apotek}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1 }}>Alamat Apotek</Text>
                            <Text style={{ flex: 0.1 }}>:</Text>
                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1.5 }}>{user.alamat_apotek}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1 }}>Nama Apoteker</Text>
                            <Text style={{ flex: 0.1 }}>:</Text>
                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1.5 }}>{user.nama_lengkap}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1 }}>No SIPA</Text>
                            <Text style={{ flex: 0.1 }}>:</Text>
                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1.5 }}>{user.nomor_sipa}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1 }}>Nomor SIA</Text>
                            <Text style={{ flex: 0.1 }}>:</Text>
                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1.5 }}>{user.nomor_sia}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1 }}>Telepon Apoteker</Text>
                            <Text style={{ flex: 0.1 }}>:</Text>
                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1.5 }}> {user.nomor_wa}</Text>
                        </View>

                    </View>
                    <MyButton onPress={toggleVisible} title="Form Swamedikasi Apoteker" />
                </View>

                {visible && (
                    <View style={{
                        padding: 20,

                    }}>

                        {/* FORM */}
                        <View>
                            {/* nomor telepon pasien */}
                            <View style={{
                                marginTop: 10
                            }}>
                                <MyInput
                                    keyboardType='phone-pad'
                                    label="Nomor Telepon Pasien"
                                    placeholder="Isi Nomor Telepon Pasien"
                                    value={kirim.nomor_telepon}
                                    onChangeText={(x) => {
                                        if (x.length > 0) {
                                            setOpen(true)
                                        } else {
                                            setOpen(false);
                                        }
                                        setKirim({ ...kirim, 'nomor_telepon': x, })
                                    }}
                                />
                                {open && <View style={{
                                    padding: 10,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    marginTop: 10,
                                    borderColor: Color.blueGray[300]
                                }}>
                                    <Text style={{
                                        ...fonts.caption,
                                        color: colors.primary,
                                    }}> Daftar Pasien yang pernah disimpan</Text>

                                    <FlatList data={pasien.filter(i => i.nomor_telepon.toLowerCase().indexOf(kirim.nomor_telepon.toLowerCase()) > -1)} renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity onPress={() => {
                                                setKirim({
                                                    ...item,
                                                    nomor_doc: kirim.nomor_doc
                                                });
                                                setOpen(false);
                                            }} style={{
                                                padding: 10,
                                                marginVertical: 4,
                                                borderRadius: 10,
                                                backgroundColor: colors.primary,
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>
                                                <View style={{
                                                    flex: 1,
                                                }}>
                                                    <Text style={{
                                                        ...fonts.subheadline3,
                                                        color: colors.white
                                                    }}>{item.nama_pasien}</Text>
                                                    <Text style={{
                                                        ...fonts.caption,
                                                        color: colors.white
                                                    }}>{item.nomor_telepon}</Text>
                                                </View>
                                                <Icon type='ionicon' name='open-outline' color={colors.white} />
                                            </TouchableOpacity>
                                        )
                                    }} />
                                </View>}
                            </View>

                            {/* nomor doc */}
                            <View style={{
                                marginTop: 10
                            }}>
                                <MyInput
                                    label="Nomor Doc"
                                    onChangeText={(x) => setKirim({ ...kirim, 'nomor_doc': x })}
                                    placeholder="Isi Nomor Doc"
                                    value={kirim.nomor_doc}
                                />
                            </View>
                            {/* Tanggal swamedica */}
                            <View style={{
                                marginTop: 10
                            }}>
                                <MyCalendar
                                    value={kirim.tanggal || new Date()}
                                    label="Tanggal Swamedikasi"
                                    onDateChange={handleDateChange}
                                />
                            </View>
                            {/* Nama pasien */}
                            <View style={{
                                marginTop: 10
                            }}>
                                <MyInput
                                    label="Nama Pasien"
                                    placeholder="Isi Nama Pasien"
                                    value={kirim.nama_pasien}
                                    onChangeText={(x) => setKirim({ ...kirim, 'nama_pasien': x })}

                                />
                            </View>
                            {/* TANGGAL LAHIR */}
                            <View style={{
                                marginTop: 10
                            }}>
                                <MyCalendar
                                    label="Tanggal Lahir"
                                    value={kirim.tanggal_lahir || new Date()}
                                    onDateChange={handleDateChangetanggal_lahir}
                                />
                            </View>
                            {/* Jenis kelamin */}
                            <View style={{
                                marginTop: 10
                            }}>
                                <MyPicker value={kirim.jenis_kelamin} onChangeText={(x) => setKirim({ ...kirim, 'jenis_kelamin': x })} label="Jenis Kelamin" data={
                                    [
                                        { 'value': 'Laki-laki', 'label': 'Laki-laki' },
                                        { 'value': 'Perempuan', 'label': 'Perempuan' }
                                    ]
                                } />
                            </View>
                            {/* Alamat pasien */}
                            <View style={{
                                marginTop: 10
                            }}>
                                <MyInput
                                    label="Alamat Pasien"
                                    placeholder="Isi Alamat Pasien"
                                    value={kirim.alamat}
                                    onChangeText={(x) => setKirim({ ...kirim, 'alamat': x })}
                                />
                            </View>
                            {/* isian apoteker */}
                            <View style={{
                                marginTop: 10
                            }}>
                                <MyInput
                                    label="Isian Apoteker Berisi"
                                    placeholder="Isi Jawaban"
                                    value={kirim.isian}
                                    onChangeText={(x) => setKirim({ ...kirim, 'isian': x })}
                                />
                            </View>
                            {/* Nama pasien yang sakit */}
                            <View style={{
                                marginTop: 10
                            }}>
                                <MyInput
                                    label="Nama Pasien yang Sakit"
                                    placeholder="Isi Nama Pasien atau Keluarga Pasien"
                                    value={kirim.nama_pasien_sakit}
                                    onChangeText={(x) => setKirim({ ...kirim, 'nama_pasien_sakit': x })}
                                />
                            </View>

                            <View style={{
                                marginTop: 10
                            }}>
                                <MyInput
                                    label="Gejala yang Dirasakan"
                                    placeholder="Isi Jawaban"
                                    value={kirim.gejala}
                                    onChangeText={(x) => setKirim({ ...kirim, 'gejala': x })}
                                />
                            </View>

                            <View style={{
                                marginTop: 10
                            }}>
                                <MyInput
                                    label="Lama Gejala Muncul"
                                    placeholder="Isi Jawaban"
                                    value={kirim.lama_gejala}
                                    onChangeText={(x) => setKirim({ ...kirim, 'lama_gejala': x })}
                                />
                            </View>

                            <View style={{
                                marginTop: 10
                            }}>
                                <MyInput
                                    label="Obat yang Telah Diminum untuk Mengatasi Gejala"
                                    placeholder="Isi Jawaban"
                                    value={kirim.obat_minum}
                                    onChangeText={(x) => setKirim({ ...kirim, 'obat_minum': x })}
                                />
                            </View>

                            <View style={{
                                marginTop: 10
                            }}>
                                <MyInput
                                    label="Obat Lain yang Diminum untuk Non Gejala Saat Ini"
                                    placeholder="Isi Jawaban"
                                    onChangeText={(x) => setKirim({ ...kirim, 'obat_lain': x })}
                                    value={kirim.obat_lain}
                                />
                            </View>

                            <View style={{
                                marginTop: 10
                            }}>
                                <MyInput
                                    label="Rekomendasi Apoteker"
                                    placeholder="Isi Rekomendasi Apoteker"
                                    value={kirim.rekomendasi}
                                    onChangeText={(x) => setKirim({ ...kirim, 'rekomendasi': x })}
                                />
                            </View>

                            <View style={{
                                marginTop: 10
                            }}>
                                <MyInput
                                    label="Obat"
                                    placeholder="Isi Obat"
                                    value={kirim.obat}
                                    onChangeText={(x) => setKirim({ ...kirim, 'obat': x })}
                                />
                            </View>

                            <View style={{
                                marginTop: 10
                            }}>
                                <MyInput
                                    label="Non Obat"
                                    placeholder="Isi Non Obat"
                                    value={kirim.non_obat}
                                    onChangeText={(x) => setKirim({ ...kirim, 'non_obat': x })}
                                />
                            </View>

                            <View style={{
                                marginTop: 10
                            }}>
                                <MyInput
                                    label="Referensi"
                                    placeholder="Isi Referensi"
                                    value={kirim.referensi}
                                    onChangeText={(x) => setKirim({ ...kirim, 'referensi': x })}
                                />
                            </View>

                            <View style={{
                                marginTop: 10
                            }}>
                                <MyInput
                                    label="Hasil Diskusi Terakhir"
                                    placeholder="Isi Hasil Diskusi Terakhir"
                                    value={kirim.hasil}
                                    onChangeText={(x) => setKirim({ ...kirim, 'hasil': x })}
                                />
                            </View>
                        </View>

                        <View style={{
                            marginTop: 10
                        }}>
                            <MyButton onPress={handleInput} title="Simpan" style={{}} />
                        </View>

                    </View>
                )}
            </ScrollView>

            {loading && <MyLoading />}
        </View>
    )
}