import Reac, { PropsWithChildren } from 'react'
import { StyleSheet, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native'
import { ThemedCard } from './ThemedCard'

export type CardProps = PropsWithChildren & {
    style?: StyleProp<ViewStyle>;
    onPress: (event: GestureResponderEvent) => void;
}

export const CardComponent = ({
    style,
    children,
}: CardProps) => {
  return (
    <ThemedCard style={[styles.cardContainer, style]}>
        {children}
    </ThemedCard>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#ff7979',
        shadowColor: '#000'
    }
})