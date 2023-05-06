import React from 'react';
import { TouchableOpacity, Pressable, Alert, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { userService } from '../services/user.service';
import { roleService } from '../services/role.service';
import { NavbarButtom } from '../components/NavbarButtom';
import { ItemFlatList } from '../components/ItemFlatList';

export default function ListRoles() {

    const [refreshing, setRefreshing] = React.useState(false);
    const [roles, setRoles] = React.useState<any[]>([]);

    const navigation = useNavigation<any>();

    navigation.setOptions({
        headerRight: () => <>
            <NavbarButtom 
                callback={() => navigation.navigate('EditRoles')}
                icon='plus'
            />
            <NavbarButtom 
                callback={() => navigation.navigate('Login')}
                icon='log-out'
            />
        </>
    });

    React.useEffect(() => {
        fetchRoles();
    }, []);

    async function fetchRoles() {
        setRefreshing(true);
        try {
            const list = await roleService.getList();
            setRoles(list);    
        } catch (error) {
            navigation.goBack();
        }
        setRefreshing(false);
    }

    function goEditRole(role: any) {
        navigation.navigate('EditRoles', { roleId: role.id });
    }

    function removeRole(role: any){
        try{
            roleService.delete(role.id)
            Alert.alert('Papel removido')
        }catch (error) {
            Alert.alert('Erro ao remover')
        }finally{
            fetchRoles()
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                onRefresh={fetchRoles}
                refreshing={refreshing}
                data={roles}
                renderItem={({ item }) => 
                    <ItemFlatList 
                        title={`${item.name} - ${item.description}`}
                        callbackList={() => goEditRole(item)}
                        callbackDelete={() => removeRole(item)}
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
    navbarButton:{
        margin: 5,
        backgroundColor: 'grey',
        padding: 5,
        borderRadius: 5
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
    itemView: {
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingHorizontal: 20,
        paddingTop: 10,
        display: 'flex',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width,
        flexDirection: 'row'
    }
});