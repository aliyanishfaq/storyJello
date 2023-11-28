import streamlit as st
import os
from litlocationGPT import gptResponse
import re
import { View, Text } from 'react-native';

st.set_page_config(layout="wide")
st.title('Story Jello')
#
messages=[
        {"role": "system", "content": """
        Book: All the Love Songs by Nicole Pyland

LesFic Book Club Host (Cara Malone):
I believe @nicole_pyland is here?
NP: Hi everyone, I’m here!
LesFic Book Club Host:
Hello! How are you?
NP: I’m good. Pausing the writing to chat with you guys. How is everyone?
Reader 1:
Hi from the UK, Nicole. Loved the book. Was Kenzie always going to be a neurodiverse character?
NP: She was, yes. From the start, I’d always planned on that.
Reader 1:
I think you captured her really well.
NP: Thank you. I appreciate that.
Reader 2:
Hey, y’all. I made it. Hahaha. Loved the book. It made me cry a bit.
Reader 3:
Thank you soooo much for doing this!!!!
NP: Of course, happy to be here.
Reader 1:
When you wrote the book, did you know there was also a prequel just waiting to be written? Which I've recently read.
NP: Not really, no. I wrote ATLS with the intention of it being a stand-alone book. Later, I kept thinking about Dani & Peyton and their story, and it became one of the books I had to write.
LesFic Book Club Host:
Dani and Peyton are such fully realized characters. I was surprised when I found out that their book was written second. Do you tend to dig deep into all of your characters like that while you’re figuring out the story?
NP: Yes, they literally all live in my head, and it’s confusing. My wife was worried at one point that I might say, “Hey, I’m off to have coffee with ___,” and it would be a character. Lol.
Reader 4:
I thought I’d missed something when I saw ATLS is now book 2. I read it before book 1 was released, I think.
Reader 5:
I've never heard of an autistic character referred to as graceful before. Most of the people I know on the spectrum (including myself) are more on the awkward and clumsy side of things. I’m curious as to where this originated. I don’t know everything there is to know about autism so I’m always looking to learn more.
NP: Kenzie felt like a graceful person to me, and it seemed like something that most people wouldn’t notice, but Lennox did, and that made it special.
Reader 4:
The gracefulness made sense, because my brain is constantly trying to optimize. As is my wife’s, and we’re both on the spectrum.
NP: I say this to my wife all the time, “Be more efficient with your movements.” Lol
Reader 4:
Hahahahahaha
NP: She’s glaring at me right now after having read that.
Reader 2:
When you wrote the book, what was the inspiration behind Lennox’s character?
NP: I didn’t have an overall inspiration for the character. I just wanted the right woman for Kenzie, and that’s where she came from.
Reader 2:
Character well done!
NP: Thank you.
Reader 5:
You did well writing all the parts regarding sensory overload.
NP: Thank you. I deal with these things myself, so I used a bit of my own experiences to describe them.
Reader 4:
So, are you also on the spectrum? Or adjacent?
NP: Asperger’s.
Reader 3:
You write with so much heart, and each character is filled with wonderful nuances and wit. How did you feel about opening yourself up and allowing yourself to write honestly? Because, all of it came through beautifully.
NP: I’m getting more used to it now, but it was hard in the beginning. I think fanfiction helped a lot here because I could post it, people could read it and tell me if they liked it; and since they usually did, I got my confidence to write original stuff.
LesFic Book Club Host:
How did you come up with the concept for adult summer camp? I loved that.
NP: It was just something that came to me, and I wrote it in my notes. And then, when I had the idea for Kenzie and the celebrity squad, it all came together.
Reader 6:
I took my granddaughter and friends to an all day concert, and there was an adult day care tent.  A/C, chargers, water, etc. Cool. Love the idea.
LesFic Book Club Host:
Nice. That sounds relaxing.
Reader 1:
I found it so interesting that you wrote someone who describes herself as awkward doing a job where everyone wants a piece of her. The tension of these opposing positions was so interesting to read.
NP: Yeah, I feel that in my day job myself a lot. So much of it is not my natural state and over the past decade or so, I’ve had to develop coping mechanisms and keep pushing myself when I’m put in situations I wouldn’t really like. It made sense to me that Kenzie would use acting in that regard.
Reader 4:
I don’t know how many people caught it, but I really liked that Kenzie didn’t know how to dance because she never had to learn for a role. There is so much summed up in that one sentence, that it stuck with me.
NP: I feel like it was something she and Lennox would both understand. It’s also the reality of being on the spectrum for a lot of us, which I’m sure you understand, @Reader 4.
Reader 4:
Yeah. And then Lennox not even questioning or pushing her was so good!
Reader 7:
Not so much a question, but: One of the things I liked about the book was the balance. For me, your book had a great balance of wish fulfillment (imagining falling in love with a celebrity crush) and… reality (in my case, there were scenes that reminded me of the early days of my relationship with my wife).
        """},
        {"role": "user", "content": """Using the provided book club meeting transcript, generate the following three outputs: Output 1: suggestions for a book for the follow-up meeting that explores similar themes but with a new perspective and three discussions questions for the next club meeting based on that book recommendation.
        Output 2: generate a blog post in the style of a book review that summarizes the participants opinions and arguments.

Format the outputs as follows:

Output 1: 

Book Recommendation: "Name of Book"

Discussion Questions: 
- Question 1: ""
- Question 2: ""
- Question 3: ""


Output 2: 

Title: ""
Authors: ""
Date: ""
Body: ""
"""},
]

beautyBookMessage=[
        {"role": "system", "content": """
        Do yoou know about the following book?
        All the Beauty in the world
        A fascinating, revelatory portrait of the Metropolitan Museum of Art and its treasures by a former New Yorker staffer who spent a decade as a museum guard.

Millions of people climb the grand marble staircase to visit the Metropolitan Museum of Art every year. But only a select few have unrestricted access to every nook and cranny. They’re the guards who roam unobtrusively in dark blue suits, keeping a watchful eye on the two million square foot treasure house. Caught up in his glamorous fledgling career at The New Yorker, Patrick Bringley never thought he’d be one of them. Then his older brother was diagnosed with fatal cancer and he found himself needing to escape the mundane clamor of daily life. So he quit The New Yorker and sought solace in the most beautiful place he knew.

To his surprise and the reader’s delight, this temporary refuge becomes Bringley’s home away from home for a decade. We follow him as he guards delicate treasures from Egypt to Rome, strolls the labyrinths beneath the galleries, wears out nine pairs of company shoes, and marvels at the beautiful works in his care. Bringley enters the museum as a ghost, silent and almost invisible, but soon finds his voice and his tribe: the artworks and their creators and the lively subculture of museum guards—a gorgeous mosaic of artists, musicians, blue-collar stalwarts, immigrants, cutups, and dreamers. As his bonds with his colleagues and the art grow, he comes to understand how fortunate he is to be walled off in this little world, and how much it resembles the best aspects of the larger world to which he gradually, gratefully returns.

In the tradition of classic workplace memoirs like Lab Girl and Working Stiff, All The Beauty in the World is a surprising, inspiring portrait of a great museum, its hidden treasures, and the people who make it tick, by one of its most intimate observers.
        """},
        {"role": "user", "content": """Using your accurate knowledge about the book, generate the following three outputs: Output 1: suggestions for a book for the follow-up meeting that explores similar themes but with a new perspective and three discussions questions for the next club meeting based on that book recommendation.

Format the outputs as follows:

Output 1: 

Book Recommendation: "Name of Book"

Discussion Questions: 
- Question 1: ""
- Question 2: ""
- Question 3: ""
"""},
]

communityBookMessage=[
        {"role": "system", "content": """
        Do yoou know about the following book?
        Community: The Awakening
"The greatest enemy of knowledge is not ignorance, Seren. It is the illusion of knowledge."

For centuries, famine and disease plagued the Earth making it uninhabitable. Now all that remains is Community, a massive bunker built to protect a select population from extinction. Sixteen-year-old Seren Quinn has spent her entire life within these walls, grateful to be part of it and to the Warren family who began it six generations ago.

But Seren's world turns upside down when she learns that her mother is mysteriously pregnant. Under Community's one child population control policy, her mother will be killed after giving birth.

Seren will do anything to save her mother including risk her own life. As Seren searches for a solution she learns Community is not what it seems. They are killing innocent people. A rebellion is stirring. And if that weren't enough, Seren is beginning to fall in love with the very boy she's supposed to hate.

If Seren is going to save her mother, she will have to make a fateful decision: liberation, or love?

"If you liked the Hunger Games, you'll love this dystopian novel. The Awakening will keep you hooked until the last page."
        """},
        {"role": "user", "content": """Using your accurate knowledge about the book, generate the following three outputs: Output 1: suggestions for a book for the follow-up meeting that explores similar themes but with a new perspective and three discussions questions for the next club meeting based on that book recommendation.

Format the outputs as follows:

Output 1: 

Book Recommendation: "Name of Book"

Discussion Questions: 
- Question 1: ""
- Question 2: ""
- Question 3: ""
"""},
]
if st.button('All Beauty in the World'):
    gptOut = gptResponse(beautyBookMessage)
    output1 = re.search(r"Output 1:(.*?)(Output 2:|Output 3:|$)", gptOut, re.DOTALL).group(1).strip()
    col1, = st.columns(1)
     # Display the extracted outputs in separate text areas in one row
    with col1:
        st.text_area("Discussion Questions: ", output1, 300)

if st.button('Community: An Awakening'):
    gptOut = gptResponse(communityBookMessage)
    output1 = re.search(r"Output 1:(.*?)(Output 2:|Output 3:|$)", gptOut, re.DOTALL).group(1).strip()
    col1, = st.columns(1)
     # Display the extracted outputs in separate text areas in one row
    with col1:
        st.text_area("Discussion Questions: ", output1, 300)

if st.button('Book Recommendation for future & Blog Post'):
    gptOut = gptResponse(messages)

    # Use regular expressions to find and extract each output
    output1 = re.search(r"Output 1:(.*?)(Output 2:|Output 3:|$)", gptOut, re.DOTALL).group(1).strip()
    output2 = re.search(r"Output 2:(.*?)(Output 1:|Output 3:|$)", gptOut, re.DOTALL).group(1).strip()

    # Create a layout with three columns
    col1, col2 = st.columns(2)



    # Display the extracted outputs in separate text areas in one row
    with col1:
        st.text_area("Discussion Questions: ", output1, 300)

    with col2:
        st.text_area("Blog Post", output2, 300)




