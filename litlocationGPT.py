import os
from openai import OpenAI


def gptResponse(messages):
    client = OpenAI(
        api_key=os.getenv('OPENAI_API_KEY')
    )
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages
    )
    print(response)
    return response.choices[0].message.content

