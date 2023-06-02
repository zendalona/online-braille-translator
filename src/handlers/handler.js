const { default: axios } = require("axios");
const { Transforms, Editor, Node } = require("slate");

module.exports = {
   /* `newClick` is a function that takes an `editor` object as its parameter. It is used to clear the
   contents of the editor and remove any formatting marks that may have been applied to the text. */
    newClick: (editor) => {

        /* `Transforms.delete(editor, { at: { anchor: Editor.start(editor, []), focus:
        Editor.end(editor, []), }, });` is deleting the entire contents of the Slate editor by
        selecting the range from the start of the editor to the end of the editor and deleting it.
        The `Transforms.delete()` method is used to delete a range of content in the editor. The
        `at` property specifies the range to delete, which is defined by the `anchor` and `focus`
        properties. In this case, `Editor.start(editor, [])` returns the start position of the
        editor, and `Editor.end(editor, [])` returns the end position of the editor. */
        Transforms.delete(editor, {
            at: {
                anchor: Editor.start(editor, []),
                focus: Editor.end(editor, []),
            },
        });
        /* This code is checking if there are any formatting marks applied to the text in the Slate
        editor. If there are, it retrieves the list of marks using `Editor.marks(editor)` and
        converts it to an array of keys using `Object.keys(marks)`. Then, it iterates over the array
        of mark keys using `marks.map()` and removes each mark from the editor using
        `editor.removeMark(mark)`. This ensures that any formatting applied to the text is removed
        before performing any other actions on the editor. */
        var marks = Editor.marks(editor)
        if (marks) {
            marks = Object.keys(marks)
            //console.log(marks);
            marks.map((mark) => {
                editor.removeMark(mark)
            })
        }


    },
    /* `downloadClick` is a function that takes an array of Slate nodes as its parameter (`data`). It
    converts the array of nodes to plain text by mapping over each node and using `Node.string(n)`
    to get the string value of the node. The resulting array of strings is then joined together
    using `.join('')` to create a single string of plain text. */
    downloadClick: (data) => {
        var plainText = data.map(n => Node.string(n)).join('')
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


    }
}

