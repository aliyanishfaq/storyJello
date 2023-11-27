import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image, SafeAreaView } from 'react-native';
import { Link, Stack } from "expo-router";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

export default function App() {
  const beautyBookMessage = [
    {
      "role": "system",
      "content": `Do you know about the following book?
        All the Beauty in the world
        A fascinating, revelatory portrait of the Metropolitan Museum of Art and its treasures by a former New Yorker staffer who spent a decade as a museum guard.
  
        [Description of the book...]
  
        In the tradition of classic workplace memoirs like Lab Girl and Working Stiff, All The Beauty in the World is a surprising, inspiring portrait of a great museum, its hidden treasures, and the people who make it tick, by one of its most intimate observers.`
    },
    {
      "role": "user",
      "content": `Using your accurate knowledge about the book, generate the following three outputs: 
        Output 1: suggestions for a book for the follow-up meeting that explores similar themes but with a new perspective and three discussions questions for the next club meeting based on that book recommendation.
  
        Format the outputs as follows:
  
        Output 1: 
  
        Book Recommendation: "Name of Book"
  
        Discussion Questions: 
        - Question 1: ""
        - Question 2: ""
        - Question 3: ""`
    }
  ];
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
      options={{headerShown: false}}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Story Jello</Text>
      </View>
      <View style={styles.booksList}>
        <Text style={{fontSize: windowHeight * 0.03}}>Dashboard</Text>
        <View style={styles.booksRow}>
        <Link href={{
          pathname: '/DiscussionQuestion',
          params: { bookName: 'All The Beauty In The World', prompt: beautyBookMessage}}} >
          <Image source={require('../assets/AllTheBeautyInTheWorldTitle.png')} style={{width: windowWidth * 0.35, height: windowHeight * 0.24}}/>
        </Link>
        <Image source={require('../assets/CommunityTitle.png')} style={{width: windowWidth * 0.35, height: windowHeight * 0.24}}/>
        </View>
        <View style={styles.booksRow}>
        <Image source={require('../assets/AllTheBeautyInTheWorldTitle.png')} style={{width: windowWidth * 0.35, height: windowHeight * 0.24}}/>
        <Image source={require('../assets/CommunityTitle.png')} style={{width: windowWidth * 0.35, height: windowHeight * 0.24}}/>
        </View>
      </View>
      <StatusBar style="auto" />
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
