# Online Braille Translator





## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Translating Text to Braille](#translating-text-to-braille)
  - [Customizing the Interface](#customizing-the-interface)
  - [Setting Line Limits](#setting-line-limits)
  - [Direct Braille Typing](#direct-braille-typing)
- [Project Information](#project-information)

## Features

- **Multilingual Support**: Translator covers 40+ languages, even with unique Braille contractions.
- **Text Editing Tools**: Access standard text tools: cut, copy, paste, undo, redo, and a quick search for easy word changes.
- **Document Handling**: Create or open documents, and when done, download it.
- **Customise the interface for your comforts**: You can increase your reading comforts by adjusting font size and choosing text and background colors for your comfort.
- **Select and translate**: A particular portion of a file can be selected and translated.
- **Line limit**: Adjust Braille line length to your needs effortlessly.
- **Direct Braille Typing**: If you know Braille well, you can type it directly using just six keys on your keyboard.
- **Separate Tools**: You have separate tools for both regular text editing and Braille editing, all easily accessible at your fingertips.

## Getting Started

### Prerequisites

Before running the Online Braille Translator, make sure you have the following prerequisites installed:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- Python 


### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/zendalona/online-braille-translator.git
   ```

2. Navigate to the project directory:

   ```bash
   cd online-braille-translator
   ```

3. Install dependencies:

   ```bash
   npm install
   ```
4. To run the development server:
    ```bash
     npm run dev
    ```



   

6. Access the application in your web browser at `http://localhost:3000`.

## Usage

### Translating Text to Braille

1. Upon opening the application, you'll see two text areas: one for input and one for the translated Braille.

2. Choose the target language from the language combo-box.

3. Set the desired line length for Braille output to fit your preferences.

4. Type or paste the text you want to translate into the input area.

5. Click 'Translate,' and your text will be transformed into Braille in the second text box.

### Customizing the Interface

- You can customize the font style, color, and background to enhance readability and make your experience more comfortable.

### Setting Line Limits

- Use the spin button at the bottom of the Braille editor to set the desired number of lines for your Braille output. 

### Direct Braille Typing

For those who know Braille well, you can type it directly using just six keys on your keyboard.

Uses f,d,s,j,k,l keys for typing six braille dots.


## Project Information

- **Frontend**: Built using Next.js
- **Backend**: Built using Express.js
- **Translation Engine**: Liblouis
- **Data Transfer**: Socket.io is used to transfer data from the frontend to the backend.

For more details on the project setup, configuration, and development, please refer to the project's code and documentation.