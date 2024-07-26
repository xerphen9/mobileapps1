import React from 'react'
import { StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText';

export type HeaderProps = {
    title? : string;
    style?: StyleProp<ViewStyle>;
}

export const HeaderComponent = ({ 
    title,
    style,
    ...rest
}: HeaderProps) => {
  return (
    <ThemedView {...rest}>
        <ThemedText>
            {title}
        </ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
    
})