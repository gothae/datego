// import * as React from 'react';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { ParamListBase } from '@react-navigation/native';
// import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
// import { Text } from 'react-native-paper';
// import DraggableFlatList, {
//   RenderItemParams,
//   ScaleDecorator,
// } from "react-native-draggable-flatlist";
// const NUM_ITEMS = 10;
// function getColor(i: number) {
//   const multiplier = 255 / (NUM_ITEMS - 1);
//   const colorVal = i * multiplier;
//   return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
// }

// type Item = {
//   key: string;
//   label: string;
//   height: number;
//   width: number;
//   backgroundColor: string;
// };

// const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
//   const [data, setData] = useState(initialData);
// }
//   const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
//     return (
//       <ScaleDecorator>
//         <TouchableOpacity
//           onLongPress={drag}
//           disabled={isActive}
//           style={[
//             styles.rowItem,
//             { backgroundColor: isActive ? "red" : item.backgroundColor },
//           ]}
//         >
//           <Text style={styles.text}>{item.label}</Text>
//         </TouchableOpacity>
//       </ScaleDecorator>
//     );
//   };

//   return (
//     <DraggableFlatList
//       data={data}
//       onDragEnd={({ data }) => setData(data)}
//       keyExtractor={(item) => item.key}
//       renderItem={renderItem}
//     />
//   );
// });


// type DragAbleProps = NativeStackScreenProps<ParamListBase, 'DragAble'>
// function DragAble({ navigation }: DragAbleProps) {
//   return (
//     <View>
//       <Text>테스트</Text>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   rowItem: {
//     height: 100,
//     width: 100,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     color: "white",
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//   }
// });
// export default DragAble;