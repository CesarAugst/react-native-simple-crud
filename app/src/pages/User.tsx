import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Dimensions, FlatList, StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import MultiSelect from 'react-native-multiple-select';

import { userService } from '../services/user.service';
import { InputGroup } from '../components/InputGroup';
import { roleService } from '../services/role.service';

export default function User() {

    const route = useRoute();
    const navigation = useNavigation<any>();
    const [ user, setUser ] = useState({} as any);

    let id = null;

    const [name, setName] = React.useState();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPass, setConfirmPass] = React.useState('');
    const [ roles, setRoles ] = React.useState<any[]>([]);
    const [ selectedRoles, setSelectedRoles ] = React.useState<any[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);

    if (route.params) {

        const { userId } = route.params as any;
        id = userId;
        
    }

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

    async function getUser(){
        if (route.params) {

            const { userId } = route.params as any;
            id = userId;
            userService.get(id).then((retorno) => {
                if(retorno !== null){
                    retorno.id = userId;
                    setUser(retorno);
                    setName(retorno.name);
                    setUsername(retorno.username);
                    setSelectedRoles(retorno.roles);
                }
            });
            
        }
        
    }

    React.useEffect(() => {
        getUser();
        fetchRoles();
    }, []);

    async function save() {
        if (!name || String(name).trim() === '') {
            Alert.alert('Nome é obrigatório!');
        
        } else if (!username || username.trim() === '') {
            Alert.alert('Login é obrigatório!');
        
        } else if (!password || password.trim() === '' || password !== confirmPass) {
            Alert.alert('Senha não confere!');
        
        } else {
            await userService.create({ name, username, password, roles: ['ADMIN'] });
            navigation.goBack();
        }
    }

    async function alter() {
        if (!name || String(name).trim() === '') {
            Alert.alert('Nome é obrigatório!');
        
        } else if (!username || username.trim() === '') {
            Alert.alert('Login é obrigatório!');
        
        } else if (!password || password.trim() === '' || password !== confirmPass) {
            Alert.alert('Senha não confere!');
        
        } else {
            await userService.update({ id: user.id, name, username, password, roles:selectedRoles });
            navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>        

            <InputGroup 
                label='Nome:'
                value={name}
                onChangeText={setName}
            />

            <InputGroup 
                label='Login:'
                value={String(username)}
                onChangeText={setUsername}
                editable={id === null}
            />
            
            <InputGroup 
                label='Senha:'
                value={String(password)}
                onChangeText={setPassword}
                secureTextEntry
            />

            <InputGroup 
                label='Confirmar Senha:'
                onChangeText={setConfirmPass}
                secureTextEntry
            />

            <View style={styles.rolesContent}>
                <Text style={styles.label}>Papeis Disponíveis: </Text>
                <MultiSelect
                    hideTags
                    items={roles}
                    uniqueKey="name"
                    onSelectedItemsChange={setSelectedRoles}
                    selectedItems={selectedRoles}
                    selectText="Selecione os papeis"
                    onChangeInput={ (text)=> console.log(selectedRoles)}
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor="#CCC"
                    submitButtonText="Selecionar"
                />
            </View>

            <View style={styles.button}>
                <Button title={ id ? 'Alterar' : 'Salvar'} onPress={id ? alter : save} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    rolesContent:{
        width: Dimensions.get('screen').width - 80,
    },
    roleItem:{
        backgroundColor: 'blue',
    },
    button: {
        marginTop: 40,
        width: Dimensions.get('screen').width - 80
    },
    label: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 5,
    }
});
