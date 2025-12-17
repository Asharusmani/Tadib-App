import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const habitcard = (style) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardalign}>
        <View style={styles.boxsize}>
            <Image source={require("../../assets/images/book.png")} style={styles.img} resizeMode='contain'></Image>
        </View>
        <View style={styles.headeralign}>
            <Text style={styles.headertxt}>Read Quran</Text>
            <View style={styles.subheadingRow}>
            <Text style={styles.subheadingtxt}>5:30 Am</Text>
            <Image source={require("../../assets/images/point.png")} style={styles.point}/>
            <Text style={styles.subheadingtxt}>15 points</Text>
            </View>
        </View>
        <View style={styles.icon}>
                <Image source={require("../../assets/images/fire.png")} style={styles.fireimg}/>
                <Text style={styles.subheadingtxt}>15 days</Text>
            </View>
      </View>
    </View>
  )
}

export default habitcard

const styles = StyleSheet.create({
    card:{
        height:70,
        width:"100%",
        backgroundColor:"#EEF9F2",
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation:2,
        marginBottom:15

    },
cardalign:{
    flexDirection:"row",
    position:'relative',
    padding:10,
    justifyContent:'space-between',
    alignItems:"center"
},
boxsize:{
    
    height:50,
    width:50,
    borderRadius:10,
    alignItems:"center",
    alignContent:"center",
    justifyContent:"center",
    backgroundColor:"rgba(34,197,94,0.60)",
    opacity:0.8,
    elevation:2
    
},
img:{
    height:30,
    width:30
},
point:{
    marginLeft:10,
    height:16,
    width:16,
    marginRight:6
},
subheadingRow:{
    flexDirection:"row"

},
headeralign:{
   paddingLeft:10,
    justifyContent:"center",
    flex:1
    
},
headertxt:{
    fontSize:16,
    fontWeight:"600",
    color:"#2a2a2a"
},
subheadingtxt:{
    fontSize:12,
    fontWeight:"400",
    color:"#2a2a2a",
    opacity:0.6
},
fireimg:{
    height:16,
    width:16,
},
icon:{
    flexDirection:"row",
    justifyContent:"center",
    alignContent:"center",
    
}

})