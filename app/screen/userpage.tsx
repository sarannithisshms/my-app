import React, { useEffect,useState } from "react";
import { View, Text, FlatList,StyleSheet,RefreshControl,Platform,StatusBar } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { fetchUsers } from "../../redux/reducer/userSlice";
import UserCard from "@/components/UserCard";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export default function UserList() {
    const dispatch = useAppDispatch();
    const { users, loading, error } = useAppSelector((state) => state.user);
    const [refreshing, setRefreshing] = useState(false);

  
    useEffect(() => {
      dispatch(fetchUsers());
    }, [dispatch]);

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
  
    const onRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchUsers());
        setRefreshing(false);
      };

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
  
    return (
      <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <Text style={styles.header}> User List</Text>
  
        {loading && <Text>Loading users...</Text>}
        {error && <Text style={{ color: "red" }}>{error}</Text>}
  
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <UserCard item={item} onPress={showNotification} />}
          ListEmptyComponent={<Text>No users found.</Text>}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

        />
  
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    header: {
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10,
    },
    container: {
        flex:1,
        paddingHorizontal:10,
        paddingVertical:30,
        backgroundColor:'#ffff'
      },
   
  });
