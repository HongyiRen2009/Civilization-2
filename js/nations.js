class nation {
  constructor(x, y) {
    this.population = 0;
    this.builddelay = 1000;
    this.unlocked = [...unlocked];
    this.unlocked[10] = true;
    this.resources = getRandomInt(20, 30);
    this.currentpop = getRandomInt(2, 4);
    this.unemployed = this.currentpop;
    this.military = this.unemployed;
    this.m_personnel = this.unemployed;
    this.food = 0;
    this.resourcesgained = 0;
    this.bordercolors = {
      r: getRandomInt(100, 255),
      g: getRandomInt(100, 255),
      b: getRandomInt(100, 255),
    };
    this.linecolors = {
      r: getRandomInt(100, 255),
      g: getRandomInt(100, 255),
      b: getRandomInt(100, 255),
    };
    this.gridstats = [];

    this.name = generateWord(dataObj);
    this.buildingids = [];
    this.buildid = 0;
    this.modifiers = {
      food: 0,
      resources: 0,
      military: 0,
      population: 0,
    };
    this.techstats = JSON.parse(JSON.stringify(techstats));
    this.id = nations.length;
    nationids.push(this.id);
    this.bordermaxes = {
      farm: [],
      house: [],
      military: [],
      mine: [],
    };
    this.cities = [{ x: x, y: y }];
    this.spawn = { x: x, y: y };
    this.armies = [];
    this.buildingamounts = [...buildingamounts];
    nations.push(this);
    this.wars = [];
  }
}
class army {
  constructor(context, x, y, comp) {
    this.id = context.id;
    this.position = { x, y };
    this.personnel= 0
    for (const troop in comp){
      this.personnel+=comp[troop]
    }
    context.armies.push(this);
    this.destination = [];
    this.animationStage=0
    this.status = (context.wars.length>0 ? 1:0);
    this.troops = comp
    this.speed = Math.max(0.1,parseFloat(
      (0.05 / Math.log(Math.max(this.personnel, 2))).toFixed(1)
    ));
  }
}
function getNationById(id) {
  return nations[nationids.indexOf(id)];
}
function declarewar(context, context2) {
  context.wars.push(context2.id);
  context2.wars.push(context.id);
  for (const army of context.armies) {
    army.status = 1;
  }
  for (const army of context2.armies) {
    army.status = 1;
  }
}
function giveitems(context) {
  context.resources += context.resourcesgained;
  context.currentpop += Math.ceil(Math.max(
    -2 - Math.ceil(context.currentpop / 20),
    Math.min(
      1 + Math.ceil(context.currentpop / 20),
      context.food - context.currentpop
    )
  )/64);
  calcNation(context);
}
function calcNation(context) {
  context.population = 0;
  context.food = 0;
  context.military = 0;
  context.resourcesgained = 0;
  context.m_personnel = 0;
  context.unemployed = context.currentpop;
  for(const army of context.armies){
    unemployed-=army.personnel
    context.military+=army.personnel
  }
  for (len = context.gridstats.length, i = 0; i < len; i++) {
    if (!context.gridstats[i].disabled) {
      if (context.unemployed >= context.gridstats[i].employmentrequired) {
        context.population += context.gridstats[i].population;
        if (context.gridstats[i].fish && turn) {
          context.gridstats[i].food = getRandomInt(10, 15);
        }
        context.food += context.gridstats[i].food;
        context.military += context.gridstats[i].military;
        context.resourcesgained += context.gridstats[i].resources;
        if (context.gridstats[i].military > 0) {
          context.m_personnel += context.gridstats[i].employmentrequired;
        }
        context.unemployed -= context.gridstats[i].employmentrequired;
      } else {
        context.gridstats[i].disabled = true;
        for (const pos of context.gridstats[i].positions) {
          buildstats[tilecode(pos.x, pos.y)].disabled = true;
        }
        switch (context.gridstats[i].index) {
          case 11:
            context.modifiers.military -= 1;
          case 19:
            context.modifiers.food -= 2;
            context.modifiers.resources -= 2;
        }
      }
    }
  }

  context.food += Math.ceil(
    context.food * (context.modifiers.food / 10) * (1 + weathermod)
  );
  context.resourcesgained += Math.ceil(
    context.resourcesgained * (context.modifiers.resources / 10)
  );
  context.population += Math.ceil(
    (context.population * context.modifiers.population) / 10
  );
  context.military += Math.ceil(
    context.military * (context.modifiers.military / 10)
  );

  context.unemployed = Math.max(context.unemployed, 0);

  context.military += context.unemployed;
}
function checkrequires(context, range) {
  for (let i = range.min; i > range.max - 1; i--) {
    if (p.pieceROM[i].requires(context) && context.unlocked[i]) {
      return i;
    }
  }
  return false;
}
function choosebuilding(context, tempmax) {
  let btype = "";
  let building = "";
  const types = ["mine", "house", "military", "farm"];
  if(Math.ceil(context.gridstats.length/128)>context.armies.length){
    
    const random = context.gridstats[getRandomInt(0,context.gridstats.length-1)].positions[0]
    new army(context,random.x,random.y,{
      swords:context.unemployed,
      archers:0,
      calvery:0,
    })
  }
  if (context.resourcesgained < context.food && context.unemployed > 0) {
    building = checkrequires(context, { min: 16, max: 14 });
    btype = "mine";
  } else if (
    context.currentpop / context.population > 1.1 &&
    context.currentpop <= context.food
  ) {
    building = checkrequires(context, { min: 3, max: 0 });
    btype = "house";
  } else if (
    getRandomInt(0,10)==0&&
    context.unemployed > 3
  ) {
    let lowestarmy = 0
    for(const army of context.armies){
      if((lowestarmy===0||army.personnel<lowestarmy.personnel)&&borders[tilecode(Math.floor(army.position.x),Math.floor(army.position.y))]==context.id){
        lowestarmy=army
      }
    }
    if(lowestarmy===0){
      return
    }
    lowestarmy.troops.swords+=context.unemployed
    lowestarmy.personnel+=context.unemployed
    calcNation(context)
    return
   /*  building = checkrequires(context, { min: 12, max: 10 });
    btype = "military"; */
  } else {
    building = checkrequires(context, { min: 8, max: 5 });
    btype = "farm";
  }
  if (building === false) {
    return;
  }
  let times = 0;
  while (tempmax[btype].length < 1) {
    btype =
      types.indexOf(btype) + 2 > types.length
        ? types[0]
        : types[types.indexOf(btype) + 1];
    times += 1;
    if (times >= Object.keys(tempmax).length) {
      return;
    }
  }
  building = buildindices[building];
  const randindex = getRandomInt(0, tempmax[btype].length - 1);
  const rand = tiledecode(tempmax[btype][randindex]);
  const randdirection = [];

  if (
    buildstats[tilecode(rand.x + 1, rand.y)] == undefined &&
    tilestats[tilecode(rand.x + 1, rand.y)] != undefined &&
    !exists("river", rand.x + 1, rand.y) &&
    (borders[tilecode(rand.x + 1, rand.y)] == undefined ||
      borders[tilecode(rand.x + 1, rand.y)] == context.id)
  ) {
    randdirection.push({
      x: rand.x + 1,
      y: rand.y,
      direction: ["right", false, false],
    });
  }
  if (
    buildstats[tilecode(rand.x, rand.y + 1)] == undefined &&
    tilestats[tilecode(rand.x, rand.y + 1)] != undefined &&
    !exists("river", rand.x, rand.y + 1) &&
    (borders[tilecode(rand.x, rand.y + 1)] == undefined ||
      borders[tilecode(rand.x, rand.y + 1)] == context.id)
  ) {
    randdirection.push({
      x: rand.x,
      y: rand.y + 1,
      direction: ["down", false, false],
    });
  }
  if (
    buildstats[tilecode(rand.x - 1, rand.y)] == undefined &&
    tilestats[tilecode(rand.x - 1, rand.y)] != undefined &&
    !exists("river", rand.x - 1, rand.y) &&
    (borders[tilecode(rand.x - 1, rand.y)] == undefined ||
      borders[tilecode(rand.x - 1, rand.y)] == context.id)
  ) {
    randdirection.push({
      x: rand.x - 1,
      y: rand.y,
      direction: ["left", true, false],
    });
  }
  if (
    buildstats[tilecode(rand.x, rand.y - 1)] == undefined &&
    tilestats[tilecode(rand.x, rand.y - 1)] != undefined &&
    !exists("river", rand.x, rand.y - 1) &&
    (borders[tilecode(rand.x, rand.y - 1)] == undefined ||
      borders[tilecode(rand.x, rand.y - 1)] == context.id)
  ) {
    randdirection.push({
      x: rand.x,
      y: rand.y - 1,
      direction: ["up", false, true],
    });
  }

  if (randdirection.length == 0) {
    context.bordermaxes[btype].splice(randindex, 1);
    return;
  }
  for (const rando of randdirection) {
    const iswidth =
      rando.direction[0] == "up" || rando.direction[0] == "down"
        ? {
            amount: p.pieceROM[buildindices.indexOf(building)].dimensions.width,
            direction: "width",
          }
        : {
            amount:
              p.pieceROM[buildindices.indexOf(building)].dimensions.height,
            direction: "height",
          };

    const dimensions = p.pieceROM[buildindices.indexOf(building)].dimensions;
    for (let i = 0; i < iswidth.amount; i++) {
      if (
        checkwidths(
          rando.x -
            (iswidth.direction == "width" ? i : 0) -
            (rando.direction[1] ? dimensions.width - 1 : 0),
          rando.y -
            (iswidth.direction == "height" ? i : 0) -
            (rando.direction[2] ? dimensions.height - 1 : 0),
          building
        )
      ) {
        createbuilding(
          context,
          rando.x -
            (iswidth.direction == "width" ? i : 0) -
            (rando.direction[1] ? dimensions.width - 1 : 0),
          rando.y -
            (iswidth.direction == "height" ? i : 0) -
            (rando.direction[2] ? dimensions.height - 1 : 0),
          building,
          btype
        );
        return;
      }
    }
  }
  const newmax = structuredClone(tempmax);
  newmax[btype].splice(randindex, 1);

  choosebuilding(context, structuredClone(newmax));
}
function conquerborder(x, y, context) {
  
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      ctx4.fillStyle = `rgba(${context.bordercolors.r},${context.bordercolors.g},${context.bordercolors.b},0.5)`;
      ctx4.clearRect(x + j, y + i, 1, 1);
      ctx4.fillRect(x + j, y + i, 1, 1);
      borders[tilecode(x + j, y + i)] = context.id;
    }
  }

  for (let i = -2; i < 3; i++) {
    for (let j = -2; j < 3; j++) {
      if (borders[tilecode(x + j, y + i)] != undefined) {
        if (
          borders[tilecode(x + j, y + i - 1)] == undefined ||
          borders[tilecode(x + j, y + i - 1)] != borders[tilecode(x + j, y + i)]
        ) {
          borderlines[tilecode(x + j, y + i) + "|up"] = {
            color: getNationById(borders[tilecode(x + j, y + i)]).linecolors,
            id: borders[tilecode(x + j, y + i)],
          };
        } else if (borderlines[tilecode(x + j, y + i) + "|up"] != undefined) {
          delete borderlines[tilecode(x + j, y + i) + "|up"];
        }
        if (
          borders[tilecode(x + j + 1, y + i)] == undefined ||
          borders[tilecode(x + j + 1, y + i)] != borders[tilecode(x + j, y + i)]
        ) {
          borderlines[tilecode(x + j, y + i) + "|right"] = {
            color: getNationById(borders[tilecode(x + j, y + i)]).linecolors,
            id: borders[tilecode(x + j, y + i)],
          };
        } else if (
          borderlines[tilecode(x + j, y + i) + "|right"] != undefined
        ) {
          delete borderlines[tilecode(x + j, y + i) + "|right"];
        }
        if (
          borders[tilecode(x + j, y + i + 1)] == undefined ||
          borders[tilecode(x + j, y + i + 1)] != borders[tilecode(x + j, y + i)]
        ) {
          borderlines[tilecode(x + j, y + i) + "|down"] = {
            color: getNationById(borders[tilecode(x + j, y + i)]).linecolors,
            id: borders[tilecode(x + j, y + i)],
          };
        } else if (borderlines[tilecode(x + j, y + i) + "|down"] != undefined) {
          delete borderlines[tilecode(x + j, y + i) + "|down"];
        }
        if (
          borders[tilecode(x + j - 1, y + i)] == undefined ||
          borders[tilecode(x + j - 1, y + i)] != borders[tilecode(x + j, y + i)]
        ) {
          borderlines[tilecode(x + j, y + i) + "|left"] = {
            color: getNationById(borders[tilecode(x + j, y + i)]).linecolors,
            id: borders[tilecode(x + j, y + i)],
          };
        } else if (borderlines[tilecode(x + j, y + i) + "|left"] != undefined) {
          delete borderlines[tilecode(x + j, y + i) + "|left"];
        }
      }
    }
  }
}
function checkborders(x, y, context) {
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (borders[tilecode(x + j, y + i)] != undefined) {
        continue;
      }

      ctx4.fillStyle = `rgba(${context.bordercolors.r},${context.bordercolors.g},${context.bordercolors.b},0.5)`;
      ctx4.clearRect(x + j, y + i, 1, 1);
      ctx4.fillRect(x + j, y + i, 1, 1);
      borders[tilecode(x + j, y + i)] = context.id;
    }
  }
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (borders[tilecode(x + j, y + i)] != context.id) {
        continue;
      }
      if (
        borders[tilecode(x + j, y + i - 1)] == undefined ||
        borders[tilecode(x + j, y + i - 1)] != context.id
      ) {
        borderlines[tilecode(x + j, y + i) + "|up"] = {
          color: context.linecolors,
          id: context.id,
        };
      } else if (
        borderlines[tilecode(x + j, y + i) + "|up"] != undefined &&
        borderlines[tilecode(x + j, y + i) + "|up"].id == context.id
      ) {
        delete borderlines[tilecode(x + j, y + i) + "|up"];
      }
      if (
        borders[tilecode(x + j + 1, y + i)] == undefined ||
        borders[tilecode(x + j + 1, y + i)] != context.id
      ) {
        borderlines[tilecode(x + j, y + i) + "|right"] = {
          color: context.linecolors,
          id: context.id,
        };
      } else if (
        borderlines[tilecode(x + j, y + i) + "|right"] != undefined &&
        borderlines[tilecode(x + j, y + i) + "|right"].id == context.id
      ) {
        delete borderlines[tilecode(x + j, y + i) + "|right"];
      }
      if (
        borders[tilecode(x + j, y + i + 1)] == undefined ||
        borders[tilecode(x + j, y + i + 1)] != context.id
      ) {
        borderlines[tilecode(x + j, y + i) + "|down"] = {
          color: context.linecolors,
          id: context.id,
        };
      } else if (
        borderlines[tilecode(x + j, y + i) + "|down"] != undefined &&
        borderlines[tilecode(x + j, y + i) + "|down"].id == context.id
      ) {
        delete borderlines[tilecode(x + j, y + i) + "|down"];
      }
      if (
        borders[tilecode(x + j - 1, y + i)] == undefined ||
        borders[tilecode(x + j - 1, y + i)] != context.id
      ) {
        borderlines[tilecode(x + j, y + i) + "|left"] = {
          color: context.linecolors,
          id: context.id,
        };
      } else if (
        borderlines[tilecode(x + j, y + i) + "|left"] != undefined &&
        borderlines[tilecode(x + j, y + i) + "|left"].id == context.id
      ) {
        delete borderlines[tilecode(x + j, y + i) + "|left"];
      }
    }
  }
}
function checkwidths(x, y, building) {
  for (const pos of p.pieceROM[buildindices.indexOf(building)].piecepositions) {
    if (
      buildstats[tilecode(x + pos.x, y + pos.y)] != undefined ||
      tilestats[tilecode(x + pos.x, y + pos.y)] == undefined ||
      exists("river", x + pos.x, y + pos.y)
    ) {
      return false;
    }
  }

  return true;
}
function checkbuilding(context, x, y) {
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (
        buildstats[tilecode(x + j, y + i)] != undefined &&
        buildstats[tilecode(x + j, y + i)].id == context.id
      ) {
        return false;
      }
    }
  }
  return true;
}
function createbuilding(context, x, y, type, btype) {
  p.population = 0;
  p.military = 0;
  p.resources = 0;
  p.food = 0;
  p.xp = 0;
  p.fish = 0;
  let isrender = false;
  const gridposition = [];
  const po_index = buildindices.indexOf(type);
  for (const poce of p.pieceROM[po_index].piecepositions) {
    if (
      x + poce.x > scrollX &&
      x + poce.x < scrollX + widthmax &&
      y + poce.y > scrollY &&
      y + poce.y < scrollY + heightmax
    ) {
      isrender = true;
    }
    gridposition.push({ x: x + poce.x, y: y + poce.y, img: poce.img });
    buildgrid[y + poce.y].splice(0, 0, x + poce.x);
    buildgrid[y + poce.y].sort(function (a, b) {
      return a - b;
    });

    if (
      p.pieceROM[po_index].name == "Road" ||
      p.pieceROM[po_index].name == "Bridge" ||
      p.pieceROM[po_index].name == "Bonfire" ||
      difficulty < 10
    ) {
      isInRange = true;
      if (p.pieceROM[po_index].name == "Road") {
        p.pieceROM[po_index].effect(context);
        roadgrid[JSON.stringify({ x: x, y: y })] = { x: 0, y: 0 };
        recalcroads([
          JSON.stringify({ x: x, y: y }),
          JSON.stringify({ x: x + 1, y: y }),
          JSON.stringify({ x: x, y: y + 1 }),
          JSON.stringify({ x: x, y: y - 1 }),
          JSON.stringify({ x: x - 1, y: y }),
        ]);
        displayUI();
        render();
        allowed = false;
        first_turn = false;
        if (!p.pieceROM[po_index].requires()) {
          piece.length = 0;
          ispainting = false;
        }
        return;
      }
    }

    buildstats[tilecode(x + poce.x, y + poce.y)] = {
      id: context.id,
      pointer: context.buildid,
      img: poce.img,
      disabled: false,
      inrange: isInRange,
    };
    checkborders(x + poce.x, y + poce.y, context);
    if (!exists("hill", x + poce.x, y + poce.y)) {
      p.entirehill = false;
    }
    if (exists("hill", x + poce.x, y + poce.y)) {
      p.hill = true;
    }

    if (poce.y == 0 || getRandomInt(1, 4) == 1) {
      if (btype == "any") {
        for (const b in context.bordermaxes) {
          context.bordermaxes[b].push(tilecode(x + poce.x, y + poce.y));
        }
      } else {
        context.bordermaxes[btype].push(tilecode(x + poce.x, y + poce.y));
      }
    }
  }

  const oldresources = context.resources;
  const oldpop = context.unemployed;
  const ouroldpop = unemployed;

  p.pieceROM[po_index].effect(context);

  context.unemployed -= ouroldpop - unemployed;
  context.gridstats.push({
    index: po_index,
    letter: letter,
    population: p.population,
    employmentrequired: oldpop - context.unemployed,
    food: p.food,
    resources: p.resources,
    military: p.military,
    xp: p.xp,
    fish: p.fish,
    positions: gridposition.slice(0),
    resourcerefund: oldresources - context.resources,
    disabled: false,
    id: context.id,
  });
  context.buildingids.push(context.buildid);
  context.buildid += 1;
  calcNation(context);
  if (isrender) {
    render();
  }
}
