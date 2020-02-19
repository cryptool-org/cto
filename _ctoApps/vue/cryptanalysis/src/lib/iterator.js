export function Iterator(array){
    var nextIndex = 0;

    return {
        next: function(){
            return nextIndex < array.length ? {value: array[nextIndex++], done: false} : {done: true};
        }
    }
}

export function IteratorFrom(array){
    var nextIndex = 0;
    var arr = Array.from(array);

    return {
        next: function(){
            return nextIndex < arr.length ? {value: arr[nextIndex++], done: false} : {done: true};
        }
    }
}