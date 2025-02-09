import React, { useEffect } from "react";
import { View, Button, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

// Configure how notifications are handled
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    async function requestPermissions() {
      if (Platform.OS === "android" && Device.isDevice) {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          alert("Permission for notifications was denied");
        }
      }
    }
    requestPermissions();
  }, []);

  const showNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🚀 New Alert",
        body: "Custom icon in status bar!",
        data: { info: "Additional data here" },
        sound: "default",
      },
      trigger: null, 
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Show Notification" onPress={showNotification} />
    </View>
  );
}
