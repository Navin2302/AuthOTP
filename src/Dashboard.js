import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function Dashboard() {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try{
            await auth().signOut();

            //Reset the navigation stack to 'login' and remove the otp related screens
            navigation.reset({
                index: 0,
                routes:[{name:"login" }],
            });
        }catch(error) {
            console.log("Error during the logout:",error);
        }
    };
    return(
        <View style={{ flex: 1, padding:10, backgroundColor:"#BEBDB8"}}>
            <Text
            style={{
                fontSize: 32,
                fontWeight: "bold",
                marginBottom: 40, // Corrected
                marginTop: 150,
            }}
            >
                Welcome to Home Page!
            </Text>
            <TouchableOpacity
            onPress={handleLogout}
            style={{
                backgroundColor:"#841584",
                padding:10,
                borderRadius:5,
                marginBottom:20,
                alignItems:"center",
            }}
            >
                <Text style={{ color:"white", fontSize: 22, fontWeight:"bold"}}>
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    );
}