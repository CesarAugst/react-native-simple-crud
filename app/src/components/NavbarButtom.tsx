import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
    callback: () => void,
    icon: "log-out"|"plus"
}

export function NavbarButtom({ callback, icon}: Props) {

    return (
        <TouchableOpacity style={styles.container} onPress={callback}>
            <Feather name={icon} size={24} color="white" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        backgroundColor: 'grey',
        padding: 5,
        borderRadius: 5
    },
});