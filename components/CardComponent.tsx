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
    items: EventList;
    onPress?: (items: EventList) => void;
}

export const CardComponent = ({
    style,
    items,
    onPress,
}: CardProps) => {
    return (
        <ThemedView>
            <Pressable style={[styles.cardContainer, style]} onPress={() => onPress?.(items)}>
                <ThemedText type='subtitle' style={styles.textDate}>
                    {items.date.slice(0, 10)}
                </ThemedText>
                <ThemedText type='title'>
                    {items.name}
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
        borderRadius: 10,
        backgroundColor: '#FFC0CB',
        shadowColor: '#000',
    },
    textDate: {
        color: '#979797',
    },
})