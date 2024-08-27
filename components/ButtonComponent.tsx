import { PropsWithChildren, useState } from 'react';
import { StyleSheet, Pressable, ViewStyle, StyleProp, GestureResponderEvent } from 'react-native';

export type ButtonComponentProps = PropsWithChildren & {
  icon?: string;
  lightColor?: string;
  darkColor?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  type?: 'default' | 'primary' | 'secondary' | 'basic' | 'transparent' | 'close' | 'multiplechoice' | 'multiplechoiceSelected';
};

export function ButtonComponent({
  children,
  style,
  onPress,
  type = 'default'
} : ButtonComponentProps) {

  return (
    <Pressable onPress={onPress} style={[
        type === 'default' ? styles.default : undefined,
        type === 'primary' ? styles.primary : undefined,
        type === 'secondary' ? styles.secondary : undefined,
        type === 'close' ? styles.close : undefined,
        type === 'basic' ? styles.basic : undefined, 
        type === 'transparent' ? styles.transparent : undefined,
        type === 'multiplechoice' ? styles.multiplechoice : undefined,
        type === 'multiplechoiceSelected' ? styles.multiplechoiceSelected : undefined,
        style
      ]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  default: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#ff7979',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 8,
    position: 'absolute',
    backgroundColor: '#ff7979',
  },
  primary: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#1f8fe4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 8,
    position: 'absolute',
    backgroundColor: '#1f8fe4',
  },
  secondary: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    position: 'absolute',
    backgroundColor: '#e10000',
  },
  basic: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    position: 'absolute',
    backgroundColor: '#fff',
  },
  transparent: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  close: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    position: 'absolute',
    backgroundColor: '#8b8b8b',
  },
  multiplechoice: {
    width: 100,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    position: 'relative',
    borderColor: '#ff7979',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  multiplechoiceSelected: {
    width: 100,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    position: 'relative',
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: '#ff7979',
  }
});
