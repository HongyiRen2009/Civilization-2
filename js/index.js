var rainthroughnum = 500;
var speedRainTrough = 25;
var RainTrough = [];

var rainnum = 200;
var rain = [];

var w = canvas2.width;
var h = canvas2.height;

function createRainTrough() {
  for (var i = 0; i < rainthroughnum; i++) {
    RainTrough[i] = {
      x: getRandomInt(0, w),
      y: getRandomInt(0, h),
      length: Math.floor(getRandomInt(1, 830)),
      opacity: Math.random() * 0.2,
      xs: getRandomInt(-2, 2),
      ys: getRandomInt(10, 20),
    };
  }
}

function createRain() {
  for (var i = 0; i < rainnum; i++) {
    rain[i] = {
      x: Math.random() * w,
      y: Math.random() * h,
      l: Math.random() * 1,
      // xs: -4 + Math.random() * 4 + 2, //random rain movement, more natural but no wind
      xs: Math.random() - 0.5,
      ys: Math.random() * 5,
    };
  }
}

function drawRain(i) {
  ctx2.globalCompositeOperation = "destination-over";
  ctx2.beginPath();
  ctx2.moveTo(rain[i].x, rain[i].y);
  switch (weather) {
    case 1:
      ctx2.lineTo(
        rain[i].x + rain[i].l * rain[i].xs,
        rain[i].y + rain[i].l * rain[i].ys
      );
      ctx2.strokeStyle = "rgba(174,194,224,0.5)";
      ctx2.lineWidth = 2;
      break;
    case 2:
      // ctx2.lineTo(rain[i].x + rain[i].l * rain[i].xs, rain[i].y + rain[i].l * rain[i].ys);
      ctx2.arc(rain[i].x, rain[i].y, 1, 0, 2 * Math.PI, false);
      ctx2.strokeStyle = "rgba(240, 242, 247,0.99)";
      ctx2.lineWidth = 4;
      break;

    case 3:
      // ctx2.lineTo(rain[i].x + rain[i].l * rain[i].xs, rain[i].y + rain[i].l * rain[i].ys);
      ctx2.arc(rain[i].x, rain[i].y, 1, 0, 2 * Math.PI, false);
      ctx2.strokeStyle = "rgba(255, 255, 255,0.99)";
      ctx2.lineWidth = 5;
  }

  ctx2.lineCap = "round";
  ctx2.stroke();
}

function animateRain() {
  for (var i = 0; i < rainnum; i++) {
    rain[i].x += rain[i].xs;
    rain[i].y += rain[i].ys;
    if (weather == 1) {
      rain[i].ys = Math.random() * 10 + 10;
    }
    if (weather == 2) {
      rain[i].ys = Math.random() * 10 + 5;
    }
    if (weather == 3) {
      rain[i].ys = Math.random() * 10 + 10;
    }
    if (rain[i].x > w || rain[i].y > h) {
      rain[i].x = Math.random() * w;
      rain[i].y = -20;
    }
    if (weather > 0) {
      drawRain(i);
    }
  }
}

function init() {
  createRainTrough();
  createRain();
  window.addEventListener("resize", createRainTrough);
}
init();

function animloop() {
  if (psettings.noweather) {
    return;
  }
  if (weather == 0) {
    return;
  } else {
    ctx2.clearRect(0, 0, screen.width, screen.height);
    animateRain();
    requestAnimationFrame(animloop);
    if (weather == 1) {
      raintimer = 2;
    } else if (weather == 2) {
      raintimer = 1;
    } else if (weather == 3) {
      raintimer = 2;
    }
  }
}

function createSimpleTable(rows) {
  const table = document.createElement("table");
  const tableBody = document.createElement("tbody");

  for (const row of rows) {
    const tableRow = document.createElement("tr");
    tableBody.appendChild(tableRow);

    row.forEach((content) => {
      const tableCell = document.createElement("th");
      tableCell.innerText = content;

      tableRow.appendChild(tableCell);
    });
  }

  table.appendChild(tableBody);

  return table;
}
function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function difficultyscreen() {
  document.getElementById("difficulty-flex").style.display = "grid";
  document.getElementById("back_button").hidden = false;
  document.getElementById("back_button").onclick = function () {
    menu();
  };
  document.getElementById("title_start").innerHTML = "Select Difficulty";
  document.getElementById("start-flex").style.display = "none";
  document.getElementById("bgimg").style.display = "none";
  canvas.style.display = "none";
  canvas2.style.display = "none";
}
function pause_menu() {
  document.getElementById("popup_block_buttons").style.display = "block";
  pause = document.getElementById("pause_flex");
  pause.style.display = "flex";
  pause.style.animation = "none";
  pause.style.animation = "pause 1s";
}
function unpause() {
  document.getElementById("popup_block_buttons").style.display = "none";
  document.getElementById("pause_flex").style.display = "none";
}
function settings(ifmenu = true) {
  document.getElementById("difficulty-flex").style.display = "none";
  document.getElementById("bgimg").style.display = "none";
  document.getElementById("popup_block_buttons").style.display = "none";
  document.getElementById("pause_flex").style.display = "none";
  document.getElementById("settings-flex").style.display = "flex";
  document.getElementById("back_button").hidden = false;
  document.getElementById("back_button").onclick = function () {
    ifmenu ? menu() : start();
  };
  document.getElementById("title_start").style.display = "block";
  document.getElementById("title_start").innerHTML = "Settings";
  document.getElementById("start-flex").style.display = "none";
  document.getElementById("stats").style.display = "none";
  document.getElementById("select-grid").style.display = "none";
  canvas.style.display = "none";
  canvas2.style.display = "none";
}
function pause_menu() {
  document.getElementById("popup_block_buttons").style.display = "block";
  pause = document.getElementById("pause_flex");
  pause.style.display = "flex";
  pause.style.animation = "none";
  pause.style.animation = "pause 1s";
}
function unpause() {
  document.getElementById("popup_block_buttons").style.display = "none";
  document.getElementById("pause_flex").style.display = "none";
}

function confirmclear(index) {
  confirmation[2].choosetext(index);
  displaypopup(2, confirmation);
}
function clearsave(index) {
  localStorage.removeItem("griditems" + index);
  localStorage.removeItem("scrollinfo" + index);
  localStorage.removeItem("pstats" + index);
  localStorage.removeItem("slot" + index);
  localStorage.removeItem("marketmod" + index);
  localStorage.removeItem("marketitems" + index);
  localStorage.removeItem("marketstats" + index);
}
function info() {
  document.body.style.overflowY = "scroll";
  ispainting = false;
  removing = false;
  repairing = false;
  canvas.style.display = "none";
  canvas2.style.display = "none";
  document.getElementById("info-flex").innerHTML = "";
  document.getElementById("info").style.display = "flex";
  document.getElementById("boss_health_container").style.display = "none";
  document.getElementById("difficulty-flex").style.display = "none";
  document.getElementById("back_button").hidden = false;
  document.getElementById("back_button").onclick = function () {
    start();
  };
  document.getElementById("stats").style.display = "none";
  document.getElementById("select-grid").style.display = "none";
  ctx.clearRect(0, 0, screen.width, screen.height);
  document.getElementById("save-flex").style.display = "none";

  const statflex = document.getElementById("stat-info");
  statflex.innerHTML = "";
  const stats = [
    {
      title: "Population",
      description: "",
      choosetext() {
        this.description = `The people in your village, who can be employed to preform important tasks.<br>Population: ${currentpop}`;
      },
    },
    {
      title: "Food",
      description: "",
      choosetext() {
        this.description = `A neccessity for survival, your population grows if there is more food than people.<br>Food Production: ${food}<br>Population Gain: ${Math.max(
          -2 - Math.ceil(currentpop / 5),
          Math.min(1 + Math.ceil(currentpop / 5), food - currentpop)
        )}`;
      },
    },

    {
      title: "Resources",
      description: "",
      choosetext() {
        this.description = `The building blocks of construction, all buildings require resources to construct.<br>Resource Production: ${resourcesgained}`;
      },
    },
    {
      title: "Unemployed",
      description: "",
      choosetext() {
        this.description = `The people who aren't employed. Most buildings require operators.<br>Amount Unemployed: ${unemployed}`;
      },
    },
    {
      title: "Military",
      description: "",
      choosetext() {
        this.description = `The power of your military. All unemployed people serve in the military<br>Military Power: ${military}`;
      },
    },
    {
      title: "Wisdom",
      description: "",
      choosetext() {
        this.description = `The accumulated wisdom of your village. Once the wisom bar fills up, it's converted into research points, which can be used to unlock tech.<br>Progress to Next Level: ${(
          xp / totalxp
        ).toFixed(2)}%`;
      },
    },
  ];
  for (const stat of stats) {
    const statf = document.createElement("div");

    const stattitle = document.createElement("h1");
    const statdes = document.createElement("p");
    stat.choosetext();
    stattitle.style.textAlign = "center";
    statdes.style.textAlign = "center";
    stattitle.innerHTML = stat.title;
    statdes.innerHTML = stat.description;
    statf.appendChild(stattitle);
    statf.appendChild(statdes);
    statflex.appendChild(statf);
  }
  for (const building of p.pieceROM) {
    const grid = document.createElement("div");
    grid.className = "info-grid";

    const title = document.createElement("h1");
    title.className = "infotext";
    title.innerHTML = building.name;
    title.style.gridColumn = 3;
    grid.appendChild(title);
    const des = document.createElement("p");
    des.style.gridRow = 2;
    des.style.gridColumn = "3/ span 3";
    if (building.unlocked) {
      const buildcanvas = document.createElement("canvas");
      buildcanvas.style.gridRow = 1;
      buildcanvas.style.gridColumn = 2;
      buildcanvas.style.width = 80;
      buildcanvas.style.height = 80;
      const bctx = buildcanvas.getContext("2d");
      for (const pos of building.piecepositions) {
        bctx.drawImage(
          buildimg,
          pos.img.dx,
          pos.img.dy,
          20,
          20,
          (pos.x + 2) * 20,
          (pos.y + 2) * 20,
          20,
          20
        );
      }
      grid.appendChild(buildcanvas);
      des.innerHTML = building.description;
    } else {
      des.innerHTML = "???";
      grid.style.opacity = 0.7;
      title.style.opacity = 0.7;
      des.style.opacity = 0.7;
      grid.style.backgroundColor = "rgb(69, 62, 62)";
    }
    des.className = "infotext";
    grid.appendChild(des);

    document.getElementById("info-flex").appendChild(grid);
  }
}
function menu() {
  build_music.pause();
  war_music.pause();
  boss_music.pause();
  market_music.pause();
  removing = false;
  ispainting = false;
  repairing = false;
  istutorial = false;
  document.getElementById("achievement-flex").style.display = "none";
  document.getElementById("bgimg").style.display = "block";
  document.getElementById("title_start").style.display = "block";
  document.getElementById("difficulty-flex").style.display = "none";
  document.getElementById("settings-flex").style.display = "none";
  document.getElementById("title_start").innerHTML = "Dawn of Civilization";
  document.getElementById("back_button").hidden = true;
  document.getElementById("boss_health_container").style.display = "none";
  document.getElementById("stats").style.display = "none";
  document.getElementById("start-flex").style.display = "grid";
  document.body.style.overflow = "hidden";
  document.getElementById("select-grid").style.display = "none";
  ctx.clearRect(0, 0, screen.width, screen.height);
  document.getElementById("save-flex").style.display = "none";
  canvas.style.display = "none";
  canvas2.style.display = "none";
}
function savescreen(save) {
  removing = false;
  ispainting = false;
  repairing = false;

  document.getElementById("back_button").hidden = false;
  const ele = document.getElementsByClassName("save_button");

  i = 1;
  for (const el of ele) {
    el.disabled = false;
    el.innerHTML = "Save Game";
    el.onclick = function () {
      savegame(el.id);
    };
    i++;
  }
  const ele2 = document.getElementsByClassName("clear_button");
  i = 1;
  for (const el of ele2) {
    if (localStorage.getItem("pstats" + i) == null) {
      el.disabled = true;
    } else {
      el.disabled = false;
    }
    i++;
  }
  if (!save) {
    document.getElementById("back_button").onclick = function () {
      menu();
    };
    const ele = document.getElementsByClassName("save_button");
    const ele2 = document.getElementsByClassName("clear_button");
    i = 1;
    for (const el of ele2) {
      if (localStorage.getItem("pstats" + i) == null) {
        el.disabled = true;
      } else {
        el.disabled = false;
      }
      i++;
    }
    i = 1;
    for (const el of ele) {
      el.innerHTML = "Load Game";
      el.onclick = function () {
        load(el.id);
      };
      if (localStorage.getItem("pstats" + i) == null) {
        el.disabled = true;
      }
      i++;
    }
  } else {
    document.getElementById("back_button").onclick = function () {
      start();
    };
  }
  for (i = 1; i < 6; i++) {
    const localstats = JSON.parse(localStorage.getItem("pstats" + i));
    const ele = document.getElementsByClassName("savedes" + i)[0];
    if (localStorage.getItem("pstats" + i) != null) {
      difficultyname = {
        1.2: "copper",
        1.5: "iron",
        1.8: "diamond",
        2: "eternity",
      }[localstats.difficultymultiplier];

      // remove all children of `ele`
      // https://stackoverflow.com/a/3955238/13996389
      while (ele.lastChild) {
        ele.removeChild(ele.lastChild);
      }

      ele.appendChild(
        createSimpleTable([
          ["difficulty:", difficultyname],
          ["year:", shorten(localstats.difficulty)],
          ["population:", shorten(localstats.currentpop)],
          ["resources:", shorten(localstats.resources)],
          ["military:", shorten(localstats.military)],
        ])
      );
    } else {
      ele.innerHTML = "Empty Slot";
    }
  }
  clearInterval(interval)
  document.getElementById("title_start").style.display = "block";
  document.getElementById("title_start").innerHTML = "Select Save";
  document.getElementById("stats").style.display = "none";
  document.getElementById("bgimg").style.display = "none";
  document.getElementById("start-flex").style.display = "none";
  document.getElementById("select-grid").style.display = "none";
  ctx.clearRect(0, 0, screen.width, screen.height);
  document.getElementById("save-flex").style.display = "grid";
  document.getElementById("boss_health_container").style.display = "none";
  canvas.style.display = "none";
  canvas2.style.display = "none";
}
function techscreen() {
  if (istutorial && tutorialindex == 16) {
    continuetutorial(++tutorialindex);
  }

  ispainting = false;
  removing = false;
  repairing = false;
  build_music.pause();
  war_music.pause();
  boss_music.pause();
  tech_music.play();
  document.getElementById("info").style.display = "none";
  document.body.overflowY = "scroll";
  document.getElementById("techbutton").style.animation = "none";
  document.getElementById("difficulty-flex").style.display = "none";
  document.getElementById("tech-tree").style.display = "grid";
  document.getElementById("back_button").hidden = false;
  canvas.style.display = "none";
  canvas2.style.display = "none";
  document.getElementById("back_button").onclick = function () {
    start();
  };
  document.getElementById("stats").style.display = "none";
  document.getElementById("boss_health_container").style.display = "none";
  document.getElementById("select-grid").style.display = "none";
  ctx.clearRect(0, 0, screen.width, screen.height);
  document.getElementById("save-flex").style.display = "none";
  const categories = [
    "Farming",
    "Farming II",
    "Housing",
    "Housing II",
    "Mining",
    "Mining II",
    "Intelligence",
    "Intelligence II",
    "Virtue",
    "Virtue II",
    "Military",
    "Military II",
  ];
  const techgrid = document.getElementById("tech-tree");
  const linecontainer = document.getElementById("techlinecontainer");
  linecontainer.style.display = "block";
  linecontainer.innerHTML = "";
  techgrid.innerHTML = "";

  const techelements = [];
  const descriptioncontainer = document.createElement("div");
  const destitle = document.createElement("h1");
  const cost = document.createElement("p");
  const tier = document.createElement("p");
  const points = document.createElement("p");
  const ifyears = document.createElement("p");
  const reserachbutton = document.createElement("button");
  const years = document.createElement("div");

  points.innerHTML = "Research Points:<br> " + research_points;
  destitle.style.gridRow = "1";
  destitle.style.gridColumn = "2";
  points.style.gridRow = "1";
  points.style.gridColumn = "4";
  points.style.fontSize = "20px";
  points.id = "research-points";
  cost.style.gridRow = "1";
  cost.style.gridColumn = "3";
  cost.style.fontSize = "20px";
  tier.style.gridRow = "1";
  tier.style.gridColumn = "2";
  tier.style.marginTop = "auto";
  tier.style.fontSize = "20px";
  document.body.style.overflowY = "scroll";
  const des = document.createElement("p");
  des.style.gridRow = "2";
  ifyears.style.gridRow = "2";
  ifyears.style.gridColumn = "2";
  reserachbutton.style.gridColumn = "3";
  reserachbutton.style.gridRow = "2";
  reserachbutton.style.maxWidth = "100px";
  reserachbutton.style.maxHeight = "40px";
  reserachbutton.hidden = true;
  des.style.gridColumn = "2";
  years.className = "techyears";
  years.style.gridTemplateRows =
    ((screen.height - 400) / tech.length + "px ").repeat(tech.length) + "200px";
  years.style.gridRow = "1/ span " + tech.length + 1;
  years.style.gridColumn = categories.length + 1;
  for (i = 0; i < 3; i++) {
    const yeardes = document.createElement("p");
    yeardes.style.verticalAlign = "top";
    switch (i) {
      case 0:
        yeardes.innerHTML =
          "<h1 style = 'font-size:20px'>Tribal-Age</h1>years 5-10";
        yeardes.style.gridRow = 1;
        break;
      case 1:
        yeardes.innerHTML =
          "<h1 style = 'font-size:20px'>Pre-Diplomacy</h1>years 10-40";
        yeardes.style.gridRow = 2;
        break;
      case 2:
        yeardes.innerHTML =
          "<h1 style = 'font-size:20px'>Post_Diplomacy</h1>years 40-infinity";
        yeardes.style.gridRow = 4;
        break;
    }
    years.appendChild(yeardes);
  }
  descriptioncontainer.className = "techcontainer";
  descriptioncontainer.style.gridColumn = `1/ span ${categories.length + 1}`;
  descriptioncontainer.style.gridRow = tech.length + 1;
  descriptioncontainer.appendChild(destitle);
  descriptioncontainer.appendChild(des);
  descriptioncontainer.appendChild(cost);
  descriptioncontainer.appendChild(ifyears);
  descriptioncontainer.appendChild(reserachbutton);
  descriptioncontainer.appendChild(points);
  descriptioncontainer.appendChild(tier);
  techgrid.appendChild(years);

  techgrid.style.gridTemplateColumns =
    `${(screen.width * 0.8) / categories.length}px `.repeat(categories.length) +
    "160px";
  techgrid.style.gridTemplateRows =
    ((screen.height - 400) / tech.length + "px ").repeat(tech.length) + "200px";
  const techrect = techgrid.getBoundingClientRect();
  linecontainer.setAttribute("height", techrect.height);
  linecontainer.setAttribute("width", techrect.width);
  techgrid.appendChild(descriptioncontainer);
  descriptioncontainer.addEventListener("mouseover", function () {
    descriptioncontainer.classList.add("hover");
  });
  descriptioncontainer.addEventListener("mouseout", function () {
    descriptioncontainer.classList.remove("hover");
  });

  techgrid.onclick = function () {
    if (!descriptioncontainer.classList.contains("hover")) {
      const techoptions = document.getElementsByClassName("techbutton");
      destitle.innerHTML = "";
      des.innerHTML = "";
      cost.innerHTML = "";
      tier.innerHTML = "";
      reserachbutton.hidden = true;
      let isimage = 0;
      for (const el of techoptions) {
        if (el.classList.contains("hover")) {
          techclick.play();
          el.style.border = "4px solid yellow";
          const techindex = JSON.parse(el.id);
          reserachbutton.hidden = false;
          destitle.innerHTML = tech[techindex[0]][techindex[1]].name;
          des.innerHTML = tech[techindex[0]][techindex[1]].description;

          reserachbutton.innerHTML = "Research";
          if (
            tech[techindex[0]][techindex[1]].tier <
              tech[techindex[0]][techindex[1]].maxtier ||
            tech[techindex[0]][techindex[1]].maxtier == -1
          ) {
            tier.innerHTML = `<strong> Tier: ${
              tech[techindex[0]][techindex[1]].tier
            }</strong>`;
          } else {
            tier.innerHTML = `<strong class= 'color-g'> Tier: ${
              tech[techindex[0]][techindex[1]].tier
            } (MAXED OUT)</strong>`;
          }
          cost.innerHTML = `<strong class = 'color-${
            research_points >= tech[techindex[0]][techindex[1]].cost ? "g" : "r"
          }'> Research cost: ${tech[techindex[0]][techindex[1]].cost}</strong>`;
          reserachbutton.disabled = !(
            research_points >= tech[techindex[0]][techindex[1]].cost &&
            (tech[techindex[0]][techindex[1]].maxtier >
              tech[techindex[0]][techindex[1]].tier ||
              tech[techindex[0]][techindex[1]].maxtier == -1)
          );
          for (const el of tech[techindex[0]][techindex[1]].requires) {
            if (tech[el[0]][el[1]].tier == 0) {
              reserachbutton.disabled = true;
              break;
            }
          }
          switch (techindex[0]) {
            case 0:
              if (difficulty < 5) {
                reserachbutton.disabled = true;
                des.innerHTML =
                  des.innerHTML +
                  "<br><strong class = 'color-r'>Must be in Tribal Age</strong>";
              }
              break;
            case 1:
              if (difficulty < 10) {
                reserachbutton.disabled = true;
                des.innerHTML =
                  des.innerHTML +
                  "<br><strong class = 'color-r'>Must be in Pre-Diplomacy Age</strong>";
              }
              break;
            case 2:
              if (difficulty < 10) {
                reserachbutton.disabled = true;
                des.innerHTML =
                  des.innerHTML +
                  "<br><strong class = 'color-r'>Must be in Pre-Diplomacy Age</strong>";
              }
              break;
            case 3:
              if (difficulty < 40) {
                reserachbutton.disabled = true;
                des.innerHTML =
                  des.innerHTML +
                  "<br><strong class = 'color-r'>Must be in Post-Diplomacy Age</strong>";
              }
              break;
            case 4:
              if (difficulty < 40) {
                reserachbutton.disabled = true;
                des.innerHTML =
                  des.innerHTML +
                  "<br><strong class = 'color-r'>Must be in Post-Diplomacy Age</strong>";
              }
              break;
            case 5:
              if (difficulty < 40) {
                reserachbutton.disabled = true;
                des.innerHTML =
                  des.innerHTML +
                  "<br><strong class = 'color-r'>Must be in Post-Diplomacy Age</strong>";
              }
              break;
          }
          const whichimage = isimage;

          reserachbutton.onclick = function () {
            techbuy.play();
            const success = document.createElement("h1");
            success.className = "status";
            success.style.animation = "none";
            success.offsetHeight; /* trigger reflow */
            success.style.animation = null;
            document.body.appendChild(success);
            success.innerHTML =
              "<strong class = 'color-g'>Tech Researched</strong>";
            research_points -= tech[techindex[0]][techindex[1]].cost;
            tech[techindex[0]][techindex[1]].effect();
            tech[techindex[0]][techindex[1]].tier++;
            document.getElementById("research-points").innerHTML =
              "Research Points:<br> " + research_points;
            if (
              tech[techindex[0]][techindex[1]].tier <
                tech[techindex[0]][techindex[1]].maxtier ||
              tech[techindex[0]][techindex[1]].maxtier == -1
            ) {
              tier.innerHTML = `<strong> Tier: ${
                tech[techindex[0]][techindex[1]].tier
              }</strong>`;
            } else {
              tier.innerHTML = `<strong class= 'color-g'> Tier: ${
                tech[techindex[0]][techindex[1]].tier
              } (MAXED OUT)</strong>`;
            }

            tech[techindex[0]][techindex[1]].unlocked = true;
            destitle.innerHTML = tech[techindex[0]][techindex[1]].name;
            des.innerHTML = tech[techindex[0]][techindex[1]].description;

            techelements[whichimage].image.style.filter = "brightness(100%)";
            cost.innerHTML = `<strong class = 'color-${
              research_points >= tech[techindex[0]][techindex[1]].cost
                ? "g"
                : "r"
            }'> Research cost: ${
              tech[techindex[0]][techindex[1]].cost
            }</strong>`;

            reserachbutton.disabled = !(
              research_points >= tech[techindex[0]][techindex[1]].cost &&
              (tech[techindex[0]][techindex[1]].maxtier >
                tech[techindex[0]][techindex[1]].tier ||
                tech[techindex[0]][techindex[1]].maxtier == -1)
            );
            success.style.animation = "done 2s linear 0s 1 normal forwards";

            displayUI();
            document.getElementById("boss_health_container").style.display =
              "none";
            setTimeout(function () {
              success.remove();
            }, 2000);
          };
        } else {
          el.style.border = "4px solid black";
        }
        isimage++;
      }
    }
  };
  for (i = 0, len = tech.length; i < len; i++) {
    for (let j = 0, leng = tech[i].length; j < leng; j++) {
      const techoption = document.createElement("button");
      techoption.style.gridRow = i + 1;
      techoption.style.gridColumn = categories.indexOf(tech[i][j].category) + 1;
      techoption.className = "techbutton";
      techoption.id = JSON.stringify([i, j]);
      const image = document.createElement("img");
      techoption.addEventListener("mouseover", function () {
        techoption.classList.add("hover");
      });
      techoption.addEventListener("mouseout", function () {
        techoption.classList.remove("hover");
      });
      if (tech[i][j].tier >= 1) {
        image.style.filter = "brightness(100%)";
      } else {
        image.style.filter = "brightness(30%)";
      }
      techgrid.appendChild(techoption);

      image.src = tech[i][j].image;

      image.style.width = "30px";
      image.style.height = "30px";
      image.style.position = "relative";
      image.style.bottom = "0.5px";
      image.style.right = "1px";
      techoption.appendChild(image);

      for (const el of tech[i][j].requires) {
        let techelement = null;

        for (const teposition of techelements) {
          if (
            el[0] == teposition.techposition[0] &&
            el[1] == teposition.techposition[1]
          ) {
            techelement = teposition;
          }
        }

        const techline = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );

        const thisposition = techoption.getBoundingClientRect();
        const thatposition = techelement.element.getBoundingClientRect();

        techline.setAttribute("x1", thisposition.x + 17.5);
        techline.setAttribute("y1", thisposition.y + 17.5);
        techline.setAttribute("x2", thatposition.x + 17.5);
        techline.setAttribute("y2", thatposition.y + 17.5);
        techline.style.stroke = "black";
        techline.style.strokeWidth = "2";
        linecontainer.append(techline);
      }

      techelements.push({
        image: image,
        element: techoption,
        techposition: [i, j],
      });
    }
  }
}

function savegame(bindex) {
  confirmation[0].choosetext(bindex);
  displaypopup(0, confirmation);
}
function save(bindex) {
  window.onbeforeunload = null;

  const localtier = [];
  for (const un of tech) {
    for (const unn of un) {
      localtier.push({ tier: unn.tier, description: unn.description });
    }
  }
  save_slot = bindex;
  const localmarketstats = [];
  for (const item of m.marketselections) {
    localmarketstats.push({
      price: item.price,
      amountincrease: item.amountincrease,
      stock: item.stock,
    });
  }
  localStorage.setItem(
    "griditems" + bindex,
    JSON.stringify({ grid, roadgrid, buildgrid, gridstats })
  );
  localStorage.setItem(
    "scrollinfo" + bindex,
    JSON.stringify([scrollX, scrollY, spawnX, spawnY, max])
  );
  localStorage.setItem(
    "pstats" + bindex,
    JSON.stringify({
      localtier,
      siege,
      weathermod,
      cities: p.cities,
      wars,
      megatemple,
      xp,
      totalxp,
      techstats,
      research_points,
      difficultymultiplier,
      unlocked,
      luck,
      buildingamounts,
      temporaryeffects,
      reputation,
      difficulty,
      modifiers,
      currentpop,
      military,
      resources,
      outofrange,
    })
  );
  localStorage.setItem("slot" + bindex, JSON.stringify(save_slot));
  localStorage.setItem(
    "marketmod" + bindex,
    JSON.stringify([
      m.assissin,
      m.spy,
      m.rebel,
      m.phase,
      m.bhealth,
      m.totalbhealth,
      m.scout,
      m.shield,
    ])
  );
  localStorage.setItem(
    "marketstats" + bindex,
    JSON.stringify(localmarketstats)
  );
  localStorage.setItem("marketitems" + bindex, JSON.stringify(marketitems));

  document.getElementById("save-flex").style.display = "none";
  start();
}
function load(bindex) {
  buildingamounts.length = 0;
  gridstats.length = 0;
  grid.length = 0;
  marketitems.length = 0;
  unlocked.length = 0;
  wars.length = 0;
  p.cities.length = 0;
  for (const el of JSON.parse(localStorage.getItem("griditems" + bindex))
    .grid) {
    grid.push(el);
  }
  const localmarketstats = JSON.parse(
    localStorage.getItem("marketstats" + bindex)
  );
  for (i = 0; i < m.marketselections.length; i++) {
    m.marketselections[i].price = localmarketstats[i].price;
    m.marketselections[i].amountincrease = localmarketstats[i].amountincrease;
    m.marketselections[i].stock = localmarketstats[i].stock;
  }
  const localscrolldata = JSON.parse(
    localStorage.getItem("scrollinfo" + bindex)
  );
  resources = JSON.parse(localStorage.getItem("pstats" + bindex)).resources;
  weathermod = JSON.parse(localStorage.getItem("pstats" + bindex)).weathermod;
  currentpop = JSON.parse(localStorage.getItem("pstats" + bindex)).currentpop;
  reputation = JSON.parse(localStorage.getItem("pstats" + bindex)).reputation;
  xp = JSON.parse(localStorage.getItem("pstats" + bindex)).xp;
  totalxp = JSON.parse(localStorage.getItem("pstats" + bindex)).totalxp;
  siege = JSON.parse(localStorage.getItem("pstats" + bindex)).siege;
  megatemple = JSON.parse(localStorage.getItem("pstats" + bindex)).megatemple;
  outofrange = JSON.parse(localStorage.getItem("pstats" + bindex)).outofrange;
  for (const war of JSON.parse(localStorage.getItem("pstats" + bindex)).wars) {
    wars.push(war);
  }
  for (const obj in JSON.parse(localStorage.getItem("pstats" + bindex))
    .techstats) {
    techstats[obj] = JSON.parse(
      localStorage.getItem("pstats" + bindex)
    ).techstats[obj];
  }

  for (const obj in JSON.parse(localStorage.getItem("griditems" + bindex))
    .roadgrid) {
    roadgrid[obj] = JSON.parse(
      localStorage.getItem("griditems" + bindex)
    ).roadgrid[obj];
  }

  i = 0;
  for (const un of tech) {
    for (const unn of un) {
      unn.tier = JSON.parse(localStorage.getItem("pstats" + bindex)).localtier[
        i
      ].tier;

      unn.description = JSON.parse(
        localStorage.getItem("pstats" + bindex)
      ).localtier[i].description;
      i += 1;
    }
  }

  research_points = JSON.parse(
    localStorage.getItem("pstats" + bindex)
  ).research_points;

  for (const el of JSON.parse(localStorage.getItem("griditems" + bindex))
    .gridstats) {
    gridstats.push(el);
  }

  const localmod = JSON.parse(
    localStorage.getItem("pstats" + bindex)
  ).modifiers;
  for (const el of JSON.parse(localStorage.getItem("pstats" + bindex))
    .temporaryeffects) {
    temporaryeffects.push(el);
  }
  save_slot = JSON.parse(localStorage.getItem("slot" + bindex));
  difficulty = JSON.parse(localStorage.getItem("pstats" + bindex)).difficulty;
  for (const increa in JSON.parse(localStorage.getItem("pstats" + bindex))
    .cities) {
    p.cities[increa] = JSON.parse(
      localStorage.getItem("pstats" + bindex)
    ).cities[increa];
  }
  difficultymultiplier = JSON.parse(
    localStorage.getItem("pstats" + bindex)
  ).difficultymultiplier;
  for (const el of JSON.parse(localStorage.getItem("pstats" + bindex))
    .buildingamounts) {
    buildingamounts.push(el);
  }
  i = 0;
  for (const el of JSON.parse(localStorage.getItem("pstats" + bindex))
    .unlocked) {
    unlocked.push(el);
    p.pieceROM[i].unlocked = el;
    i++;
  }
  for (const el of JSON.parse(localStorage.getItem("marketitems" + bindex))) {
    marketitems.push(el);
  }
  luck = JSON.parse(localStorage.getItem("luck" + bindex));
  weathermod = Math.sin(difficulty / 3) / 10;
  if (weathermod > 0.05) {
    weather = 1;
  } else if (weathermod < -0.05) {
    weather = 2;
  } else if (Math.random() > 0.95) {
    weather = 3;
  } else {
    weather = 0;
  }
  animloop();
  const localmarketmod = JSON.parse(localStorage.getItem("marketmod" + bindex));
  m.assissin = localmarketmod[0];
  m.spy = localmarketmod[1];
  m.rebel = localmarketmod[2];
  m.phase = localmarketmod[3];
  m.bhealth = localmarketmod[4];
  m.totalbhealth = localmarketmod[5];
  m.scout = localmarketmod[6];
  m.shield = localmarketmod[7];
  if (m.phase > 0) {
    m.marketselections[m.marketselections.length - 1].stock = 0;
  }
  let j = 0;
  spawnX = localscrolldata[2];
  spawnY = localscrolldata[3];
  scrollX = localscrolldata[0];
  scrollY = localscrolldata[1];
  max.up = localscrolldata[4].up;
  max.down = localscrolldata[4].down;
  max.left = localscrolldata[4].left;
  max.right = localscrolldata[4].right;

  if (gridstats.length > 0 || Object.keys(roadgrid).length > 0) {
    first_turn = false;
  }
  modifiers.food = localmod.food;
  modifiers.population = localmod.population;
  modifiers.resources = localmod.resources;
  modifiers.military = localmod.military;
  document.getElementById("year_label").innerHTML = "Year: " + difficulty;
  displaytab();
  displayUI();
  start();
}
function newgame(difficult) {
  window.onbeforeunload = function () {
    return "hi";
  };
  for (const stat in techstats) {
    if (typeof techstats[stat] === "boolean") {
      techstats[stat] = false;
    } else {
      techstats[stat] = 0;
    }
  }
  for (i = 0; i < tech.length; i++) {
    for (j = 0; j < tech[i].length; j++) {
      tech[i][j].tier = 0;
    }
  }
  gridstats.length = 0;
  grid.length = 0;
  weathermod = 0;
  weather = 0;
  wars.length = 0;
  displaytab();
  temporaryeffects.length = 0;
  buildingamounts.length = 0;
  punishamount = 0;
  spawnX = getRandomInt(500, 700);
  spawnY = getRandomInt(500, 700);
  scrollX = spawnX;
  scrollY = spawnY;
  difficulty = 0;
  for (i = 0; i < p.pieceROM.length; i++) {
    buildingamounts.push(0);
  }
  dev.removemax();
  modifiers = {
    population: 0,
    food: 15 - difficult * 10,
    resources: 15 - difficult * 10,
    military: 0,
  };
  first_turn = true;
  save_slot = null;
  resources = 10 + (difficult <= 2 ? 2 : 0);
  difficulty = 0;
  difficultymultiplier = difficult;
  currentpop = 2;
  unemployed = 2;
  military = 0;
  xp = 0;
  totalxp = 50;

  p.cities.length = 0;
  m.assissin = 0;
  m.spy = 0;
  m.rebel = 0;
  m.phase = 0;
  m.bhealth = 0;
  m.totalbhealth = 0;
  m.scout = false;
  m.shield = 0;
  grid.length = 0;
  buildgrid.length = 0;
  gridstats.length = 0;
  for(let i=0;i<tech.length;i++){
    tech[i].description=defreset[i]
}
  for(let i=0,len=p.pieceROM.length;i<len;i++){
    unlocked[i]=reset[i]
    p.pieceROM[i].unlocked=reset[i]
  }
  for (i = 0; i < worldD; i++) {
    grid.push([]);
  }
  for (i = 0; i < worldD; i++) {
    buildgrid.push([]);
  }

  selectmarketitems();

  const spawnpoint = {
    x: spawnX + Math.floor(widthmax / 2),
    y: spawnY + Math.floor(heightmax / 2),
  };

  generateIsland(
    spawnpoint.x,
    spawnpoint.y,
    getRandomInt(100, 200),
    getRandomInt(100, 200),
    true
  );
  /* 
 	let xspawn = 100
	let yspawn = 200
	for (let h=0,rand=getRandomInt(150,300);h<rand;h++){
		
		generateIsland(xspawn+getRandomInt(-30,30),yspawn+getRandomInt(-30,30), getRandomInt(40,80),getRandomInt(40,80))
	
			xspawn+=200
		if (xspawn>3000){
			xspawn=200
			yspawn+=200
		}
		
		
	} */
  seed = Math.random() * 10 ** 20;
  perlin = new Perlin(nodes[0], nodes[0], seed);
  perlin2 = new Perlin(nodes[1], nodes[1], seed + 1);
  perlin3 = new Perlin(nodes[2], nodes[2], seed + 2);
  perlin4 = new Perlin(nodes[3], nodes[3], seed + 3);
  perlin5 = new Perlin(nodes[4], nodes[4], seed + 4);
  perlin6 = new Perlin(nodes[5], nodes[5], seed + 5);
  perlin7 = new Perlin(nodes[6], nodes[6], seed + 6);
  perlin8 = new Perlin(nodes[7], nodes[7], seed + 7);
  perlin9 = new Perlin(nodes[5], nodes[5], seed + 8);
  perlin10 = new Perlin(nodes[6], nodes[6], seed + 9);
  perlin11 = new Perlin(nodes[7], nodes[7], seed + 10);
  perlin12 = new Perlin(nodes[8], nodes[8], seed + 11);
  perlin13 = new Perlin(nodes[9], nodes[9], seed + 12);
  perlin14 = new Perlin(nodes[10], nodes[10], seed + 13);
  perlin15 = new Perlin(nodes[11], nodes[11], seed + 14);
  perlin16 = new Perlin(nodes[12], nodes[12], seed + 15);
  perlin17 = new Perlin(nodes[14], nodes[14], seed + 16);
  perlin18 = new Perlin(nodes[13], nodes[13], seed + 16);
  generaterivers()
  /* let nCount = 0
  let xPos = 0
  let yPos= 0
	while(true){
		
		const xpos = getRandomInt(spawnX-200,spawnX+200)
		const ypos = getRandomInt(spawnY-200,spawnY+200)
		
		const height = (perlin.getPixel(xpos/(1000/nodes[0]),ypos/(1000/nodes[0]))+perlin2.getPixel(xpos/(1000/nodes[1]),ypos/(1000/nodes[1]))*0.7+perlin3.getPixel(xpos/(1000/nodes[2]),ypos/(1000/nodes[2]))*0.5+perlin4.getPixel(xpos/(1000/nodes[3]),ypos/(1000/nodes[3]))*0.1+perlin5.getPixel(xpos/(1000/nodes[4]),ypos/(1000/nodes[4]))*0.05)**2
		
		if(height>0.08){
      xPos=xpos
      yPos=ypos
			break
		}
	}
  for(let i=0;i<10;i++){
    const xpos=xPos+getRandomInt(-50,50)
    const ypos =yPos+getRandomInt(-50,50)
    const height = (perlin.getPixel(xpos/(1000/nodes[0]),ypos/(1000/nodes[0]))+perlin2.getPixel(xpos/(1000/nodes[1]),ypos/(1000/nodes[1]))*0.7+perlin3.getPixel(xpos/(1000/nodes[2]),ypos/(1000/nodes[2]))*0.5+perlin4.getPixel(xpos/(1000/nodes[3]),ypos/(1000/nodes[3]))*0.1+perlin5.getPixel(xpos/(1000/nodes[4]),ypos/(1000/nodes[4]))*0.05)**2
    if(height>0.08){
    const newnation = new nation(xpos,ypos)
    nations.push(newnation)
    rerenderchunks(xpos,ypos)
    }
  }
 */
  for (let i = nations.length - 1; i > -1; i--) {
    const nation = nations[i];
    
    createbuilding(nation, nation.spawn.x, nation.spawn.y, "Bonfire", "any");
  }

  interval = setInterval(function () {
    for (const nation of nations) {
      nation.builddelay -= 100;
      if (nation.builddelay < 1) {
        giveitems(nation);
        choosebuilding(nation, structuredClone(nation.bordermaxes));
        nation.builddelay = 100;
      }
      let i = 0;
      armypos = {};
      nation.destinations.length=0
      for (const army of nation.armies) {
        army.speed = Math.max(
          0.05,
          parseFloat((0.2-(0.2*Math.log(Math.max(army.personnel, 2)))/32).toFixed(1))
        );
        army.personnel=army.troops.swords+army.troops.archers+army.troops.calvery
        if (army.personnel < 1) {
          
          nation.armies.splice(i, 1);
          
          continue
        }
        
				if(army.destination.length>0){
          
					const direction = Math.atan2(army.destination[0].y-army.position.y,army.destination[0].x-army.position.x)
					if(exists("river",army.destination[0].x,army.destination[0].y)&&army.animationStage == 0&&exists("river",Math.round(army.position.x),Math.round(army.position.y))&&buildstats[tilecode(Math.round(army.position.x),Math.round(army.position.y))]==undefined){
            if(getRandomInt(0,10)==0){
              createbuilding(getNationById(army.id),Math.round(army.position.x),Math.round(army.position.y),"Bridge","any")
            }
          }
          else if(army.animationStage==0){
          army.position.x+=Math.cos(direction)*army.speed*(exists("hill",Math.floor(army.position.x),Math.floor(army.position.y)) ? 0.5:1)*(exists("river",army.position.x,army.position.y)&&(buildstats[tilecode(army.position.x,army.position.y)]==undefined||buildstats[tilecode(army.position.x,army.position.y)].disabled) ? 0.25:1)
					army.position.y+=Math.sin(direction)*army.speed*(exists("hill",Math.floor(army.position.x),Math.floor(army.position.y)) ? 0.5:1)*(exists("river",army.position.x,army.position.y)&&(buildstats[tilecode(army.position.x,army.position.y)]==undefined||buildstats[tilecode(army.position.x,army.position.y)].disabled)
          
          
          
          
           ? 0.25:1)
          }
          
          else if (army.animationStage > 0) {
            army.position.x += Math.cos(direction) *0.5;
            army.position.y += Math.sin(direction) * 0.5;
            army.animationStage += 1;
            if (army.animationStage > 3) {
              army.animationStage = -1;
            }
          } else {
            army.position.x -= Math.cos(direction) *0.5;
            army.position.y -= Math.sin(direction) *0.5;
            army.animationStage -= 1;
            if (army.animationStage < -3) {
              army.animationStage = 0;
            }
          }
          
					if(Math.abs(army.destination[0].x-army.position.x)<1&&Math.abs(army.destination[0].y-army.position.y)<1){
						army.destination.splice(0,1)
					}
					
					
					if (getNationById(army.id).wars.length > 0) {
            
            for (const war of nation.wars) {
              const n = getNationById(war);
              if(n.cities.length<1){
                declarepeace(nation,n)
              }
              let k= 0
              for (const city of n.cities){
                if(distance(army.position.x,army.position.y,city.x,city.y)<2){
                  convertCity(nation,n,city,k)
                }
                k++
              }
              for (const a of n.armies) {
                if (
                  distance(
                    army.position.x,
                    army.position.y,
                    a.position.x,
                    a.position.y
                  ) < (army.status==0 ? 30:10)
                ) {
                  
                  if((army.destination.length<1||distance(
                    army.position.x,
                    army.position.y,
                    army.destination[army.destination.length-1].x,
                    army.destination[army.destination.length-1].y
                  )>distance(
                    army.position.x,
                    army.position.y,
                    a.position.x,
                    a.position.y
                  )) &&!nation.destinations.includes(tilecode(Math.floor(a.position.x/4),
                    Math.floor(a.position.y/4)))){
                    
                  /*   if(army.destination.length>0&&Math.floor(army.destination[army.destination.length-1].x)==Math.floor(a.position.x)&&Math.floor(army.destination[army.destination.length-1].y)==Math.floor(a.position.y)){
                      
                      continue
                    }
                      let closestindex=0
                      let i=0
                      let closest=army.position
                      for(const destination of army.destination){
                        if(distance(destination.x,destination.y,a.position.x,a.position.y)>distance(destination.x,destination.y,closest.x,closest.y)){
                          closest=destination
                          closestindex=0
                        }
                        i++
                      }
                      
                      army.destination.splice(closestindex)
                      army.destination.concat(aStar(closest,{x:Math.floor(a.position.x),y:Math.floor(a.position.y)}))
                    
                    */
                      army.destination.length=0

                  if(army.personnel*getRandomInt(8,12)*0.1<a.personnel&&army.destination.length<2){
                    let max=0
                    let position;
                    
                    for(let i=-1;i<2;i++){
                      for(let j=-1;j<2;j++){
                          if(army.position.x+j<0||army.position.x+j>999||army.position.y+i<0||army.position.y+i>999){
                              continue
                          }
                          if(tilestats[tilecode(Math.floor(army.position.x+j),Math.floor(army.position.y+i))]==undefined){
                          
                              continue
                          }
                          
                          const currentdist =distance(army.position.x,army.position.y,a.position.x,a.position.y)*(exists("hill",Math.floor(army.position.x),Math.floor(army.position.y)) ? 0.5:1)*(exists("river",army.position.x,army.position.y)&&(buildstats[tilecode(army.position.x,army.position.y)]==undefined||buildstats[tilecode(army.position.x,army.position.y)].disabled) ? 0.25:1)*getRandomInt(8,12)*0.1
                          if(currentdist>max){
                            max = currentdist
                            position = {x:army.position.x+j,y:army.position.y}
                          }
                    
                      }
                    }
                    army.destination.push(position)
                    const chosenarmy = nation.armies[getRandomInt(0,nation.armies.length-1)]
                    if(chosenarmy.status==0&&chosenarmy.animationStage==0&&chosenarmy.destination.length<1&&distance(army.position.x,army.position.y,chosenarmy.position.x,chosenarmy.position.y)<50){
                    chosenarmy.destination=aStar({x:Math.floor(chosenarmy.position.x),y:Math.floor(chosenarmy.position.y)},{x:Math.floor(army.position.x),y:Math.floor(army.position.y)})
                    }
                  }
                  else{
                    army.destination=aStar({x:Math.floor(army.position.x),y:Math.floor(army.position.y)},{x:Math.floor(a.position.x),y:Math.floor(a.position.y)})
                    
                  }
                  }
                  if (army.animationStage == 0) {
                    if (
                      distance(
                        army.position.x,
                        army.position.y,
                        a.position.x,
                        a.position.y
                      ) < 3 &&
                      a.personnel > 0
                    ) {
                      const random = Math.random();
                      
                      let damage = Math.ceil((army.troops.swords*2+army.troops.archers/2) * random * 0.1);
                      getNationById(a.id).currentpop -= damage;

                      a.troops.swords -= Math.ceil(damage/9);
                      damage -=Math.ceil(damage/9)
                      a.troops.archers -= damage
                      army.animationStage = 1;
                    }
                    if (
                      distance(
                        army.position.x,
                        army.position.y,
                        a.position.x,
                        a.position.y
                      ) < 10 &&
                      a.personnel > 0&&getRandomInt(0,10)<Math.ceil(army.troops.archers/10)
                    ) {
                      
                     
                      
                      
                      arrows.push(new arrow(Math.ceil((army.troops.archers/16) * Math.random() * 0.1),{x:army.position.x+getRandomInt(-2,2),y:army.position.y+getRandomInt(-2,2)},{x:a.position.x+getRandomInt(-2,2),y:a.position.y+getRandomInt(-2,2)},a))
                    }
                  } 
                }
              }
            }
          }
          if(army.animationStage==0&&army.destination.length<2&&army.status==0&&(borders[tilecode(Math.round(army.position.x),Math.round(army.position.y))]==undefined||borders[tilecode(Math.round(army.position.x),Math.round(army.position.y))].id!=nation.id||tilestats[tilecode(Math.round(army.position.x),Math.round(army.position.y))]==undefined||exists("river",Math.round(army.position.x),Math.round(army.position.y)))){
						army.position.x-=Math.cos(direction)*army.speed
						army.position.y-=Math.sin(direction)*army.speed
						army.destination.splice(0,1)
						army.destination.push({x:army.position.x+getRandomInt(-30,30),y:army.position.y+getRandomInt(-30,30)})

					}
          if(army.destination.length>0){
            
          nation.destinations.push(tilecode(Math.floor(army.destination[army.destination.length-1].x/4),Math.floor(army.destination[army.destination.length-1].y/4)))
          }
				}
        else{
          
          switch(army.status){
            
            case 0:
            if(getRandomInt(0,20*1/(nation.wars.length+1))==0){
              army.destination.push({x:army.position.x+getRandomInt(-30,30),y:army.position.y+getRandomInt(-30,30)})
            }
            break
            case 1:
              const randwar =getNationById(nation.wars[getRandomInt(0,nation.wars.length-1)])
                   army.destination = (aStar({x:Math.floor(army.position.x),y:Math.floor(army.position.y)},randwar.cities[getRandomInt(0,randwar.cities.length-1)]))

                
            }
        }
        
        
        if (
          borders[
            tilecode(Math.floor(army.position.x), Math.floor(army.position.y))
          ]!=undefined&&
          borders[
            tilecode(Math.floor(army.position.x), Math.floor(army.position.y))
          ].id != nation.id &&
          nation.wars.includes(
            borders[
              tilecode(Math.floor(army.position.x), Math.floor(army.position.y))
            ].id
          )
        ) {
          conquerborder(
            Math.floor(army.position.x),
            Math.floor(army.position.y),
            nation
          );
        }

        i++
      }
    }
    renderarmy();
    
  }, 100);

  for (i = 0; i < buildgrid.length; i++) {
    const pointer = { plus: buildgrid[i].length - 1, minus: 0 };

    for (let j = 0, leng = buildgrid[i].length; j < leng; j++) {
      if (buildgrid[i][j] > scrollX && buildgrid[i][j] < scrollX + widthmax) {
        if (buildgrid[i][j] > buildgrid[i][pointer.plus]) {
          pointer.plus = j;
        }
        if (buildgrid[i][j] < buildgrid[i][pointer.minus]) {
          pointer.minus = j;
        }
      }
    }
    buildgrid[i].push(pointer);
  }

  if (psettings.notutorial) {
    displayUI();
    setTimeout(start, 1000);
  } else {
    displaypopup(3, confirmation);
  }
}
function checkocean(x, y, river = false, amount = 2) {
  for (let j = amount * -1; j < amount + 1; j++) {
    for (let k = amount * -1; k < amount + 1; k++) {
      if (
        (!river && exists("river", x + k, y + j)) ||
        (tilestats[tilecode(x + k, y + j)] == undefined &&
          !(river && exists("river", x + k, y + j)))
      ) {
        if (k != 0 || j != 0) {
          return true;
        }
      }
    }
  }

  return false;
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.round(Math.random() * (max - min)) + min;
}

function shorten(number) {
  if (number.toString().includes("e")) {
    return number;
  }
  let numlength = Math.floor(
    JSON.stringify(Math.floor(Math.abs(number) / 10)).length / 3
  );
  let returnnum = number / 10 ** (numlength * 3);
  let endsymbol = "";
  switch (numlength) {
    case 0:
      break;
    case 1:
      endsymbol = "k";
      break;
    case 2:
      endsymbol = "m";
      break;
    case 3:
      endsymbol = "b";
      break;
    case 4:
      endsymbol = "t";
      break;
    case 5:
      endsymbol = "Qa";
      break;
    case 6:
      endsymbol = "Qi";
      break;
    case 7:
      endsymbol = "Sx";
      break;
  }

  returnnum = returnnum.toFixed(2);

  while (returnnum.includes(".") && returnnum[returnnum.length - 1] === "0") {
    returnnum = returnnum.slice(0, returnnum.length - 1);
  }
  if (returnnum[returnnum.length - 1] == ".") {
    returnnum = returnnum.slice(0, returnnum.length - 1);
  }
  return returnnum + endsymbol;
}
function start() {
  tech_music.pause();
  if (m.phase > 1) {
    boss_music.play();
    war_music.pause();
    build_music.pause();
  } else if (wars.length > 0) {
    build_music.pause();
    boss_music.pause();
    war_music.play();
  } else {
    build_music.play();
    boss_music.pause();
    war_music.pause();
  }
  market_music.pause();
  if (istutorial) {
    disableinfo = tutorialindex < 14;
  } else {
    disableinfo = false;
  }

  document.body.style.overflow = "hidden";
  window.scrollTo(0, 0);
  document.getElementById("tech-tree").style.display = "none";
  if (m.phase > 1 || wars.length > 0) {
    document.getElementById("boss_health_container").style.display = "block";
  }
  document.getElementById("difficulty-flex").style.display = "none";
  document.getElementById("settings-flex").style.display = "none";
  document.getElementById("info").style.display = "none";
  document.getElementById("achievement-flex").style.display = "none";
  document.getElementById("back_button").hidden = true;

  document.getElementById("techlinecontainer").style.display = "none";
  document.getElementById("title_start").style.display = "none";
  document.getElementById("stats").style.display = "flex";
  document.getElementById("start-flex").style.display = "none";
  document.getElementById("market-flex").style.display = "none";
  document.getElementById("save-flex").style.display = "none";
  document.getElementById("select-grid").style.display = "flex";
  canvas.style.display = "block";
  canvas2.style.display = "block";
  displayUI();
  document.getElementById("boss_healthg").style.transition = "0s";
  document.getElementById("boss_healthg").style.width =
    document.getElementById("boss_health").style.width;
  document.getElementById("boss_healthg").style.transition = "all 1s ease-out";
  render();

  if (istutorial && tutorialindex == 0) {
    continuetutorial(0);
  }
}
function move(x, y) {
  scrollX += x;
  scrollY += y;
  for (
    let i = Math.floor(scrollY / 50);
    i < Math.ceil((scrollY + heightmax) / 50);
    i++
  ) {
    for (
      let j = Math.floor(scrollX / 50);
      j < Math.ceil((scrollX + widthmax) / 50);
      j++
    ) {
      if (!loadedchunks.includes(tilecode(j, i))) {
        rerenderchunks(j * 50, i * 50);
      }
    }
  }

  render();
}
