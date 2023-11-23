import openai


def gptResponse(messages):
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=messages,
    api_key='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'
    )
    print(response)
    return response['choices'][-1]['message']['content']