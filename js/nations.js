class nation {
	constructor(x,y){
        this.population=0
        
		this.resources=getRandomInt(12,20)
		this.currentpop=getRandomInt(2,4)
		this.unemployed=this.currentpop
        this.military=this.unemployed
        this.m_personnel=this.unemployed
		this.food=0
		this.resourcesgained=0
		this.bordercolors = {r:getRandomInt(100,255),g:getRandomInt(100,255),b:getRandomInt(100,255)}
		this.gridstats=[]
		this.name = nationnames[getRandomInt(0,nationnames.length-1)]
        this.modifiers={
            food:0,
            resources:0,
            military:0,
            population:0
        }
		this.bordermaxes = {
			top:{},
			bottom:{},
			left:{},
			right:{},
		}
		this.cities = [{x:x,y:y}]
		this.spawn={x:x,y:y}
		this.drawpostion = {x:x,y:y}
		const context = this
		createbuilding(context,context.drawpostion.x,context.drawpostion.y,"Hut")
		window.setInterval(choosebuilding(context),1000)
	}

	
}

function calcNation(context){
    context.population = 0
    context.food = 0
    context.military = 0
    context.resourcesgained = 0
    context.m_personnel = 0
    context.unemployed = context.currentpop
  
   
    for (len = context.gridstats.length,i=0;i<len;i++){
        if(!context.gridstats[i].disabled){
        if (unemployed>=context.gridstats[i].employmentrequired){
            context.population += context.gridstats[i].population
        if(context.gridstats[i].fish&&turn){
            context.gridstats[i].food = getRandomInt(10,15)
        }
        context.food += context.gridstats[i].food
        context.military += context.gridstats[i].military
        context.resourcesgained += context.gridstats[i].resources
        if(context.gridstats[i].military>0){
            context.m_personnel+=context.gridstats[i].employmentrequired
        }
        context.unemployed -= context.gridstats[i].employmentrequired
        }
        else{
            context.gridstats[i].disabled = true
            switch(context.gridstats[i].index){
                case 11:
                    context.modifiers.military-=1
                case 19:
                    context.modifiers.food-=2
                    context.modifiers.resources-=2
            }
            
        }
        
    }
    }
    

    
    context.food += Math.ceil(context.food*(context.modifiers.food/10)*(1+weathermod))
    context.resourcesgained += Math.ceil(context.resourcesgained*(context.modifiers.resources/10))
    context.population += Math.ceil(context.population*context.modifiers.population/10)
    context.military += Math.ceil(context.military*(context.modifiers.military/10))


    
    context.unemployed = Math.max(context.unemployed,0)
    
    
    context.military+=context.unemployed
}
function choosebuilding(context){
	
	const direction = Object.keys(context.bordermaxes)[getRandomInt(0, Object.keys(context.bordermaxes).length-1)]
	const rand = Object.keys(context.bordermaxes[direction])[getRandomInt(0,Object.keys(context.bordermaxes[direction]).length-1)]
	switch(direction){
		case "top":
			context.drawpostion={x:parseInt(rand),y:context.bordermaxes[direction][rand]}
			break
			case "bottom":
				context.drawpostion={x:parseInt(rand),y:context.bordermaxes[direction][rand]}
			break
			case "left":
				context.drawpostion={x:parseInt(rand),y:context.bordermaxes[direction][rand]}
			break
			case "right":
				context.drawpostion={x:parseInt(rand),y:context.bordermaxes[direction][rand]}
			break	
	}
	debugger
	if(context.resourcesgained<context.food){
		createbuilding(context,context.drawpostion.x,context.drawpostion.y,"Small Mine")
	}
	else if(context.currentpop/context.population>1.1){
		createbuilding(context,context.drawpostion.x,context.drawpostion.y,"Hut")
	}
	else{
		createbuilding(context,context.drawpostion.x,context.drawpostion.y,"Small Farm")
	}
	
}
function createbuilding(context,x,y,type){
	const gridposition=[]
	const po_index = buildindices.indexOf(type)
	for (const poce of p.pieceROM[po_index].piecepositions){
		
		gridposition.push({x:x+poce.x,y:y+poce.y,img:poce.img})
		buildgrid[((y)+poce.y)].splice(0,0,x+poce.x)
		buildgrid[((y)+poce.y)].sort(function(a, b){return a - b})
		
		if (p.pieceROM[po_index].name == "Road" || p.pieceROM[po_index].name == "Bridge"||p.pieceROM[p_index].name == "Bonfire"||difficulty <10) {
			isInRange = true
			if(p.pieceROM[po_index].name == "Road"){
				p.pieceROM[po_index].effect()
				roadgrid[JSON.stringify({x:x,y:y})] = {x:0,y:0}
				recalcroads([JSON.stringify({x:x,y:y}),JSON.stringify({x:x+1,y:y}),JSON.stringify({x:x,y:y+1}),JSON.stringify({x:x,y:y-1}),JSON.stringify({x:x-1,y:y})])
				displayUI()
				render()
				allowed = false
				first_turn=false
				if (!p.pieceROM[po_index].requires()){
					piece.length = 0
					ispainting = false
				}
				return
				}
		}
		
		buildstats[tilecode(x+poce.x,y+poce.y)] = {img:poce.img,disabled:false,inrange:isInRange}
		
		if (!exists("hill",x+poce.x,y+poce.y)){
			p.entirehill = false
		}
		if (exists("hill",x+poce.x,y+poce.y)){
			p.hill = true
		}
        for(let i=-1;i<2;i++){
            for (let j=-1;j<2;j++){
            if(context.bordermaxes.top[x+poce.x+j]==undefined||context.bordermaxes.top[x+poce.x+j]>y+poce.y+i){
                context.bordermaxes.top[x+poce.x+j]=y+poce.y+i
                
            }
            if(context.bordermaxes.bottom[x+poce.x+j]==undefined||context.bordermaxes.bottom[x+poce.x+j]<y+poce.y+i){
                context.bordermaxes.bottom[x+poce.x+j]=y+poce.y+i
                
            }
            if(context.bordermaxes.left[y+poce.y+i]==undefined||context.bordermaxes.left[y+poce.y+i]>x+poce.x+j){
                context.bordermaxes.left[y+poce.y+i]=x+poce.x+j
            
            }
            
            if((context.bordermaxes.right[y+poce.y+i]==undefined||context.bordermaxes.right[y+poce.y+i]<x+poce.x+j)){
                context.bordermaxes.right[y+poce.y+i]=x+poce.x+j
                
            }
        }
    }
	}
	
	
	const oldresources = context.resources
	const oldpop=context.unemployed
	const ouroldpop = unemployed
		p.pieceROM[p_index].effect()
	context.unemployed-=ouroldpop-unemployed
		context.gridstats.push({
			index:p_index,
			letter:letter,
			population:p.population,
			employmentrequired: oldpop-context.unemployed,
			food:p.food,
			resources:p.resources,
			military:p.military,
			xp:p.xp,
			fish:p.fish,
			positions:gridposition.slice(0),
			resourcerefund: oldresources-context.resources,
			disabled: false,
		})
        calcNation(context)
		render()
}