import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import { Link } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import { WebBrowserRedirectResult } from 'expo-web-browser';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';

/* ------------------------------------------------------------------------- */

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}


async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token.data;
}


async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result
  } else {
    return undefined
  }
}

function parseJwt (token: string) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

export default function App() { 
  const [result, setResult] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [response, setResponse] = useState(null);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
      setNotification(Boolean(notification));
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  useEffect(() => {
    const fetchToken = async () => {
      const token = await getValueFor("access_token");
      setAccessToken(token);

      console.log(token)

      if (token) {
        const result = await fetch('https://4nebspctu9.execute-api.ap-southeast-2.amazonaws.com/api/trpc/user.userDetails', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => response.json())
        .then(json => {
          setResponse(json)
          console.log(json)
        })
        .catch(error => {
          console.log('aaa')
          console.error(error);
        });
      }
    };

    fetchToken();
  }, []); // Empty array ensures this runs on mount only

  const redirectUrl = Linking.createURL('');

  const _handlePressButtonAsync = async () => {

    const params = new URLSearchParams({
      client_id: "local",
      redirect_uri: redirectUrl,
      response_type: "token",
      provider: "google",
    });
    const url = 'https://vc13afflb1.execute-api.ap-southeast-2.amazonaws.com' + "/authorize?" + params.toString();

    let result = await WebBrowser.openAuthSessionAsync(url) as WebBrowserRedirectResult;

    const parsed = result.url.split('#')[1]
      .split('&').reduce((result, item) => {
        const parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
      }, {});

    save("access_token", parsed['access_token'])

    setResult(result);
  };

  return (
    <View style={styles.container}>
      <Text>{redirectUrl.toString()}</Text>
      <Button title="Open WebBrowser" onPress={_handlePressButtonAsync} />
      <Text>{result && JSON.stringify(result)}</Text>
      <Text>{accessToken}</Text>
      <Text>{JSON.stringify(response, null, 2)}</Text>
      <StatusBar style="auto" />
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


