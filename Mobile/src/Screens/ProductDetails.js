import React,{useEffect,useState} from 'react'
import {   View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Animated} from 'react-native'
import Dialog from "react-native-dialog";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Caption } from 'react-native-paper'
import {useSelector,useDispatch} from 'react-redux'
import firestore from '@react-native-firebase/firestore';
  
import {FONTS, COLORS, SIZES, images} from '../Constantes'
import {Fetch_User,Subscribe_To_Formation,Subscribe_Entreprise,Fetch_Date} from '../redux/actions'

const ProductDetails = ({ navigation, route }) => {

    const [formation, setformation] = React.useState(null);
    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);



    useEffect(() => {
        let { formation } = route.params;
        setformation(formation)
       
        
        
        }, [formation,])

    

    

    

    
    const indicator = new Animated.Value(0);
  
   
   
    function renderBookInfoSection() {
      return (
          <View style={{ flex: 1 }}>
              {/* Color Overlay */}
             

              {/* Navigation header */}
              <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 60, alignItems: 'center',elevation:3 }}>
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
                      <Text style={{ ...FONTS.h2, color: COLORS.black }}> Detail Produit</Text>
                  </View>

              </View>

              {/* Book Cover */}
              <ImageBackground source = {{uri:formation.image}} resizeMode='cover' imageStyle= {{opacity:0.1}} style={{ flex: 4, paddingTop: SIZES.padding, alignItems: 'center'}}>
              <View >
                  <Image
                      source={{uri:formation.image}}
                      resizeMode="contain"
                      style={{
                          flex: 2.5,
                          width: 320,
                          height: "auto"
                      }}
                  />
                   {/* Book Name and Author */}
              <View style={{ flex: 0.9, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{ ...FONTS.h3, color: COLORS.BLACK, textAlign:'center' }}>{formation.nom}</Text>
              </View>
              </View>
              </ImageBackground>

             

              {/* Book Info */}
              {/* <View
                  style={{
                      flexDirection: 'row',
                      paddingVertical: 20,
                      margin: SIZES.padding,
                      borderRadius: SIZES.radius,
                      backgroundColor: "rgba(0,0,0,0.3)"
                  }}
              > */}
                  {/* Rating */}
                  {/* <View style={{ flex: 1, alignItems: 'center' }}>
                      <Text style={{ ...FONTS.h3, color: COLORS.black }}>{formation.nom}</Text>
                      <Text style={{ ...FONTS.body4, color: COLORS.black }}>Rating</Text>
                  </View> */}

                  {/* <LineDivider /> */}

                  {/* Pages */}
                  {/* <View style={{ flex: 1, paddingHorizontal: SIZES.radius, alignItems: 'center' }}>
                      <Text style={{ ...FONTS.h3, color: COLORS.white }}>{book.pageNo}</Text>
                      <Text style={{ ...FONTS.body4, color: COLORS.white }}>Number of Page</Text>
                  </View> */}

                  {/* <LineDivider /> */}

                  {/* Language */}
                  {/* <View style={{ flex: 1, alignItems: 'center' }}>
                      <Text style={{ ...FONTS.h3, color: COLORS.white }}>{book.language}</Text>
                      <Text style={{ ...FONTS.body4, color: COLORS.white }}>Language</Text>
                  </View> */}
              {/* </View> */}
          </View>
      )
  }

  function renderBookDescription() {

      const indicatorSize = scrollViewWholeHeight > scrollViewVisibleHeight ? scrollViewVisibleHeight * scrollViewVisibleHeight / scrollViewWholeHeight : scrollViewVisibleHeight

      const difference = scrollViewVisibleHeight > indicatorSize ? scrollViewVisibleHeight - indicatorSize : 1

      return (
          <View style={{ flex: 1, flexDirection: 'row', padding: SIZES.padding }}>
              {/* Custom Scrollbar */}
              <View style={{ width: 4, height: "100%", backgroundColor: COLORS.gray1 }}>
                  <Animated.View
                      style={{
                          width: 4,
                          height: indicatorSize,
                          backgroundColor: COLORS.black,
                          transform: [{
                              translateY: Animated.multiply(indicator, scrollViewVisibleHeight / scrollViewWholeHeight).interpolate({
                                  inputRange: [0, difference],
                                  outputRange: [0, difference],
                                  extrapolate: 'clamp'
                              })
                          }]
                      }}
                  />
              </View>

              {/* Description */}
              <ScrollView
                  contentContainerStyle={{ paddingLeft: SIZES.padding2 }}
                  showsVerticalScrollIndicator={false}
                  scrollEventThrottle={16}
                  onContentSizeChange={(width, height) => {
                      setScrollViewWholeHeight(height)
                  }}
                  onLayout={({ nativeEvent: { layout: { x, y, width, height } } }) => {
                      setScrollViewVisibleHeight(height)
                  }}
                  onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { y: indicator } } }],
                      { useNativeDriver: false }
                  )}
              >
                  <Text style={{ ...FONTS.h3, color: COLORS.black, marginBottom: SIZES.padding }}>Description</Text>
                  <Caption style={{ ...FONTS.body4,marginBottom:2}}>{formation.desription}</Caption>
              </ScrollView>
          </View>
      )
  }



  if (formation) {
      return (
          <View style={{ flex: 1, backgroundColor: COLORS.white }}>
              {/* Book Cover Section */}
              <View style={{ flex: 3.2 }}>
                  {renderBookInfoSection()}
              </View>

              {/* Description */}
              <View style={{ flex: 2 }}>
                  {renderBookDescription()}
              </View>

          </View>
      )
  } else {
      return (<></>)
  }

}
export default React.memo(ProductDetails)
