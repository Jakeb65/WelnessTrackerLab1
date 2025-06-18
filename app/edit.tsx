import { useState } from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { Appbar, TextInput, Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

export default function EditScreen() {
    const [title, setTitle] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleSave = () => {
        if (!title.trim()) {
            setErrorMessage('Nazwa miejsca nie może być pusta');
            setModalVisible(true);
            return;
        }

        console.log('Zapisano:', title);
        setErrorMessage('Dodano miejsce!');
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        if (errorMessage === 'Dodano miejsce!') {
            router.back();
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
        },
        backgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            opacity: 0.5,
        },
        header: {
            backgroundColor: 'transparent',
            elevation: 0,
        },
        headerContent: {
            color: 'black',
            fontWeight: 'bold',
        },
        content: {
            padding: 16,
            zIndex: 1,
        },
        input: {
            marginBottom: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
        },
        button: {
            minWidth: '15%',
            maxWidth: '25%',
            backgroundColor: '#4CAF50',
            alignSelf: 'center',
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        modalView: {
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            minWidth: '20%'
        },
        modalText: {
            marginBottom: 20,
            textAlign: 'center',
            fontSize: 16
        }
    });

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/dworzec.png')}
                style={styles.backgroundImage}
                contentFit="cover"
                contentPosition="center"
            />
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={() => router.back()} color="black" />
                <Appbar.Content
                    title="Dodaj / Edytuj"
                    titleStyle={styles.headerContent}
                />
            </Appbar.Header>
            <View style={styles.content}>
                <TextInput
                    label="Nazwa miejsca"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                />
                <Button
                    mode="contained"
                    onPress={handleSave}
                    style={styles.button}
                >
                    Zapisz
                </Button>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{errorMessage}</Text>
                        <Button
                            mode="contained"
                            onPress={handleModalClose}
                            style={styles.button}
                        >
                            OK
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
}