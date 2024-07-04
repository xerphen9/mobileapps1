import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'BAYAR-BAYAR',
          tabBarLabel: ({color, focused}) => (
            <ThemedText type='navbar'>Home</ThemedText>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home-sharp' : 'home-outline'} color={Colors.light.text} />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'BAYAR-BAYAR',
          tabBarLabel: ({color, focused}) => (
            <ThemedText type='navbar'>Report</ThemedText>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'newspaper-sharp' : 'newspaper-outline'} color={Colors.light.text} />
          ),
        }}
      />
    </Tabs>
  );
}
