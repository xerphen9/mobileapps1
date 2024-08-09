import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, FlatList, Pressable } from 'react-native';
import { supabase } from '@/libs/supabase';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

import { CardComponent } from '@/components/CardComponent';
import { EventList } from '@/app/types';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  const [list, setList] = useState<EventList[]>([])
  const [remove, setRemove] = useState<boolean>(false)
  const month = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

  const allEvent = async () => {
    try {
      const { data, error } = await supabase.from('Event').select('*')

      if (error) {
        console.log(error)
        Toast.show({
          type: 'error',
          text1: 'Error message',
        })
      }

      if (data) {
        setList(data)
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error message 2',
      })
    }
  }

  const handleRemove = async (id: number) => {
    setRemove(false)
    try {
      const response = await supabase.from('Event').delete().eq('id', id)
      if (response) {
        setRemove(true)
      }
    } catch (error) {
      console.log(error)
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
  }, [remove])

  return (
    <FlatList
      data={list}
      renderItem={({ item }) =>
        <CardComponent id={item.id} onRemove={() => handleRemove(item.id)}>
          <Pressable style={styles.content} onPress={() => handleNavigation(item)}>
            <ThemedText type='textNormal' style={styles.cardName}>{item.name?.length > 7 ? item.name?.replace(item.name.substring(6), '...').toUpperCase() : item.name.toUpperCase()}</ThemedText>
            <ThemedText type='link' style={styles.cardDate}>{item.date?.slice(8,10)}/{item.date?.slice(5,7)}/{item.date?.slice(0, 4)}</ThemedText>
          </Pressable>
        </CardComponent>
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
  content: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '70%',
  },
  cardName: {
    fontSize: 25,
    opacity: 0.7,
    textAlignVertical: 'center',
    marginLeft: 10,
    color: '#ff7979',
    flex: 6,
  },
  cardDate: {
    textAlignVertical: 'bottom',
    marginRight: 10,
    opacity: 0.5,
  }
});
