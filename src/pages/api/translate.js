import textToBraille from "@/helpers/textToBraille";

export default async function  handler(req, res) {
    //console.log(req.body);
    const brailleText = await textToBraille(req.body)


    res.status(200).json({ result: brailleText });
}