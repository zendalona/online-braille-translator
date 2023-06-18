self.onmessage = (event) => {
    console.log("iam worker");
    var brailleText = event.data.brailleText
    var limit=event.data.lineLimit
    console.log(limit);
    var result = brailleText.split('')
    if (result.length > limit) {
        for (var i = limit; i < result.length; i =i+limit+1) {
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