import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, FlatList, Pressable, useColorScheme } from 'react-native';
import { supabase } from '@/libs/supabase';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { Colors } from '@/constants/Colors';

import { EventListComponent } from '@/components/EventListComponent';
import { EventList } from '@/app/types';
import { ThemedText } from '@/components/ThemedText';
import { details } from '@/features/eventSlice';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const theme = useColorScheme() ?? 'light'
  const isRefresh: boolean = useAppSelector((state) => state.event.refresh)
  const [list, setList] = useState<EventList[]>([])
  const [remove, setRemove] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const allEvent = async () => {
    try {
      const { data, error } = await supabase.from('Event').select('*')

      if (error) {
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
    dispatch(details({
      id: item.id,
      name: item.name,
      date: item.date,
      members: item.members
    }))
    router.push({
      pathname: '/eventdetails/[id]',
      params: {
        id: item.id,
        name: item.name,
        date: item.date,
        members: item.members
      }
    })
  }

  useEffect(() => {
    allEvent()
  }, [isRefresh, remove])

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={list}
        renderItem={({ item }) =>
          <EventListComponent id={item.id} onRemove={() => handleRemove(item.id)}>
            <Pressable style={styles.content} onPress={() => handleNavigation(item)}>
              <ThemedText type='textNormal' style={[styles.cardName, {color: theme === 'light' ? Colors.light.themeColor : Colors.dark.themeColor}]}>
                {item.name?.length > 7 ? item.name?.replace(item.name.substring(6), '...').toUpperCase() : item.name?.toUpperCase()}
              </ThemedText>
              <ThemedText type='default' style={styles.cardDate}>
                {item.date?.slice(8,10)}/{item.date?.slice(5,7)}/{item.date?.slice(0, 4)}
              </ThemedText>
            </Pressable>
          </EventListComponent>
        }
        onRefresh={() => allEvent()}
        refreshing={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  content: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '70%',
  },
  cardName: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    marginLeft: 10,
    flex: 6,
  },
  cardDate: {
    textAlignVertical: 'bottom',
    marginRight: 10,
  }
});
