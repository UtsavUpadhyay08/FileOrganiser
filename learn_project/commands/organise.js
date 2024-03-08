let fs=require('fs');
let path=require('path');
let utility=require('../utility').utilitykey;

function organise(dirPath){
    if(dirPath==undefined){
        organise(process.cwd());
        return;
    }
    else{
        let doesExist=fs.existsSync(dirPath);
        if(doesExist){
            let base=path.dirname(dirPath);
            let name=(path.basename(dirPath))+"_org";
            let destPath=path.join(base,name);
            if(!fs.existsSync(destPath)){
                fs.mkdirSync(destPath);
            }
            organiser(dirPath,destPath);
        }
        else{
            console.log("Please enter the correct path");
            return;
        }
    }
}
function organiser(src,dest){
    let childArr=fs.readdirSync(src);
    for(let i=0;i<childArr.length;i++){
        let childpath=path.join(src,childArr[i]);
        if(fs.lstatSync(childpath).isFile()){
            let type=gettype(childpath);
            let new_dir=path.join(dest,type);
            if(!fs.existsSync(new_dir)){
                fs.mkdirSync(new_dir);
            }
            sendFile(childpath,new_dir);
        }
        else{
            organise(childpath);
        }
    }
}
function sendFile(childpath,new_dir){
    let name=path.basename(childpath);
    name=path.join(new_dir,name);
    console.log(name);
    fs.copyFileSync(childpath,name);
    fs.unlinkSync(childpath);
    console.log("File name ",path.basename(childpath)," copied to ",path.basename(new_dir));
}
function gettype(childpath){
    let ext=path.extname(childpath).slice(1);
    for(type in utility.types){
        if(utility.types[type].includes(ext)){
            return type;
        }
    }
    utility.types["others"].push(ext);
    return "others";
}

module.exports={
    organisekey:organise
};