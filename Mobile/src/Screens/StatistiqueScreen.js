import React, {useState,useEffect,} from 'react'
import { SafeAreaView, Text, View,Image,TouchableOpacity,StyleSheet, ScrollView } from 'react-native'
import {useSelector} from 'react-redux'
import { Avatar, Button, Card, Title, Paragraph, IconButton  } from 'react-native-paper';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
  } from "react-native-chart-kit";
  import Icon from 'react-native-vector-icons/FontAwesome';
import {FONTS, COLORS, SIZES, images} from '../Constantes'
import { windowHeight, windowWidth } from '../utils/Dimentions';
import TabBarCustomButton from '../components/TabBar/TabBarCustomButton'

const StatistiqueScreen = ({navigation}) => {
    const stat_etat_defib = useSelector(state => state.Fetch_stats_etat.stat_etat_defib);
    const stat_prov_defib = useSelector(state => state.Fetch_stats_prov.stat_prov_defib);
    const [data, setdata] = useState([])
    let BarData = {}



    function getRandomColor() {
       
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      
      
    const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
    };
    typeof stat_etat_defib !== "undefiend" && stat_etat_defib.map((item,index) =>{
        if(index === 0){
            data.push({
                name: "en traitement",
                population: item[1],
                color: getRandomColor(),
                legendFontColor: "#7F7F7F",
                legendFontSize: 10
    
            })
        }
        else{
            data.push({
                name: item[0],
                population: item[1],
                color: getRandomColor(),
                legendFontColor: "#7F7F7F",
                legendFontSize: 12
    
            })
        }
       
    })
    typeof stat_prov_defib !== "undefiend" && stat_prov_defib.map((item,index) =>{
      
    
      BarData = {
        labels:["January", "February"], 
        datasets: [
          {
            data: [20, 45,]
          }
        ]
      }
    if(stat_prov_defib.length -1  == index){
      console.log("")
      console.log("")
    }
       
    })
      
   
   
   
       
     
       

    useEffect(() => {
      setdata([])
     
        const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible: false,  
            tabBarButton: (props) => (
                       <TabBarCustomButton visible
                            {...props}
                        /> ),
      });
     
      return () =>{
        parent.setOptions({
          tabBarVisible: true,
          tabBarButton: (props) => (
                   <TabBarCustomButton 
                       {...props}
                   />),
      });
      }
      
    }, [stat_prov_defib,stat_etat_defib])
        return (
            <SafeAreaView style = {{display:'flex',flex:1}}>
                   {/* Header */}
                <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 60, alignItems: 'center',elevation:3 ,backgroundColor:COLORS.WHITE, marginBottom:20}}>
                  <TouchableOpacity
                      style={{ marginLeft: -8 }}
                      onPress={() => navigation.goBack()}
                  >
                      <Image
                          source={images.back_arrow}
                          resizeMode="contain"
                          style={{
                              width: 30,
                              height: 30,
                              tintColor: COLORS.black
                          }}
                      />
                  </TouchableOpacity>

                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ ...FONTS.h2, color: COLORS.black }}>Statistique</Text>
                  </View>

               </View>
               <ScrollView>

            <Card style={styles.card} >
              <Card.Content style={{flexDirection:'row', alignContent:'center'}} >
                <Icon name="medkit" size={30}  style={{marginLeft:10}} color = {COLORS.PRIMARY} />
                <Text style={{ ...FONTS.h4, color: COLORS.black, marginLeft:13, marginTop:6 }}>Nombre de defibrillateurs : 17  </Text>
              </Card.Content>
            </Card>

            <Card style={styles.card} >
              <Card.Content style={{flexDirection:'row', alignContent:'center'}} >
                <Icon name="home" size={30}  style={{marginLeft:10}} color = {COLORS.PRIMARY} />
                <Text style={{ ...FONTS.h3, color: COLORS.black, marginLeft:13, marginTop:4 }}>Nombre de villes : {stat_prov_defib.length} villes</Text>
              </Card.Content>
            </Card>


            {/* Pie CHART */}
                
            <Card style={styles.card} >
                <Card.Title title="statistiques des defibrillateurs ajoutés " titleStyle={{...FONTS.h2,color:COLORS.primary,fontFamily: "Cochin", padding:10}} style={styles.cardTitle}/>
                <Card.Content style={{borderTopWidth:1}}>
                    
                    { typeof data !== "undefiend" ? (<PieChart
                        data={data}
                        width={windowWidth*0.93}
                        height={windowHeight*0.35}
                        chartConfig={chartConfig}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"25"}
                        center={[0, 10]}
                  
                        
                        />):null }
                 
               </Card.Content>
            </Card>

              
           {/* Bar CHART 
           <Card style={styles.card} >
                <Card.Title title="Etat" titleStyle={{color:COLORS.primary,fontFamily: "Cochin"}} style={styles.cardTitle}
                           />
                <Card.Content >
                    
                { typeof BarData !== "undefiend" ? (<BarChart
                        data={BarData}
                        width={windowWidth*0.85}
                        height={windowHeight*0.3}
                        yAxisLabel=""
                        chartConfig={{
                            backgroundColor: '#FFFFFF',
                            backgroundGradientFrom: '#eff3ff',
                            backgroundGradientTo: '#efefef',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                              borderRadius: 16,
                            },
                          }}
                        verticalLabelRotation={0}
                        />):null }
                 
               </Card.Content>
            </Card>*/}

               </ScrollView>
         
            </SafeAreaView> 
        )
    
}


export default StatistiqueScreen

const styles = StyleSheet.create({
    card :{
         borderRadius:40,
         marginLeft:10,
         marginRight:10,
         marginTop:5,
         marginBottom:15,
         shadowColor: "#000",
         shadowOffset: {
           width: 0,
           height: 7,
         },
         shadowOpacity: 0.43,
         shadowRadius: 9.51,
         
        elevation: 5,},
        
    
    })