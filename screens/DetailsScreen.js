import React from "react";
import { View, Text } from "react-native";

export default function DetailsScreen({ route }) {
    const { place } = route.params;

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>{place.name}</Text>
            <Text style={{ fontSize: 18 }}>{place.city}</Text>
            <Text style={{ marginTop: 10 }}>{place.description}</Text>
        </View>
    );
}
