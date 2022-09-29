import * as React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import Gallery from './src/pages/Gallery';
import SelectDong from './src/pages/SelectDong';
import Preference from './src/pages/Preference';
import Course from './src/pages/Course';
import ChangeSpot from './src/pages/ChangeSpot';
import DetailSpot from './src/pages/DetailSpot';
import CourseIng from './src/pages/CourseIng';
import SignIn from './src/pages/SignIn';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
// import DragAble from './src/pages/DragAble';

export type LoggedInParamList = {
  Home: undefined;
  Users: undefined;
  Gallery: undefined;
  SelectDong: undefined;
  Preference: undefined;
  Course: undefined;
  ChangeSpot: undefined;
  DetailSpot: undefined;
  CourseIng: undefined;
  SignIn: undefined;
};

// export type RootStackParamList = {
//   SignIn: undefined;
// };

type HomeScreenProps = NativeStackScreenProps<ParamListBase>;

const Stack = createNativeStackNavigator();

function AppInner() {
  const isLoggedIn = useSelector(
    (state: RootState) => !!state.user.accessToken,
  );
  // return (
  //   <Stack.Navigator>
  //     <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
  //     <Stack.Screen
  //       name="Gallery"
  //       component={Gallery}
  //       options={{title: 'Gallery'}}
  //     />
  //     <Stack.Screen
  //       name="SelectDong"
  //       component={SelectDong}
  //       options={{title: 'SelectDong'}}
  //     />
  //     <Stack.Screen
  //       name="Preference"
  //       component={Preference}
  //       options={{title: 'Preference'}}
  //     />
  //     <Stack.Screen
  //       name="Course"
  //       component={Course}
  //       options={{title: 'Course'}}
  //     />
  //     {/* <Stack.Screen
  //       name="DragAble"
  //       component={DragAble}
  //       options={{title: 'DragAble'}}
  //     /> */}

  //     <Stack.Screen
  //       name="ChangeSpot"
  //       component={ChangeSpot}
  //       options={{title: 'ChangeSpot'}}
  //     />
  //     <Stack.Screen
  //       name="DetailSpot"
  //       component={DetailSpot}
  //       options={{title: 'DetailSpot'}}
  //     />
  //     <Stack.Screen
  //       name="CourseIng"
  //       component={CourseIng}
  //       options={{title: 'CourseIng'}}
  //     />
  //   </Stack.Navigator>
  // );
  // 로그인검증
  return isLoggedIn ? (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
      <Stack.Screen
        name="Gallery"
        component={Gallery}
        options={{title: 'Gallery'}}
      />
      <Stack.Screen
        name="SelectDong"
        component={SelectDong}
        options={{title: 'SelectDong'}}
      />
      <Stack.Screen
        name="Preference"
        component={Preference}
        options={{
          title: '코스설정',
          headerStyle: {
            backgroundColor: '#FFA856',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 30,
          },
        }}
      />
      <Stack.Screen
        name="Course"
        component={Course}
        options={{title: 'Course'}}
      />
      {/* <Stack.Screen
        name="DragAble"
        component={DragAble}
        options={{title: 'DragAble'}}
      /> */}

      <Stack.Screen
        name="ChangeSpot"
        component={ChangeSpot}
        options={{title: 'ChangeSpot'}}
      />
      <Stack.Screen
        name="DetailSpot"
        component={DetailSpot}
        options={{title: 'DetailSpot'}}
      />
      <Stack.Screen
        name="CourseIng"
        component={CourseIng}
        options={{title: 'CourseIng'}}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{title: 'SignIn', headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AppInner;
