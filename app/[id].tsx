import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'

export default function EventDetails() {
  const { id, name, date, underwriter } = useLocalSearchParams()

  return (
    <ThemedView>
      <ThemedText>
        Details - {name} - {date}
      </ThemedText>
    </ThemedView>
  )
}
