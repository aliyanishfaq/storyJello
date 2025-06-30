import anthropic


def gptResponse(messages):
    client = anthropic.Anthropic(
        api_key='{YOUR API KEY}'
    )
    response = client.messages.create(
        model="claude-3-sonnet-20240229",
        messages=messages,
        max_tokens=1000
    )
    print(response)
    return response.content[0].text

