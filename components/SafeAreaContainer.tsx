import { ReactElement } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { globalStyle } from '../styles/GlobalStyle.style';

export default function SafeAreaContainer({
  children,
  bgColor,
}: {
  children: ReactElement;
  bgColor?: string;
}) {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <SafeAreaView style={globalStyle.container}>
        <View
          style={[
            styles.container,
            bgColor ? { backgroundColor: bgColor } : null,
          ]}
        >
          {children}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:4,
    paddingVertical:4
  },
});
