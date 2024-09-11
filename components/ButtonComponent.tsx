import { PropsWithChildren, useState } from 'react';
import { StyleSheet, Pressable, ViewStyle, StyleProp, GestureResponderEvent } from 'react-native';

export type ButtonComponentProps = PropsWithChildren & {
  icon?: string;
  lightColor?: string;
  darkColor?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  type?: 'default' | 'primary' | 'secondary' | 'basic' | 'transparent' | 'close' | 'notselected' | 'selected' | 'back';
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
        type === 'notselected' ? styles.notselected : undefined,
        type === 'selected' ? styles.selected : undefined,
        type === 'back' ? styles.back : undefined,
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
    shadowColor: '#FF8A8A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 8,
    position: 'absolute',
    backgroundColor: '#FF8A8A',
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
  notselected: {
    width: 100,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    position: 'relative',
    borderColor: '#FF8A8A',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  selected: {
    width: 100,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    position: 'relative',
    borderColor: '#ffffff',
    borderWidth: 1,
    backgroundColor: '#FF8A8A',
  },
  back: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    padding: 15,
    position: 'absolute',
    backgroundColor: '#ebebeb',
  }
});
