const f = function(){
    let ob = {};
    return function(fn){
        let name1 = fn.name;
        if(!ob[name1]) ob[name1] = {};
        return function(...args){
            args.sort();
            console.log(ob);
            let key = args.join('');
            if(key in ob[name1]) return ob[name1][key];
            else return ob[name1][key]=(fn(...args));
        }
    }
}
let glob1=0,glob2=0;
let sum=(a,b)=>{
    glob1++;
    return a+b;
};
let mul=(a,b)=>{
    glob2++;
    return a*b;
};
let instance=f();
console.log(instance(sum)(3,1));
console.log(instance(sum)(1,3));
console.log(instance(sum)(3,1));

console.log(glob1);
console.log(instance(mul)(3,1));
console.log(instance(mul)(1,3));
console.log(instance(mul)(3,1));
console.log(glob2);