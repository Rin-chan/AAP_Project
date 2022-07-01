import React from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, View } from 'react-native';
//import { Round_Green_Button } from '../../components/atoms';

const LoginScreen = ({ navigation }) => {
    const [email, onChangeEmail] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Login</Text>

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

            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.loginScreenButton}
                    onPress={() => navigation.navigate('Home')}
                    underlayColor='#fff'>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>

            <Text onPress={() => navigation.navigate('Register')} style={styles.redirectText}>Create an account</Text>
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
    loginScreenButton: {
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
    loginButtonText: {
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

export default LoginScreen;