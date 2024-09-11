import React, { PropsWithChildren } from 'react'
import { 
    StyleSheet, 
    StyleProp, 
    ViewStyle,
    Pressable,
    Animated,
    useColorScheme
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedView } from './ThemedView';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Colors } from '@/constants/Colors';

export type CardProps = PropsWithChildren & {
    style?: StyleProp<ViewStyle>;
    id: number;
    date?: string;
    name?: string;
    onPress?: (id: number) => void;
    onRemove?: (id: number) => void;
}

export const EventListComponent = ({
    style,
    id,
    children,
    onPress,
    onRemove,
}: CardProps) => {
    const theme = useColorScheme() ?? 'light';

    const renderRightAction = (_progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => {
        const trans = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        return (
        <RectButton style={styles.rightAction}>
            <Animated.Text style={[{
                transform: [{ translateX: trans }],
                marginLeft: 10,
            }]}>
                <Ionicons name="trash-outline" size={25} color="black" onPress={() => onRemove?.(id)}/>
            </Animated.Text>
        </RectButton>
        );
    }

    return (
        <Pressable onPress={() => onPress?.(id)}>
            <ThemedView style={[styles.cardContainer, {backgroundColor: theme === 'light' ? Colors.light.backgroundCard : Colors.dark.backgroundCard}, style]}>
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
        justifyContent: 'space-between',
        borderRadius: 50,
    },
    roundContainer: {
        width: 85,
        borderRadius: 50,
        backgroundColor: '#fff'
    },
    round: {
        backgroundColor: '#FF8A8A',
        alignSelf: 'flex-end',
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    rightAction: {
        borderRadius: 50,
        backgroundColor: 'transparent',
        marginRight: 10,
        justifyContent: 'center',
    },
})