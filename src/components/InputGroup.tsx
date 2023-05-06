import { StyleSheet, View, Text, TextInput, Dimensions } from 'react-native';

type Props = {
    label: string;
    value?: string;
    onChangeText: any;
    editable?: boolean;
    secureTextEntry?: boolean;
}

export function InputGroup({ label, value, onChangeText, editable = true, secureTextEntry = false}: Props) {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInput 
                style={styles.input} 
                value={value ?? value} 
                onChangeText={onChangeText} 
                editable={editable} 
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 5,
    },
    input: {
        width: Dimensions.get('screen').width - 80,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 10
    }
});