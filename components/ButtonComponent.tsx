import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle, StyleProp, GestureResponderEvent } from 'react-native';

export type ButtonComponentProps = PropsWithChildren & {
  icon?: string;
  lightColor?: string;
  darkColor?: string;
  style?: StyleProp<ViewStyle>;
  onPress: (event: GestureResponderEvent) => void;
  type?: 'default' | 'primary' | 'secondary' | 'submit' | 'reject';
};

export function ButtonComponent({
  children,
  style,
  onPress,
  type = 'default'
} : ButtonComponentProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TouchableOpacity onPress={onPress} style={[
        type === 'default' ? styles.default : undefined,
        type === 'primary' ? styles.primary : undefined,
        type === 'secondary' ? styles.secondary : undefined,
        style
      ]}>
      {children}
      {/* {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>} */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  default: {
    justifyContent: 'center',
    alignItems: 'center',
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
    shadowColor: '#e10000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 8,
    position: 'absolute',
    backgroundColor: '#e10000',
  }
});
