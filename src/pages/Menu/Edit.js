import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyButton, MyCalendar, MyHeader, MyInput, MyLoading, MyPicker } from '../../components'
import { showMessage } from 'react-native-flash-message';
import { colors, fonts } from '../../utils';
import { apiURL, getData } from '../../utils/localStorage';
import moment from 'moment';
import axios from 'axios';

export default function Edit({ navigation, route }) {
    const [visible, setVisible] = useState(false);
    const [kirim, setKirim] = useState(route.params)

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const GENDER_OPTIONS = [
        { value: 'Laki-laki', label: 'Laki-laki' },
        { value: 'Perempuan', label: 'Perempuan' }
    ];
    
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

        if (!kirim.jenis_kelamin) {
            showMessage({
                type: 'default',
                color: 'white',
                backgroundColor: colors.danger,
                message: 'Jenis Kelamin belum dipilih'
            });
            return;
        }

        
        console.log("Jenis Kelamin yang dipilih:", kirim.jenis_kelamin); // Cek nilai jenis_kelamin
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

        const validateFields = (fields) => {
            for (let i = 0; i < fields.length; i++) {
                if (!fields[i].field || fields[i].field === '') {
                    showMessage({
                        type: "default",
                        color: 'white',
                        backgroundColor: colors.danger,
                        message: fields[i].message
                    });
                    return false;
                }
            }
            return true;
        };
    
        // Pada handleInput
        if (!validateFields(requiredFields)) return;
        
        
   // Pastikan jenis_kelamin ada dan valid


        setLoading(true);
        console.log("Jenis Kelamin yang akan dikirim:", kirim.jenis_kelamin); // Cek sebelum pengiriman
        axios.post(apiURL + 'update_laporan', {
            ...kirim,
            umur: moment().diff(kirim.tanggal_lahir, 'year')
        })
        .then(res => {
            setLoading(false);
            if (res.data.status == 200) {
                navigation.goBack();
                showMessage({
                    type: 'success',
                    icon: 'success',
                    message: res.data.message
                });
            }
        })
        .catch(err => {
            setLoading(false);
            console.error(err);
            showMessage({
                type: 'danger',
                icon: 'danger',
                message: 'Terjadi kesalahan saat menyimpan data'
            });
        });
        


    }


    const [user, setUser] = useState({});

    const __getUser = () => {
        getData('user').then(u => {
            setUser(u)
        })
    }

    useEffect(() => {
        __getUser();
    }, [])

    useEffect(() => {
        if (user && user.jenis_kelamin) {
            setKirim(prevState => ({
                ...prevState,
                jenis_kelamin: user.jenis_kelamin // Update jenis_kelamin dengan data user jika ada
            }));
        }
    }, [user]);
    
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white,

        }}>
            <MyHeader title="Edit Swamedikasi" />

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
                            flexDirection: 'row'
                        }}>
                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1 }}>Nama Apotek</Text>

                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1.7 }}>: {user.nama_apotek}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1 }}>Alamat Apotek</Text>

                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1.7 }}>: {user.alamat_apotek}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1 }}>Nama Apoteker</Text>

                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1.7 }}>: {user.nama_lengkap}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1 }}>No SIPA</Text>

                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1.7 }}>: {user.nomor_sipa}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1 }}>Nomor SIA</Text>

                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1.7 }}>: {user.nomor_sia}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1 }}>Telepon Apoteker</Text>

                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 12, flex: 1.7 }}>: {user.nomor_wa}</Text>
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
                                    onChangeText={(x) => setKirim({ ...kirim, 'nomor_telepon': x })}
                                />
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
                       <MyPicker
    value={kirim.jenis_kelamin || 'Laki-laki'} // Default ke 'Laki-laki' jika tidak ada nilai
    onValueChange={(value) => {
        console.log("Jenis Kelamin yang dipilih:", value); // Debug pilihan
        setKirim({ ...kirim, jenis_kelamin: value });
    }}
    label="Jenis Kelamin"
    data={GENDER_OPTIONS}
/>



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