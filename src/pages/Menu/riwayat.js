import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Color, colors } from '../../utils'
import { MyHeader } from '../../components'

export default function RiwayatPelayanan({navigation}) {
  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white
    }}>
      <MyHeader title="Riwayat Pelayanan"/>

      <ScrollView>
        <View style={{
            padding:10,

        }}>
        {/* HASIL RIWAYAT BERBENTUK PDF */}
            
        </View>
      </ScrollView>
    </View>
  )
}