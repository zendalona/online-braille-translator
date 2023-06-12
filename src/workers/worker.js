self.onmessage = (event) => {
    console.log("iam worker");
    var brailleText = event.data
    var result = brailleText.split('')
    if (result.length > 20) {
        for (var i = 20; i < result.length; i += 21) {
            result.splice(i, 0, '\n');
        }
    }
    result = result.join('')
    //console.log(result);
    var index = 0;
    var datas = []
    while (index < result.length) {
        datas.push(result.slice(index, index + 100000))
        index = index + 100000
    }
    console.log("worke finish");
    self.postMessage(datas);
}