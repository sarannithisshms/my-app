
import React from 'react';
import { Platform, View, Text } from 'react-native';
import { Provider } from "react-redux";
import { store } from "../../redux/store/store";
import UserList from "../screen/userpage";

export default function TabLayout() {
  

  return (
    <>
      <Provider store={store}>
        <UserList />
      </Provider>
    </>
  );
}
