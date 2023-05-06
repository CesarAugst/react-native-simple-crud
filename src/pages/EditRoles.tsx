import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Dimensions, TextInput, StyleSheet, Text, View, Alert } from 'react-native';

import { userService } from '../services/user.service';
import { roleService } from '../services/role.service';
import { InputGroup } from '../components/InputGroup';

export default function EditRoles() {

    const route = useRoute();
    const navigation = useNavigation<any>();
    const [ role, setRole ] = useState({} as any);

    let id = null;

    const [name, setName] = React.useState();
    const [description, setDescription] = React.useState('');

    if (route.params) {

        const { roleId } = route.params as any;
        id = roleId;
        
    }

    async function getRole(){
        if (route.params) {

            const { roleId } = route.params as any;
            id = roleId;
            roleService.get(id).then((retorno) => {
                if(retorno !== null){
                    retorno.id = roleId;
                    setRole(retorno);
                    setName(retorno.name);
                    setDescription(retorno.description);
                }
            });
            
        }
        
    }

    React.useEffect(() => {
        getRole();
    }, []);

    async function save() {
        if (!name || String(name).trim() === '') {
            Alert.alert('Nome é obrigatório!');
        
        } else if (!description || description.trim() === '') {
            Alert.alert('Descrição é obrigatório!');
        
        } else {
            await roleService.create({name,description});
            navigation.navigate('ListRoles');
        }
    }

    async function alter() {
        if (!name || String(name).trim() === '') {
            Alert.alert('Nome é obrigatório!');
        
        } else if (!description || description.trim() === '') {
            Alert.alert('Descrição é obrigatório!');
        
        } else {
            await roleService.update({ id: role.id, name, description});
            navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>          
            <InputGroup 
                label='Nome:'
                value={name}
                onChangeText={setName}
                editable={id === null}
            />  

            <InputGroup 
                label='Descrição:'
                value={String(description)}
                onChangeText={setDescription}
            /> 

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
    button: {
        marginTop: 40,
        width: Dimensions.get('screen').width - 80
    },
});
