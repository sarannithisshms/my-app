import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";


interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: {
    name: string;
  };
}

interface UserCardProps {
  item: User;
  onPress?: () => void; 
}

const UserCard: React.FC<UserCardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: `https://i.pravatar.cc/100?img=${item.id}` }}
        style={styles.avatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.phone}>📞 {item.phone}</Text>
        <Text style={styles.company}>{item.company.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
  phone: {
    fontSize: 14,
    color: "#555",
  },
  company: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#777",
  },
});
