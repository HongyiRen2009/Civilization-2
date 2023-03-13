const tiles = [
    {
        type:"grass",
        image:false,
        color:"rgb(51, 166, 59)"
    },
    {
        type:"hill",
        image:false,
        color:"rgb(103, 104, 107)"
    },
    {
        type:"sand",
        image:false,
        color:"#ffe3a0"
    },
    {
        type:"river",
        image:false,
        color:"rgb(3,172,252)"
    },
    {
        type:"desert",
        image:false,
        color:"#FAD5A5",
    },
    {
        type:"jungle",
        image:false,
        color:"	#315527"
    }
]
function addTile(type,x,y,index=undefined){
    
    tilestats[tilecode(x,y)] = {index:tileindex[type]}
    if(grid[y].includes(x)){
        grid[y].splice(grid[y].indexOf(x),1)
    }
    if(index==undefined){
    grid[y].push(x)
    
    }
    else{
        
        grid[y].splice(index,0,x)
    }
}
function removetile(x,y){
    delete tilestats[tilecode(x,y)]
    
    grid[y].splice(grid[y].indexOf(x),1)
}
function exists(type,x,y){
    if(tilestats[tilecode(x,y)]==undefined){
        return false
    }
    
    if(tiles[tilestats[tilecode(x,y)].index].type==type&&grid[y].includes(x)){
        return true
    }
    return false
}
function tilecode(x,y){
    return x+"/"+y
}
for (let i=0,len=tiles.length;i<len;i++){
    tileindex[tiles[i].type]=i
}