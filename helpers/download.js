const path = require('path')
const fs=require('fs')
const { v4: uuidv4 } = require('uuid');
const { Node } = require('slate')
module.exports={
    downloadAction:(data,temp)=>{
        return new Promise((resolve,reject)=>{
            const fileName = uuidv4()+'.txt'
            console.log(fileName);
            const filePath = path.join(temp, fileName)
            console.log(filePath);
        
                
                var plainText = data.map(n => Node.string(n)).join('')
                fs.writeFile(filePath, plainText, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        resolve(filePath,fileName)
                    }
    
                })
    
    
    
    
    
    
            
            
        })
    }
}