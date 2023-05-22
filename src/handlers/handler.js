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


    }
}