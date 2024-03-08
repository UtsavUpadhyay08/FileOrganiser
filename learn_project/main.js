#!/usr/bin/env node
let inputArr=process.argv.slice(2);
let helpobj=require('./commands/help');
let organiseobj=require('./commands/organise');
let treeobj=require('./commands/tree')

let command=inputArr[0];
switch(command){
    case "help":
        helpobj.helpkey();
        break;
    case "organise":
        organiseobj.organisekey(inputArr[1]);
        break;
    case "tree":
        treeobj.treekey(inputArr[1]);
        break;
    default:
        console.log(`Please input write command
        To know more enter node filename help `);
        break;
}