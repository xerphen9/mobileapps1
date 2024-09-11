import { Tabs } from 'expo-router';
import React, { ChangeEvent, useState, useEffect } from 'react';
import { Platform, StyleSheet, TextInput, Text, FlatList } from 'react-native';
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
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { refresh } from '@/features/eventSlice';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isRefresh: boolean = useAppSelector((state) => state.event.refresh)
  const dispatch = useAppDispatch()
  const [date, setDate] = useState<Date>(new Date())
  const [isDateOpen, setIsDateOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [members, setMembers] = useState<string[]>([])
  const [inputMembers, setInputMembers] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [event, setEvent] = useState<string>('')

  const changeDate = (e: DateTimePickerEvent, selectedDate?: Date) => {
    setIsOpen(Platform.OS === 'android' || Platform.OS === 'ios');
    setIsDateOpen(false)
    if (selectedDate !== undefined) {
      setDate(selectedDate);
    }
  }

  const addMember = () => {
    if(inputMembers.trim()) {
      setMembers([...members, inputMembers])
      setInputMembers('')
    }
  }

  const removeMember = (index: number) => {
    setMembers(members.filter((v, i) => i !== index));
  }

  const handleSubmit = async () => {
    dispatch(refresh(false))
    try {
      const response = await supabase
        .from('Event')
        .insert({
          date: date,
          name: event,
          members: members,
        })

      console.log(response)
  
      if(response) {
        dispatch(refresh(true))
      }
      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isOpen === false) {
      setDate(new Date())
      setEvent('')
      setStep(0)
      setInputMembers('')
      setMembers([])
    } else {
      return
    }
  }, [isOpen])

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
          tabBarActiveBackgroundColor: Colors[colorScheme ?? 'light'].tabBackground,
          tabBarInactiveBackgroundColor: Colors[colorScheme ?? 'light'].tabBackground,
          tabBarStyle: styles.tabBarContainer,
        }}
        backBehavior='history'>
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
        <ModalComponent show={isOpen} setShow={setIsOpen} step={step} onBack={setStep} title='ADD EVENT'>
          {
            step === 0 ?
              <ThemedView style={styles.inputContainer}>
                <ThemedView style={styles.dateContainer}>
                  <ButtonComponent type='basic' onPress={() => setIsDateOpen(true)} style={styles.btnDate}>
                    <ThemedText type='default' style={styles.dateText}>{date.toDateString()}</ThemedText>
                  </ButtonComponent>
                </ThemedView>
                <TextInput placeholder='Event'
                  placeholderTextColor='#949494'
                  onChangeText={setEvent}
                  value={event}
                  style={styles.inputField} />
                <ButtonComponent 
                  type='default'
                  style={styles.btn}
                  onPress={() => setStep(step+1)}>
                  <ThemedText type='textWhite' style={styles.btnText}>NEXT</ThemedText>
                </ButtonComponent>
              </ThemedView>
            : 
              <>
              <ThemedView style={styles.addMemberContainer}>
                <ThemedView style={styles.addMember}>
                  <TextInput 
                    placeholder='Add a member'
                    placeholderTextColor='#949494'
                    value={inputMembers}
                    onChangeText={setInputMembers}
                    style={styles.inputFieldMember} />
                  <ButtonComponent onPress={addMember} style={styles.btnAddMember}>
                      <IconComponent name='add' style={styles.btnText}/>
                  </ButtonComponent>
                </ThemedView>
                <FlatList
                  data={members}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <ThemedView style={styles.memberItem}>
                      <ThemedText style={styles.memberName}>{item}</ThemedText>
                      <ButtonComponent type='secondary' onPress={() => removeMember(index)} style={styles.btnRemove}>
                        <ThemedText style={styles.btnText}>X</ThemedText>
                      </ButtonComponent>
                    </ThemedView>
                  )}
                  style={styles.memberList}
                />
              </ThemedView>
              <ButtonComponent 
                type='default'
                style={styles.btn}
                onPress={handleSubmit}>
                <ThemedText type='textWhite' style={styles.btnText}>OK</ThemedText>
              </ButtonComponent>
              </>
          }
          {
            isDateOpen && (
              <DateTimePicker value={date}
                mode='date'
                display='spinner'
                themeVariant='dark'
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
  },
  tabBarlabelFocused: {
    color: '#FF8A8A',
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
  addMemberContainer: {
    marginVertical: 40,
  },
  addMember: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  btnAddMember: {
    position: 'relative',
    padding: 5,
    borderRadius: 20,
    width: '25%',
    marginBottom: 20,
  },
  btnRemove: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    right: 3,
  },
  inputFieldMember: {
    padding: 10,
    marginBottom: 20,
    height: 40,
    borderWidth: 2,
    backgroundColor: '#fff',
    borderColor: '#b3b3b3',
    borderRadius: 20,
    fontSize: 15,
    width: '70%',
    fontWeight: 'bold',
  },
  memberName: {
  },
  memberList: {
    marginBottom: 20,
  },
  dateContainer: {
    padding: 35,
  },
  dateText: {
    color: '#000',
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