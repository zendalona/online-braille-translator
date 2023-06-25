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
        if (index.current == -1) {
            result.current = module.exports.searchWord(search, editor)
            if (result.current.length == 0) {
                setIsFound(false)
                return
            } else {
                setIsFound(true)
            }
        }
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
    undoClick: (editor) => {
        editor.undo()
    },
    redoClick: (editor) => {
        editor.redo()
    },
    translateClick: (textEditor, text, socket, setLoading, language) => {
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
        setFontColor(color.hex)
        console.log(color);
        Editor.addMark(editor, 'color', color.hex);

    },
    highlightChange: (color, setHighlight, editor) => {
        setHighlight(color.hex)
        Editor.addMark(editor, 'backgroundColor', color.hex);
    },
    fontSizeChange: (action, size, fontSize, setFontSize, editor) => {
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
    backgroundChange : (color,setBackground) => {
        setBackground(color.hex)
    
      }

}

