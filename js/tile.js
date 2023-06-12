const tiles = [
  {
    type: "grass",
    image: false,
    color: "rgb(51, 166, 59)",
    r: 51,
    g: 166,
    b: 59,
  },
  {
    type: "hill",
    image: false,
    color: "rgb(103, 104, 107)",
    r: 103,
    g: 104,
    b: 107,
  },
  {
    type: "sand",
    image: false,
    color: "rgb(255, 227, 160)",
    r: 255,
    g: 227,
    b: 160,
  },
  {
    type: "river",
    image: false,
    color: "rgb(3,172,252)",
    r: 3,
    g: 172,
    b: 252,
  },
  {
    type: "desert",
    image: false,
    color: "rgb(241, 190, 108)",
    r: 241,
    g: 190,
    b: 108,
  },
  {
    type: "jungle",
    image: false,
    color: "rgb(49, 85, 39)",
    r: 49,
    g: 85,
    b: 39,
  },
  {
    type: "snow",
    image: false,
    color: "rgb(255,255,255)",
    r: 255,
    g: 255,
    b: 255,
  },
  {
    type: "ice",
    image: false,
    color: "rgb(63,208,212)",
    r: 63,
    g: 208,
    b: 212,
  },
  {
    type: "savanna",
    image: false,
    color: "rgb(209,189,146)",
    r: 209,
    g: 189,
    b: 146,
  },
  {
    type:"tree",
    image:true,
  },
];
function addTile(type, x, y, index = undefined) {
  if(tiles[tileindex[type]].image==true){
    tileImages[tilecode(x, y)] = { index: tileindex[type] };
    ctx3.imageSmoothingEnabled=false
    ctx3.drawImage(document.getElementById("cloudimg4"),x*16, y*16, 16, 16);
  }
  else{
    tilestats[tilecode(x, y)] = { index: tileindex[type] };
    ctx3.fillStyle = tiles[tilestats[tilecode(x, y)].index].color;
    ctx3.fillRect(x*16, y*16, 16, 16);
  }
  
  if (grid[y].includes(x)) {
    grid[y].splice(grid[y].indexOf(x), 1);
  }
  if (index == undefined) {
    grid[y].push(x);
  } else {
    grid[y].splice(index, 0, x);
  }
 
}
function removetile(x, y) {
  delete tilestats[tilecode(x, y)];

  grid[y].splice(grid[y].indexOf(x), 1);
}
function tiledecode(code) {
  return {
    x: parseInt(code.slice(0, code.indexOf("/"))),
    y: parseInt(code.substr(code.indexOf("/") + 1, code.length)),
  };
}
function updatebuilding(building) {
  for (const pos of building.positions) {
    ctx5.clearRect(pos.x * 20, pos.y * 20, 20, 20);
    if (building.disabled) {
      ctx5.drawImage(
        buildimg2,
        pos.img.dx,
        pos.img.dy,
        20,
        20,
        pos.x * 20,
        pos.y * 20,
        20,
        20
      );
    } else if (!building.inrange) {
      ctx5.drawImage(
        buildimg3,
        pos.img.dx,
        pos.img.dy,
        20,
        20,
        pos.x * 20,
        pos.y * 20,
        20,
        20
      );
    } else {
      ctx5.drawImage(
        buildimg,
        pos.img.dx,
        pos.img.dy,
        20,
        20,
        pos.x * 20,
        pos.y * 20,
        20,
        20
      );
    }
  }
}
function exists(type, x, y) {
  if (tilestats[tilecode(x, y)] == undefined) {
    return false;
  }
  if (typeof type == "string") {
    if (
      tiles[tilestats[tilecode(x, y)].index].type == type &&
      grid[y].includes(x)
    ) {
      return true;
    }
  } else {
    if (
      type.includes(tiles[tilestats[tilecode(x, y)].index].type) &&
      grid[y].includes(x)
    ) {
      return true;
    }
  }
  return false;
}
function tilecode(x, y) {
  return x + "/" + y;
}
for (let i = 0, len = tiles.length; i < len; i++) {
  tileindex[tiles[i].type] = i;
}
