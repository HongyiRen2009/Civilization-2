
function generateIsland(xpos,ypos,iheight, iwidth){
	let y = ypos
	let x= xpos
	let width=iwidth
	let height=iheight
	

	let maxx1 = x+width
	let minx1 = x-width
	let maxx2 = 0
	let minx2 = 0
	let maxx = x+width
	let minx = x-width
	let y2 = 0
	const rivery =[]
	for (i = y; i <y+height;i++){
		for (let j = minx; j<maxx;j++){
			
			if(!exists("grass",j,i)){
				addTile("grass",j,i)
			}
				
			
			
			
				
				
			
			}
		if(minx<minx1){
			minx1=minx
		}
		if(maxx>maxx1){
			maxx1=maxx
		}
		if(i==y+height-1){
			
			maxx2=maxx
			minx2=minx
			y2 = i
		}
			maxx+=getRandomInt(-2,2)
		minx+=getRandomInt(-2,2)
		
		
	}
	let miny1=0
	
	for(i=minx1;i<maxx1;i++){
		if(miny1>0){
			for (let j =0;j<miny1;j++){
				if(!exists("grass",i,y-j)){
					addTile("grass",i,y-j)
				}
			}
		}
		else if(miny1<0){
			
			for (let j =0;j<Math.abs(miny1);j++){
				if(exists("grass",i,y+j)){
					removetile(i,y+j)
				}
			}
		}
		
		rivery.push(miny1+y)
		miny1+=getRandomInt(-2,2)
		
	}
	
	let miny2=0
	for(i=minx2;i<maxx2;i++){
		if(miny2>0){
			for (let j =0;j<miny2;j++){
				if(!exists("grass",i,y2+j)){
					addTile("grass",i,y2+j)
				}
			
				
			}
		}
		else if(miny2<0){
			
			for (let j =0;j<Math.abs(miny2);j++){
	
				if(exists("grass",i,y2-j)){
					removetile(i,y2-j)
				}
			}
		}
		miny2+=getRandomInt(-2,2)
		
	}
	for (let j=0,rand=getRandomInt(Math.floor(width/32),Math.floor(width/64));j<rand;j++){
		generatelake(getRandomInt(x-Math.floor(width/2),x+Math.floor(width/3)),getRandomInt(y+20,y+height-20),getRandomInt(Math.floor(width/12),Math.floor(width/8)),getRandomInt(Math.floor(height/12),Math.floor(height/8)))
	}
	for (let j=0,rand=getRandomInt(Math.floor(width/32),Math.floor(width/64));j<rand;j++){
		generatehill(getRandomInt(x-Math.floor(width/2),x+Math.floor(width/3)),getRandomInt(y+20,y+height-20),getRandomInt(Math.floor(width/12),Math.floor(width/8)),getRandomInt(Math.floor(height/12),Math.floor(height/8)))
	}
	
	for (let j=0,rand=getRandomInt(Math.floor(width/32),Math.floor(width/64));j<rand;j++){
		const lakepos = getRandomInt(x-Math.floor(width/2),x+Math.floor(width/3))
		const rand = getRandomInt(0,rivery.length-1)
		generateriver(lakepos,rivery[rand],0,0,getRandomInt(4,6))
	}
}
function generatelake(xpos,ypos,iwidth,iheight){
	let y = ypos
	let x= xpos
	let width=iwidth
	let height=iheight
	

	let maxx1 = x+width
	let minx1 = x-width
	let maxx2 = 0
	let minx2 = 0
	let maxx = x+width
	let minx = x-width
	let y2 = 0
	const rivertiles = []
	let isocean=false
	for (i = y; i <y+height;i++){
		for (let j = minx; j<maxx;j++){
			
			addTile("river",j,i)
			rivertiles.push(tilecode(j,i))
			if(checkocean(j,i,true,1)){
					isocean=true
				}
				
			
				
						
						
				
				
			
			}
			
		if(i==y+height-1){
			
			maxx2=maxx
			minx2=minx
			y2 = i
		}
			maxx+=getRandomInt(-2,2)
		minx+=getRandomInt(-2,2)
		
		
	}
	let miny1=0
	for(let i=minx1;i<maxx1;i++){
		if(miny1>0){
			for (let j =0;j<miny1;j++){
				
				addTile("river",i,y-j)
				rivertiles.push(tilecode(i,y-j))
				if(checkocean(i,y-j,true,1)){
					isocean=true
				}
				
				
			}
		}
		else if(miny1<0){
			
			for (let j =0;j<Math.abs(miny1);j++){
				addTile("grass",i,y+j)
				rivertiles.splice(rivertiles.indexOf(tilecode(i,y+j)),1)
				
			}
		}
		miny1+=getRandomInt(-2,2)
		
	}
	
	let miny2=0
	for(let i=minx2;i<maxx2;i++){
		if(miny2>0){
			for (let j =0;j<miny2;j++){
				
				addTile("river",i,y2+j)
				rivertiles.push(tilecode(i,y2+j))
				if(checkocean(i,y2+j,true,1)){
					isocean=true
				}
				

				
			
				
			
				
			}
		}
		else if(miny2<0){
			
			for (let j =0;j<Math.abs(miny2);j++){
				addTile("grass",i,y2-j)
				rivertiles.splice(rivertiles.indexOf(tilecode(i,y2-j)),1)
				
			}
		}
		miny2+=getRandomInt(-2,2)
		
	}
	if(isocean){
		for (const tile of rivertiles){
			
			if(grid[parseInt(tile.slice(tile.indexOf("/")+1))].includes(parseInt(tile.substring(0,tile.indexOf("/"))))){
				removetile(parseInt(tile.substring(0,tile.indexOf("/"))),parseInt(tile.slice(tile.indexOf("/")+1)))
			}
		}
		
	}
}

function generatehill(xpos,ypos,iwidth,iheight){
	let y = ypos
	let x= xpos
	let width=iwidth
	let height=iheight
	

	let maxx1 = x+width
	let minx1 = x-width
	let maxx2 = 0
	let minx2 = 0
	let maxx = x+width
	let minx = x-width
	let y2 = 0
	for (i = y; i <y+height;i++){
		for (let j = minx; j<maxx;j++){
			
			if(exists("grass",j,i)){
				
				addTile("hill",j,i)
				
			}
				
						
						
				
				
			
			}
			
		if(i==y+height-1){
			
			maxx2=maxx
			minx2=minx
			y2 = i
		}
			maxx+=getRandomInt(-2,2)
		minx+=getRandomInt(-2,2)
		
		
	}
	let miny1=0
	for(i=minx1;i<maxx1;i++){
		if(miny1>0){
			for (let j =0;j<miny1;j++){
				if(!checkocean(i,y2+j,true,1)){
				addTile("hill",i,y-j)
				}
				
			}
		}
		else if(miny1<0){
			
			for (let j =0;j<Math.abs(miny1);j++){
				addTile("grass",i,y+j)

				
			}
		}
		miny1+=getRandomInt(-2,2)
		
	}
	
	let miny2=0
	for(i=minx2;i<maxx2;i++){
		if(miny2>0){
			for (let j =0;j<miny2;j++){
				addTile("hill",i,y2+j)
			
				
			}
		}
		else if(miny2<0){
			
			for (let j =0;j<Math.abs(miny2);j++){
				addTile("grass",i,y2-j)

				
			}
		}
		miny2+=getRandomInt(-2,2)
		
	}
}
function generateriver(xpos,ypos, curve, times = 0, width=2){
	let x = xpos
	let rivertimes = times
	let rivercurve = curve
	let rand = 0
	let oldx=xpos
	const bseed = getRandomInt(-10,10)
	const aseed = (Math.random()*4)-2
	for (let y = ypos;y<ypos+200;y++){
		oldx = x
		x=(0.5*Math.sin(0.5*aseed*y)+1.1*Math.sin(0.4*aseed*y-10)/3+1.2*Math.sin(0.3*aseed*y-bseed)/4)+x+(y*rivercurve)/100
		if (x-oldx>1){
			while(x-oldx>1){
				x-=0.1
			}
			
		}
		else if (x-oldx<-1){
			while(x-oldx<-1){
				x+=0.1
			}

		}
		if(rivertimes<5&&getRandomInt(0,100)==0){
			generateriver(x,y,rivercurve*-1,rivertimes,Math.max(2,width-1))
		}
		if(exists("river",Math.floor(x),y)&&y!=ypos||!exists("grass",Math.floor(x),y+5))
		{
			return
		}
		for(let k=0;k<width;k++){
		addTile("river",Math.floor(x+k),y)
		
		}
		
	}
}
