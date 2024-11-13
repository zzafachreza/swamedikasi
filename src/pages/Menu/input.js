import { View, Text, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyButton, MyCalendar, MyHeader, MyInput, MyPicker } from '../../components'
import { showMessage } from 'react-native-flash-message';
import { colors, fonts } from '../../utils';
import { getData } from '../../utils/localStorage';

export default function InputSwamedikasi({navigation}) {
    const [visible, setVisible] = useState(false);
    const [kirim, setKirim] = useState({
        nomorTelepon: '',
        nomorDOC: '05/11/2024/0001',
        tanggal: new Date(),
        namaPasien:'',
        tanggalLahir: new Date(),
        jenisKelamin: '',
        alamatPasien: '',
        isianApoteker: '',
        namaPasienSakit:'',
        gejala: '',
        lamaGejala: '',
        obatYangTelahDiminum: '',
        obatLainYangDiminum: '',
        rekomendasiApoteker: '',
        obat: '',
        nonObat: '',
        referensi: '',
        hasilDiskusi: '',

    })

    const [data, setData] = useState([]);

    const toggleVisible = () => {
        setVisible(!visible);
    }

    const handleDateChange = (date) => {
        console.log("Tanggal yang dipilih:", date);
        setKirim({ ...kirim, tanggal: date });
    };

    const handleDateChangeTanggalLahir = (date) => {
        console.log("Tanggal yang dipilih:", date);
        setKirim({ ...kirim, tanggalLahir: date });
    };

    const handleInput = () => {
        const requiredFields = [
            { field: kirim.nomorTelepon, message: "Mohon isi Nomor Telepon Pasien!" },
        
            { field: kirim.tanggal, message: "Mohon pilih Tanggal Swamedikasi!" },
            { field: kirim.namaPasien, message: "Mohon isi Nama Pasien!" },
            { field: kirim.tanggalLahir, message: "Mohon pilih Tanggal Lahir!" },
            { field: kirim.jenisKelamin, message: "Mohon pilih Jenis Kelamin!" },
            { field: kirim.alamatPasien, message: "Mohon isi Alamat Pasien!" },
            { field: kirim.isianApoteker, message: "Mohon isi Isian Apoteker!" },
            { field: kirim.namaPasienSakit, message: "Mohon isi Nama Pasien yang Sakit!" },
            { field: kirim.gejala, message: "Mohon isi Gejala yang Dirasakan!" },
            { field: kirim.lamaGejala, message: "Mohon isi Lama Gejala!" },
            { field: kirim.obatYangTelahDiminum, message: "Mohon isi Obat yang Telah Diminum untuk Mengatasi Gejala!" },
            { field: kirim.obatLainYangDiminum, message: "Mohon isi Obat Lain yang Diminum untuk Non Gejala Saat ini!" },
            { field: kirim.rekomendasiApoteker, message: "Mohon isi Rekomendasi Apoteker" },
            { field: kirim.obat, message: "Mohon isi Obat" },
            { field: kirim.nonObat, message: "Mohon isi Non Obat!" },
            { field: kirim.referensi, message: "Mohon isi Referensi!" },
            { field: kirim.hasilDiskusi, message: "Mohon isi Hasil Diskusi Terakhir!" },
           
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
        };

        

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

  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white,

    }}>
    <MyHeader title="Input Swamedikasi"/>

    <ScrollView>
        <View style={{
            padding:10,

        }}>

        

        </View>

        <View style={{
        padding:20,
        marginBottom:10

    }}>

    <View style={{
        padding:10,
        
    }}>

    <View style={{
        flexDirection:'row'
    }}>
    <Text style={{fontFamily:fonts.primary[600], fontSize:12, flex:0.9}}>Nama Apotek</Text>
    <Text style={{fontFamily:fonts.primary[600], fontSize:12, flex:0.5}}>:</Text>
    <Text style={{fontFamily:fonts.primary[600], fontSize:12, flex:1}}>{user.namaApotek}</Text>
    </View>

    <View style={{
        flexDirection:'row'
    }}>
    <Text style={{fontFamily:fonts.primary[600], fontSize:12, flex:0.9}}>Alamat Apotek</Text>
    <Text style={{fontFamily:fonts.primary[600], fontSize:12, flex:0.5}}>:</Text>
    <Text style={{fontFamily:fonts.primary[600], fontSize:12, flex:1}}>{user.alamatApotek}</Text>
    </View>

    <View style={{
        flexDirection:'row'
    }}>
    <Text style={{fontFamily:fonts.primary[600], fontSize:12, flex:0.9}}>Nama Apoteker</Text>
    <Text style={{fontFamily:fonts.primary[600], fontSize:12, flex:0.5}}>:</Text>
    <Text style={{fontFamily:fonts.primary[600], fontSize:12, flex:1}}>{user.namaLengkap}</Text>
    </View>

    <View style={{
        flexDirection:'row'
    }}>
    <Text style={{fontFamily:fonts.primary[600], fontSize:12, flex:0.9}}>No SIPA</Text>
    <Text style={{fontFamily:fonts.primary[600], fontSize:12, flex:0.5}}>:</Text>
    <Text style={{fontFamily:fonts.primary[600], fontSize:12, flex:1}}>{user.nomorSIPA}</Text>
    </View>

    <View style={{
        flexDirection:'row'
    }}>
    <Text style={{fontFamily:fonts.primary[600], fontSize:12, flex:0.9}}>Nomor SIA</Text>
    <Text style={{fontFamily:fonts.primary[600], fontSize:12, flex:0.5}}>:</Text>
    <Text style={{fontFamily:fonts.primary[600], fontSize:12, flex:1}}>{user.nomorSIA}</Text>
    </View>

    <View style={{
        flexDirection:'row'
    }}>
    <Text style={{fontFamily:fonts.primary[600], fontSize:12, flex:0.9}}>Telepon Apoteker</Text>
    <Text style={{fontFamily:fonts.primary[600], fontSize:12, flex:0.5}}>:</Text>
    <Text style={{fontFamily:fonts.primary[600], fontSize:12, flex:1}}>{user.nomorWA}</Text>
    </View>

    </View>
        <MyButton onPress={toggleVisible} title="Form Swamedikasi Apoteker"/>
    </View>

    {visible && (
        <View style={{
            padding:20,

        }}>

        {/* FORM */}
        <View>
            {/* nomor telepon pasien */}
            <View style={{
                marginTop:10
            }}>
                <MyInput 
                label="Nomor Telepon Pasien"
                placeholder="Isi Nomor Telepon Pasien"
                value={kirim.nomorTelepon}
                onChangeText={(x) => setKirim({...kirim, 'nomorTelepon': x})}
                />
            </View>

            {/* nomor doc */}
            <View style={{
                marginTop:10
            }}>
                <MyInput 
                label="Nomor Doc"
                placeholder="Isi Nomor Telepon Pasien"
                value={kirim.nomorDOC}
                />
            </View>
            {/* Tanggal swamedica */}
            <View style={{
                marginTop:10
            }}>
                <MyCalendar
                value={kirim.tanggal || new Date()}
                label="Tanggal Swamedikasi"
                onDateChange={handleDateChange}
                />
            </View>
            {/* Nama pasien */}
            <View style={{
                marginTop:10
            }}>
                <MyInput 
                label="Nama Pasien"
                placeholder="Isi Nama Pasien"
                value={kirim.namaPasien}
                onChangeText={(x) => setKirim({...kirim, 'namaPasien': x})}

                />
            </View>
            {/* TANGGAL LAHIR */}
            <View style={{
                marginTop:10
            }}>
                <MyCalendar 
                label="Tanggal Lahir"
                value={kirim.tanggalLahir || new Date()}
                onDateChange={handleDateChangeTanggalLahir}
                />
            </View>
            {/* Jenis kelamin */}
            <View style={{
                marginTop:10
            }}>
                <MyPicker value={kirim.jenisKelamin} onChangeText={(x) => setKirim({...kirim, 'jenisKelamin' : x})} label="Jenis Kelamin" data={
                    [
                        {'value' : 'laki-laki', 'label': 'Laki-laki'},
                        {'value' : 'perempuan', 'label': 'Perempuan'}
                    ]
                }/>
            </View>
            {/* Alamat pasien */}
            <View style={{
                marginTop:10
            }}>
                <MyInput 
                label="Alamat Pasien"
                placeholder="Isi Alamat Pasien"
                value={kirim.alamatPasien}
                onChangeText={(x) => setKirim({...kirim, 'alamatPasien': x})}
                />
            </View>
            {/* isian apoteker */}
            <View style={{
                marginTop:10
            }}>
                <MyInput 
                label="Isian Apoteker Berisi"
                placeholder="Isi Jawaban"
                value={kirim.isianApoteker}
                onChangeText={(x) => setKirim({...kirim,'isianApoteker': x})}
                />
            </View>
            {/* Nama pasien yang sakit */}
            <View style={{
                marginTop:10
            }}>
                <MyInput 
                label="Nama Pasien yang Sakit"
                placeholder="Isi Nama Pasien atau Keluarga Pasien"
                value={kirim.namaPasienSakit}
                onChangeText={(x) => setKirim({...kirim, 'namaPasienSakit': x})}
                />
            </View>

            <View style={{
                marginTop:10
            }}>
                <MyInput 
                label="Gejala yang Dirasakan"
                placeholder="Isi Jawaban"
                value={kirim.gejala}
                onChangeText={(x) => setKirim({...kirim, 'gejala': x})}
                />
            </View>

            <View style={{
                marginTop:10
            }}>
                <MyInput 
                label="Lama Gejala Muncul"
                placeholder="Isi Jawaban"
                value={kirim.lamaGejala}
                onChangeText={(x) => setKirim({...kirim, 'lamaGejala': x})}
                />
            </View>

            <View style={{
                marginTop:10
            }}>
                <MyInput 
                label="Obat yang Telah Diminum untuk Mengatasi Gejala"
                placeholder="Isi Jawaban"
                value={kirim.obatYangTelahDiminum}
                onChangeText={(x) => setKirim({...kirim, 'obatLainYangDiminum' : x})}
                />
            </View>

            <View style={{
                marginTop:10
            }}>
                <MyInput 
                label="Obat Lain yang Diminum untuk Non Gejala Saat Ini"
                placeholder="Isi Jawaban"
                onChangeText={(x) => setKirim({...kirim, 'obatLainYangDiminum': x})}
                value={kirim.obatLainYangDiminum}
                />
            </View>

            <View style={{
                marginTop:10
            }}>
                <MyInput 
                label="Rekomendasi Apoteker"
                placeholder="Isi Rekomendasi Apoteker"
                value={kirim.rekomendasiApoteker}
                onChangeText={(x) => setKirim({...kirim, 'rekomendasiApoteker' : x})}
                />
            </View>

            <View style={{
                marginTop:10
            }}>
                <MyInput 
                label="Obat"
                placeholder="Isi Obat"
                value={kirim.obat}
                onChangeText={(x) => setKirim({...kirim, 'obat': x})}
                />
            </View>

            <View style={{
                marginTop:10
            }}>
                <MyInput 
                label="Non Obat"
                placeholder="Isi Non Obat"
                value={kirim.nonObat}
                onChangeText={(x) => setKirim({...kirim, 'nonObat': x})}
                />
            </View>

            <View style={{
                marginTop:10
            }}>
                <MyInput 
                label="Referensi"
                placeholder="Isi Referensi"
                value={(x) => setKirim({...kirim, 'referensi': x})}
                />
            </View>

            <View style={{
                marginTop:10
            }}>
                <MyInput 
                label="Hasil Diskusi Terakhir"
                placeholder="Isi Hasil Diskusi Terakhir"
                value={(x) => setKirim({...kirim, 'hasilDiskusi': x})}
                />
            </View>
        </View>

        <View style={{
            marginTop:10
        }}>
            <MyButton onPress={handleInput} title="Simpan" style={{}}/>
        </View>

        </View>
    )}
    </ScrollView>

 
    </View>
  )
}