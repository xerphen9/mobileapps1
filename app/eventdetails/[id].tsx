import React, {useEffect, useState} from 'react'
import { 
  useColorScheme, 
  StyleSheet, 
  ImageBackground,
  TextInput,
  ScrollView,
  RefreshControl,
  SafeAreaView
} from 'react-native'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { supabase } from '@/libs/supabase'
import { StandList } from '../types'
import Toast from 'react-native-toast-message'
import { Colors } from '@/constants/Colors'

import ModalComponent from '@/components/ModalComponent';
import { HeaderComponent } from '@/components/HeaderComponent'
import { ButtonComponent } from '@/components/ButtonComponent'
import { IconComponent } from '@/components/IconComponent'
import DropDownComponent from '@/components/DropDownComponent'
import LoadingComponent from '@/components/LoadingComponent'
import { useAppSelector } from '@/hooks/reduxHooks'
import { Collapsible } from '@/components/Collapsible'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'

export default function EventDetails() {
  const theme = useColorScheme() ?? 'light'
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
  const headerTitle = `${name}`
  const headerTitle2 = `${date?.slice(8,10)}/${date?.slice(5,7)}/${date?.slice(0, 4)}`

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

  const updateTotalAmount = async () => {
    try {
      await supabase
        .from('Event')
        .update({ total: amount})
        .eq('id', id)

    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async () => {
    setRefresh(true)
    try {
      const response = await supabase.from('Stands').insert({
        name: product,
        amount: amount,
        category: category,
        underwriter: underwriter,
        members: addMembers,
        event_id: id,
      })
      
      if(response) {
        setRefresh(false)
        setLoading(false)
        setIsOpen(false)
        updateTotalAmount()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelectedMember = (value: string) => {
    if(addMembers.includes(value)) {
      setAddMembers(addMembers.filter((v, i) => v !== value));
    } else {
      setAddMembers([...addMembers, value])
    }
  }

  const handleSelectedUnderwriter = (value: string) => {
    setUnderwriter(value)
  }

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }, []);

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
    console.log('refresh...')
  }, [loading, refresh])

  return (
    <>
    <ScrollView 
      contentContainerStyle={styles.scrollView} 
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh}/>
      }>
      <LinearGradient 
        style={styles.container} 
        colors={['#FF8A8A', theme === 'light' ? '#fab4b4' : '#844646', theme === 'light' ? '#fff' : '#0e0808']}>
        {
          loading ? 
            <>
              <Stack.Screen options={{
                header: () => <HeaderComponent title={headerTitle} title2={headerTitle2}/>,
                statusBarStyle: theme === 'dark' ? 'light' : 'dark',
                statusBarTranslucent: true,
                navigationBarHidden: true,
              }} />
              <LoadingComponent /> 
            </>
          : details.length !== 0 ?
              <>
                <ThemedView style={styles.topContent}>
                  <Stack.Screen options={{
                    header: () => <HeaderComponent title={headerTitle} title2={headerTitle2}/>,
                    statusBarStyle: theme === 'dark' ? 'light' : 'dark',
                    statusBarTranslucent: true,
                    navigationBarHidden: true,
                  }} />
                  <BlurView style={styles.summaryContainer} intensity={30} tint='dark'>
                    <ThemedText type='textWhite'>TOTAL</ThemedText>
                  </BlurView>
                </ThemedView>
                <ThemedView style={[styles.bottomContent, {backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background}]}>

                </ThemedView>
              </>
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
      </LinearGradient>
    </ScrollView>
    {
      isOpen &&
            step === 0 ? 
              <>
              <ModalComponent show={isOpen} setShow={setIsOpen} step={step} title='UNDERWRITER' onBack={setStep}>
                <ThemedView style={styles.inputContainer}>
                  <ThemedView style={styles.memberContainer}>
                    {
                      members?.map((value, index) => 
                        <ButtonComponent type={underwriter === value ? 'selected' : 'notselected'} key={index} onPress={() => handleSelectedUnderwriter(value)}>
                          <ThemedText style={underwriter === value ? {color: '#fff'} : {color: '#000'}}>{value.toUpperCase()}</ThemedText>
                        </ButtonComponent>
                      )
                    }
                  </ThemedView>
                  <ButtonComponent 
                    type='default'
                    style={styles.btn}
                    onPress={() => setStep(step+1)}>
                    <ThemedText type='textWhite' style={styles.btnText}>NEXT</ThemedText>
                  </ButtonComponent>
                </ThemedView>
              </ModalComponent>
              </>
            : 
              <>
              <ModalComponent show={isOpen} setShow={setIsOpen} step={step} title='DETAILS' onBack={setStep}>
                <ThemedView style={styles.inputContainer}>
                  <DropDownComponent data={dropDownIcon} defaultSelected='Select a Category' setSelected={setCategory}/>
                  {
                    category === '' || category === 'Fuel' ? null :
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
                          category === '' || category === 'Fuel' ? setProduct : setProduct}
                        style={styles.inputField} />
                  }
                  <ThemedView style={styles.memberContainer}>
                    {
                      members?.map((value, index) => 
                        <ButtonComponent type={addMembers.includes(value) ? 'selected' : 'notselected'} key={index} onPress={() => handleSelectedMember(value)}>
                          <ThemedText style={addMembers.includes(value) ? {color: '#fff'} : {color: '#000'}}>{value.toUpperCase()}</ThemedText>
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
                    <ThemedText type='textWhite' style={styles.btnText}>OK</ThemedText>
                  </ButtonComponent>
                </ThemedView>
              </ModalComponent>
              </>
    }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  topContent: {
    flex: 2,
    backgroundColor: 'transparent',
  },
  summaryContainer: {
    width: '95%',
    marginVertical: 30,
    borderRadius: 30,
    alignSelf: 'center',
    flex: 1,
    padding: 10,
    overflow: 'hidden',
  },
  bottomContent:{ 
    flex: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#222222',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 10,
  },
  backgroundImage: {
    flex: 1,
  },
  summaryCard: {
    flex: 1,
    marginVertical: 20,
    borderRadius: 30,
    alignSelf: 'center',
    backgroundColor: '#FF8A8A',
    shadowColor: '#222222',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 8,
  },
  subSummaryCard: {
    width: 330,
    height: 200,
    alignSelf: 'center',
    borderRadius: 30,
  },
  label: {
    fontSize: 15,
    marginBottom: 20,
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