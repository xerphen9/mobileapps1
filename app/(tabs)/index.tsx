import React, {useEffect, useState} from 'react'
import { Image, StyleSheet, Platform } from 'react-native';
import { supabase } from '@/libs/supabase';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Toast from 'react-native-toast-message';

import { CardComponent } from '@/components/CardComponent';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { EventList } from '@/types/eventTypes';

export default function HomeScreen() {
  const [list, setList] = useState<EventList | null>(null)

  const allEvent = async () => {
    const {data, error} = await supabase.from('Event').select('*')
    if(error) {
      Toast.show({
        type: 'error',
        text1: 'Error message',
      })
    }
    console.log(data)
    setList(data)
  }

  useEffect(() => {
    allEvent()
  }, [])

  return (
    <ParallaxScrollView>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    borderRadius: 10, 
    color: '#fffff',
    backgroundColor: '#cbcbcb',
  },
});
