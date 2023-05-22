const { Transforms, Editor } = require("slate");

module.exports={
    newClick:(editor)=>{
        
        Transforms.delete(editor, {
            at: {
              anchor: Editor.start(editor, []),
              focus: Editor.end(editor, []),
            },
          });
          const marks=Object.keys(Editor.marks(editor))
          //console.log(marks);
          marks.map((mark)=>{
            editor.removeMark(mark)
          })
          
    }
}