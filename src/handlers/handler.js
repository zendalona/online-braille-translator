/*  Braille-Translator

    Copyright (C) 2022-2023 Jithesh M <jitheshmjithooz@gmail.com>
    
    V T Bhattathiripad College, Sreekrishnapuram, Kerala, India

    This project supervised by Zendalona(2022-2023) 

    Project Home Page : www.zendalona.com/braille-translator

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.*/




const { default: axios } = require("axios");
const { Transforms, Editor, Node, Range } = require("slate");
const { ReactEditor } = require("slate-react");

module.exports = {

    /* `newClick` is a function that takes an `editor` object as its parameter. It is used to clear the
    contents of the Slate editor and reset it to a default state. */
    newClick: (editor) => {

        /* `Transforms.removeNodes(editor, ...)` is a function call that removes nodes from the Slate
        editor. In this case, it is removing all nodes within the editor by specifying a range that
        starts at the beginning of the editor (`Editor.start(editor, [])`) and ends at the end of
        the editor (`Editor.end(editor, [])`). The `anchor` and `focus` properties of the `at`
        object specify the start and end points of the range, respectively. By passing this range to
        `Transforms.removeNodes()`, all nodes within the editor are removed. */
        Transforms.removeNodes(editor, {
            at: {
                anchor: Editor.start(editor, []),
                focus: Editor.end(editor, []),
            },
        })


        const resetValue = [
            {
                type: 'paragraph',
                children: [{ text: "", color: '#000000', fontSize: 16 }],
            },
        ];
        /* `Transforms.insertNodes(editor, resetValue)` is a function call that inserts a new set of
        nodes into the Slate editor. It takes the `editor` object as its first parameter and the
        `resetValue` array as its second parameter. The `resetValue` array contains a single node
        object that represents a paragraph with an empty text string and default formatting
        properties. This function call is used in the `newClick` function to reset the contents of
        the Slate editor to a default state. */
        Transforms.insertNodes(editor, resetValue);




    },



    /* The `downloadClick` function is creating a downloadable file from the contents of the Slate
    editor. It takes the `data` parameter, which is an array of nodes representing the contents of
    the editor. The function first converts the nodes to plain text using the `Node.string()` method
    and joins them with newline characters. It then creates a Blob object containing the plain text
    content and creates a URL object that points to the Blob. This URL is used to create a link
    element with a `download` attribute set to "editor_content.txt", which triggers the download of
    the file when clicked. Finally, the temporary URL and link element are cleaned up using
    `URL.revokeObjectURL()` and `document.body.removeChild()`. */
    downloadClick: (data) => {
        //console.log(data);
        var plainText = data.map(n => Node.string(n)).join('\n')
        console.log(plainText);
        /* This line of code is creating a URL object that represents the plain text content of the
        Slate editor. It does this by creating a new Blob object that contains the plain text
        content of the editor, and then creating a URL object that points to the Blob object. The
        resulting URL can be used to download the plain text content of the editor as a file. */
        const url = window.URL.createObjectURL(new Blob([plainText], { type: 'text/plain' }));

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'editor_content.txt');
        document.body.appendChild(link);
        link.click();

        // Clean up the temporary URL and link element
        URL.revokeObjectURL(url);
        document.body.removeChild(link);

    },



    /* `inputChange` is a function that takes an `event` object and a `setSelectFile` function as its
    parameters. It is used to handle changes to a file input element in the user interface. */
    inputChange: (event, setSelectFile) => {
        setSelectFile(event.target.files[0])

    }
    ,


    /* `fileSubmit` is a function that takes three parameters: `editor`, `selectFile`, and
    `setShowFileUpload`. It is used to handle the submission of a file uploaded by the user. */
    fileSubmit: (editor, selectFile, setShowFileUpload) => {
        /* This code is creating a new `FormData` object, which is a built-in JavaScript object that
        allows you to easily construct and send HTTP requests with form data. */
        const formData = new FormData();
        console.log(selectFile);
        formData.append('file', selectFile, selectFile.name);
        console.log(formData);

        /* This code is sending a POST request to the '/api/upload' endpoint with the `formData` object
        as its payload. Once the request is successful, the response data (which is the text content
        of the uploaded file) is inserted into the Slate editor using the `editor.insertText()`
        method. The `module.exports.newClick(editor)` line is calling the `newClick()` function from
        the same module to clear the editor's contents and remove any formatting marks before
        inserting the new text. Finally, `setShowFileUpload(false)` is used to hide the file upload
        UI element. */
        axios.post('/api/upload', formData).then((response) => {
            //console.log(response.data);
            module.exports.newClick(editor)
            /* `editor.insertText(response.data)` is inserting the text content of the uploaded file
            into the Slate editor. The `response.data` is the text content of the uploaded file,
            which is being inserted into the editor using the `insertText()` method of the `editor`
            object. */
            editor.insertText(response.data)
            setShowFileUpload(false)

        })


    },



    /* The below code is a JavaScript function that searches for a given word in the text content of a
    Slate.js editor. It uses the `Editor.nodes` method to iterate over all the nodes in the editor
    and checks if the node has a `text` property. If it does, it searches for the given word using a
    regular expression with the `matchAll` method and pushes the results (path, start index, and
    length of the match) to an array called `found`. Finally, it returns the `found` array. */
    searchWord: (word, editor) => {
        const found = []
        for (const [node, path] of Editor.nodes(editor, { at: { anchor: Editor.start(editor, []), focus: Editor.end(editor, []) } })) {
            if (node.hasOwnProperty('text')) {
                let text = node.text

                let matches = text.matchAll(new RegExp(word, 'gi'))
                matches = Array.from(matches)
                matches.map((match) => { found.push({ path: path, start: match.index, length: word.length }) })
            }
        }
        //console.log(found);
        return found

    },


    findEnter: (event, index, result, search, setIsFound, editor) => {

        /* It is checking if the key pressed is the "Enter" key. If it is, it prevents the
        default behavior of the event and searches for a word in the editor using the `searchWord`
        function from a module. If the word is found, it sets a state variable `isFound` to true and
        selects the first occurrence of the word in the editor. If the word is not found, it sets
        `isFound` to false. */
        if (event.code === 'Enter') {
            event.preventDefault()
            result.current = module.exports.searchWord(search, editor)
            if (result.current.length == 0) {
                setIsFound(false)
                return
            } else {
                setIsFound(true)
            }
            index.current = 0

            if (result.current.length > 0) {
                console.log(editor);
                index.current = 0
                Transforms.select(editor, {
                    anchor: { path: result.current[0].path, offset: result.current[0].start },
                    focus: { path: result.current[0].path, offset: result.current[0].start + result.current[0].length },
                })
                ReactEditor.focus(editor);
            }

        }
    },



    findNext: (index, result, search, setIsFound, editor) => {
        /* The below code is checking if the current index is -1. If it is, it searches for a word in
        the editor using the searchWord function from the module.exports object. If the search
        result is empty, it sets the state variable setIsFound to false. Otherwise, it sets
        setIsFound to true. */
        if (index.current == -1) {
            result.current = module.exports.searchWord(search, editor)
            if (result.current.length == 0) {
                setIsFound(false)
                return
            } else {
                setIsFound(true)
            }
        }
        /* The below code is incrementing the index of a result array and selecting a specific range of
        text in a Slate.js editor based on the updated index. If the index exceeds the length of the
        result array, it resets the index to 0. Finally, it sets the focus on the editor. */
        index.current = index.current + 1
        if (index.current >= result.current.length) {
            index.current = 0
        }
        Transforms.select(editor, {
            anchor: { path: result.current[index.current].path, offset: result.current[index.current].start },
            focus: { path: result.current[index.current].path, offset: result.current[index.current].start + result.current[index.current].length },
        })
        ReactEditor.focus(editor);


    },



    findPrev: (index, result, search, setIsFound, editor) => {
        /* The below code is checking if the current index is equal to -1. If it is, it searches for a
        word in an editor using a function called `searchWord` from a module and sets a state
        variable `isFound` to true if the search result is not empty. It also sets the current index
        to 0. If the current index is not -1, it decrements the current index by 1. */
        if (index.current == -1) {
            result.current = module.exports.searchWord(search, editor)
            if (result.current.length == 0) {
                setIsFound(false)
                return
            } else {
                setIsFound(true)
            }
            index.current = 0
        } else {
            index.current = index.current - 1
        }

        /* The below code is selecting a specific range of text in a Slate.js editor based on the
        current index. If the current index is less than 0, it sets the index to the last item in the
        result array. Then, it uses the Transforms.select() method to select the text range based on
        the path, start, and length properties of the current item in the result array. Finally, it
        focuses the editor on the selected text range using ReactEditor.focus(). */
        if (index.current < 0) {
            index.current = result.current.length - 1
        }
        Transforms.select(editor, {
            anchor: { path: result.current[index.current].path, offset: result.current[index.current].start },
            focus: { path: result.current[index.current].path, offset: result.current[index.current].start + result.current[index.current].length },
        })
        ReactEditor.focus(editor);


    },



    wordReplace: (index, result, replace, setIsFound, editor) => {
        /* The below code is checking if the current index is equal to -1. If it is, it sets the value
        of isFound to false. If the current index is not equal to -1, it uses the
        Transforms.insertText method to replace the text in the editor with the specified text. It
        then sets the focus on the editor, resets the index and result values, and clears the search
        results. */
        if (index.current == -1) {
            setIsFound(false)
        } else {
            Transforms.insertText(editor, replace, {
                at: {
                    anchor: { path: result.current[index.current].path, offset: result.current[index.current].start },
                    focus: { path: result.current[index.current].path, offset: result.current[index.current].start + result.current[index.current].length }
                },
            })
            ReactEditor.focus(editor);
            index.current = -1
            result.current = []
        }

    },



    replaceAll: (index, result, replace, setIsFound, editor, search) => {
        /* The below code is  that replaces all occurrences of a search string in a
        text editor with a specified replacement string. It uses the `Transforms.insertText` method
        to insert the replacement string at the location of each occurrence of the search string. The
        function takes in several parameters, including the current index of the search string, an
        array of search results, the search string itself, a state variable to indicate whether any
        matches were found, and the editor object. It loops through the array of search results and
        inserts the replacement string at each location, updating the index and result arrays as it
        goes */
        if (index.current == -1) {
            setIsFound(false)
        } else {
            let i = 1;
            let len = result.current.length
            while (1) {
                Transforms.insertText(editor, replace, {
                    at: {
                        anchor: { path: result.current[0].path, offset: result.current[0].start },
                        focus: { path: result.current[0].path, offset: result.current[0].start + result.current[0].length }
                    },
                })
                index.current = -1
                if (i < len) {
                    module.exports.findNext(index, result, search, setIsFound, editor)
                    i = i + 1
                } else {
                    break;
                }
            }
            result.current = []

        }

    },


    /* The below code is defining a function called `undoClick` that takes an `editor` parameter. When
    this function is called, it will call the `undo()` method on the `editor` object, which will undo
    the last action performed in the editor. */
    undoClick: (editor) => {
        editor.undo()
    },


    /* The below code is defining a function called `redoClick` that takes an `editor` parameter. When
    this function is called, it will call the `redo()` method on the `editor` object, which will
    redo the last undone action in the editor. */
    redoClick: (editor) => {
        editor.redo()
    },


    translateClick: (textEditor, text, socket, setLoading, language) => {
        /* The below code is a JavaScript code that checks if there is a selection in a text editor. If
        there is a selection, it gets the plain text of the selected text. If there is no selection,
        it gets the plain text of the entire text. Then it emits a socket event with the plain text
        and the selected language to be translated. Finally, it sets the loading state to true. */
        const { selection } = textEditor
        //console.log(selection);
        const check = Range.isCollapsed(selection);
        console.log(check);

        if (check) {
            var plainText = text.map(n => Node.string(n)).join('')
            console.log(plainText);
        }
        else {
            var plainText = Editor.string(textEditor, selection)
            console.log(plainText);
        }


        socket.emit('translate', { text: plainText, language: language }, () => {
            setLoading(true)
        })
    },


    fontColorChange: (color, setFontColor, editor) => {
        /* The below code is written in JavaScript and it is setting the font color of some text to the
        hexadecimal value of the `color` variable.  Additionally, it is adding a mark to the editor with the name 'color' and the value
        of the `color` variable. */
        setFontColor(color.hex)
        //console.log(color);

        Editor.addMark(editor, 'color', color.hex);

    },



    highlightChange: (color, setHighlight, editor) => {
        /* The below code is likely a part of a JavaScript function that sets the highlight color of a
        text editor. It takes a color value in hexadecimal format as an argument and adds a
        background color mark to the editor using that color value. */
        setHighlight(color.hex)
        Editor.addMark(editor, 'backgroundColor', color.hex);
    },



    fontSizeChange: (action, size, fontSize, setFontSize, editor) => {
        /* It is a JavaScript function that takes an action and a font size as input
        parameters. If the action is "increase", it increases the font size by 1 and adds a
        "fontSize" mark to the editor. If the action is "decrease", it decreases the font size by 1
        and adds a "fontSize" mark to the editor. If the action is neither "increase" nor
        "decrease", it sets the font size to the input size and adds a "fontSize" mark to the
        editor. The function uses the Editor.addMark method to add the "fontSize" mark */
        if (action === "increase") {
            if (fontSize < 50) {
                setFontSize((previous) => previous + 1)
                Editor.addMark(editor, 'fontSize', fontSize + 1);
            }
        } else if (action === "decrease") {
            if (fontSize > 10) {
                setFontSize((previous) => previous - 1)
                Editor.addMark(editor, 'fontSize', fontSize - 1);
            }
        } else {
            size = Number(size)



            setFontSize(size)

            Editor.addMark(editor, 'fontSize', size);


        }

    },



    /* The below code is a JavaScript function that takes two parameters: `color` and `setBackground`.
    It sets the background color of an element to the hexadecimal value of the `color` parameter.
    The `color` parameter is an object that contains the hexadecimal value of the selected color.
    The `setBackground` parameter is a function that sets the background color of an element. */
    backgroundChange: (color, setBackground) => {
        setBackground(color.hex)

    }

}

