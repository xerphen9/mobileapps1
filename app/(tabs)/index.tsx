import React, {useEffect, useState, useRef} from 'react'
import { StyleSheet, FlatList } from 'react-native';
import { supabase } from '@/libs/supabase';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

import { CardComponent } from '@/components/CardComponent';
import { EventList } from '@/app/types';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [list, setList] = useState<EventList[]>([])
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const allEvent = async () => {
    try {
      const {data, error} = await supabase.from('Event').select('*')
      
      if(error) {
        console.log(error)
        Toast.show({
          type: 'error',
          text1: 'Error message',
        })
      }

      if(data) {
        console.log(data)
        setList(data)
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error message 2',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleNavigation = (item: EventList) => {
    router.push({
      pathname: '/details/[id]',
      params: {
        id: item.id,
        name: item.name,
        date: item.date,
        underwriter: item.underwriter
      }
    })
  }
  
  useEffect(() => {
    allEvent()
  }, [])

  return (
    <FlatList
      data={list} 
      renderItem={({item}) => 
        <CardComponent id={item.id} date={item.date} name={item.name} onPress={() => handleNavigation(item)}/>
      }
      onRefresh={() => allEvent()}
      refreshing={false}
      style={styles.container} 
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  cardText: {
    color: '#fffff',
  }
});
