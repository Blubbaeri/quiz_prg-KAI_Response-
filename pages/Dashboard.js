import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Dashboard = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/Logo_KAI.png')} 
                style={styles.logo}
                resizeMode="contain"
            />
            
            <Text style={styles.title}>KAI-Response Dashboard</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Form Laporan')}
            >
                <Text style={styles.buttonText}>Buat Laporan Baru</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#1A237E' }]}
                onPress={() => navigation.navigate('Riwayat Laporan')}
            >
                <Text style={styles.buttonText}>Lihat Riwayat</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#F5F5F5' 
    },
    logo: {
        width: 400,
        height: 200,
        marginBottom: 20,
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 40, 
        color: '#333' 
    },
    button: {
        backgroundColor: '#E65100',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        margin: 10
    },
    buttonText: { 
        color: 'white', 
        fontSize: 18, 
        fontWeight: 'bold' 
    }
});

export default Dashboard;
