import React,{useEffect} from 'react'
import {   View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated} from 'react-native'
  
import {windowHeight, windowWidth} from '../utils/Dimentions'
import {FONTS, COLORS, SIZES, images} from '../Constantes'

const FormationDetailsScreen = ({ navigation, route }) => {
    const [formation, setformation] = React.useState(null);
    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);

    const indicator = new Animated.Value(0);
    useEffect(() => {
      let { formation } = route.params;
      setformation(formation)
    }, [formation])

    
    function renderBookInfoSection() {
      return (
          <View style={{ flex: 1 }}>
              {/* Color Overlay */}
              <View
                  style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      backgroundColor: COLORS.white
                  }}
              >
              </View>

              {/* Navigation header */}
              <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 80, alignItems: 'flex-end' }}>
                  <TouchableOpacity
                      style={{ marginLeft: SIZES.base }}
                      onPress={() => navigation.goBack()}
                  >
                      <Image
                          source={images.back_arrow}
                          resizeMode="contain"
                          style={{
                              width: 25,
                              height: 25,
                              tintColor: COLORS.black
                          }}
                      />
                  </TouchableOpacity>

                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ ...FONTS.h3, color: COLORS.black }}>Formation Detail</Text>
                  </View>

                  <TouchableOpacity
                      style={{ marginRigth: SIZES.base }}
                      onPress={() => console.log("Click More")}
                  >
                      <Image
                          source={images.edit_icon}
                          resizeMode="contain"
                          style={{
                              width: 30,
                              height: 30,
                              tintColor: COLORS.black,
                              alignSelf: 'flex-end'
                          }}
                      />
                  </TouchableOpacity>
              </View>

              {/* Book Cover */}
              <View style={{ flex: 5, paddingTop: SIZES.padding2, alignItems: 'center' }}>
                  <Image
                      source={{uri:formation.image}}
                      resizeMode="contain"
                      style={{
                          flex: 1,
                          width: 300,
                          height: "auto"
                      }}
                  />
              </View>

              {/* Book Name and Author */}
              <View style={{ flex: 1.8, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ ...FONTS.h2, color: COLORS.BLACK }}>{formation.nom}</Text>
                  <Text style={{ ...FONTS.body3, color: COLORS.black }}>{formation.nom}</Text>
              </View>

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
                  <Text style={{ ...FONTS.h2, color: COLORS.black, marginBottom: SIZES.padding }}>Description</Text>
                  <Text style={{ ...FONTS.body2, color: COLORS.black }}>{formation.desription}</Text>
              </ScrollView>
          </View>
      )
  }

  function renderBottomButton() {
      return (
          <View style={{ flex: 1, flexDirection: 'row' ,backgroundColor:COLORS.grey1}}>
              {/* Bookmark */}
              <TouchableOpacity
                  style={{
                      width: 60,
                      backgroundColor: COLORS.secondary,
                      marginLeft: SIZES.padding,
                      marginVertical: SIZES.base,
                      borderRadius: SIZES.radius,
                      alignItems: 'center',
                      justifyContent: 'center'
                  }}
                  onPress={() => console.log("Bookmark")}
              >
                  <Image
                      source={images.edit_icon}
                      resizeMode="contain"
                      style={{
                          width: 25,
                          height: 25,
                          tintColor: COLORS.lightGray2
                      }}
                  />
              </TouchableOpacity>

              {/* Start Reading */}
              <TouchableOpacity
                  style={{
                      flex: 1,
                      backgroundColor: COLORS.primary,
                      marginHorizontal: SIZES.base,
                      marginVertical: SIZES.base,
                      borderRadius: SIZES.radius,
                      alignItems: 'center',
                      justifyContent: 'center'
                  }}
                  onPress={() => console.log("Start Reading")}
              >
                  <Text style={{ ...FONTS.h3, color: COLORS.white }}>S'inscrire</Text>
              </TouchableOpacity>
          </View>
      )
  }

  if (formation) {
      return (
          <View style={{ flex: 1, backgroundColor: COLORS.white }}>
              {/* Book Cover Section */}
              <View style={{ flex: 4 }}>
                  {renderBookInfoSection()}
              </View>

              {/* Description */}
              <View style={{ flex: 2 }}>
                  {renderBookDescription()}
              </View>

              {/* Buttons */}
              <View style={{ height: 70, marginBottom: 30 }}>
                  {renderBottomButton()}
              </View>
          </View>
      )
  } else {
      return (<></>)
  }

}

export default React.memo(FormationDetailsScreen)

