import React, { PropsWithChildren } from 'react'
import { 
    StyleSheet, 
    StyleProp, 
    ViewStyle,
    Pressable,
    Animated
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedView } from './ThemedView';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export type CardProps = PropsWithChildren & {
    style?: StyleProp<ViewStyle>;
    id: number;
    date?: string;
    name?: string;
    onPress?: (id: number) => void;
    onRemove?: (id: number) => void;
}

export const CardComponent = ({
    style,
    id,
    children,
    onPress,
    onRemove,
}: CardProps) => {

    const renderRightAction = (_progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => {
        const trans = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        return (
        <RectButton onPress={() => onRemove?.(id)} style={styles.rightAction}>
            <Animated.Text style={[{
                transform: [{ translateX: trans }],
            }]}>
                <Ionicons name="trash-outline" size={30} color="black" />
            </Animated.Text>
        </RectButton>
        );
    }

    return (
        <Pressable onPress={() => onPress?.(id)}>
            <ThemedView style={[styles.cardContainer, style]}>
                {children}
                <Swipeable renderRightActions={renderRightAction} containerStyle={styles.roundContainer}>
                    <ThemedView style={styles.round}></ThemedView>
                </Swipeable>
            </ThemedView>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        margin: 2,
        padding: 7,
        flexDirection: 'row',
        borderRadius: 50,
        backgroundColor: '#efeded',
    },
    roundContainer: {
        width: '30%',
        borderRadius: 50,
        justifyContent: 'flex-end',
        backgroundColor: '#fff'
    },
    round: {
        backgroundColor: '#ff7979',
        alignSelf: 'flex-end',
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    rightAction: {
        borderRadius: 50,
        backgroundColor: 'transparent',
        alignItems: 'flex-end',
        marginRight: 12,
        justifyContent: 'center',
    },
})