import { Node } from "slate"
import liblouis from "liblouis"
liblouis.enableOnDemandTableLoading();

export default function textToBraille(data) {
    return new Promise(async (resolve, reject) => {
        const plainText = await data.text.map(n => Node.string(n)).join('\n')
        if (data.language === 'English') {
            var brailleText = liblouis.translateString("tables/unicode.dis,tables/en-us-g1.ctb", plainText)
            resolve(brailleText)
        }
       else
       reject()
    })
}