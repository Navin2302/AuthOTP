import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState("");
    const [confirm, setConfirm] = useState(null);
    const navigation = useNavigation();

    const signInWithPhoneNumber = async () => {
       
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
        } catch (error) {
            console.log("Error sending code:", error);
        }
    };

    const confirmCode = async () => {
        try {
            const userCredential = await confirm.confirm(code);
            const user = userCredential.user;

            // Check if the user is new or existing
            const userDocument = await firestore()
                .collection("users")
                .doc(user.uid)
                .get();

            if (userDocument.exists) {
                // User is existing, navigate to Dashboard
                navigation.navigate("Dashboard");
            } else {
                // User is new, navigate to Detail
                navigation.navigate("Detail", { uid: user.uid });
            }
        } catch (error) {
            console.log("Invalid code.", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Phone Number Authentication Using Firebase</Text>
            {!confirm ? (
                <>
                    <Text style={styles.label}>Enter your phone Number:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g., +91 650-555-3434"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                    <TouchableOpacity
                        onPress={signInWithPhoneNumber}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Send Code</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={styles.label}>Enter the code sent to your phone:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter code"
                        value={code}
                        onChangeText={setCode}
                    />
                    <TouchableOpacity
                        onPress={confirmCode}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Confirm Code</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#BEBDB8",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 40,
        marginTop: 150,
    },
    label: {
        marginBottom: 20,
        fontSize: 18,
    },
    input: {
        height: 50,
        width: "100%",
        borderColor: "black",
        borderWidth: 1,
        marginBottom: 30,
        paddingBottom: 10,
    },
    button: {
        backgroundColor: "#841584",
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
    },
});
