import React, { useState } from 'react';
// @ts-check
// @ts-ignore
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import AddPlaceModal from '../components/ui/AddPlaceModal';

const HomeScreen = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSavePlace = (name, city, description, imageName) => {
        // Tu możesz dodać logikę zapisywania danych
        console.log('Zapisane miejsce:', { name, city, description, imageName });
    };

    return (
        <View style={styles.container}>
            {/* Tutaj twoja istniejąca zawartość ekranu głównego */}

            {/* Przycisk otwierający modal */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setIsModalVisible(true)}
            >
                <Text style={styles.addButtonText}>Dodaj miejsce</Text>
            </TouchableOpacity>

            {/* Modal z alertami */}
            <AddPlaceModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSavePlace}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 14,
        borderRadius: 8,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    }
});

export default HomeScreen;