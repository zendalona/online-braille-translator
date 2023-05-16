const { Node }=require("slate")
const liblouis=require('liblouis');
liblouis.enableOnDemandTableLoading();

module.exports={
    textToBraille: (data)=>{
        return new Promise((resolve, reject) => {
            const plainText = data.text.map(n => Node.string(n)).join('\n')
            if (data.language === 'English') {
                var brailleText = liblouis.translateString("tables/unicode.dis,tables/en-us-g1.ctb", plainText)
                resolve(brailleText)
            }
           else
           reject()
        })
    }
}