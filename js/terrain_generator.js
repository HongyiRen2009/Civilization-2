class Perlin {
  constructor(width, height, seed) {
    /** @type {number} */
    this.width = width;
    /** @type {number} */
    this.height = height;

    this.seed = seed;

    /** @type {{x: number, y: number}[]}*/
    this.gradients = [];
    for (let i = 0; i < (this.width + 1) * (this.height + 1); i++) {
      const x = i % (this.width + 1);
      const y = Math.floor(i / (this.height + 1));
      this.gradients.push(this.getRandomGradient(x, y));
    }
  }

  getRandomGradient(x, y) {
    // basically stolen from https://stackoverflow.com/a/8831937/13996389
    let a = x;
    let b = y;
    let c = this.seed;
    let d = a + b;

    let t = 0;

    for (let i = 0; i < 20; i++) {
      a >>>= 0;
      b >>>= 0;
      c >>>= 0;
      d >>>= 0;
      t = (a + b) | 0;
      a = b ^ (b >>> 9);
      b = (c + (c << 3)) | 0;
      c = (c << 21) | (c >>> 11);
      d = (d + 1) | 0;
      t = (t + d) | 0;
      c = (c + t) | 0;
    }
    const random = (t >>> 0) / 4294967296;

    const angle = random * 2 * Math.PI;
    return { x: Math.cos(angle), y: Math.sin(angle) };
  }

  getDotProduct(x1, y1, x2, y2) {
    return x1 * x2 + y1 * y2;
  }

  calculateDotProduct(pointX, pointY, cornerX, cornerY) {
    const cornerGradient = this.gradients[cornerX + cornerY * this.height];
    const offsetX = pointX - cornerX;
    const offsetY = pointY - cornerY;

    const dotProduct = this.getDotProduct(
      cornerGradient.x,
      cornerGradient.y,
      offsetX,
      offsetY
    );

    return dotProduct;
  }

  smootherStep(x) {
    return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
  }

  interpolate(fromValue, toValue, byAmount) {
    return (toValue - fromValue) * this.smootherStep(byAmount) + fromValue;
  }

  /**
   * @param x {number}
   * @param y {number}
   * @returns {number}
   */
  getPixel(x, y) {
    // find the four corners of the tile the give point is in
    const cornerX0 = Math.floor(x);
    const cornerX1 = cornerX0 + 1;
    const cornerY0 = Math.floor(y);
    const cornerY1 = cornerY0 + 1;

    const offsetX = x - cornerX0;
    const offsetY = y - cornerY0;

    // generate the four dot products
    const dotProduct0 = this.calculateDotProduct(x, y, cornerX0, cornerY0); // top left
    const dotProduct1 = this.calculateDotProduct(x, y, cornerX1, cornerY0); // top right
    const dotProduct2 = this.calculateDotProduct(x, y, cornerX1, cornerY1); // bottom right
    const dotProduct3 = this.calculateDotProduct(x, y, cornerX0, cornerY1); // bottom left

    const interpolated0 = this.interpolate(dotProduct0, dotProduct1, offsetX);
    const interpolated1 = this.interpolate(dotProduct3, dotProduct2, offsetX);

    const interpolated2 = this.interpolate(
      interpolated0,
      interpolated1,
      offsetY
    );
    // interpolated2 ∊ [-1, 1]

    return interpolated2;
  }
}
function generaterivers() {
  const HEIGHT = 999;
  const WIDTH = 999;
//revert back to 999 after testing is done
  const NODE_HEIGHT = 30;
  const NODE_WIDTH = 30;



  const pointLocationsCount = Array(WIDTH * HEIGHT).fill(0);

  let pointLocations = [];
  for (let x = 0; x < WIDTH; x += 50) {
    for (let y = 0; y < HEIGHT; y += 50) {
      pointLocations.push({ x, y });
    }
  }

  for (let iteration = 0; iteration < 150; iteration++) {
    const newPoints = [];
    for (const point of pointLocations) {
      const pixelColor = perlin17.getPixel(
        (Math.round(point.x) * NODE_WIDTH) / WIDTH,
        (Math.round(point.y) * NODE_HEIGHT) / HEIGHT
      );

      const directionX = Math.cos(pixelColor * 4 * Math.PI);
      const directionY = Math.sin(pixelColor * 4 * Math.PI);

      const newPoint = { x: point.x + directionX, y: point.y + directionY };

      const xOutOfBounds = newPoint.x < 0 || newPoint.x > WIDTH;
      const yOutOfBounds = newPoint.y < 0 || newPoint.y > HEIGHT;
      if (xOutOfBounds || yOutOfBounds) continue;

      let pixelIndex = Math.round(newPoint.x) + Math.round(newPoint.y) * HEIGHT;
      // not sure why this case triggers
      if (pointLocationsCount[pixelIndex] === undefined) {
        pointLocationsCount[pixelIndex] = 0;
      }
      pointLocationsCount[pixelIndex]++;
      newPoints.push(newPoint);
      //return newPoint;
    }
    pointLocations = newPoints;
  }

  const adjust = (x) => x ** 0.3;
  let max = 0;
  for (const a of pointLocationsCount) {
    if (a > max) {
      max = a;
    }
  }
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      
    
      
      
    
        let i = x + y * WIDTH;
    let pixelValue = pointLocationsCount[i];
    let pixelColor = pixelValue / max;
    pixelColor = adjust(pixelColor);
    if(pixelColor>0.5){
      addTile("river",x*2,y*2)
      addTile("river",x*2+1,y*2+1)
      addTile("river",x*2+1,y*2)
      addTile("river",x*2,y*2+1)
      addTile("river",x*2+2,y*2+1)
      addTile("river",x*2+2,y*2)
      addTile("river",x*2+2,y*2+2)
      addTile("river",x*2+1,y*2+2)
      addTile("river",x*2,y*2+2)
    }
    }
  
  }
}

function calcbiome(temp, hum) {
  if (temp < -0.3) {
    return {biome:"snow",tree:0.3};
  } else if (hum < -0.3) {
    return {biome:"desert",tree:0};
  } else if (hum < 0) {
    return {biome:"savanna",tree:0.4};
  } else if (hum > 0.3) {
    return {biome:"jungle",tree:Infinity};
  }
  return {biome:"grass",tree:1};
}
function rerenderchunks(x, y) {
  for (let i = y; i < y + 50; i++) {
    for (let j = x; j < x + 50; j++) {
      const xpos = j;

      const ypos = i;
      const treeHeight = perlin18.getPixel(xpos / (5000 / nodes[13]), ypos / (5000 / nodes[13]))

      const height =
        (perlin.getPixel(xpos / (5000 / nodes[0]), ypos / (5000 / nodes[0])) +
          perlin2.getPixel(xpos / (5000 / nodes[1]), ypos / (5000 / nodes[1])) *
            0.7 +
          perlin3.getPixel(xpos / (5000 / nodes[2]), ypos / (5000 / nodes[2])) *
            0.5 +
          perlin4.getPixel(xpos / (5000 / nodes[3]), ypos / (5000 / nodes[3])) *
            0.15 +
          perlin5.getPixel(xpos / (5000 / nodes[4]), ypos / (5000 / nodes[4])) *
            0.125) **
        2;
      
      const temp =
        perlin6.getPixel(xpos / (5000 / nodes[5]), ypos / (5000 / nodes[5])) +
        perlin7.getPixel(xpos / (5000 / nodes[6]), ypos / (5000 / nodes[6])) +
        perlin8.getPixel(xpos / (5000 / nodes[7]), ypos / (5000 / nodes[7]));

      const lakeheight =
        (perlin12.getPixel(xpos / (5000 / nodes[8]), ypos / (5000 / nodes[8])) +
          perlin13.getPixel(
            xpos / (5000 / nodes[9]),
            ypos / (5000 / nodes[9])
          ) <
        0
          ? 0
          : perlin12.getPixel(
              xpos / (5000 / nodes[8]),
              ypos / (5000 / nodes[8])
            ) +
            perlin13.getPixel(
              xpos / (5000 / nodes[9]),
              ypos / (5000 / nodes[9])
            )) * 0.25;
      if(tilestats[tilecode(xpos,ypos)]!=undefined&&tilestats[tilecode(xpos,ypos)].index==3){
        if(height<0.02){
          removetile(xpos,ypos)
          ctx3.clearRect(j*16, i*16, 16, 16);

          continue
        }
        if(temp<-0.3){
          addTile("ice",xpos,ypos)
        }
        continue
      }
      if (height > 0.55) {
        addTile("snow", xpos, ypos);
      } else if (height > 0.3) {
        addTile("hill", xpos, ypos);
      } else if (height > 0.05 + lakeheight) {
        const hum =
          perlin9.getPixel(xpos / (5000 / nodes[5]), ypos / (5000 / nodes[5])) +
          perlin10.getPixel(
            (xpos * 1.5) / (5000 / nodes[6]),
            (ypos * 1.5) / (5000 / nodes[6])
          ) +
          perlin11.getPixel(
            (xpos * 2) / (5000 / nodes[7]),
            (ypos * 2) / (5000 / nodes[7])
          );
          const tileBiome = calcbiome(temp, hum)
        addTile(tileBiome.biome, xpos, ypos);
        if(Math.abs(treeHeight*tileBiome.tree)>0.4){
          addTile("tree",xpos,ypos)
        }
      } else if (height > 0.02 + lakeheight) {
        addTile("sand", xpos, ypos);
      } else if (height > 0.015) {
        if (temp < -0.3) {
          addTile("ice", xpos, ypos);
        } else {
          addTile("river", xpos, ypos);
        }
      }

      /* if (tilestats[tilecode(j, i)] != undefined) {
        ctx3.fillStyle = tiles[tilestats[tilecode(j, i)].index].color;
        ctx3.fillRect(j*16, i*16, 16, 16);
      } */
    }
  }
  loadedchunks.push(tilecode(Math.floor(x / 50), Math.floor(y / 50)));
}
function generateIsland(xpos, ypos, iheight, iwidth, continent = false) {
  let y = ypos;
  let x = xpos;
  let width = iwidth;
  let height = iheight;

  let maxx1 = x + width;
  let minx1 = x - width;
  let maxx2 = 0;
  let minx2 = 0;
  let maxx = x + width;
  let minx = x - width;
  let y2 = 0;
  const points = [];
  for (let i = 0; i < Math.ceil(width / getRandomInt(4, 8)); i++) {
    const rand = getRandomInt(0, 2);

    points.push({
      x: getRandomInt(minx, maxx),
      y: getRandomInt(y, y + height),
      biome: rand == 0 ? tiles[rand].type : tiles[rand + 3].type,
    });
  }

  const rivery = [];
  for (let i = y; i < y + height; i++) {
    for (let j = minx; j < maxx; j++) {
      let pointmax = { dist: Infinity, index: 0 };
      if (!exists(biomes, j, i)) {
        for (let k = 0, len = points.length; k < len; k++) {
          if (
            distance(j, i, points[k].x, points[k].y) + getRandomInt(-2, 2) <
            pointmax.dist
          ) {
            pointmax.dist = distance(j, i, points[k].x, points[k].y);
            pointmax.index = k;
          }
        }
        addTile(points[pointmax.index].biome, j, i);
      }
    }
    if (i == y + height - 1) {
      maxx2 = maxx;
      minx2 = minx;
      y2 = i;
    }
    maxx += getRandomInt(-2, 2);
    minx += getRandomInt(-2, 2);
  }
  let miny1 = 0;

  for (i = minx1; i < maxx1; i++) {
    if (miny1 > 0) {
      for (let j = 1; j < miny1; j++) {
        if (!exists(biomes, i, y - j)) {
          addTile(tiles[tilestats[tilecode(i, y)].index].type, i, y - j);
        }
      }
    } else if (miny1 < 0) {
      for (let j = 0; j < Math.abs(miny1); j++) {
        if (exists(biomes, i, y + j)) {
          removetile(i, y + j);
        }
      }
    }

    rivery.push(miny1 + y);
    miny1 += getRandomInt(-2, 2);
  }

  let miny2 = 0;
  for (i = minx2; i < maxx2; i++) {
    if (miny2 > 0) {
      for (let j = 1; j < miny2; j++) {
        if (!exists(biomes, i, y2 + j)) {
          addTile(tiles[tilestats[tilecode(i, y2)].index].type, i, y2 + j);
        }
      }
    } else if (miny2 < 0) {
      for (let j = 0; j < Math.abs(miny2); j++) {
        if (exists(biomes, i, y2 - j)) {
          removetile(i, y2 - j);
        }
      }
    }
    miny2 += getRandomInt(-2, 2);
  }
  const avalitiles = [];
  let xspawn = 20;
  let yspawn = 20;
  for (let j = 0; yspawn < height - 20; j += 20) {
    avalitiles.push({ x: xspawn, y: yspawn });
    xspawn += 20;
    if (xspawn > width) {
      xspawn = 20;
      yspawn += 20;
    }
  }

  for (
    let j = 0,
      rand = getRandomInt(Math.floor(width / 32), Math.floor(width / 64));
    j < rand;
    j++
  ) {
    if (avalitiles.length < 1) {
      return;
    }
    const rando = getRandomInt(0, avalitiles.length - 1);
    generatelake(
      minx + avalitiles[rando].x + getRandomInt(-10, 10),
      y + avalitiles[rando].y + getRandomInt(-10, 10),
      getRandomInt(Math.floor(width / 12), Math.floor(width / 8)),
      getRandomInt(Math.floor(height / 12), Math.floor(height / 8))
    );
    avalitiles.splice(rando, 1);
  }
  for (
    let j = 0,
      rand = getRandomInt(Math.floor(width / 24), Math.floor(width / 48));
    j < rand;
    j++
  ) {
    if (avalitiles.length < 1) {
      return;
    }
    const rando = getRandomInt(0, avalitiles.length - 1);
    generatehill(
      minx + avalitiles[rando].x + getRandomInt(-10, 10),
      y + avalitiles[rando].y + getRandomInt(-10, 10),
      getRandomInt(Math.floor(width / 12), Math.floor(width / 8)),
      getRandomInt(Math.floor(height / 12), Math.floor(height / 8))
    );
    avalitiles.splice(rando, 1);
  }

  for (
    let j = 0,
      rand = getRandomInt(Math.floor(width / 32), Math.floor(width / 64));
    j < rand;
    j++
  ) {
    if (avalitiles.length < 1) {
      return;
    }
    const lakepos = getRandomInt(
      x - Math.floor(width / 2),
      x + Math.floor(width / 3)
    );
    const rand = getRandomInt(0, rivery.length - 1);
    generateriver(lakepos, rivery[rand], 0, 0, getRandomInt(4, 8));
  }
  for (
    let j = 0,
      rand = getRandomInt(Math.floor(width / 24), Math.floor(width / 48));
    j < rand;
    j++
  ) {
    if (avalitiles.length < 1) {
      return;
    }
    const rando = getRandomInt(0, avalitiles.length - 1);
    const randxy = { x: getRandomInt(-10, 10), y: getRandomInt(-10, 10) };
    if (
      tilestats[
        tilecode(
          minx + avalitiles[rando].x + randxy.x,
          y + avalitiles[rando].y + randxy.y
        )
      ] != undefined &&
      tilestats[
        tilecode(
          minx + avalitiles[rando].x + randxy.x,
          y + avalitiles[rando].y + randxy.y
        )
      ].type != "river"
    ) {
      const newnation = new nation(
        minx + avalitiles[rando].x + randxy.x,
        y + avalitiles[rando].y + randxy.y
      );
    }
  }
}
function generatelake(xpos, ypos, iwidth, iheight) {
  let y = ypos;
  let x = xpos;
  let width = iwidth;
  let height = iheight;

  let maxx1 = x + width;
  let minx1 = x - width;
  let maxx2 = 0;
  let minx2 = 0;
  let maxx = x + width;
  let minx = x - width;
  let y2 = 0;
  const rivertiles = [];
  let isocean = false;
  for (i = y; i < y + height; i++) {
    for (let j = minx; j < maxx; j++) {
      addTile("river", j, i);
      rivertiles.push(tilecode(j, i));
      if (checkocean(j, i, true, 1)) {
        isocean = true;
      }
    }

    if (i == y + height - 1) {
      maxx2 = maxx;
      minx2 = minx;
      y2 = i;
    }
    maxx += getRandomInt(-2, 2);
    minx += getRandomInt(-2, 2);
  }
  let miny1 = 0;
  for (let i = minx1; i < maxx1; i++) {
    if (miny1 > 0) {
      for (let j = 0; j < miny1; j++) {
        addTile("river", i, y - j);
        rivertiles.push(tilecode(i, y - j));
        if (checkocean(i, y - j, true, 1)) {
          isocean = true;
        }
      }
    } else if (miny1 < 0) {
      for (let j = 0; j < Math.abs(miny1); j++) {
        if (tilestats[tilecode(i, y + j - 1)] != undefined) {
          addTile(
            tiles[tilestats[tilecode(i, y + j - 1)].index].type,
            i,
            y + j
          );
          rivertiles.splice(rivertiles.indexOf(tilecode(i, y + j)), 1);
        }
      }
    }
    miny1 += getRandomInt(-2, 2);
  }

  let miny2 = 0;

  for (let i = minx2; i < maxx2; i++) {
    if (miny2 > 0) {
      for (let j = 0; j < miny2; j++) {
        addTile("river", i, y2 + j);
        rivertiles.push(tilecode(i, y2 + j));
        if (checkocean(i, y2 + j, true, 1)) {
          isocean = true;
        }
      }
    } else if (miny2 < 0) {
      for (let j = 0; j < Math.abs(miny2); j++) {
        if (tilestats[tilecode(i, y + j + 1)] != undefined) {
          addTile(
            tiles[tilestats[tilecode(i, y + j + 1)].index].type,
            i,
            y2 - j
          );
        }
        rivertiles.splice(rivertiles.indexOf(tilecode(i, y2 - j)), 1);
      }
    }
    miny2 += getRandomInt(-2, 2);
  }
  if (isocean) {
    for (const tile of rivertiles) {
      if (
        grid[parseInt(tile.slice(tile.indexOf("/") + 1))].includes(
          parseInt(tile.substring(0, tile.indexOf("/")))
        )
      ) {
        removetile(
          parseInt(tile.substring(0, tile.indexOf("/"))),
          parseInt(tile.slice(tile.indexOf("/") + 1))
        );
      }
    }
  }
}

function generatehill(xpos, ypos, iwidth, iheight, biome) {
  let y = ypos;
  let x = xpos;
  let width = iwidth;
  let height = iheight;

  let maxx1 = x + width;
  let minx1 = x - width;
  let maxx2 = 0;
  let minx2 = 0;
  let maxx = x + width;
  let minx = x - width;
  let y2 = 0;
  for (i = y; i < y + height; i++) {
    for (let j = minx; j < maxx; j++) {
      if (exists(biomes, j, i)) {
        addTile("hill", j, i);
      }
    }

    if (i == y + height - 1) {
      maxx2 = maxx;
      minx2 = minx;
      y2 = i;
    }
    maxx += getRandomInt(-2, 2);
    minx += getRandomInt(-2, 2);
  }
  let miny1 = 0;
  for (i = minx1; i < maxx1; i++) {
    if (miny1 > 0) {
      for (let j = 0; j < miny1; j++) {
        addTile("hill", i, y - j);
      }
    } else if (miny1 < 0) {
      for (let j = 0; j < Math.abs(miny1); j++) {
        if (tilestats[tilecode(i, y + j - 1)] != undefined) {
          addTile(
            tiles[tilestats[tilecode(i, y + j - 1)].index].type,
            i,
            y + j
          );
        }
      }
    }
    miny1 += getRandomInt(-2, 2);
  }

  let miny2 = 0;
  for (i = minx2; i < maxx2; i++) {
    if (miny2 > 0) {
      for (let j = 0; j < miny2; j++) {
        addTile("hill", i, y2 + j);
      }
    } else if (miny2 < 0) {
      for (let j = 0; j < Math.abs(miny2); j++) {
        if (tilestats[tilecode(i, y2 + j + 1)] != undefined) {
          addTile(
            tiles[tilestats[tilecode(i, y2 + j + 1)].index].type,
            i,
            y2 - j
          );
        }
      }
    }
    miny2 += getRandomInt(-2, 2);
  }
}
function generateriver(xpos, ypos, curve, times = 0, width = 2, biome) {
  let x = xpos;
  let rivertimes = times;
  let rivercurve = curve;
  let rand = 0;
  let oldx = xpos;
  const bseed = getRandomInt(-10, 10);
  const aseed = Math.random() * 2 - 1;
  for (let y = ypos; y < ypos + 200; y++) {
    oldx = x;
    x =
      0.5 * Math.sin(0.5 * aseed * y) +
      (1.1 * Math.sin(0.4 * aseed * y - 10)) / 3 +
      (1.2 * Math.sin(0.3 * aseed * y - bseed)) / 4 +
      x +
      (y * rivercurve) / 100;
    if (x - oldx > 1) {
      while (x - oldx > 1) {
        x -= 0.1;
      }
    } else if (x - oldx < -1) {
      while (x - oldx < -1) {
        x += 0.1;
      }
    }
    if (rivertimes < 5 && getRandomInt(0, 100) == 0) {
      generateriver(
        x,
        y,
        rivercurve * -1,
        rivertimes,
        Math.max(2, width - 1),
        biome
      );
    }
    if (
      (exists("river", Math.floor(x), y) && y != ypos) ||
      !exists(biomes, Math.floor(x), y + 1)
    ) {
      return;
    }
    for (let k = 0; k < width; k++) {
      addTile("river", Math.floor(x + k), y);
    }
  }
}
