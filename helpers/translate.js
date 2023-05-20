const { PythonShell } = require('python-shell')

module.exports = {
  textToBraille: (data, callback) => {
    const pyshell = new PythonShell('python/textToBraille.py');

    const newData = JSON.stringify(data);
    //console.log(newData);
    pyshell.send(newData);
    pyshell.on('message', function (message) {
      // received a message sent from the Python script
      console.log("server");
      callback(message)
    });
    pyshell.end(function (err, code, signal) {
      if (err) throw err;
      console.log('The exit code was: ' + code);
      console.log('The exit signal was: ' + signal);
      console.log('finished');
    });
  }
}