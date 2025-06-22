import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Button, Card, List, ProgressBar, Text } from 'react-native-paper';
import AddPlaceModal from '../components/ui/AddPlaceModal';

const stepsGoal = 10000;

export default function HomeScreen() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const router = useRouter();

    const steps = 7421;
    const activityMinutes = 42;
    const mood = "😊 Bardzo dobrze";
    const exercises = [
        "Bieganie – 20 min",
        "Pompki – 3 serie",
        "Joga – 15 min"
    ];

    const handleSavePlace = (name, city, description, imageName) => {
        console.log('Zapisane miejsce:', { name, city, description, imageName });
        setIsModalVisible(false);
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
            opacity: 0.15,
        },
        content: {
            flex: 1,
            padding: 16,
            zIndex: 1,
        },
        card: {
            backgroundColor: 'rgba(255,255,255,0.95)',
            marginBottom: 16,
        },
        header: {
            backgroundColor: 'transparent',
            elevation: 0,
        },
        headerContent: {
            color: 'black',
            fontWeight: 'bold',
        },
        sectionTitle: {
            fontWeight: 'bold',
            marginBottom: 4,
        },
        moodRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        addButton: {
            marginTop: 24,
            backgroundColor: '#4CAF50',
        },
        addButtonContainer: {
            backgroundColor: '#4CAF50',
            padding: 14,
            borderRadius: 8,
            marginBottom: 10,
            alignItems: 'center',
            elevation: 3,
        },
        addButtonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '500',
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
            backgroundColor: 'rgba(0,0,0,0.4)', // <-- dodane wyszarzenie tła
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
        },
        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        modalText: {
            marginBottom: 15,
            textAlign: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/home-background.png')}
                style={styles.backgroundImage}
                contentFit="cover"
                contentPosition="center"
            />
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={() => router.back()} color="black" />
                <Appbar.Content title="Podsumowanie dnia" titleStyle={styles.headerContent} />
            </Appbar.Header>
            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 32 }}>
                <Card style={styles.card}>
                    <Card.Title title="Kroki" left={props => <Avatar.Icon {...props} icon="walk" color="#4CAF50" />} />
                    <Card.Content>
                        <Text variant="headlineMedium">{steps} / {stepsGoal}</Text>
                        <ProgressBar progress={steps / stepsGoal} color="#4CAF50" style={{ marginTop: 8 }} />
                        <Text variant="bodySmall" style={{ marginTop: 4 }}>Cel: {stepsGoal} kroków</Text>
                    </Card.Content>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Aktywność fizyczna" left={props => <Avatar.Icon {...props} icon="run" color="#4CAF50" />} />
                    <Card.Content>
                        <Text variant="headlineMedium">{activityMinutes} min</Text>
                        <Text variant="bodySmall" style={{ marginTop: 4 }}>Dzienny cel: 30 min</Text>
                    </Card.Content>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Ćwiczenia" left={props => <Avatar.Icon {...props} icon="dumbbell" color="#4CAF50" />} />
                    <Card.Content>
                        {exercises.length === 0 ? (
                            <Text variant="bodyMedium">Brak ćwiczeń</Text>
                        ) : (
                            exercises.map((exercise, idx) => (
                                <List.Item
                                    key={idx}
                                    title={exercise}
                                    left={props => <List.Icon {...props} icon="check-circle-outline" color="#4CAF50" />}
                                    style={{ paddingVertical: 0 }}
                                />
                            ))
                        )}
                    </Card.Content>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Samopoczucie" left={props => <Avatar.Icon {...props} icon="emoticon-happy-outline" color="#4CAF50" />} />
                    <Card.Content>
                        <View style={styles.moodRow}>
                            <Text variant="headlineMedium">{mood}</Text>
                        </View>
                    </Card.Content>
                </Card>
                <Button
                    icon="plus"
                    mode="contained"
                    style={styles.addButton}
                    onPress={() =>
                        router.push({
                            pathname: '/edit',
                            params: {
                                steps,
                                activityMinutes,
                                mood,
                                exercises: JSON.stringify(exercises)
                            }
                        })
                    }
                >
                    Edytuj aktywność
                </Button>
                <Button
                    icon="delete"
                    mode="contained"
                    style={[styles.addButton, { backgroundColor: '#f44336', marginTop: 12 }]}
                    onPress={() => setDeleteModalVisible(true)}
                >
                    Usuń aktywność
                </Button>
                <AddPlaceModal
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    onSave={handleSavePlace}
                />
            </ScrollView>
            {/* MODAL usuwania */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={() => setDeleteModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            Aktywność została usunięta!
                        </Text>
                        <Button
                            mode="contained"
                            onPress={() => {
                                setDeleteModalVisible(false);
                                router.back();
                            }}
                        >
                            OK
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
}