import { LegendList } from '@legendapp/list/react-native';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { useRef } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const DummyData = Array.from({ length: 100 }, (_, idx) => idx)

export default function App() {
  const sheetRef = useRef<TrueSheet>(null);
  const listRef = useRef<any>(null);

  return (
    <>
      <TrueSheet ref={sheetRef} backgroundColor="white" scrollableRef={listRef}>
        <LegendList
          ref={listRef}
          data={DummyData}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.text}>{item}</Text>
            </View>
          )}
        />
      </TrueSheet>

      <View style={styles.container}>
        <Button
          title='Open Sheet'
          onPress={() => sheetRef.current?.present()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "black",
  },
});
