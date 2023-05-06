import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
    title: string;
    callbackList: () => void;
    callbackDelete: () => void;
    rolesList?: [];
}

export function ItemFlatList({ title, callbackList, callbackDelete, rolesList = []}:Props) {
    return (
        <View style={styles.cardContent}>
            <View style={styles.itemView}>
                <TouchableOpacity onPress={callbackList}>
                    <Text>{title}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={callbackDelete}>
                    <Feather name="x-circle" size={24} color="red" />
                </TouchableOpacity>
            </View>
            {
                rolesList.map((role, index) => {
                    return (
                        <Text style={{paddingLeft: 50}}>Papel Atribuido: {role}</Text>
                    );
                    
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    itemView: {
        height: 50,
        paddingHorizontal: 20,
        paddingTop: 10,
        display: 'flex',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width,
        paddingBottom: 5,
        flexDirection: 'row'
    },
    cardContent:{
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },

});