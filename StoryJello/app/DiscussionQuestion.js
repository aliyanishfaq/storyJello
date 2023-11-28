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
    const extractDiscussionQuestions = (text) => {
      const splitText = text.split('Discussion Questions:');
      if (splitText.length > 1) {
          return splitText[1].replace(/- /g, '\n- '); // Replace '- ' with '\n- ' to add a new line before each question
      }
      return '';
    };
    const extractBeforeDiscussionQuestions = (text) => {
      const startTerm = "Book Recommendation:";
      const endTerm = "Discussion Questions:";
      const startIndex = text.indexOf(startTerm);
      const endIndex = text.indexOf(endTerm);
      if (startIndex !== -1 && endIndex !== -1) {
          // Extract the text from the end of startTerm to the start of endTerm
          return text.substring(startIndex + startTerm.length, endIndex).trim();
      }
      return ''; // Return an empty string if either term is not found
    };
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
            <Text style={styles.title}>storyJello</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.textContainer}>
            <Text style={styles.questionTextStyle}>{extractBeforeDiscussionQuestions(responseText)}</Text>
          </View>
        )}
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.textContainer}>
            <Text style={styles.questionTextStyle}>{extractDiscussionQuestions(responseText)}</Text>
          </View>
        )}
        </View>
        <StatusBar style="light" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efe4f5',
    alignItems: 'center',
    gap: windowHeight * 0.05,

  },
  header: {
    marginTop: windowHeight * 0.01, 
    width: windowWidth * 0.2, 
    height: windowWidth * 0.2, 
    borderRadius: windowWidth * 0.25, 
    backgroundColor: '#86eef7', 
    justifyContent: 'center', 
    alignItems: 'center', 
    alignSelf: 'center', 
  },
  title: {
    color: 'white',
    fontSize: windowWidth * 0.04, 
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  booksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: 'white',
    width: windowWidth * 0.9,
    height: windowHeight * 0.415,
    resizeMode: 'contain',  
  },
  imageStyle: {
    width: windowWidth * 0.35,
    height: windowHeight * 0.4,
    borderWidth: 12, 
    borderColor: 'white',
  },
  booksList: {
    alignItems: 'center',
    gap: windowHeight * 0.025,
  },
  textContainer: {
    flexDirection: 'row',
    borderWidth: 8, 
    borderColor: 'white', 
    padding: 10, 
    margin: 5, 
    width: windowWidth * 0.9,
    height: windowHeight * 0.3,
  },
  questionTextStyle: {
    fontSize: 16, 
    color: 'black', 
    textAlign: 'left', 
    padding: 10, 
  }
});

