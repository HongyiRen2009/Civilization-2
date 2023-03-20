<!DOCTYPE html>
<head>
<link rel="stylesheet" href="style.css">
<title>Dawn</title>
<link rel='shortcut icon' href='images/favicon.ico' type='image/x-icon' />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Start google font -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link  rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css">

<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet">
<!-- End google font -->
</head>
<body>
	<img src = "images/mainMenu.png" class = "bgimg" id = "bgimg"></img>
<div id="stats">
	<button title="make sure to save!" class = "next_turn" onclick = "pause_menu()">ESC</button>
	<div title="how many total population you have out of your total housing. If the second number is red it means you do not have enough homes to house all of your citizens."id = "pop" class = "pop">Population: 0/0</div>

	<div title="how much food you currently have, if red you do not have enough to feed everyone." id = "food">Food: 0</div>
	<div title="how much military power you have." id = "power">Military: 0</div>
		<div title="how many people are not currently occupied." id = "unemployed" class = "pop">Unemployed People: 0</div>
		<div title="how many total resources you have." id = "resources" class = "pop">Resources: 10</div>
	<button title="click to end your turn!" class = "next_turn" id = "turn" onclick = "next_turn()">End Year</button>
	<button title="click to enter the market!" id = "mbutton" class = "info" onclick = "marketscreen()">Market</button>
	<button title="click to enter the save menu!" class = "next_turn" onclick = "savescreen(true)">SAVE</button>
	<button title="click to view your achievements!" class = "info" onclick = "achievementscreen(false)">Achievements</button>
	<button title="click to view and unlock things in the tech tree!" id = "techbutton" class = "info" onclick = "techscreen()">Tech</button>
	<button title="click to get help" class = "info" onclick = "info()">Help</button>

	


		
</div>

<div id = "market-flex">
	<div id ="market-top-bar">
		<h1 class = "title_screen">Market</h1>
	</div>
	<div id="resources-container">
		<p id = "mresource">Resources: </p>
		<p id = "mreputation">Reputation: </p>
	</div>
	<div class = "market-ui" id = "market"></div>
	<h1 id = 'status' class="status">PURCHASE SUCCESSFUL</h1>
	<h1 class = "title_screen">Black Market</h1>
	<div class = "market-ui" id  = "black-market"></div>
</div>
<h1 class = "title_screen" id = "title_start">Dawn of Civilization</h1>
<div id = "info" style="flex-direction: column;display: none;">
<h1 style="text-align: center;">Stats Info</h1>
<div id = "stat-info"></div>
<h1 style="text-align: center;">Building Info</h1>
<div id ="info-flex" class = 'info-flex'></div>
</div>
<div id ="achievement-flex" class =  'achievement-flex'>
<h1 id="achievement-title">Achievements</h1>
<div id="achievements-container"></div>
</div>



<div class = "start-box" id = "start-flex">
	<button id = "start" class = "start_button" onclick = "difficultyscreen()">New Game</button>
	<button id = "start" class = "start_button" onclick = "savescreen(false)">Load Game</button>
	<button id = "start" class = "start_button" onclick = "settings()">Settings</button>
	<button id = "start" class = "start_button" onclick = "achievementscreen(true)">Achievements</button>

</div>
<div class = "save-flex" id = 'save-flex'>
	<div class = "save-grid" id = "save-grid1">
		<h1>Save Slot 1:</h1>
		<div class = "savedes1"> Empty Slot</div>
		<button id = "1" class = "save_button" onclick = "savegame(1)">Save Game</button>
		<button id = "clear1" class = "clear_button" onclick = "confirmclear(1)">Clear Save</button>
	 </div>
	 <div class = "save-grid" id = "save-grid2">
		<h1>Save Slot 2:</h1>
		<div class = "savedes2"> Empty Slot</div>
		<button id = "2" class = "save_button" onclick = "savegame(2)">Save Game</button>
		<button id = "clear2" class = "clear_button" onclick = "confirmclear(2)">Clear Save</button>
	 </div>
	 <div class = "save-grid" id = "save-grid3">
		<h1>Save Slot 3:</h1>
		<div class = "savedes3"> Empty Slot</div>
		<button id = "3" class = "save_button" onclick = "savegame(3)">Save Game</button>
		<button id = "clear3" class = "clear_button" onclick = "confirmclear(3)">Clear Save</button>
	 </div>
	 <div class = "save-grid" id = "save-grid4">
		<h1>Save Slot 4:</h1>
		<div class = "savedes4"> Empty Slot</div>
		<button id = "4" class = "save_button" onclick = "savegame(4)">Save Game</button>
		<button id = "clear4" class = "clear_button" onclick = "confirmclear(4)">Clear Save</button>
	 </div>
	 <div class = "save-grid" id = "save-grid5">
		<h1>Save Slot 5:</h1>
		<div class = "savedes5"> Empty Slot</div>
		<button id = "5" class = "save_button" onclick = "savegame(5)">Save Game</button>
		<button id = "clear5" class = "clear_button" onclick = "confirmclear(5)">Clear Save</button>
	 </div>
 </div>
 <div class = "achievement-unlocked" id = "unlocked">
 <p id="achievement-title">Achievement Unlocked:</p>
 <p id = "achievementname"></p>
 </div>
 <div class = "difficulty-flex" id = 'difficulty-flex'>
 	<div class = "save-grid" id = "save-grid1">
		<h1 class = 'color-g'>Copper</h1>
		<p>Favorable events happen more frequently</p>
		<p>Rebellions happen less frequently</p>
		<p>+30% production</p>
		<p>-0.3% enemy strength</p>
		<button id = "1.2" class = "new_button" onclick = "newgame(1.2)">New Game</button>
	 </div>
	 <div class = "save-grid" id = "save-grid2">
		<h1 class = 'color-y'>Iron</h1>
		<p>Favorable events have same frequency as unfavorable events</p>
		<p>Rebellions happen at normal frequency</p>
		<p>Normal production</p>
		<p>Normal enemy strength</p>
		<button id = "2" class = "new_button" onclick = "newgame(1.5)">New Game</button>
	 </div>
	 <div class = "save-grid" id = "save-grid3">
		<h1 class = 'color-r'>Diamond</h1>
		<p>Unfavorable events happen more frequently</p>
		<p>Rebellions happen more frequently</p>
		<p>-30% production</p>
		<p>+1.3% enemy strength</p>
		<button id = "3" class = "new_button" onclick = "newgame(1.8)">New Game</button>
	 </div>
	 <div class = "save-grid" id = "save-grid3">
		<h1 style = "animation: eternity 4s ease-out 0s infinite;">Eternity</h1>
		<p>Unfavorable events happen very frequently</p>
		<p>Rebellions happen very frequently</p>
		<p>-50% production</p>
		<p>+1.5% enemy strength</p>
		<button id = "4" class = "new_button" onclick = "newgame(2)">New Game</button>
	 </div>
 </div>

 <button class = "back_button" id = "back_button" hidden>Back</button>
<canvas id="canvas" width="1500" height="500"></canvas>
<canvas id="canvas2" width="1500" height="500"></canvas>
<canvas id="canvas3" width="5000" height="5000" style = "position:absolute;display:none;"></canvas>

<div class="select-grid" id="select-grid" hidden = true>
<button class = 'cancel' id = "cancel" onclick = "cancel()">Cancel</button>
<button class = 'cancel' id = "remove" onclick = "isremoving()">Remove</button>
<button class = 'cancel' id = "repair" onclick = "isrepairing()">Repair</button>
<select id="taboption" onchange="switchtab()">



</select>
<p id = "year_label">Year: 0</p>
<label id = "xp_flex">Wisdom:</label>
<div id="xp_bar_container">
<div id="xp_bar" ></div>
<p id = "xp_text">xp: 0/100</p>
</div>
</div>

<div id = "boss_health_container" class = "bhealth">
<div id = "boss_health" class = "bhealth"></div>
<div id = "boss_healthg"></div>
<p id = "boss_health_text">Boss: 1000/1100</p>
</div>
<div id = "tech-tree"></div>

<div class = "popup_block_buttons" id = "popup_block_buttons"></div>
<div class = "popup" id = "popup">
	<div id = "title" class = "title">undefined</div><br></br>
	
	<div id = "description" class = "dis">undefined</div>
</div>
<div id = "pause_flex">
<h1 id="pause-text">Paused</h1>
<button class = "pause_button" onclick = "unpause()">Resume</button>
<button class = "pause_button" onclick = "settings(false)">Settings</button>
<button class = "pause_button" onclick = "displaypopup(1, confirmation)">Menu</button>
</div>
<img src = "images/build1.png" id = "cloudimg" style = 'display: none'></img>
<img src = "images/build2.png" id = "cloudimg2" style = 'display: none'></img>
<img src = "images/build3.png" id = "cloudimg3" style = 'display: none'></img>
<svg id = "techlinecontainer", class="techline"></svg>
<div id = "settings-flex">
	<div style="width: 100%;">
	<h1 style="text-align: center;">Music</h1>
	<input class="setting_slider" id = "music" type="range" min="1" max="100" value="100">
	<h1 style="text-align: center;">Sound</h1>
	<input class = "setting_slider" id = "sound" type="range" min="1" max="100" value="100">
	</div>
	<div id="settings-toggle-container">
	<div class="settings-toggle-column">
	<div>
		<p >No Images</p>
		<div class="info-box" style = "z-index: 5">
		<i class="icon-info-sign"></i>

		<span class="extra-info">
		Replace building images with simple labeled boxes.
		</span>
		</div>
	</div>
	<div class="checkbox-wrapper-2">
	<input type="checkbox" id = "noimage"class="sc-gJwTLC ikxBAC">
	</div>
	<div>
	<p >No Year Fading</p>
		<div class="info-box" style = "margin: -37px 121px; z-index: 5">
		<i class="icon-info-sign"></i>

		<span class="extra-info">
		Remove the animation that plays when you click "end year".
		</span>
		</div>
	</div>	
	<div class="checkbox-wrapper-2">
	<input type="checkbox" id = "nofade"class="sc-gJwTLC ikxBAC">
	</div>
	
	</div>
	<div class="settings-toggle-column">
	<div>
	<div>
	<p>Arrow Keys</p>
	</div>
		<div class="info-box" style = "margin: -37px 94px; z-index: 3">
		<i class="icon-info-sign"></i>

		<span class="extra-info">
		Switch to arrow keys from WASD for moving around the map.
		</span>
		</div>
	</div>
	<div class="checkbox-wrapper-2">
	<input type="checkbox" id = "arrowkeys"class="sc-gJwTLC ikxBAC">
	</div>
	<div>
	<p>No Tutorial</p>
		<div class="info-box" style = "margin: -37px 90px; z-index: 3">
		<i class="icon-info-sign"></i>

		<span class="extra-info">
		Remove the tutorial popup when you click "new game".
		</span>
		</div>
</div>
	<div class="checkbox-wrapper-2">
	<input type="checkbox" id = "notutorial"class="sc-gJwTLC ikxBAC">
	</div>
	
	</div>
	<div class="settings-toggle-column">
	<div>
		<p>No Flashing</p>
		<div class="info-box" style = "margin: -37px 97px; z-index: 1">
		<i class="icon-info-sign"></i>

		<span class="extra-info">
		Remove button and building highlights when they are enabled.
		</span>
		</div>
	</div>
	<div class="checkbox-wrapper-2">
	<input type="checkbox" id = "noflash"class="sc-gJwTLC ikxBAC">
	</div>
	<div>
	<p>No Market Popup</p>
		<div class="info-box" style = "margin: -37px 136px; z-index: 1">
		<i class="icon-info-sign"></i>

		<span class="extra-info">
		Don't display if a trade was sucessful, still display failed trade.
		</span>
		</div>
	</div>
	<div class="checkbox-wrapper-2">
	<input type="checkbox" id = "nompop"class="sc-gJwTLC ikxBAC">
	</div>
	
	</div>
	<div class="settings-toggle-column">
		<div>
			<p>No Weather</p>
			<div class="info-box" style = "margin: -37px 97px;">
			<i class="icon-info-sign"></i>
	
			<span class="extra-info">
			Remove rain and snow effect (reduces lag).
			</span>
			</div>
		</div>
		<div class="checkbox-wrapper-2">
		<input type="checkbox" id = "noweather" class="sc-gJwTLC ikxBAC">
		</div>
		<div>
		<p>Sans Serif</p>
			<div class="info-box" style = "margin: -37px 97px;">
			<i class="icon-info-sign"></i>
	
			<span class="extra-info">
			Changes font to Sans Serif.
			</span>
			</div>
		</div>
		<div class="checkbox-wrapper-2">
		<input type="checkbox" id = "noserif"class="sc-gJwTLC ikxBAC">
		</div>
		
		</div>
	</div>
</div>


<script>
const canvas = document.querySelector("canvas")
canvas.height = screen.height*0.88
canvas.width = screen.width
const ctx = canvas.getContext("2d")
const canvas2 = document.getElementById("canvas2")
canvas2.height = screen.height*0.88
canvas2.width = screen.width
const ctx2 = canvas2.getContext("2d")
const canvas3 = document.getElementById("canvas3")

const ctx3 = canvas3.getContext("2d")
const canvasrect = canvas.getBoundingClientRect()
canvas2.style.left=canvasrect.left
canvas2.style.right=canvasrect.right
canvas2.style.top=canvasrect.top
canvas2.style.bottom=canvasrect.bottom
let scroll = 5
let gridimg = ctx3.createImageData(5000,5000)
for(let j=0,len=gridimg.data.length;j<len;j+=4){
				gridimg.data[j] =43
				gridimg.data[j+1] =101
				gridimg.data[j+2] =236
				gridimg.data[j+3] =255
}
let heightmax = Math.round((screen.height*0.88)/scroll)
let widthmax = Math.round((screen.width)/scroll)
const tilestats = {}
const biomes = ["grass","desert","jungle"]
const buildindices = []
const max = {
	up:-40,
	down:40,
	left:-40,
	right:40
}
const grid = []
const buildgrid = []
const buildstats = {}

const tabs = ["Housing","Farms","Military","Mines","City Centers","Misc"]
const gridstats = []
const wars = []
const psettings = {
	noimage:false,
	nofade:false,
	arrowkeys:false,
	notutorial:false,
	noflash:false,
	nompop:false,
	noweather:false,
	noserif:false,
	
}
if(localStorage.getItem("settings")==null){
	localStorage.setItem("settings", JSON.stringify(psettings))
}
else{
	
	const localsettings = JSON.parse(localStorage.getItem("settings"))
	const ele = document.getElementsByClassName("sc-gJwTLC ikxBAC")
	let el=0
	for (const se in psettings){
		if(localsettings[se]==undefined){
			localsettings[se]=false
		}
		psettings[se]=localsettings[se]
		if(psettings[se]==false){
		ele[el].checked = false
	}
	else{
		ele[el].checked = true
	}
		el++
	}
	
}
let weather = 0//1 is rain, 2 is hail, 3 is snow
let raintimer = 10
let scrollX = 250
const oldposition = {}
let scrollY = 250
let spawnX = 0
let spawnY = 0
let ispainting = false
let siege = false
let repairing = false
let position = {}
let letter = ""
let piece = []
let population = 0
let difference =0
let m_personnel = 0
let food = 0
let resources = 8
let research_points =0
let resourcesgained = 0
let p_index = 0
let megatemple = 0
let modifiers = {
	population: 0,
	food: 0,
	resources:0,
	military:0
}
const marketitems = []
let tab = "Housing"
let punishamount = 0
let allowed = true;
let military = 0;
let currentpop = 2;
const tileindex = {}
const click = new Audio("sounds/click.mp3");
const build_music = new Audio("music/Build_music.mp3");
const market_music = new Audio("music/Market_music.mp3");
const boss_music = new Audio("music/Boss_music.mp3");
const kaching = new Audio("sounds/Purchase.mp3");
const breaksound = new Audio("sounds/remove.mp3");
const repairsound = new Audio("sounds/repair.mp3");
const techclick = new Audio("sounds/techclick.mp3");
const techbuy = new Audio("sounds/techbuy.mp3");
const tech_music = new Audio("music/tech_music.mp3");
const war_music = new Audio("music/War_music.mp3");
const buildimg = document.getElementById("cloudimg")
const buildimg2 = document.getElementById("cloudimg2")
const buildimg3 = document.getElementById("cloudimg3")
market_music.loop = true
build_music.loop = true
boss_music.loop = true
tech_music.loop=true
war_music.loop=true
let istutorial = false;
let tutorialindex = 0;
let disableinfo = false
let unemployed = 2;
let xp = 0
let totalxp = 50
let difficulty = 0;
let first_turn = true;
let removing = false;
let luck = 0

let outofrange = 0

let reputation = 0
let save_slot = null;
let difficultymultiplier = 0
const choicesdisabled = []
const buildingamounts = []
const unlocked = []
const roadgrid = {}
const temporaryeffects = []
const nations = []
const nationnames = [
'Eqasia',
'Ntesaint Bangko',
'Southnebo',
'Panspainda Land',
'Saofrislands',
'United Noratedguay',
'Republic of Greeceslo Slandsila',
'Mauko',
'Riagypt',
'Lichira',
'Ruslonorroe',
'Sauti Northguaypu',
'Sua Lerea',
'Landsame Tiusngana',
'Norogannion',
'Salcromi',
'Litola',
'More',
'Niasarwan',
'Andslands',
'Namucuastatesre',
'Daborkey',
'Chidia',
'Solayher',
'Rinea',
'Pucubo',
'Doczechrary',
'Vaba Landsia',
'Landniu',
'Thekraine',
'Therni Cairnmor',
'Lygua Nauso',
'Georlompa',
'Dosblic Gasroc',
'Slandsslands',
'Moarates',
'Queverde',
'Niniase',
'Ain',
'Frimi Cynizue',
'Cagua Cosbaigre',
'Zstancofa',
'Sternliblic',
'Zeaho',
'Cosriabia Kingdom',
'Barve Timy',
'Losouthca Territories',
'Nacao Idelu',
'Inra',
'Kadian',
'Rialtho Prilandber',
'Une',
'Tizidines',
'Kiguern Markand',
'Galda',
'Marlynidango Island',
'Reru Nekia',
'Iescot',
'Nabawiva',
'South Jiland Sunewpa',
'Napeau',
'Saintbabwe',
'Yery Mogam',
'Tathelandtin',
'Poni Hrainwalhong',
'Catvia',
'Manwaitzbemyanne',
'Tiko Liachellestu',
'Mata',
'Sintgro Kingdom',
'Tomeisi',
'Aemailandslands',
'Rolia Niapalco',
'Namsnia',
'Gimonrango',
'Sorean',
'Aba',
'Jajan Labya',
'Ceguyavo',
'Belfrench Bimotu',
'Eguibiabrinited',
'Zamlandastan',
'Rdannasouslanddo',
'Evi Kiloupe',
'Cacook Slandsliaca',
'Raqsu',
'Paa',
'Costa Niuerus Maarbe',
'Maca Baristan',
'Dornadi',
'Gyna',
'Fistan Niaswa',
'Ngoipu',
'Lamogin',
'Rasia Reiva',
'Markong',
'Greelngo',
'Sythe Ilu',
'Initedbu',
"Zabo Marsey",

]
document.getElementById("noimage").addEventListener( "change", () => {if ( document.getElementById("noimage").checked ) {psettings.noimage = true;}else{psettings.noimage = false;};change_settings(noimage)});
document.getElementById("nofade").addEventListener( "change", () => {if ( document.getElementById("nofade").checked ) {psettings.nofade = true;}else{psettings.nofade = false;};change_settings(nofade)});
document.getElementById("arrowkeys").addEventListener( "change", () => {if ( document.getElementById("arrowkeys").checked ) {psettings.arrowkeys = true;}else{psettings.arrowkeys = false;};change_settings(arrowkeys)});
document.getElementById("notutorial").addEventListener( "change", () => {if ( document.getElementById("notutorial").checked ) {psettings.notutorial = true;}else{psettings.notutorial = false;};change_settings(notutorial)});
document.getElementById("noflash").addEventListener( "change", () => {if ( document.getElementById("noflash").checked ) {psettings.noflash = true;}else{psettings.noflash = false;};change_settings(noflash)});
document.getElementById("nompop").addEventListener( "change", () => {if ( document.getElementById("nompop").checked ) {psettings.nompop = true;}else{psettings.nompop = false;};change_settings(nompop)});
document.getElementById("noweather").addEventListener( "change", () => {if ( document.getElementById("noweather").checked ) {psettings.noweather = true;}else{psettings.noweather = false;};change_settings(noweather);ctx2.clearRect(0,0,screen.width,screen.height)});
document.getElementById("noserif").addEventListener( "change", () => {if ( document.getElementById("noserif").checked ) {psettings.noserif = true;}else{psettings.noserif = false;};change_settings(noserif);changefont()});
function change_settings(setting){
	localStorage.setItem("settings", JSON.stringify(psettings))
}
function changefont() {
			if (!psettings.noserif)
			 {
				document.body.style.fontFamily = 'Roboto Slab';
				const buttons =  document.getElementsByTagName('button')
				
				for(const b of buttons){
				b.style.fontFamily = 'Roboto Slab';
			  } 
			  const sele = document.getElementsByTagName('select')
			 for (const se of sele){ 
			  se.style.fontFamily = 'Roboto Slab';
			 }
			   return 
			} 
			document.body.style.fontFamily = 'Arial'
				const buttons =  document.getElementsByTagName('button')
				
				for(const b of buttons){
				b.style.fontFamily = 'Arial';
			  } 
			  const sele = document.getElementsByTagName('select')
			 for (const se of sele){ 
			  se.style.fontFamily = 'Arial';
			 }
		}
function switchtab(){
	tab = document.getElementById("taboption").value
	displaytab()
}
for (i=tabs.length-1;i>=0;i--){
	const taboption = document.createElement("option")
	taboption.innerHTML = tabs[i]
	
	document.getElementById("taboption").appendChild(taboption)
	if (i==0){
		taboption.selected=true
	}
}
const ele = document.getElementsByClassName("setting_slider")

for(const el of ele){
	const min = el.min
const max = el.max
const value = el.value
	el.style.background = `linear-gradient(to right, #755e2b 0%, #755e2b ${(value-min)/(max-min)*100}%, gray ${(value-min)/(max-min)*100}%, gray 100%)`

el.oninput = function () {
if (el.id == "music") {
	build_music.volume = el.value * 0.01
	tech_music.volume = el.value * 0.01
	market_music.volume = el.value * 0.01
	boss_music.volume = el.value * 0.01
	war_music.volume = el.value * 0.01
}
else if (el.id = "sound"){
	click.volume = el.value * 0.01
techbuy.volume = el.value * 0.01
techclick.volume = el.value * 0.01
kaching.volume = el.value * 0.01
breaksound.volume = el.value * 0.01
repairsound.volume = el.value * 0.01
}
this.style.background = `linear-gradient(to right, #755e2b 0%, #755e2b ${(this.value - this.min) / (this.max - this.min) * 100}%, gray ${(this.value - this.min) / (this.max - this.min) * 100}%, gray 100%)`
};
}
// enable/disable devtools
const devmode = true

</script>


<script src = "js/terrain_generator.js"></script>
<script src = "js/build.js"></script>
<script src = "js/tutorial.js"></script>
<script src = "js/market.js"></script>
<script src = "js/achievements.js"></script>
<script src = "js/turn_manager.js"></script>
<script src = "js/tech.js"></script>
<script src = "js/index.js"></script>
<script src = "js/popups.js"></script>
<script src = "js/devtools.js"></script>
<script src = "js/tile.js"></script>
<script src = "js/nations.js"></script>
</body>
