import React,{useState,useEffect,} from 'react'
import { View, Text, StyleSheet,ScrollView,SafeAreaView,Image } from 'react-native'
import {useSelector} from 'react-redux'
import { Avatar, Button, Card, Title, Paragraph, ActivityIndicator} from 'react-native-paper';
import {images,COLORS} from '../Constantes'
import MapView, { Marker } from 'react-native-maps';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const DetailsScreen = () => {

    const Get_Defib = useSelector(state => state.Get_Defib);
    const Adresse = useSelector(state => state.AdresseReducer);

    useEffect(() => {
        console.log(Get_Defib)
       
    }, [Get_Defib])
    return (
        <SafeAreaView style = {{backgroundColor:Colors.white,flex : 1}}>
          {Get_Defib.Defibrilatteur.latitude === undefined ? (
             <ActivityIndicator size="large" animating = {true}  style = {{flex : 1,justifyContent:'center' ,alignItems:'center'}} />
          ):(
            <ScrollView>
            <Card style={styles.card}>
                <Card.Title title="Telephone" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}/>
                <Card.Content>
                    <View>
                      <Paragraph style={styles.para}>{Get_Defib.Defibrilatteur.telephone}</Paragraph>
                    </View>
               </Card.Content>
             </Card>

             <Card style={styles.card}>
                <Card.Title title="Specification" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}/>
                <Card.Content>
                <View style = {{display:'flex',flexDirection:'row'}}>
                    <View style={{flex:1}}>
                      <Title Text style={styles.Title}>Marque</Title>
                      <Paragraph>{Get_Defib.Defibrilatteur.marque_defib}</Paragraph>
                    </View>
                    <View style={{flex:1}}>
                      <Title Text style={styles.Title}>Type d'eclectrode</Title>
                      <Paragraph>{Get_Defib.Defibrilatteur.type_electrode}</Paragraph>
                    </View>
                </View>
                    
               </Card.Content>
             </Card>

             <Card style={styles.card}>
                <Card.Title title="Nom" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}/>
                <Card.Content>
                    <View>
                      <Paragraph style={styles.para}>{Get_Defib.Defibrilatteur.nom}</Paragraph>
                    </View>
               </Card.Content>
             </Card>

             <Card style={styles.card}>
                <Card.Title title="Adresse" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}/>
                <Card.Content>
                <View style = {{display:'flex',flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <View>
                          <Title Text style={styles.Title}>Adresse</Title>
                          <Paragraph>{Adresse.addrese}</Paragraph>
                        </View>
                        <View>
                          <Title Text style={styles.Title}>codePostal</Title>
                          <Paragraph>{Adresse.codePostal}</Paragraph>
                        </View>
                        <View>
                          <Title Text style={styles.Title}>province</Title>
                          <Paragraph>{Adresse.province}</Paragraph>
                        </View>
                    </View>
                    <View style={{flex:1,marginLeft:20}}>
                        <View>
                          <Title Text style={styles.Title}>ville</Title>
                          <Paragraph>{Adresse.ville}</Paragraph>
                        </View>
                        <View>
                          <Title Text style={styles.Title}>Pays</Title>
                          <Paragraph>{Adresse.pays}</Paragraph>
                        </View>
                        <View>
                        </View>
                    </View>
                </View>   
               </Card.Content>
             </Card>

             <Card style={styles.card}>
                <Card.Title title="Emplacement" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}/>
                <Card.Content style = {{flex:1}}>
                    <View style = {{flex:1}}>
                      <MapView style = {{display:'flex', justifyContent:'center', alignContent:'stretch',width:300,height:200,marginTop:5}}
                        mapType = 'standard'
                        scrollEnabled = {false}
                        showsTraffic ={true}
                        initialRegion={{
                            latitude:Get_Defib.Defibrilatteur.latitude,
                            longitude :Get_Defib.Defibrilatteur.longitude,
                            latitudeDelta : 0.0008,
                            longitudeDelta : 0.0016
                           }}
                      >
                      <Marker
                        key={Get_Defib.Defibrilatteur.id}
                        coordinate={{latitude : Get_Defib.Defibrilatteur.latitude, longitude : Get_Defib.Defibrilatteur.longitude }}
                        color='#0000FF'
                    />
                        
                      </MapView>
                    </View>
               </Card.Content>
             </Card>

             <Card style={styles.card}>
                <Card.Title title="Accessibilité" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}/>
                <Card.Content>
                    <View>
                      <Paragraph style={styles.para}>{Get_Defib.Defibrilatteur.accesibillité}</Paragraph>
                    </View>
               </Card.Content>
             </Card>

             <Card style={styles.card} >
                <Card.Title title="photo" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}/>
                <Card.Content >
                    <View>
                    {Get_Defib.Defibrilatteur.photo === null ? (
                         <Image
                            source={images.add_to_photo}
                            resizeMode='stretch'
                            style = {styles.add_to_photo}  />   ) 
                        : (
                        <Image
                            source={{ uri: Get_Defib.Defibrilatteur.photo }}
                            style = {styles.add_to_photo}  
                            resizeMode='contain'  />  )}
                    </View>
               </Card.Content>
             </Card>

             

        </ScrollView>)}
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
card :{
     shadowColor: "#000",
     shadowOffset: {
       width: 0,
       height: 7,
     },
     shadowOpacity: 0.43,
     shadowRadius: 9.51,
     
     elevation: 3,
    margin:15,
    
    marginTop:10},

cardTitle : {borderBottomWidth:0.45},

Title :{color:COLORS.primary, fontSize:15, fontFamily: "Cochin"},

para : {marginTop:10},

add_to_photo:{
    height:100 ,
    width:100,
   margin:15,
   tintColor : '#0000FF'},

icon:{width: 20,  height: 10, padding:0}

})
export default DetailsScreen
