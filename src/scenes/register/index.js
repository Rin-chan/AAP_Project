import React from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, View } from 'react-native';

const RegisterScreen = ({ navigation }) => {
    const [username, onChangeUsername] = React.useState(null);
    const [email, onChangeEmail] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);
    const [repassword, onChangeRePassword] = React.useState(null);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Register</Text>

            <Text>Username</Text>
            <TextInput
                style={styles.inputText}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Enter your username"
            />

            <Text>Email</Text>
            <TextInput
                style={styles.inputText}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Enter your email"
            />

            <Text>Password</Text>
            <TextInput
                style={styles.inputText}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Enter your password"
            />

            <Text>Retype Your Password</Text>
            <TextInput
                style={styles.inputText}
                onChangeText={onChangeRePassword}
                value={repassword}
                placeholder="Enter your password again"
            />

            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.registerScreenButton}
                    onPress={() => navigation.navigate('Home')}
                    underlayColor='#fff'>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
            </View>

            <Text onPress={() => navigation.navigate('Login')} style={styles.redirectText}>Already have an account?</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: '10%',
        flex: 1,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20
    },
    inputText: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    },
    registerScreenButton: {
        marginRight: 10,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#9CE8A8',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff'
    },
    registerButtonText: {
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    redirectText: {
        textAlign: 'center',
        marginTop: 'auto',
        fontWeight: 'bold',
    },
});

export default RegisterScreen;