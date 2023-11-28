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
    marginTop: windowHeight * 0.01, // Adjust the top margin as needed
    width: windowWidth * 0.5, // Set the width of the circle
    height: windowWidth * 0.5, // Set the height of the circle to make it round
    borderRadius: windowWidth * 0.25, // Half of width or height to make perfect circle
    backgroundColor: 'blue', // Set the circle color
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
    alignSelf: 'center', // Center the circle itself horizontally in the view
  },
  title: {
    color: 'white', // Set text color to contrast with the blue background
    fontSize: windowWidth * 0.08, // Adjust font size as needed
    textAlign: 'center', // Center the text
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
