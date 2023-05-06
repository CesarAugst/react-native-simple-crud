import React from 'react';
import { TouchableOpacity, Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { userService } from '../services/user.service';
import { NavbarButtom } from '../components/NavbarButtom';
import { ItemFlatList } from '../components/ItemFlatList';

export default function Home() {

    const [refreshing, setRefreshing] = React.useState(false);
    const [users, setUsers] = React.useState<any[]>([]);

    const navigation = useNavigation<any>();

    navigation.setOptions({
        headerLeft: () => <></>,
        headerRight: () => <>
        <NavbarButtom 
            callback={() => navigation.navigate('User')}
            icon='plus'
        />
        <NavbarButtom 
            callback={() => navigation.navigate('Login')}
            icon='log-out'
        />
    </>
    });

    React.useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        setRefreshing(true);
        try {
            const list = await userService.getList();
            setUsers(list);
        } catch (error) {
            navigation.goBack();
        }
        setRefreshing(false);
    }

    function goEditUser(user: any) {
        navigation.navigate('User', { userId: user.id });
    }

    function removeUser(user: any){
        try{
            userService.delete(user.id)
            Alert.alert('Usuario removido')
        }catch (error) {
            Alert.alert('Erro ao remover')
        }finally{
            fetchUsers()
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.options}>
                <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('ListRoles')}>
                    <Text style={{color: 'white'}}>Listar Roles</Text>
                    <Feather name="list" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <FlatList
                onRefresh={fetchUsers}
                refreshing={refreshing}
                data={users}
                renderItem={({ item }) => 
                    <ItemFlatList 
                        title={`${item.name} - ${item.username}`}
                        callbackList={() => goEditUser(item)}
                        callbackDelete={() => removeUser(item)}
                        rolesList={item.roles}
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    options:{
        height:50,
        margin:10,
        flexDirection: 'row'
    },
    optionButton:{
      display: 'flex',
      alignItems:'center',
      backgroundColor: '#c2c2c2',
      borderRadius: 10,
      padding: 5,
      marginHorizontal: 5
    },
});