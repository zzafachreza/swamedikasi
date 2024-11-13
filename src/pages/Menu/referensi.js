import { View, Text, ScrollView, Linking, Alert, FlatList } from 'react-native'
import React, { useState } from 'react'
import { colors } from 'react-native-elements'
import { MyHeader, MyInput } from '../../components'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { fonts } from '../../utils'

export default function Referensi({navigation}) {
    const listReferensi = [
        { id: 1, name: 'Abacavir', url: 'https://www.alodokter.com/abacavir' },
        { id: 2, name: 'Abemaciclib', url: 'https://www.alodokter.com/abemaciclib' },
        { id: 3, name: 'Abrocitinib', url: 'https://www.alodokter.com/abrocitinib' },
        { id: 4, name: 'Acalabrutinib', url: 'https://www.alodokter.com/acalabrutinib' },
        { id: 5, name: 'Acarbose', url: 'https://www.alodokter.com/acarbose' },
        { id: 6, name: 'ACE Inhibitor', url: 'https://www.alodokter.com/ace-inhibitor' },
        { id: 7, name: 'Acebutolol', url: 'https://www.alodokter.com/acebutolol' },
        { id: 8, name: 'Acetazolamide', url: 'https://www.alodokter.com/acetazolamide' },
        { id: 9, name: 'Acetylcysteine', url: 'https://www.alodokter.com/acetylcysteine' },
        { id: 10, name: 'Acetylcysteine Inhalasi', url: 'https://www.alodokter.com/acetylcysteine-inhalasi' },
        { id: 11, name: 'Acifar', url: 'https://www.alodokter.com/acifar' },
        { id: 12, name: 'Acifar Cream', url: 'https://www.alodokter.com/acifar-cream' },
        { id: 13, name: 'Acitral', url: 'https://www.alodokter.com/acitral' },
        { id: 14, name: 'Acitretin' , url: 'https://www.alodokter.com/acitretin'},
        { id: 15, name: 'Aclidinium' , url: 'https://www.alodokter.com/aclidinium'},
        { id: 16, name: 'Actemra', url: 'https://www.alodokter.com/actemra' },
        { id: 17, name: 'Actifed', url: 'https://www.alodokter.com/actifed' },
    ];

    const [searchQuery, setSearchQuery] = useState('');
  const [filteredReferensi, setFilteredReferensi] = useState(listReferensi);


  const handleSearch = (query) => {
    setSearchQuery(query);

    // Filter array berdasarkan query pencarian
    const filteredData = listReferensi.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredReferensi(filteredData);
  };

    const openLink = (url) => {
        Linking.openURL(url)
          .catch((err) => {
            console.error("Terjadi kesalahan saat membuka URL:", err);
            Alert.alert("Tidak bisa membuka link", `Gagal membuka URL: ${url}`);
          });
      };
    
  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white
    }}>
    <MyHeader title="Referensi"/>
     <ScrollView>
        <View style={{

        }}>

        {/* search */}
        <View style={{
            padding:10,
            marginTop:-30
        }}>
        <MyInput 
        placeholder="Cari Obat" 
        rightIcon='search-circle-outline'
        value={searchQuery}
        onChangeText={handleSearch}
        />
        </View>

        {/* List */}
        <View style={{
            padding:10,
        }}>

        <FlatList
        data={filteredReferensi}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
            <TouchableWithoutFeedback key={item.id} onPress={() => openLink(item.url)}>
                    <View style={{
                        padding:10,
                        flexDirection:"row"
                        
                    }}>
                    <Text style={{
                        fontFamily:fonts.primary[500],
                        fontSize:15,
                        marginRight:10
                    }}>•</Text>
                        <Text style={{
                            fontFamily:fonts.primary[500],
                            fontSize:15
                        }}>{item.name}</Text>
                    </View>
                </TouchableWithoutFeedback>
        )}

        />

        </View>

        </View>
     </ScrollView>
    </View>
  )
}