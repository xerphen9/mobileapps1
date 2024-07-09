import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { ButtonComponent } from '@/components/ButtonComponent';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const onPress = () => {
    alert('Press!')
  }
 
  return (
    <>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        tabBarStyle: styles.tabBarContainer,
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'BAYAR-BAYAR',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name='home-outline'
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'BAYAR-BAYAR',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name='newspaper-outline'
              color={color}
            />
          ),
        }}
      />
    </Tabs>
    <ButtonComponent type='default' onPress={onPress} style={styles.btnAdd}>
        <ThemedText type='buttonText' style={styles.btnText}>+</ThemedText>
    </ButtonComponent>
    </>
  );
}


const styles = StyleSheet.create({
  tabBarContainer: {
    height: 65,
    backgroundColor: '#eaeaea',
  },
  btnAdd: {
    width: 55,
    height: 55,
    bottom: 35,
    right: 165,
    borderRadius: 20,
  },
  btnText: {
    color: '#fff',
  }
})