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
    this.resourcesgained=0
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
    this.destinations = [];
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
    this.cities = [];
    this.spawn = { x: x, y: y };
    this.drawposition = this.spawn;
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
    this.personnel = 0;
    for (const troop in comp) {
      this.personnel += comp[troop];
    }
    context.armies.push(this);
    this.destination = [];
    this.path = [];
    this.animationStage = 0;
    this.status =
      context.wars.length > 0 ? (getRandomInt(0, 10) > 7 ? 0 : 1) : 0;
    this.troops = comp;
    this.speed = Math.max(
      0.05,
      parseFloat(
        (0.05 - (0.05 * Math.log(Math.max(this.personnel, 2))) / 32).toFixed(1)
      )
    );
  }
}
//pathfinding
class node {
  constructor(start, end, x, y, parent) {
    this.x = x;
    this.y = y;
    this.ds = Math.floor(distance(x, y, start.x, start.y) * 10);
    this.de = Math.floor(distance(x, y, end.x, end.y) * 10);
    this.parent = parent;
  }
}
class arrow {
  constructor(damage, position, destination, army) {
    this.damage = damage;
    this.position = position;
    this.destination = destination;
    this.army = army;
    arrows.push(this);
  }
}
// define the A* algorithm
function aStar(start, end) {
  const openNodes = [];
  const alreadyExists = [];
  const costs = [];
  const closedNodes = [];

  const newnode = new node(start, end, start.x, start.y, null);
  openNodes.push(newnode);
  costs.push(newnode.ds + newnode.de);
  alreadyExists.push(tilecode(newnode.x, newnode.y));

  while (openNodes.length > 0) {
    const current = openNodes[costs.indexOf(Math.min(...costs))];
    closedNodes.push(current);
    openNodes.splice(costs.indexOf(Math.min(...costs)), 1);
    costs.splice(costs.indexOf(Math.min(...costs)), 1);

    if (
      (end.x == current.x && end.y == current.y) ||
      closedNodes.length > 1000 ||
      (closedNodes.length > 100 &&
        distance(start.x, start.y, end.x, end.y) > 50)
    ) {
      const path = [];
      let currentnode = current;
      while (currentnode.parent != null) {
        path.push({ x: currentnode.x, y: currentnode.y });
        currentnode = currentnode.parent;
      }
      return path.reverse();
    }

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (
          current.x + j < 0 ||
          current.x + j > 4999 ||
          current.y + i < 0 ||
          current.y + i > 4999
        ) {
          continue;
        }
        if (
          tilestats[tilecode(current.x + j, current.y + i)] == undefined ||
          alreadyExists.includes(tilecode(current.x + j, current.y + i))
        ) {
          continue;
        }

        const newnode = new node(
          start,
          end,
          current.x + j,
          current.y + i,
          current
        );
        openNodes.push(newnode);
        costs.push(
          (newnode.ds + newnode.de) *
            (exists("hill", current.x + j, current.y + i) ? 2 : 1) *
            (exists("river", current.x + j, current.y + i) &&
            (buildstats[tilecode(current.x + j, current.y + i)] == undefined ||
              buildstats[tilecode(current.x + j, current.y + i)].disabled)
              ? 2
              : 1)
        );
        alreadyExists.push(tilecode(newnode.x, newnode.y));
      }
    }
  }
  return [];
}

function getNationById(id) {
  return nations[nationids.indexOf(id)];
}
function declarewar(context, context2) {
  context.wars.push(context2.id);
  context2.wars.push(context.id);
  for (const army of context.armies) {
    army.status = getRandomInt(0, 1);
    army.destination.length = 0;
  }
  for (const army of context2.armies) {
    army.status = getRandomInt(0, 1);
    army.destination.length = 0;
  }
}
function giveitems(context) {
  context.resources += context.resourcesgained;
  context.currentpop += Math.ceil(
    Math.max(
      -1 - Math.ceil(context.currentpop / 80),
      Math.min(
        1 + Math.ceil(context.currentpop / 80),
        context.food - context.currentpop
      )
    )
  );
  calcNation(context);
}
function createPath(x1, y1, x2, y2) {
  const directions = {
    0: { x: 0, y: -1 },
    45: { x: 1, y: -1 },
    90: { x: 1, y: 0 },
    135: { x: 1, y: 1 },
    180: { x: 0, y: 1 },
    225: { x: -1, y: 1 },
    270: { x: -1, y: 0 },
    315: { x: -1, y: -1 },
    360: { x: 0, y: -1 },
  };
  let currentx = x1;
  let currenty = y1;
  const pathgrid = [];
  for (let j = 0; j < 200; j++) {
    let direction =
      Math.floor(
        (Math.atan2((y2 / currenty) * -1, x2 / currentx) * 180) / Math.PI / 45
      ) * 45;
    for (let i = 0; i < 8; i++) {
      direction = direction - Math.floor(direction / 360) * 360;
      if (
        tilestats[
          tilecode(
            currentx + directions[direction].x,
            currenty + directions[direction].y
          )
        ] != undefined &&
        !exists(
          currentx + directions[direction].x,
          currenty + directions[direction].y
        )
      ) {
        currentx += directions[direction].x;
        currenty += directions[direction].y;
        break;
      }
      console.log(direction);
      direction += 45;
    }
    pathgrid.push({ x: currentx, y: currenty });
    if (currentx == x2 && currenty == y2) {
      return pathgrid;
    }
  }

  return undefined;
}
function calcNation(context) {
  context.population = 0;
  context.food = 0;
  context.military = 0;
  context.resourcesgained = 0;
  context.m_personnel = 0;
  context.unemployed = context.currentpop;
  for (const army of context.armies) {
    context.unemployed -= army.personnel;
    context.military += army.personnel;
  }
  context.unemployed = Math.max(context.unemployed, 0);

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

  context.military += context.unemployed;
}
function checkrequires(context, range) {
  for (let i = range.min; i > range.max - 1; i--) {
    if (
      p.pieceROM[i].requires(context) &&
      context.unlocked[i] &&
      getRandomInt(0, 10) != 0
    ) {
      return i;
    }
  }
  return false;
}
function choosebuilding(context) {
  let btype = "";
  let building = "";
  const types = ["mine", "house", "military", "farm"];
  if (
    Math.ceil(context.gridstats.length / (128 / (context.wars.length + 1))) >
      context.armies.length &&
    context.unemployed > context.currentpop / 100
  ) {
    const random =
      context.gridstats[getRandomInt(0, context.gridstats.length - 1)]
        .positions[0];
    if (!random.disabled) {
      new army(context, random.x, random.y, {
        swords: Math.ceil(context.unemployed / 2),
        archers: Math.floor(context.unemployed / 2),
        calvery: 0,
      });
    }
  }
  if (context.resourcesgained < context.food && context.unemployed > 0&&checkrequires(context, { min: 16, max: 14 })) {
    building = checkrequires(context, { min: 16, max: 14 });
    btype = "mine";
  } else if (
    context.currentpop / context.population > 1.1 &&
    context.currentpop <= context.food&&checkrequires(context, { min: 3, max: 0 })
  ) {
    building = checkrequires(context, { min: 3, max: 0 });
    btype = "house";
  } else if (
    getRandomInt(0, 20) < 2 * (context.wars.length + 1) &&
    context.unemployed > 3
  ) {
    let lowestarmy = 0;
    for (const army of context.armies) {
      if (
        (lowestarmy === 0 || army.personnel < lowestarmy.personnel) &&
        army.animationStage == 0 &&
        borders[
          tilecode(Math.floor(army.position.x), Math.floor(army.position.y))
        ] != undefined &&
        borders[
          tilecode(Math.floor(army.position.x), Math.floor(army.position.y))
        ].id == context.id
      ) {
        lowestarmy = army;
      }
    }
    if (lowestarmy === 0) {
      return;
    }
    lowestarmy.troops.swords += Math.ceil(context.unemployed / 2);
    lowestarmy.troops.archers += Math.floor(context.unemployed / 2);
    lowestarmy.personnel += context.unemployed;
    calcNation(context);
    return;
    /*  building = checkrequires(context, { min: 12, max: 10 });
    btype = "military"; */
  } else if (context.cities.length < context.gridstats.length / 64) {
    building = 18;
    btype = "farm";
  } else {
    building = checkrequires(context, { min: 8, max: 5 });
    btype = "farm";
  }
  if (building === false) {
    return;
  }
  let times = 0;
  while (context.bordermaxes[btype].length < 1) {
    btype =
      types.indexOf(btype) + 2 > types.length
        ? types[0]
        : types[types.indexOf(btype) + 1];
    times += 1;
    if (times >= Object.keys(context.bordermaxes).length) {
      return;
    }
  }
  building = buildindices[building];
  const randindex = getRandomInt(0, context.bordermaxes[btype].length - 1);
  const rand = tiledecode(context.bordermaxes[btype][randindex]);
  const randdirection = [];

  if (
    buildstats[tilecode(rand.x + 1, rand.y)] == undefined &&
    tilestats[tilecode(rand.x + 1, rand.y)] != undefined &&
    !exists("river", rand.x + 1, rand.y) &&
    (borders[tilecode(rand.x + 1, rand.y)] == undefined ||
      borders[tilecode(rand.x + 1, rand.y)].id == context.id)
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
      borders[tilecode(rand.x, rand.y + 1)].id == context.id)
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
      borders[tilecode(rand.x - 1, rand.y)].id == context.id)
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
      borders[tilecode(rand.x, rand.y - 1)].id == context.id)
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
        context.drawposition = {
          x:
            rando.x -
            (iswidth.direction == "width" ? i : 0) -
            (rando.direction[1] ? dimensions.width - 1 : 0),
          y:
            rando.y -
            (iswidth.direction == "height" ? i : 0) -
            (rando.direction[2] ? dimensions.height - 1 : 0),
        };
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
  context.bordermaxes[btype].splice(randindex, 1);
}
function conquerborder(x, y, context) {
  for (let i = -2; i < 3; i++) {
    for (let j = -2; j < 3; j++) {
      ctx4.fillStyle = `rgba(${context.bordercolors.r},${context.bordercolors.g},${context.bordercolors.b},0.5)`;
      ctx4.clearRect(x + j, y + i, 1, 1);
      ctx4.fillRect(x + j, y + i, 1, 1);
      let mincity = {
        x: context.spawn.x,
        y: context.spawn.y,
        distance: Infinity,
      };
      for (const city of context.cities) {
        if (
          mincity == undefined ||
          distance(x + j, y + i, city.x, city.y) < mincity.distance
        ) {
          mincity = {
            distance: distance(x + j, y + i, city.x, city.y),
            x: city.x,
            y: city.y,
          };
        }
      }
      borders[tilecode(x + j, y + i)] = { id: context.id, city: mincity };
      if (buildstats[tilecode(x + j, y + i)] != undefined) {
        const n = getNationById(buildstats[tilecode(x + j, y + i)].id);
        if (
          !n.gridstats[
            n.buildingids.indexOf(buildstats[tilecode(x + j, y + i)].pointer)
          ].disabled &&
          context.wars.includes(
            n.gridstats[
              n.buildingids.indexOf(buildstats[tilecode(x + j, y + i)].pointer)
            ].id
          )
        ) {
          n.gridstats[
            n.buildingids.indexOf(buildstats[tilecode(x + j, y + i)].pointer)
          ].disabled = true;
          n.currentpop -=
            n.gridstats[
              n.buildingids.indexOf(buildstats[tilecode(x + j, y + i)].pointer)
            ].employmentrequired +
            Math.floor(
              n.gridstats[
                n.buildingids.indexOf(
                  buildstats[tilecode(x + j, y + i)].pointer
                )
              ].population / n.currentpop
            );

          for (const pos of n.gridstats[
            n.buildingids.indexOf(buildstats[tilecode(x + j, y + i)].pointer)
          ].positions) {
            buildstats[tilecode(pos.x, pos.y)].disabled = true;
          }
        }
      }
    }
  }

  for (let i = -3; i < 4; i++) {
    for (let j = -3; j < 4; j++) {
      addBorderLines(x + j, y + i);
    }
  }
}
function addBorderLines(x, y) {
  if (borders[tilecode(x, y)] != undefined) {
    if (
      borders[tilecode(x, y - 1)] == undefined ||
      borders[tilecode(x, y - 1)].id != borders[tilecode(x, y)].id ||
      borders[tilecode(x, y - 1)].city.x != borders[tilecode(x, y)].city.x ||
      borders[tilecode(x, y - 1)].city.y != borders[tilecode(x, y)].city.y
    ) {
      borderlines[tilecode(x, y) + "|up"] = {
        color: getNationById(borders[tilecode(x, y)].id).linecolors,
        id: borders[tilecode(x, y)].id,
      };
    } else if (borderlines[tilecode(x, y) + "|up"] != undefined) {
      delete borderlines[tilecode(x, y) + "|up"];
    }
    if (
      borders[tilecode(x + 1, y)] == undefined ||
      borders[tilecode(x + 1, y)].id != borders[tilecode(x, y)].id ||
      borders[tilecode(x + 1, y)].city.x != borders[tilecode(x, y)].city.x ||
      borders[tilecode(x + 1, y)].city.y != borders[tilecode(x, y)].city.y
    ) {
      borderlines[tilecode(x, y) + "|right"] = {
        color: getNationById(borders[tilecode(x, y)].id).linecolors,
        id: borders[tilecode(x, y)].id,
      };
    } else if (borderlines[tilecode(x, y) + "|right"] != undefined) {
      delete borderlines[tilecode(x, y) + "|right"];
    }
    if (
      borders[tilecode(x, y + 1)] == undefined ||
      borders[tilecode(x, y + 1)].id != borders[tilecode(x, y)].id ||
      borders[tilecode(x, y + 1)].city.x != borders[tilecode(x, y)].city.x ||
      borders[tilecode(x, y + 1)].city.y != borders[tilecode(x, y)].city.y
    ) {
      borderlines[tilecode(x, y) + "|down"] = {
        color: getNationById(borders[tilecode(x, y)].id).linecolors,
        id: borders[tilecode(x, y)].id,
      };
    } else if (borderlines[tilecode(x, y) + "|down"] != undefined) {
      delete borderlines[tilecode(x, y) + "|down"];
    }
    if (
      borders[tilecode(x - 1, y)] == undefined ||
      borders[tilecode(x - 1, y)].id != borders[tilecode(x, y)].id ||
      borders[tilecode(x - 1, y)].city.x != borders[tilecode(x, y)].city.x ||
      borders[tilecode(x - 1, y)].city.y != borders[tilecode(x, y)].city.y
    ) {
      borderlines[tilecode(x, y) + "|left"] = {
        color: getNationById(borders[tilecode(x, y)].id).linecolors,
        id: borders[tilecode(x, y)].id,
      };
    } else if (borderlines[tilecode(x, y) + "|left"] != undefined) {
      delete borderlines[tilecode(x, y) + "|left"];
    }
  }
}
function convertCity(context, context2, city, cityindex) {
  const alreadyConverted = [];
  for (const b of city.borders) {
    const bpos = tiledecode(b);

    borders[b].id = context.id;
    ctx4.fillStyle = `rgba(${context.bordercolors.r},${context.bordercolors.g},${context.bordercolors.b},0.5)`;
    ctx4.clearRect(bpos.x, bpos.y, 1, 1);
    ctx4.fillRect(bpos.x, bpos.y, 1, 1);

    if (
      buildstats[b] != undefined &&
      context.wars.includes(buildstats[b].id) &&
      !alreadyConverted.includes(buildstats[b].pointer)
    ) {
      const n = getNationById(buildstats[b].id);
      if (
        context.wars.includes(
          n.gridstats[n.buildingids.indexOf(buildstats[b].pointer)].id
        )
      ) {
        const convertb = structuredClone(
          n.gridstats[n.buildingids.indexOf(buildstats[b].pointer)]
        );
        n.currentpop -=
          convertb.employmentrequired +
          Math.floor(convertb.population / Math.max(n.currentpop, 1));
        context.currentpop +=
          convertb.employmentrequired +
          Math.floor(convertb.population / Math.max(n.currentpop, 1));
        alreadyConverted.push(buildstats[b].pointer);
        n.gridstats.splice(n.buildingids.indexOf(buildstats[b].pointer), 1);
        n.buildingids.splice(n.buildingids.indexOf(buildstats[b].pointer), 1);
        context.gridstats.push(convertb);
        for (const pos of convertb.positions) {
          buildstats[tilecode(pos.x, pos.y)].id = context.id;
          buildstats[tilecode(pos.x, pos.y)].pointer = context.buildid;
        }
        context.buildingids.push(context.buildid);
        context.buildid += 1;
      }
    }
  }
  for (const b of city.borders) {
    const bpos = tiledecode(b);

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (borders[tilecode(bpos.x + j, bpos.y + i)] == undefined) {
          continue;
        }
        if (borders[tilecode(bpos.x + j, bpos.y + i)].id != context.id) {
          continue;
        }
        addBorderLines(bpos.x + j, bpos.y + i);
      }
    }
  }

  context.cities.push(structuredClone(city));
  context2.cities.splice(cityindex, 1);
}
function declarepeace(nation, n) {
  nation.wars.splice(nation.wars.indexOf(n.id), 1);
  n.wars.splice(n.wars.indexOf(nation.id), 1);
  for (const army of nation.armies) {
    army.status = 0;
    army.destination.length = 0;
  }
  for (const army of n.armies) {
    army.status = 0;
    army.destination.length = 0;
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

      let mincity = {
        x: context.spawn.x,
        y: context.spawn.y,
        distance: Infinity,
      };

      let cIndex = 0;

      for (let k = 0; k < context.cities.length; k++) {
        const city = context.cities[k];
        if (
          mincity == undefined ||
          hexdistance(x + j, y + i, city.x, city.y) < mincity.distance
        ) {
          mincity = {
            distance: hexdistance(x + j, y + i, city.x, city.y),
            x: city.x,
            y: city.y,
          };
          cIndex = k;
        }
      }
      borders[tilecode(x + j, y + i)] = {
        id: context.id,
        city: { x: mincity.x, y: mincity.y },
      };

      if (
        context.cities.length > 0 &&
        !context.cities[cIndex].borders.includes(tilecode(x + j, y + i))
      ) {
        context.cities[cIndex].borders.push(tilecode(x + j, y + i));
      }
    }
  }
  for (let i = -2; i < 3; i++) {
    for (let j = -2; j < 3; j++) {
      if (borders[tilecode(x + j, y + i)] == undefined) {
        continue;
      }

      if (borders[tilecode(x + j, y + i)].id != context.id) {
        continue;
      }
      addBorderLines(x + j, y + i);
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
