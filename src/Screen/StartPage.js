import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Circlee from 'react-native-vector-icons/dist/Feather';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { useNavigation } from '@react-navigation/native';
const StartPage = () => {
  const [statusBarStyle, setStatusBarStyle] = useState();
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "#6e6e6e", }}>
      <StatusBar
        animated={true}
        backgroundColor="#grey"
        barStyle={statusBarStyle}
      />


      <View style={{ marginTop: 25}}>
        <View style={{width:"100%",alignItems:"center",padding:10}}>
          <Image 
          source={require("../assets/splashhhhh.png")}
          style={{height:150,width:150,borderRadius:90,}}/>
        </View>
      </View>

      <View style={{ width: "100%", }}>
        <View style={{ width: "100%", alignItems: "center", marginTop: 25 }}>
          <Text style={{fontSize:responsiveFontSize(2.55),fontWeight:"400"}}>
            Welcome To Athletically
          </Text>
        </View>

        <View style={{ width: "100%", alignItems: "center", marginTop: 25 }}>
          <Text style={{fontSize:responsiveFontSize(2.55),fontWeight:"400"}}>
            Enhance your Profile for
          </Text>
          <Text style={{fontSize:responsiveFontSize(2.55),fontWeight:"400"}}>
            improved connections
          </Text>
        </View>
      </View>


      <View style={{ width: "100%", position: "absolute", bottom: 65 }}>
        <View style={{ marginHorizontal: 25 }}>
          <TouchableOpacity
            onPress={()=>navigation.navigate("ProfileUpdatePage",{data:"1"})}
            style={{
              // flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#fff",
              paddingVertical: 8,
              paddingLeft: 10,
              // paddingHorizontal: 220,
              borderRadius: 50,
              width: "100%"
            }}>


            <View style={{ paddingLeft: 5, }}>
              <Text style={{ color: "#38485c", paddingLeft: 2, fontSize: responsiveFontSize(1.9), }}>
                Update Profile
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{}}>
            or
          </Text>
        </View>

        <View style={{ marginHorizontal: 25, marginTop: 5 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("DashboardPage")}
            // onPress={()=>navigation.navigate("ProfileUpdatePage",{data:"1"})}
            style={{

              alignItems: "center",
              backgroundColor: "#fff",
              paddingVertical: 8,

              // paddingHorizontal: 220,
              borderRadius: 50,
              width: "100%"
            }}>


            <View style={{ paddingLeft: 5 }}>
              <Text style={{ color: "#38485c", paddingLeft: 2, fontSize: responsiveFontSize(1.9), }}>
                Skipp
              </Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>

    </View >
  )
}

export default StartPage

const styles = StyleSheet.create({})