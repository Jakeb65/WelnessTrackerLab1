import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Appbar, Card, Text } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';

interface Place {
    id: string;
    title: string;
    description: string;
    imageUrl?: any;
}

const places: Place[] = [
    {
        id: '1',
        title: 'Rynek',
        description: 'Historyczne centrum Kielc, otoczone zabytkowymi kamienicami. ' +
            'Znajduje się tu zabytkowy ratusz z XIX wieku oraz liczne restauracje i kawiarnie. ' +
            'Miejsce spotkań mieszkańców i centrum wydarzeń kulturalnych miasta.',
        imageUrl: require('../assets/images/rynek_kielce.png')
    },
    {
        id: '2',
        title: 'Ulica Sienkiewicza',
        description: 'Główny deptak Kielc i jedna z najważniejszych ulic handlowych miasta. ' +
            'Wyłączona z ruchu kołowego promenada z licznymi sklepami, kawiarniami i restauracjami. ' +
            'Charakterystyczna zabudowa z przełomu XIX i XX wieku.',
        imageUrl: require('../assets/images/sienkiewicza.png')
    },
    {
        id: '3',
        title: 'Kadzielnia',
        description: 'Dawny kamieniołom przekształcony w rezerwat przyrody nieożywionej. ' +
            'Znajduje się tu amfiteatr, w którym organizowane są koncerty i wydarzenia kulturalne. ' +
            'Popularne miejsce rekreacji z malowniczymi ścieżkami i punktami widokowymi.',
        imageUrl: require('../assets/images/kadzielnia.png')
    }
];

export default function DetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { width, height } = useWindowDimensions();
    const place = places.find(p => p.id === id) || places[0];

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
        content: {
            flex: 1,
            padding: 16,
            zIndex: 1,
        },
        card: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            marginTop: 8,
        },
        description: {
            marginTop: 10,
            marginBottom: 10,
        },
        header: {
            backgroundColor: 'transparent',
            elevation: 0,
        },
        headerContent: {
            color: 'black',
            fontWeight: 'bold',
        }
    });

    return (
        <View style={styles.container}>
            {place.imageUrl && (
                <Image
                    source={place.imageUrl}
                    style={styles.backgroundImage}
                    contentFit="cover"
                    contentPosition="center"
                />
            )}
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={() => router.back()} color="black" />
                <Appbar.Content title={place.title} titleStyle={styles.headerContent} />
            </Appbar.Header>
            <View style={styles.content}>
                <Card style={styles.card}>
                    <Card.Title title={place.title} />
                    <Card.Content>
                        <Text variant="bodyLarge" style={styles.description}>
                            {place.description}
                        </Text>
                    </Card.Content>
                </Card>
            </View>
        </View>
    );
}