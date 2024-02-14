import openai


def gptResponse(messages):
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=messages,
    api_key='{YOUR API KEY}'
    )
    print(response)
    return response['choices'][-1]['message']['content']
