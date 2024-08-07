  import React, { PropsWithChildren} from 'react'
import { StyleSheet, StyleProp, ViewStyle, Image, Platform } from 'react-native'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText';

export type HeaderProps = PropsWithChildren & {
    title? : string;
    subtitle?: string;
    style?: StyleProp<ViewStyle>;
}

export const HeaderComponent = ({ 
    title,
    subtitle,
    style,
    children,
    ...rest
}: HeaderProps) => {
  return (
    <ThemedView {...rest} style={styles.container}>
      <Image source={require('@/assets/images/person.png')}
        style={styles.image}
      />
      <ThemedView style={styles.content}>
        {children}
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
    container: {
      height: 250,
      justifyContent: 'center',
      backgroundColor: '#ff7979',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.25,
      shadowRadius: 2,
      elevation: 5,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    image: {
      position: 'absolute',
      width: '50%',
      height: '100%',
      right: 0,
      marginTop: '15%',
    },
    content: {
      padding: 10,
      backgroundColor: 'transparent',
    },
    subtitle: {
      color: '#fff',
      textAlign: 'left',
    },
    title: {
      width: '40%',
      fontSize: 28,
      color: '#fff',
      textAlign: 'left',
    }
})