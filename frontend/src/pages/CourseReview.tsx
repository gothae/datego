import * as React from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {Button} from '@react-native-material/core';
import {useState, useEffect, useCallback, useMemo} from 'react';
import axios from 'axios';
import NaverMapView from 'react-native-nmap';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { Marker } from 'react-native-svg';

type Store = {
    name: String;
    id: number;
    tags: [];
    mission: String;
}
type K = {
    latitude: number;
    longitude: number;
}
type Location = {
    P0: K;
    P1: K;
    P2: K;
}
// function CourseReview({navigation}){
//     const spotId: number = 1;
//     return(
//         <ScrollView>
//             <View style={{flex:1}}>
//                 <View style={{flex:1}}
//                     <NaverMapView
//                         style{{height:270, marginHorizontal:10, marginVertical:10}}
//                         showsMyLocationButton={true}
//                         center={{...location.P0, zoom:14}}
//                         onCameraChange={e=>
//                             console.warn('onCamerachange', JSON.stringify(e))
//                         }
//                         onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
//                         <Marker>
//                             coordinate={location.P0}
//                             onClick={()=> console.warn('OnClick! p0')}
//                         </Marker>
//                         <Marker
                        
                        
//                     </NaverMapView>
//                 </View>
//             </View>
//         </ScrollView>
//     )
// }