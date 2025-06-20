import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Card, ProgressBar, Text } from 'react-native-paper';

const monthData = {
    month: 'Czerwiec 2024',
    steps: 215000,
    stepsGoal: 300000,
    activity: 1240,
    activityGoal: 1800,
    mood: 76, // średnie samopoczucie w procentach
    moodGoal: 80,
};

export default function StatsScreen() {
    const router = useRouter();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#f5f5f5',
        },
        content: {
            flex: 1,
            padding: 16,
        },
        card: {
            backgroundColor: 'rgba(255,255,255,0.97)',
            borderRadius: 18,
            elevation: 4,
            marginBottom: 18,
            paddingVertical: 24,
            paddingHorizontal: 18,
        },
        monthTitle: {
            fontWeight: 'bold',
            fontSize: 22,
            textAlign: 'center',
            marginBottom: 18,
            color: '#333',
        },
        section: {
            marginBottom: 18,
        },
        sectionLabel: {
            fontSize: 15,
            color: '#666',
            marginBottom: 2,
        },
        sectionValue: {
            fontWeight: 'bold',
            fontSize: 18,
            marginBottom: 4,
            color: '#222',
        },
        progressBar: {
            height: 12,
            borderRadius: 6,
            marginBottom: 2,
        },
        appbar: {
            backgroundColor: '#2196F3',
            elevation: 4,
            marginBottom: 12,
            alignItems: 'center',
        },
        appbarTitle: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'left',
            width: '100%',
        },
    });

    return (
        <View style={styles.container}>
            <Appbar style={styles.appbar}>
                <Appbar.BackAction onPress={() => router.back()} color="#fff" />
                <Appbar.Content title="Statystyki miesięczne" titleStyle={styles.appbarTitle} />
            </Appbar>
            <ScrollView style={styles.content}>
                <Card style={styles.card}>
                    <Text style={styles.monthTitle}>{monthData.month}</Text>
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>Kroki</Text>
                        <Text style={styles.sectionValue}>
                            {monthData.steps} / {monthData.stepsGoal}
                        </Text>
                        <ProgressBar
                            progress={monthData.steps / monthData.stepsGoal}
                            color="#4CAF50"
                            style={styles.progressBar}
                        />
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>Aktywność fizyczna</Text>
                        <Text style={styles.sectionValue}>
                            {monthData.activity} / {monthData.activityGoal} min
                        </Text>
                        <ProgressBar
                            progress={monthData.activity / monthData.activityGoal}
                            color="#2196F3"
                            style={styles.progressBar}
                        />
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>Średnie samopoczucie</Text>
                        <Text style={styles.sectionValue}>
                            {monthData.mood}% / {monthData.moodGoal}%
                        </Text>
                        <ProgressBar
                            progress={monthData.mood / 100}
                            color="#FFC107"
                            style={styles.progressBar}
                        />
                    </View>
                </Card>
            </ScrollView>
        </View>
    );
}