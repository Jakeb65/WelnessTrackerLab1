import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Button, Card, ProgressBar, Text } from 'react-native-paper';

export default function DashboardScreen() {
    const router = useRouter();

    // Przykładowe dane dnia
    const steps = 7421;
    const stepsGoal = 10000;
    const activityMinutes = 42;
    const mood = "😊 Bardzo dobrze";

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
        }
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
                <Appbar.Content title="Podsumowanie dnia" titleStyle={styles.headerContent} />
            </Appbar.Header>
            <View style={styles.content}>
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
                    onPress={() => router.push('/edit')}
                >
                    Dodaj aktywność
                </Button>
            </View>
        </View>
    );
}