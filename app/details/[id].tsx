import React, {useEffect, useState} from 'react'
import { 
  FlatList, 
  StyleSheet, 
  ImageBackground,
  TextInput
} from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { supabase } from '@/libs/supabase'
import { StandList } from '../types'
import Toast from 'react-native-toast-message'

import ModalComponent from '@/components/ModalComponent';
import { ButtonComponent } from '@/components/ButtonComponent'
import { IconComponent } from '@/components/IconComponent'
import DropDownComponent from '@/components/DropDownComponent'
import LoadingComponent from '@/components/LoadingComponent'

export default function EventDetails() {
  const { id, name, date } = useLocalSearchParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [details, setDetails] = useState<StandList[]>([])
  const [step, setStep] = useState<number>(0);
  const [members, setMembers] = useState<string[]>([])
  const [inputMembers, setInputMembers] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [underwriter, setUnderwriter] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [product, setProduct] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const headerTitle = `${name} - ${date?.slice(8,10)}/${date?.slice(5,7)}/${date?.slice(0, 4)}`

  const dropDownIcon = [
    { name: 'Food', icon: 'fastfood' },
    { name: 'Hotel', icon: 'hotel' },
    { name: 'Gas', icon: 'local-gas-station' },
    { name: 'Transportation', icon: 'directions-transit' },
    { name: 'Ticket', icon: 'confirmation-number' },
  ]

  const fetchEventDetails = async () => {
    try {
      const { data, error } = await supabase.from('Stands').select('*').eq('id', id)
      
      if(error) {
        Toast.show({
          type: 'error',
          text1: error.message
        })
      }

      if(data) {
        setDetails(data)
      }
      setLoading(false)
    } catch (error) {
      Toast.show({
        type: 'error',
      })
    }
  }

  const addMember = () => {
    if(inputMembers.trim()) {
      setMembers([...members, inputMembers])
      setInputMembers('')
    }
  }

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  }

  const handleSubmit = async () => {
    try {
      const { data, error} = await supabase.from('Stands').insert({
        id: id,
        name: product,
        amount: amount,
        members: members,
        category: category,
        underwriter: underwriter,
      })

      if(error) {
        Toast.show({
          type: 'error',
          text1: error.message
        })
      }
      
      if(data) {
        Toast.show({
          type: 'success',
          text1: 'Data added successfully'
        })
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(isOpen === false) {
      setUnderwriter('')
      setAmount('')
      setCategory('')
      setProduct('')
      setInputMembers('')
      setMembers([])
      setStep(0)
    } else {
      return
    }
  }, [isOpen])

  useEffect(() => {
    fetchEventDetails()
  }, [loading, details])

  return (
    <>
    <ThemedView style={styles.container}>
      <Stack.Screen options={{
        headerTitle: headerTitle
      }} />
      {
        loading ? 
          <LoadingComponent /> 
        :
          details.length !== 0 ?
            <FlatList 
              data={details}
              renderItem={null} 
            />
            : 
            <ImageBackground 
              source={require('../../assets/images/noresultfound.jpg')}
              resizeMode='center'
              style={styles.backgroundImage}
            />
      }
      <ButtonComponent style={styles.btnAdd} onPress={() => setIsOpen(true)}>
        <IconComponent name='add' style={styles.btnTextADD}/>
      </ButtonComponent>
    </ThemedView>
    {
      isOpen &&
      <ModalComponent show={isOpen} setShow={setIsOpen} title='STANDS'>
        <ThemedView style={styles.inputContainer}>
          {
            step === 0 ?
              <>
              <TextInput 
                placeholder='Underwriter'
                placeholderTextColor='#949494'
                onChangeText={setUnderwriter}
                style={styles.inputField} />
              <DropDownComponent data={dropDownIcon} setCategory={setCategory}/>
              {
                category === '' || category === 'Gas' ? null :
                  <TextInput 
                    placeholder={
                      category === 'Food' ? 'e.g. Fried Chicken' :
                      category === 'Hotel' ? 'e.g. Mulia' :
                      category === 'Transportation' ? 'e.g. Train' :
                      category === 'Ticket' ? 'e.g. Tour' : 
                      ''
                    }
                    placeholderTextColor='#949494'
                    onChangeText={
                      category === '' || category === 'Gas' ? setProduct : setProduct}
                    style={styles.inputField} />
              }
              <TextInput 
                placeholder='Amount'
                placeholderTextColor='#949494'
                onChangeText={setAmount}
                value={amount}
                inputMode='numeric'
                keyboardType="numeric"
                style={styles.inputField} />
              <ButtonComponent 
                type='default'
                style={styles.btn}
                onPress={() => setStep(step+1)}>
                <ThemedText type='buttonText' style={styles.btnText}>NEXT</ThemedText>
              </ButtonComponent>
              </>
            :
              <>
              <ThemedView style={styles.memberContainer}>
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
                    <ThemedText>{item}</ThemedText>
                    <ButtonComponent type='secondary' onPress={() => removeMember(index)} style={styles.btnRemove}>
                      <ThemedText style={styles.btnText}>X</ThemedText>
                    </ButtonComponent>
                  </ThemedView>
                )}
                style={styles.memberList}
              />
              <ButtonComponent 
                type='default'
                style={styles.btn}
                onPress={handleSubmit}>
                <ThemedText type='buttonText' style={styles.btnText}>OK</ThemedText>
              </ButtonComponent>
              </>
          }
        </ThemedView>
      </ModalComponent>
    }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  btnAdd: {
    borderRadius: 50,
    right: 10,
    bottom: 10,
  },
  btnTextADD: {
    color: '#fff',
    fontSize: 40,
  },
  btnText: {
    color: '#fff',
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
  memberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
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
  memberList: {
    marginBottom: 20,
  },
})