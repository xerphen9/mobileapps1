import React, {useEffect, useState} from 'react'
import { 
  FlatList, 
  StyleSheet, 
  ImageBackground,
  TextInput
} from 'react-native'
import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { Stack, useLocalSearchParams } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { supabase } from '@/libs/supabase'
import { StandList } from '../types'
import { useColorScheme } from '@/hooks/useColorScheme'
import Toast from 'react-native-toast-message'

import ModalComponent from '@/components/ModalComponent';
import { ButtonComponent } from '@/components/ButtonComponent'
import { IconComponent } from '@/components/IconComponent'
import DropDownComponent from '@/components/DropDownComponent'
import LoadingComponent from '@/components/LoadingComponent'
import { useAppSelector } from '@/hooks/reduxHooks'
import { Collapsible } from '@/components/Collapsible'

export default function EventDetails() {
  const colorScheme = useColorScheme()
  const { id } = useLocalSearchParams()
  const name: string = useAppSelector((state) => state.event.name)
  const members: string[] = useAppSelector((state) => state.event.members)
  const date: string = useAppSelector((state) => state.event.date)
  const [refresh, setRefresh] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [details, setDetails] = useState<StandList[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [underwriter, setUnderwriter] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [product, setProduct] = useState<string>('')
  const [addMembers, setAddMembers] = useState<string[]>([])
  const [amount, setAmount] = useState<string>('')
  const [total, setTotal] = useState<number>(0)
  const headerTitle = `${name} - ${date?.slice(8,10)}/${date?.slice(5,7)}/${date?.slice(0, 4)}`

  const dropDownIcon = [
    { name: 'Food', icon: 'fastfood' },
    { name: 'Hotel', icon: 'hotel' },
    { name: 'Fuel', icon: 'local-gas-station' },
    { name: 'Transportation', icon: 'directions-transit' },
    { name: 'Ticket', icon: 'confirmation-number' },
  ]

  const getStandsData = async () => {
    try {
      const { data, error } = await supabase.from('Stands').select('*').eq("event_id", id)

      console.log(data)
      
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

  const handleSubmit = async () => {
    setRefresh(false)
    try {
      const response = await supabase.from('Stands').insert({
        name: product,
        amount: amount,
        category: category,
        underwriter: underwriter,
        members: addMembers,
        total: total,
        event_id: id,
      })
      
      if(response) {
        setRefresh(true)
        setLoading(false)
        setIsOpen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelected = (value: string, index: number) => {
    if(addMembers.includes(value)) {
      setAddMembers(addMembers.filter((v, i) => v !== value));
    } else {
      setAddMembers([...addMembers, value])
    }
  }

  const renderStands = (item: StandList) => {
    return(
      <Collapsible title={item.underwriter?.toUpperCase()} style={styles.collapseContainer}>
        <ThemedText>{item.category}</ThemedText>
        <ThemedText>{item.name}</ThemedText>
        <ThemedText>{item.amount}</ThemedText>
      </Collapsible>
    )
  }

  useEffect(() => {
    if(isOpen === false) {
      setUnderwriter('')
      setAmount('')
      setCategory('')
      setAddMembers([])
      setProduct('')
      setStep(0)
    } else {
      return
    }
  }, [isOpen])

  useEffect(() => {
    getStandsData()
    console.log('refresh')
  }, [loading, refresh])

  return (
    <>
    <ThemedView style={styles.container}>
      <Stack.Screen options={{
        headerTitle: headerTitle,
        statusBarStyle: colorScheme === 'dark' ? 'light' : 'dark',
        statusBarTranslucent: true,
      }} />
      {
        loading ? 
          <LoadingComponent /> 
        :
          details.length !== 0 ?
            <FlatList 
              data={details}
              renderItem={({item}) => renderStands(item)} 
              onRefresh={() => getStandsData()}
              refreshing={false}
            />
            : 
            <ImageBackground 
              source={require('../../assets/images/noresultfound.png')}
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
      <ModalComponent show={isOpen} setShow={setIsOpen} step={step} title='STANDS'onBack={setStep}>
        <ThemedView style={styles.inputContainer}>
          {
            step === 0 ? 
              <>
              <TextInput 
                placeholder='Underwriter'
                placeholderTextColor='#949494'
                onChangeText={setUnderwriter}
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
              <DropDownComponent data={dropDownIcon} setCategory={setCategory}/>
              {
                category === '' || category === 'Gas' ? null :
                  <TextInput 
                    placeholder={
                      category === 'Food' ? 'e.g. Fried Chicken' :
                      category === 'Hotel' ? 'e.g. Rosewood' :
                      category === 'Transportation' ? 'e.g. Train' :
                      category === 'Ticket' ? 'e.g. Tour' : 
                      ''
                    }
                    placeholderTextColor='#949494'
                    onChangeText={
                      category === '' || category === 'Gas' ? setProduct : setProduct}
                    style={styles.inputField} />
              }
              <ThemedView style={styles.memberContainer}>
                {
                  members?.map((value, index) => 
                    <ButtonComponent type={addMembers.includes(value) ? 'multiplechoiceSelected' : 'multiplechoice'} key={index} onPress={() => handleSelected(value, index)}>
                      <ThemedText>{value.toUpperCase()}</ThemedText>
                    </ButtonComponent>
                  )
                }
              </ThemedView>
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
  collapseContainer: {

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
  memberContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 5,
    rowGap: 10,
    marginBottom: 20,
  }
})