const findindex = (array,id) =>{
    for(let i=0; i < array.length; i++){
        if(array[i].room_id == id){
            return i;
        }
    }
    return -1;
} 

export  {findindex}