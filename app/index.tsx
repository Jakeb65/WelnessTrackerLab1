import { View, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Appbar, Card, FAB, Text } from 'react-native-paper';
import { Image } from 'expo-image';

const places = [
    {
        id: '1',
        title: 'Rynek',
        description: 'Historyczne centrum Kielc, otoczone zabytkowymi kamienicami. ' +
            'Znajduje się tu zabytkowy ratusz z XIX wieku oraz liczne restauracje i kawiarnie. ' +
            'Miejsce spotkań mieszkańców i centrum wydarzeń kulturalnych miasta.',
    },
    {
        id: '2',
        title: 'Ulica Sienkiewicza',
        description: 'Główny deptak Kielc i jedna z najważniejszych ulic handlowych miasta. ' +
            'Wyłączona z ruchu kołowego promenada z licznymi sklepami, kawiarniami i restauracjami. ' +
            'Charakterystyczna zabudowa z przełomu XIX i XX wieku.',
    },
    {
        id: '3',
        title: 'Kadzielnia',
        description: 'Dawny kamieniołom przekształcony w rezerwat przyrody nieożywionej. ' +
            'Znajduje się tu amfiteatr, w którym organizowane są koncerty i wydarzenia kulturalne. ' +
            'Popularne miejsce rekreacji z malowniczymi ścieżkami i punktami widokowymi.',
    }
];

export default function HomeScreen() {
    const router = useRouter();
    const { width, height } = useWindowDimensions();

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
        card: {
            marginBottom: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
        },
        fab: {
            position: 'absolute',
            right: 16,
            bottom: 16,
            backgroundColor: '#4CAF50',
        }
    });

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/kielce.png')}
                style={styles.backgroundImage}
                contentFit="cover"
                contentPosition="center"
            />
            <Appbar.Header style={styles.header}>
                <Appbar.Content
                    title="City Explorer Kielce"
                    titleStyle={styles.headerContent}
                />
            </Appbar.Header>
            <FlatList
                data={places}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 10 }}
                renderItem={({ item }) => (
                    <Card
                        style={styles.card}
                        onPress={() => router.push({
                            pathname: '/details',
                            params: { id: item.id }
                        })}
                    >
                        <Card.Title
                            title={item.title}
                            titleStyle={{ color: 'black' }}
                        />
                    </Card>
                )}
            />
            <FAB
                icon="plus"
                label="Dodaj miejsce"
                style={styles.fab}
                onPress={() => router.push('/edit')}
            />
        </View>
    );
}