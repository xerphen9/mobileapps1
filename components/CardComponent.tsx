import React from 'react'
import { 
    StyleSheet, 
    StyleProp, 
    ViewStyle,
    GestureResponderEvent,
    Pressable,
} from 'react-native';
import { EventList } from '@/app/types';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export type CardProps = {
    style?: StyleProp<ViewStyle>;
    id: number;
    date?: string;
    name?: string;
    onPress?: (id: number) => void;
}

export const randomColor = Math.floor(Math.random()*16777215).toString(16)

export const CardComponent = ({
    style,
    id,
    date,
    name,
    onPress,
}: CardProps) => {

    return (
        <ThemedView style={[styles.cardContainer, style]}>
            <Pressable onPress={() => onPress?.(id)}>
                <ThemedText type='subtitle' style={styles.textDate}>
                    {date}
                </ThemedText>
                <ThemedText type='title'>
                    {name}
                </ThemedText>
            </Pressable>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginTop: 10,
        position: 'relative',
        display: 'flex',
        padding: 20,
        height: 150,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#cacaca',
        borderWidth: 2,
    },
    textDate: {
        color: '#979797',
    },
})