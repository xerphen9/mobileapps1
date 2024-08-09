import { Tabs } from 'expo-router';
import React, { ChangeEvent, useState, useEffect } from 'react';
import { Platform, StyleSheet, TextInput, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/libs/supabase';
import Toast from 'react-native-toast-message';
import DateTimePicker, { DateTimePickerEvent, Event } from '@react-native-community/datetimepicker';

import { IconComponent } from '@/components/IconComponent';
import { Colors } from '@/constants/Colors';
import { ButtonComponent } from '@/components/ButtonComponent';
import ModalComponent from '@/components/ModalComponent';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [date, setDate] = useState<Date>(new Date())
  const [isDateOpen, setIsDateOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [event, setEvent] = useState<string>('')
  const [underwriter, setUnderwriter] = useState<string>('')

  const changeDate = (e: DateTimePickerEvent, selectedDate?: Date) => {
    setIsOpen(Platform.OS === 'android')
    setIsDateOpen(false)
    if (selectedDate !== undefined) {
      setDate(selectedDate);
    }
  }

  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from('Event')
      .insert({
        date: date,
        name: event,
      })

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Hello',
        text2: `${error}`,
        swipeable: true
      })
    }

    if(data) {
      Toast.show({
        type: 'success',
        text1: 'Event added Successfully!',
        swipeable: true,
      })
    }
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen === false) {
      setDate(new Date())
      setEvent('')
      setStep(0)
    } else {
      return
    }
  }, [isOpen])

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
          tabBarStyle: styles.tabBarContainer,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            headerTitleStyle: styles.tabHeaderStyle,
            headerShown: false,
            headerTitle: '',
            tabBarShowLabel: true,
            tabBarLabel: ({ color, focused, position }) => (
              <ThemedText style={focused ? styles.tabBarlabelFocused : styles.tabBarLabel}>.</ThemedText>
            ),
            tabBarIcon: ({ color, focused }) => (
              <IconComponent
                name='home-filled'
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="report"
          options={{
            headerTitleStyle: styles.tabHeaderStyle,
            headerShown: false,
            headerTitle: '',
            tabBarLabel: ({ color, focused, position }) => (
              <ThemedText style={focused ? styles.tabBarlabelFocused : styles.tabBarLabel}>.</ThemedText>
            ),
            tabBarIcon: ({ color, focused }) => (
              <IconComponent
                name='bar-chart'
                color={color}
              />
            ),
          }}
        />
      </Tabs>
      <ButtonComponent type='default' onPress={() => setIsOpen(true)} style={styles.btnAdd}>
        <IconComponent name='add' style={styles.btnAddText} />
      </ButtonComponent>
      {
        isOpen &&
        <ModalComponent show={isOpen} setShow={setIsOpen} title='ADD EVENT'>
          <ThemedView style={styles.inputContainer}>
            <ThemedView style={styles.dateContainer}>
              <ButtonComponent type='simple' onPress={() => setIsDateOpen(true)} style={styles.btnDate}>
                <ThemedText type='default'>{date.toDateString()}</ThemedText>
              </ButtonComponent>
            </ThemedView>
            <TextInput placeholder='Event'
              placeholderTextColor='#949494'
              onChangeText={setEvent}
              style={styles.inputField} />
            <ButtonComponent 
              type='default'
              style={styles.btn}
              onPress={handleSubmit}>
              <ThemedText type='buttonText' style={styles.btnText}>OK</ThemedText>
            </ButtonComponent>
          </ThemedView>
          {
            isDateOpen && (
              <DateTimePicker value={date}
                mode='date'
                display='default'
                onPointerCancel={() => setIsDateOpen(false)}
                onChange={changeDate}
              />
            )
          }
        </ModalComponent>
      }
      <Toast />
    </>
  );
}


const styles = StyleSheet.create({
  tabHeaderStyle: {
    fontSize: 20,
  },
  tabBarContainer: {
    height: 65,
    backgroundColor: '#efeded',
  },
  tabBarlabelFocused: {
    color: '#ff7979',
    fontSize: 30,
    fontWeight: 'bold',
    position: 'absolute',
  },
  tabBarLabel: {
    display: 'none',
  },
  btnAdd: {
    width: 65,
    height: 65,
    bottom: 35,
    left: '50%',
    transform: [{translateX: -30}],
    borderRadius: 25,
  },
  btn: {
    borderRadius: 50,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    bottom: 0,
  },
  dateContainer: {
    padding: 35,
  },
  btnDate: {
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: 'center',
    right: 0,
    left: 0
  },
  btnAddText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff'
  },
  btnText: {
    color: '#fff',
  },
  inputContainer: {
    width: "100%",
    height: 'auto',
    paddingBottom: 40,
    paddingTop: 20,
  },
  inputField: {
    padding: 10,
    marginBottom: 20,
    height: 40,
    borderWidth: 2,
    backgroundColor: '#fff',
    borderColor: '#b3b3b3',
    borderRadius: 20,
    fontSize: 15,
  }
})