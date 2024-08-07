import React, { PropsWithChildren, useRef, useEffect } from 'react'
import { Animated, StyleSheet, ViewStyle } from 'react-native'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import * as Animatable from 'react-native-animatable'

export default function LoadingComponent() {
    return (
        <ThemedView style={styles.container}>
            <Animatable.View
                style={styles.dot1}
                animation="bounce"
                easing="ease-out"
                delay={200}
                iterationDelay={400}
                iterationCount="infinite">
            </Animatable.View>
            <Animatable.View
                style={styles.dot2}
                animation="bounce"
                easing="ease-out" 
                delay={400}
                iterationDelay={400}
                iterationCount="infinite">
            </Animatable.View>
            <Animatable.View
                style={styles.dot3}
                animation="bounce"
                easing="ease-out"
                delay={600}
                iterationDelay={400}
                iterationCount="infinite">
            </Animatable.View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot1: {
        width: 25,
        height: 25,
        backgroundColor: '#d991c2',
        borderRadius: 50,
    },
    dot2: {
        width: 25,
        height: 25,
        backgroundColor: '#d37bfc',
        borderRadius: 50,
    },
    dot3: {
        width: 25,
        height: 25,
        backgroundColor: '#7b7dfc',
        borderRadius: 50,
    }
})