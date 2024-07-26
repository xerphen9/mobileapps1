import { TextInput, type TextInputProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  placeholder,
  value,
  ...rest
}: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <TextInput
      style={[{ color }, style ]}
      placeholder={placeholder}
      value={value}
      {...rest}
    />
  );
}
