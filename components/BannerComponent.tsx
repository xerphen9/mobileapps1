import React, { PropsWithChildren} from 'react'
import { StyleSheet, StyleProp, ViewStyle, Image } from 'react-native'
import { ThemedView } from './ThemedView'

export type HeaderProps = PropsWithChildren & {
    title? : string;
    subtitle?: string;
    style?: StyleProp<ViewStyle>;
}

export const BannerComponent = ({ 
    title,
    subtitle,
    style,
    children,
    ...rest
}: HeaderProps) => {
  return (
    <ThemedView>
      <ThemedView {...rest} style={styles.container}>
        <Image source={require('@/assets/images/person.png')}
          style={styles.image}
        />
        <ThemedView style={styles.content}>
          {children}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
    container: {
      height: 250,
      justifyContent: 'center',
      shadowColor: '#000',
      backgroundColor: '#FF8A8A',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.25,
      shadowRadius: 2,
      elevation: 5,
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
    },
    image: {
      position: 'absolute',
      width: '50%',
      height: '100%',
      right: 0,
      marginTop: '15%',
    },
    content: {
      padding: 5,
      marginTop: 20,
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