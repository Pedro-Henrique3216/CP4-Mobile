import { useQuery } from "@tanstack/react-query";
import getUsers from "./get";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ShowUsers() {
    const {data, isLoading, error, isError, isFetching, refetch} = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    });

    if (isLoading){
        return (
            <Text style={styles.loadingText}>Carregando Usuarios...</Text>
        );
    }
    if (isError) return <Text style={styles.errorText}>Error ao carregar usuarios: {error.message}</Text>;

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userContainer}>
                    <Text style={styles.userName}>Nome: {item.name}</Text>
                    <Text style={styles.userEmail}>Email: {item.email}</Text>
                    <Text style={styles.userCity}>Cidade: {item.address.city}</Text>
                </View>
                )}
                ListFooterComponent={
                    <TouchableOpacity onPress={() => refetch()} style={{marginTop: 20, alignItems: 'center'}}>
                        <Text>Refetch Users</Text>
                    </TouchableOpacity>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    userContainer: {
        justifyContent:'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    userName: {
        fontWeight: 'bold',
    },
    userEmail: {
        color: 'gray',
    },
    userCity: {
        fontStyle: 'italic',
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});
