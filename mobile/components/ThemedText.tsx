import { Text as DefaultText, TextProps } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

export function ThemedText(props: TextProps & { lightColor?: string; darkColor?: string }) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const colorScheme = useColorScheme();
  const color = colorScheme === 'dark' ? darkColor : lightColor;

  return (
    <DefaultText
      {...otherProps}
      style={[
        {
          color: color || Colors[colorScheme === 'dark' ? 'dark' : 'light'].text,
        },
        style,
      ]}
    />
  );
}
