import * as React from 'react';
import {useState} from 'react';
import {
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import {View, Button} from 'react-native';

function Intro() {
  const [result, setResult] = useState<string>('');
  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login();

      await setResult(JSON.stringify(token));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('login err', err);
    }
  };

  const signOutWithKakao = async (): Promise<void> => {
    try {
      const message = await logout();

      setResult(message);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('signOut error', err);
    }
  };

  const getProfile = async (): Promise<void> => {
    try {
      const profile = await getKakaoProfile();

      setResult(JSON.stringify(profile));
      console.log(profile);
      console.log(result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('signOut error', err);
    }
  };

  const unlinkKakao = async (): Promise<void> => {
    try {
      const message = await unlink();

      setResult(message);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('signOut error', err);
    }
  };
  const ResultView = Object.create(View);

  return (
    <View>
      <ResultView result={result} />
      <View>
        <Button
          testID="btn-login"
          onPress={() => signInWithKakao()}
          title={'카카오 로그인'}
        />
        {/* @ts-ignore */}
        <View style={{marginTop: 12}} />
        <Button
          testID="btn-login"
          onPress={() => getProfile()}
          title={'프로필 조회'}
        />
        {/* @ts-ignore */}
        <View style={{marginTop: 12}} />
        <Button
          testID="btn-login"
          onPress={() => unlinkKakao()}
          title={'링크 해제'}
        />
        {/* @ts-ignore */}
        <View style={{marginTop: 12}} />
        <Button
          testID="btn-login"
          onPress={() => signOutWithKakao()}
          title={'카카오 로그아웃'}
        />
        {/* @ts-ignore */}
        <View style={{marginTop: 40}} />
      </View>
    </View>
  );
}

export default Intro;
