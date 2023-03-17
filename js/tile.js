const tiles = [
    {
        type:"grass",
        image:false,
        color:"rgb(51, 166, 59)",
		r:51,
		g:166,
		b:59
    },
    {
        type:"hill",
        image:false,
        color:"rgb(103, 104, 107)",
		r:103,
		g:104,
		b:107
    },
    {
        type:"sand",
        image:false,
        color:"rgb(255, 227, 160)",
		r:255,
		g:227,
		b:160
    },
    {
        type:"river",
        image:false,
        color:"rgb(3,172,252)",
		r:3,
		g:172,
		b:252
    },
    {
        type:"desert",
        image:false,
        color:"rgb(250, 213, 165)",
		r:241,
		g:190,
		b:108
	},
    {
        type:"jungle",
        image:false,
        color:"rgb(49, 85, 39)",
		r:49,
		g:85,
		b:39
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
    if(typeof type == "number"){
    if(tiles[tilestats[tilecode(x,y)].index].type==type&&grid[y].includes(x)){
        return true
    }
	}
	else{
		if(type.includes(tiles[tilestats[tilecode(x,y)].index].type)&&grid[y].includes(x)){
			return true
		}
	}
    return false
}
function tilecode(x,y){
    return x+"/"+y
}
for (let i=0,len=tiles.length;i<len;i++){
    tileindex[tiles[i].type]=i
}
