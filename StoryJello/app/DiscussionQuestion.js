import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import fetchChatGPTResponse from './fetchDiscussionQuestion';

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function App() {
    const params = useLocalSearchParams();
    const { bookName, prompt } = params;
    console.log("What is this?", prompt);
    const [responseText, setResponseText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const generateText = async () => {
          setIsLoading(true);
          const response = await fetchChatGPTResponse(prompt);
          setResponseText(response);
          setIsLoading(false);
        };
    
        generateText();
      }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                title: bookName,
                headerStyle: { backgroundColor: 'black' },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
                },
                }}
            />
        <View style={styles.header}>
            <Text style={styles.title}>Story Jello</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
        ) : (
        <Text>{responseText}</Text>
        )}
        </View>
        <StatusBar style="light" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: windowHeight * 0.05,

  },
  header: {
    margin: windowHeight * 0.01,
    borderWidth: 4,
    borderColor: 'red',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: windowWidth * 0.1
  },
  booksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'red',
    width: windowWidth * 0.9,
  },
  booksList: {
    alignItems: 'center',
    gap: windowHeight * 0.025,
  }
});
