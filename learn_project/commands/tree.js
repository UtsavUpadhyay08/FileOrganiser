let fs=require('fs');
let path=require('path');

function tree(dirPath){
    if(dirPath==undefined){
        tree(process.cwd());
        return;
    }
    else{
        if(fs.existsSync(dirPath)){
            treefun(dirPath,"");
        }
        else{
            console.log("Please enter correct path");
            return;
        }
    }
}

function treefun(dirPath,indent){
    let isfile=fs.lstatSync(dirPath).isFile();
    if(isfile){
        console.log(indent+"├──"+path.basename(dirPath));
    }
    else{
        let childArr=fs.readdirSync(dirPath);
        console.log(indent+"└──"+path.basename(dirPath));
        for(let i=0;i<childArr.length;i++){
            let childpath=path.join(dirPath,childArr[i]);
            treefun(childpath,indent+"\t");
        }
    }
}

module.exports={
    treekey:tree
}