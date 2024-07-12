import { Tabs } from 'expo-router';
import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { ButtonComponent } from '@/components/ButtonComponent';
import ModalComponent from '@/components/ModalComponent';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isOpen, setIsOpen] = useState(false);
  const [fieldPIC, setFieldPIC] = useState('')
  const [fieldMember, setFieldMember] = useState('')

  const inputField = [
    { label: 'PIC', type: 'text', placeholder: 'Name', name: 'name'},
    { label: 'Email', type: 'text', placeholder: 'Email', name: 'email'},
    { label: 'Password', type: 'password', placeholder: 'Password', name: 'password'},
    { label: 'Confirm Password', type: 'password', placeholder: 'Confirm Password', name: 'confirmpassword'},
  ]

  const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    
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
          tabBarShowLabel: true,
          tabBarLabel: ({color, focused, position}) => (
            <ThemedText style={focused ? styles.tabBarlabelFocused : styles.tabBarLabel}>.</ThemedText>
          ),
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
          tabBarShowLabel: true,
          tabBarLabel: ({color, focused, position}) => (
            <ThemedText style={focused ? styles.tabBarlabelFocused : styles.tabBarLabel}>.</ThemedText>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              name='browsers'
              color={color}
            />
          ),
        }}
      />
    </Tabs>
    <ButtonComponent type='default' onPress={() => setIsOpen(true)} style={styles.btnAdd}>
      <TabBarIcon name='add' style={styles.btnText}/>
    </ButtonComponent>
    { 
      isOpen && 
      <ModalComponent show={isOpen} setShow={setIsOpen} title='ADD SHEET'>
        <SafeAreaView>
          <ThemedText>PIC</ThemedText>
          <TextInput placeholder='Name' 
                     value={fieldPIC} 
                     onChangeText={setFieldPIC}
                     focusable={true}
                     style={styles.inputField}/>
        </SafeAreaView>
      </ModalComponent>}
    </>
  );
}


const styles = StyleSheet.create({
  tabBarContainer: {
    height: 65,
    backgroundColor: '#efeded',
    opacity: 1,
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
    width: 55,
    height: 55,
    bottom: 40,
    right: 165,
    borderRadius: 20,
  },
  btnText: {
    color: '#fff',
  },
  inputField: {
    
  }
})