import React from 'react';
import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack>
        <Stack.Screen name="stepone" />
        <Stack.Screen name="steptwo" />
        <Stack.Screen name="stepthree" />
    </Stack>
  );
}