import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, Pressable, useColorScheme, StyleProp, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

export function Collapsible({ children, title, style }: PropsWithChildren & { title: string, style?: StyleProp<ViewStyle> }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView>
      <Pressable
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}>
        <ThemedText type="buttonText">{title}</ThemedText>
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={theme === 'light' ? Colors.light.background : Colors.dark.background}
          style={styles.icon}
        />
      </Pressable>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#ff7979',
    gap: 6,
    marginVertical: 5,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
  icon: {
    
  }
});
