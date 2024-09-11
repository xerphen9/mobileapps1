import React from 'react'
import { StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import { IconComponent } from './IconComponent'
import { router } from 'expo-router'

export type HeaderProps = {
  title: string;
  title2?: string;
  style?: StyleProp<ViewStyle>;
}

export function HeaderComponent({title, title2, style}: HeaderProps) {
  return (
    <ThemedView style={[styles.header, style]}>
      <ThemedView style={styles.headerContent}>
        <ThemedText type='textNormal' style={styles.backBtn}>
          <IconComponent name='arrow-back-ios' style={styles.icon} onPress={() => router.back()}/>
        </ThemedText>
        <ThemedText type='subtitle' style={styles.title}>{title?.toUpperCase()}</ThemedText>
        <ThemedText type='defaultSemiBold' style={styles.title}>{title2?.toUpperCase()}</ThemedText>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({ 
  header: {
    height: 100,
    justifyContent: 'flex-end',
    backgroundColor: '#FF8A8A',
  },
  headerContent: {
    height: 'auto',
    justifyContent: 'center',
    backgroundColor: '#FF8A8A',
  },
  backBtn: {
    position: 'absolute',
    marginHorizontal: 15,
    textAlign: 'center',
    zIndex: 2,
    padding: 10,
  },
  icon: {
    fontSize: 30,
    color: '#fff',
  },
  title: {
    textAlign: 'center',
    color: '#fff'
  },
})