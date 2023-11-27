import axios from 'axios';

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

const fetchChatGPTResponse = async (prompt) => {
    console.log("Does prompt get here?",prompt)
  try {
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions', // Replace with the correct endpoint
      { 
        model: 'gpt-3.5-turbo',
        messages: beautyBookMessage,
      },
      {
        headers: {
          'Authorization': `Bearer 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`, // Replace with your actual API key
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching response from OpenAI:', error);
  }
  return 'failed to generate a response';
};

export default fetchChatGPTResponse;