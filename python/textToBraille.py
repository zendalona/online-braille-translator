import json
import louis


def translate(newData):

    brailleText = louis.translate(
        ['unicode.dis', newData['language']], newData['text'])
    print(brailleText[0])


# Execution entry point
if __name__ == "__main__":
    # Wait for a message to invoke the function
    data = input()
    newData = json.loads(data)
    translate(newData)
