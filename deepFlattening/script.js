//deepflatten array
let arr=[1,2,3,4,5,[1,2,3,4,[8,9,0]]]


function deepflatten(arr){
    let res=[]

    for(let ele of arr){

        if(Array.isArray(ele)){
            res.push(...deepflatten(ele))

        }
        else{
            res.push(ele)
        }

    }
    return res



}

console.log(deepflatten(arr))

//groupBy

function groupBy(arr){
    let obj={}
    for(let ele of arr){
        if(!obj[ele.type]){
            obj[ele.type]=[]
        }
        obj[ele.type].push(ele)
    }
    return obj
}
let grouped=groupBy([{ type: 'fruit', name: 'apple' }, { type: 'veg', name: 'carrot' }], 'type');
console.log(grouped)

//deepcloned
let obj={ type: 'fruit', name: 'apple' }
let obj1=obj
let obj2=JSON.parse(JSON.stringify(obj))

// console.log(obj==obj1)
// console.log(obj2==obj)
// console.log(obj2)

//polyfill for map
Array.prototype.polyfillMap = function(callback) {
    let result = [];

    for (let i = 0; i < this.length; i++) {

        if (this.hasOwnProperty(i)) {
            result.push(callback(this[i], i, this));
        }
    }

    return result;
}
///reduce polyfill
Array.prototype.polyfillReduce = function(callback, initialValue) {
    let accumulator = initialValue;
    let startIndex = 0;


    if (accumulator === undefined) {
        if (this.length === 0) {
            throw new TypeError("Reduce of empty array with no initial value");
        }
        accumulator = this[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < this.length; i++) {
        if (this.hasOwnProperty(i)) {
            accumulator = callback(accumulator, this[i], i, this);
        }
    }

    return accumulator;
};





















