const { default: axios } = require("axios");
const { Transforms, Editor, Node } = require("slate");

module.exports = {

    /* `newClick` is a function that takes an `editor` object as its parameter. It is used to clear the
    contents of the Slate editor and reset it to a default state. */
    newClick: (editor) => {
        /* `Transforms.removeNodes(editor)` is a function call that removes all the nodes from the
        Slate editor. It takes the `editor` object as its parameter and modifies it by removing all
        the nodes. */
        Transforms.removeNodes(editor)
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

