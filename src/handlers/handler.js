const { default: axios } = require("axios");
const { Transforms, Editor } = require("slate");

module.exports = {
    newClick: (editor) => {

        Transforms.delete(editor, {
            at: {
                anchor: Editor.start(editor, []),
                focus: Editor.end(editor, []),
            },
        });
        var marks = Editor.marks(editor)
        if (marks) {
            marks = Object.keys(marks)
            //console.log(marks);
            marks.map((mark) => {
                editor.removeMark(mark)
            })
        }


    },
    downloadClick: (data) => {
        axios.post('/api/download', data).then((response) => {
            console.log(response);
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a link element to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'editor_content.txt');
            document.body.appendChild(link);
            link.click();

            // Clean up the temporary URL and link element
            URL.revokeObjectURL(url);
            document.body.removeChild(link);
        })
    },
    inputChange: (event, setSelectFile) => {
        setSelectFile(event.target.files[0])

    }
    ,
    fileSubmit: (editor, selectFile,setShowFileUpload) => {
        const formData = new FormData();
        console.log(selectFile);
        formData.append('file', selectFile, selectFile.name);
        console.log(formData);
        axios.post('/api/upload', formData).then((response)=>{
            console.log(response.data);
            module.exports.newClick(editor)
            editor.insertText(response.data)
            setShowFileUpload(false)

        })


    }
}

