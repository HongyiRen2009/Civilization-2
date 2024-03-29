const p = {
  pieceROM: [
    {
      name: "Canopy",
      letter: "C",
      description:
        "A small unit of housing that houses 1 person. Requires 1 resources to construct",
      piecepositions: [{ x: 0, y: 0, img: { dx: 65, dy: 85 } }],
      tab: "Housing",
      unlocked: true,
      near: "building",
      dimensions: { height: 1, width: 1, startx: 0, starty: 0 },
      effect(context) {
        if (context == undefined) {
          resources -= 1;
        } else {
          context.resources -= 1;
        }
        p.population = 1;
      },

      requires(context) {
        return context == undefined ? resources >= 1 : context.resources >= 1;
      },
    },
    {
      name: "Hut",
      letter: "H",
      description:
        "A medium unit of housing that houses 6 people. Requires 5 resources to construct",
      piecepositions: [{ x: 0, y: 0, img: { dx: 65, dy: 106 } }],
      unlocked: true,
      near: "building",
      dimensions: { height: 1, width: 1, startx: 0, starty: 0 },
      effect(context) {
        p.population = 6;
        if (context == undefined) {
          resources -= 5 + Math.ceil(5 * techstats.eff_infra);
        } else {
          context.resources -= 5 + Math.ceil(5 * context.techstats.eff_infra);
        }
      },
      tab: "Housing",
      requires(context) {
        return context == undefined
          ? resources >= 5 - Math.ceil(5 * techstats.eff_infra)
          : context.resources >= 5 - Math.ceil(5 * context.techstats.eff_infra);
      },
    },
    {
      name: "Townhouse",
      letter: "TH",
      description:
        "A house for many people. Houses 20 people and requires 10 resources to construct",
      piecepositions: [
        { x: 0, y: 0, img: { dx: 1, dy: 148 } },
        { x: 1, y: 0, img: { dx: 22, dy: 148 } },
      ],
      unlocked: false,
      near: "building",
      dimensions: { height: 1, width: 2, startx: 0, starty: 0 },
      effect(context) {
        p.population = 20;
        if (context == undefined) {
          resources -= 10 + Math.ceil(10 * techstats.eff_infra);
        } else {
          context.resources -= 10 + Math.ceil(10 * context.techstats.eff_infra);
        }
      },
      tab: "Housing",
      requires(context) {
        return context == undefined
          ? resources >= 10 - Math.ceil(10 * techstats.eff_infra)
          : context.resources >=
              10 - Math.ceil(10 * context.techstats.eff_infra);
      },
    },

    {
      name: "Insula",
      letter: "I",
      description:
        "A high density primitive apartment that houses 35 people. Requires 15 resources to construct",
      piecepositions: [
        { x: 1, y: 0, img: { dx: 64, dy: 147 } },
        { x: 0, y: 0, img: { dx: 43, dy: 147 } },
        { x: 0, y: 1, img: { dx: 43, dy: 167 } },
        { x: 1, y: 1, img: { dx: 64, dy: 167 } },
      ],
      unlocked: false,
      near: "building",
      tab: "Housing",
      dimensions: { height: 2, width: 2, startx: 0, starty: 0 },
      effect(context) {
        p.population = 35;
        if (context == undefined) {
          resources -= 15 + Math.ceil(15 * techstats.eff_infra);
        } else {
          context.resources -= 15 + Math.ceil(15 * context.techstats.eff_infra);
        }
      },
      requires(context) {
        return context == undefined
          ? resources >= 15 - Math.ceil(15 * techstats.eff_infra)
          : context.resources >=
              15 - Math.ceil(15 * context.techstats.eff_infra);
      },
    },

    {
      name: "Road",
      letter: "R",
      description:
        "A road that connects one place from the village to another. Requires 0.5 resources to construct",
      piecepositions: [{ x: 0, y: 0, img: { dx: 210, dy: 0 } }],
      unlocked: true,
      near: "building",
      tab: "Misc",
      dimensions: { height: 1, width: 1, startx: 0, starty: 0 },
      effect(context) {
        if (context == undefined) {
          resources -= techstats.cement ? 0.25 : 0.5;
        } else {
          context.resources -= context.techstats.cement ? 0.25 : 0.5;
        }
      },
      requires(context) {
        return context == undefined
          ? resources >= (techstats.cement ? 0.25 : 0.5)
          : context.resources >= (context.techstats.cement ? 0.25 : 0.5);
      },
    },
    {
      name: "Tiny Farm",
      letter: "TF",
      piecepositions: [
        { x: 1, y: 0, img: { dx: 274, dy: 169 } },
        { x: 0, y: 0, img: { dx: 254, dy: 169 } },
        { x: 1, y: 1, img: { dx: 273, dy: 190 } },
        { x: 0, y: 1, img: { dx: 253, dy: 190 } },
      ],
      description:
        "A very small farm that produces 1 food. Requires 3 resources to construct",
      unlocked: true,
      near: "building",
      tab: "Farms",
      dimensions: { height: 1, width: 2, startx: 0, starty: 0 },
      effect(context) {
        p.food = 1;
        if (context == undefined) {
          resources -= 2 - Math.ceil(2 * techstats.simple_farms);
        } else {
          context.resources -=
            2 - Math.ceil(2 * context.techstats.simple_farms);
        }
      },
      requires(context) {
        return context == undefined
          ? resources >= 2 - Math.ceil(2 * techstats.simple_farms)
          : context.resources >=
              2 - Math.ceil(2 * context.techstats.simple_farms);
      },
    },
    {
      name: "Small Farm",
      letter: "F",
      piecepositions: [
        { x: 1, y: 0, img: { dx: 169, dy: 150 } },
        { x: 0, y: 0, img: { dx: 148, dy: 150 } },
        { x: 0, y: 1, img: { dx: 148, dy: 170 } },
        { x: 1, y: 1, img: { dx: 169, dy: 170 } },
        { x: 0, y: 2, img: { dx: 148, dy: 190 } },
        { x: 1, y: 2, img: { dx: 169, dy: 190 } },
      ],
      description:
        "A small farm that produces 3 food. Requires 4 resources to construct and 1 person operating it",
      unlocked: true,
      near: "building",
      tab: "Farms",
      dimensions: { height: 3, width: 2, startx: 0, starty: 0 },
      effect(context) {
        p.food = 3;
        if (context == undefined) {
          unemployed -= 1;
          resources -= 2 - Math.ceil(4 * techstats.simple_farms);
        } else {
          context.unemployed -= 1;
          context.resources -=
            2 - Math.ceil(4 * context.techstats.simple_farms);
        }
      },
      requires(context) {
        return context == undefined
          ? resources >= 2 - Math.ceil(2 * techstats.simple_farms) &&
              unemployed >= 1
          : context.resources >=
              2 - Math.ceil(2 * context.techstats.simple_farms) &&
              context.unemployed >= 1;
      },
    },
    {
      name: "Medium Farm",
      letter: "MF",
      description:
        "A medium farm that produces 12 food. Requires 12 resources to construct and 3 people operating it. Cannot be on a hill",
      unlocked: false,
      piecepositions: [
        { x: 1, y: 0, img: { dx: 21, dy: 106 } },
        { x: 0, y: 0, img: { dx: 1, dy: 106 } },
        { x: 0, y: 1, img: { dx: 1, dy: 127 } },
        { x: 1, y: 1, img: { dx: 21, dy: 127 } },
        { x: 1, y: -1, img: { dx: 21, dy: 85 } },
        { x: 0, y: -1, img: { dx: 1, dy: 85 } },
        { x: 2, y: -1, img: { dx: 42, dy: 85 } },
        { x: 2, y: 0, img: { dx: 43, dy: 106 } },
        { x: 2, y: 1, img: { dx: 43, dy: 127 } },
      ],
      near: "!hill",
      tab: "Farms",
      dimensions: { height: 3, width: 3, startx: 0, starty: -1 },
      effect(context) {
        p.food = 12;
        if (context == undefined) {
          unemployed -= 3;
          resources -= 12 - Math.ceil(12 * techstats.simple_farms);
        } else {
          context.unemployed -= 3;
          context.resources -=
            12 - Math.ceil(12 * context.techstats.simple_farms);
        }
      },
      requires(context) {
        return context == undefined
          ? resources >= 12 - Math.ceil(12 * techstats.simple_farms) &&
              unemployed >= 3
          : context.resources >=
              12 - Math.ceil(12 * context.techstats.simple_farms) &&
              context.unemployed >= 3;
      },
    },
    {
      name: "Large Farm",
      letter: "LF",
      description:
        "A large farm that produces 30 food. Requires 24 resources to construct, 5 people operating it. Must be nearby a river for irrigation and cannot be on a hill",
      unlocked: false,
      piecepositions: [
        { x: 0, y: 0, img: { dx: 1, dy: 1 } },
        { x: 1, y: 0, img: { dx: 21, dy: 1 } },
        { x: 2, y: 0, img: { dx: 42, dy: 1 } },
        { x: 3, y: 0, img: { dx: 63, dy: 1 } },
        { x: 0, y: 1, img: { dx: 1, dy: 21 } },
        { x: 1, y: 1, img: { dx: 21, dy: 21 } },
        { x: 2, y: 1, img: { dx: 42, dy: 21 } },
        { x: 3, y: 1, img: { dx: 63, dy: 21 } },
        { x: 0, y: 2, img: { dx: 1, dy: 42 } },
        { x: 1, y: 2, img: { dx: 21, dy: 42 } },
        { x: 2, y: 2, img: { dx: 42, dy: 42 } },
        { x: 3, y: 2, img: { dx: 63, dy: 42 } },
        { x: 0, y: 3, img: { dx: 1, dy: 63 } },
        { x: 1, y: 3, img: { dx: 21, dy: 63 } },
        { x: 2, y: 3, img: { dx: 42, dy: 63 } },
        { x: 3, y: 3, img: { dx: 63, dy: 63 } },
      ],
      near: "river not",
      tab: "Farms",
      dimensions: { height: 4, width: 4, startx: 0, starty: 0 },
      effect(context) {
        p.food = 30;
        if (context == undefined) {
          unemployed -= 5;
          resources -= 24 - Math.ceil(24 * techstats.simple_farms);
        } else {
          context.unemployed -= 5;
          context.resources -=
            24 - Math.ceil(24 * context.techstats.simple_farms);
        }
      },
      requires(context) {
        return context == undefined
          ? resources >= 24 - Math.ceil(24 * techstats.simple_farms) &&
              unemployed >= 5
          : context.resources >=
              24 - Math.ceil(24 * context.techstats.simple_farms) &&
              context.unemployed >= 5;
      },
    },
    {
      name: "Temple",
      letter: "T",
      description:
        "A temple to pray to RNGesus (increases luck). Requires 40 resources to construct and 10 people operating it",
      unlocked: false,
      piecepositions: [
        { x: 1, y: 0, img: { dx: 190, dy: 106 } },
        { x: 0, y: 0, img: { dx: 169, dy: 106 } },
        { x: 0, y: 1, img: { dx: 169, dy: 127 } },
        { x: 1, y: 1, img: { dx: 190, dy: 127 } },
        { x: 1, y: -1, img: { dx: 190, dy: 85 } },
        { x: 0, y: -1, img: { dx: 169, dy: 85 } },
        { x: -1, y: 0, img: { dx: 148, dy: 106 } },
        { x: -1, y: -1, img: { dx: 148, dy: 85 } },
        { x: -1, y: 1, img: { dx: 148, dy: 127 } },
      ],
      near: "building",
      tab: "Misc",
      dimensions: { height: 3, width: 3, startx: -1, starty: -1 },
      effect(context) {
        luck += Math.ceil(2 * (1 + techstats.ded_worship));
        p.xp += 50;
        reputation += 5;
        resources -= 40;
        unemployed -= 10;
      },
      requires(context) {
        return resources >= 40 && unemployed >= 10;
      },
    },
    {
      name: "Military Base",
      letter: "MB",
      description:
        "A building for military operations that increases military power by 20. Double effectivness if entirely on a hill. Requires 6 resources to construct and 3 people operating it. Requires 4 resources every turn to maintain",
      unlocked: false,
      piecepositions: [
        { x: 1, y: 1, img: { dx: 127, dy: 106 } },
        { x: 0, y: 0, img: { dx: 106, dy: 85 } },
        { x: -1, y: 1, img: { dx: 85, dy: 106 } },
        { x: -1, y: -1, img: { dx: 85, dy: 64 } },
        { x: 1, y: -1, img: { dx: 127, dy: 64 } },
      ],
      near: "building",
      tab: "Military",
      dimensions: { height: 3, width: 3, startx: -1, starty: -1 },
      effect(context) {
        if (context == undefined) {
          p.military = 20 * (p.entirehill ? 2 : 1);
          resources -= 6;
          p.resources -= 4;
          unemployed -= 3;
        } else {
          p.military = 20 * (p.entirehill ? 2 : 1);
          context.resources -= 6;
          p.resources -= 4;
          context.unemployed -= 3;
        }
      },
      requires(context) {
        return context == undefined
          ? resources >= 6 && unemployed >= 3
          : context.resources >= 6 && context.unemployed >= 3;
      },
    },
    {
      name: "Barracks",
      letter: "BR",
      description:
        "A building to store weapons and train soldiers, increasing your military 10%. Requires 10 resources to construct and 10 people operating it. Gains no bonuses for being on a hill. Requires 20 resources every turn to maintain",
      unlocked: false,
      piecepositions: [
        { x: -1, y: 0, img: { dx: 85, dy: 22 } },
        { x: 0, y: 0, img: { dx: 106, dy: 22 } },
        { x: 0, y: 1, img: { dx: 106, dy: 43 } },
        { x: -1, y: 1, img: { dx: 85, dy: 43 } },
        { x: -1, y: -1, img: { dx: 85, dy: 1 } },
        { x: 0, y: -1, img: { dx: 106, dy: 1 } },
        { x: 1, y: -1, img: { dx: 127, dy: 1 } },
        { x: 1, y: 1, img: { dx: 127, dy: 43 } },
      ],
      near: "building",
      tab: "Military",
      dimensions: { height: 3, width: 3, startx: -1, starty: -1 },
      effect(context) {
        if (context == undefined) {
          modifiers.military += 1;
          resources -= 20;
          p.resources -= 20;
          unemployed -= 10;
        } else {
          context.modifiers.military += 1;
          context.resources -= 20;
          p.resources -= 20;
          context.unemployed -= 10;
        }
      },
      requires(context) {
        return context == undefined
          ? resources >= 20 && unemployed >= 10
          : context.resources >= 20 && context.unemployed >= 10;
      },
    },
    {
      name: "Fortress",
      letter: "FT",
      description:
        "A massive structure that offers substantial defense. Increases military power by 300. Requires 70 resources to construct and 40 people operating it. Double military if on a hill. Requires 30 resources every year to maintain",
      unlocked: false,
      piecepositions: [
        { x: -1, y: 0, img: { dx: 85, dy: 148 } },
        { x: 0, y: 0, img: { dx: 106, dy: 148 } },
        { x: 0, y: 1, img: { dx: 106, dy: 169 } },
        { x: -1, y: 1, img: { dx: 85, dy: 169 } },
        { x: -1, y: -1, img: { dx: 85, dy: 127 } },
        { x: 0, y: -1, img: { dx: 106, dy: 127 } },
        { x: 1, y: -1, img: { dx: 127, dy: 127 } },
        { x: 1, y: 1, img: { dx: 127, dy: 169 } },
        { x: 1, y: 0, img: { dx: 127, dy: 148 } },
      ],
      near: "building",
      tab: "Military",
      dimensions: { height: 3, width: 3, startx: -1, starty: -1 },
      effect(context) {
        if (context == undefined) {
          p.military = Math.floor(
            300 * (p.entirehill ? 2 : 1) * (1 + techstats.archery)
          );
          resources -= 70;
          p.resources -= 30;
          unemployed -= 40;
        } else {
          p.military = Math.floor(
            300 * (p.entirehill ? 2 : 1) * (1 + context.techstats.archery)
          );
          context.resources -= 70;
          p.resources -= 30;
          context.unemployed -= 40;
        }
      },
      requires(context) {
        return context == undefined
          ? resources >= 70 && unemployed >= 40
          : context.resources >= 70 && context.unemployed >= 40;
      },
    },
    {
      name: "Bridge",
      letter: "B",
      description:
        "A bridge to connect one side of the river to another. Must be on a river to construct and requires 3 resources",
      unlocked: true,
      piecepositions: [{ x: 0, y: 0, img: { dx: 190, dy: 148 } }],
      near: "building",
      tab: "Misc",
      dimensions: { height: 1, width: 1, startx: 0, starty: 0 },
      effect(context) {
        if (context == undefined) {
          resources -= techstats.cement ? 1.5 : 3;
        } else {
          context.resources -= context.techstats.cement ? 1.5 : 3;
        }
      },
      requires(context) {
        return context == undefined
          ? resources >= (techstats.cement ? 1.5 : 3)
          : context.resources >= (context.techstats.cement ? 1.5 : 3);
      },
    },
    {
      name: "Small Mine",
      letter: "SM",
      description:
        "A small mine to extract resources from a hill. Collects 2 resources per year. Requires 4 resources and 1 person operating it",
      unlocked: true,
      piecepositions: [
        { x: 0, y: 0, img: { dx: 22, dy: 190 } },
        { x: 0, y: 1, img: { dx: 21, dy: 211 } },
      ],
      near: "building",
      tab: "Mines",
      dimensions: { height: 2, width: 1, startx: 0, starty: 0 },
      effect(context) {
        if (context == undefined) {
          p.resources = 2;
          resources -= 4 - Math.ceil(techstats.planned_mines * 4);
          unemployed -= 1;
        } else {
          p.resources = 2;
          context.resources -=
            4 - Math.ceil(context.techstats.planned_mines * 4);
          context.unemployed -= 1;
        }
      },
      requires(context) {
        return context == undefined
          ? resources >= 4 - Math.ceil(techstats.planned_mines * 4) &&
              unemployed >= 1
          : context.resources >=
              4 - Math.ceil(context.techstats.planned_mines * 4) &&
              context.unemployed >= 1;
      },
    },
    {
      name: "Medium Mine",
      letter: "MM",
      description:
        "A medium mine to extract resources from a hill. Collects 18 resources per year. Must be entirely on a hill and requires 24 resources and 5 people operating it",
      piecepositions: [
        { x: -1, y: 0, img: { dx: 43, dy: 190 } },
        { x: 0, y: 0, img: { dx: 64, dy: 190 } },
        { x: 1, y: 0, img: { dx: 85, dy: 190 } },
        { x: -1, y: 1, img: { dx: 43, dy: 211 } },
        { x: 0, y: 1, img: { dx: 64, dy: 211 } },
        { x: 1, y: 1, img: { dx: 85, dy: 211 } },
      ],
      unlocked: false,
      near: "entire",
      tab: "Mines",
      dimensions: { height: 2, width: 3, startx: -1, starty: 0 },
      effect(context) {
        if (context == undefined) {
          p.resources = 18;
          resources -= 24 - Math.ceil(techstats.planned_mines * 24);
          unemployed -= 5;
        } else {
          p.resources = 18;
          context.resources -=
            24 - Math.ceil(context.techstats.planned_mines * 24);
          context.unemployed -= 5;
        }
      },
      requires(context) {
        return context == undefined
          ? resources >= 24 - Math.ceil(techstats.planned_mines * 24) &&
              unemployed >= 5
          : context.resources >=
              24 - Math.ceil(context.techstats.planned_mines * 24) &&
              context.unemployed >= 5;
      },
    },
    {
      name: "Large Mine",
      letter: "LM",
      description:
        "A large mine to extract resources from a hill. Collects 70 resources per year. Must be on entirely on a hill and requires 70 resources and 8 people operating it. Must be entirely on a hill",
      piecepositions: [
        { x: 1, y: 0, img: { dx: 190, dy: 22 } },
        { x: 0, y: 0, img: { dx: 169, dy: 22 } },
        { x: -1, y: 0, img: { dx: 148, dy: 22 } },
        { x: 0, y: 1, img: { dx: 169, dy: 43 } },
        { x: 1, y: 1, img: { dx: 190, dy: 43 } },
        { x: -1, y: 1, img: { dx: 148, dy: 43 } },
        { x: 0, y: 2, img: { dx: 169, dy: 64 } },
        { x: 1, y: 2, img: { dx: 190, dy: 64 } },
        { x: -1, y: 2, img: { dx: 148, dy: 64 } },
        { x: 1, y: -1, img: { dx: 190, dy: 1 } },
        { x: 0, y: -1, img: { dx: 169, dy: 1 } },
        { x: -1, y: -1, img: { dx: 148, dy: 1 } },
      ],
      unlocked: false,
      near: "entire",
      tab: "Mines",
      dimensions: { height: 4, width: 3, startx: -1, starty: -1 },
      effect(context) {
        if (context == undefined) {
          p.resources = 70;
          resources -= 70 - Math.ceil(techstats.planned_mines * 70);
          unemployed -= 8;
        } else {
          p.resources = 70;
          context.resources -=
            70 - Math.ceil(context.techstats.planned_mines * 70);
          context.unemployed -= 8;
        }
      },
      requires(context) {
        return context == undefined
          ? resources >= 70 - Math.ceil(techstats.planned_mines * 70) &&
              unemployed >= 8
          : context.resources >=
              70 - Math.ceil(context.techstats.planned_mines * 70) &&
              context.unemployed >= 8;
      },
    },
    {
      name: "Mega Temple",
      letter: "MT",
      description:
        "A mega temple to directly contact god. Build one to beat the game. Requires 100000 resources and 300 people praying",
      piecepositions: [
        { x: 1, y: 0, img: { dx: 254, dy: 127 } },
        { x: 0, y: 0, img: { dx: 232, dy: 127 } },
        { x: 0, y: 1, img: { dx: 232, dy: 148 } },
        { x: 1, y: 1, img: { dx: 254, dy: 148 } },
        { x: 1, y: -1, img: { dx: 254, dy: 106 } },
        { x: 0, y: -1, img: { dx: 232, dy: 106 } },
        { x: -1, y: 0, img: { dx: 211, dy: 127 } },
        { x: -1, y: -1, img: { dx: 211, dy: 106 } },
        { x: -1, y: 1, img: { dx: 211, dy: 148 } },
        { x: 2, y: 1, img: { dx: 275, dy: 148 } },
        { x: 2, y: 0, img: { dx: 275, dy: 127 } },
        { x: 2, y: -1, img: { dx: 275, dy: 106 } },
        { x: 2, y: -2, img: { dx: 275, dy: 85 } },
        { x: 1, y: -2, img: { dx: 254, dy: 85 } },
        { x: 0, y: -2, img: { dx: 232, dy: 85 } },
        { x: -1, y: -2, img: { dx: 211, dy: 85 } },
      ],
      unlocked: false,
      near: "building",
      tab: "Misc",
      dimensions: { height: 4, width: 4, startx: -2, starty: -2 },
      effect(context) {
        displaypopup(popups.length - 2);
        resources -= 100000;
        unemployed -= 300;
      },
      requires(context) {
        return resources >= 100000 && unemployed >= 130000;
      },
    },
    {
      name: "Bonfire",
      letter: "BF",
      description:
        "A city center. Requires exponentially more resources the more you build it",
      piecepositions: [
        { x: 0, y: 0, img: { dx: 148, dy: 211 } },
        { x: 1, y: 0, img: { dx: 169, dy: 211 } },
        { x: 0, y: 1, img: { dx: 254, dy: 211 } },
        { x: 1, y: 1, img: { dx: 275, dy: 211 } },
      ],
      unlocked: false,
      near: "building",
      tab: "City Centers",
      dimensions: { height: 2, width: 2 },
      effect(context) {
        if (context == undefined) {
          resources -= Math.floor(
            (Math.max(difficulty - 5, 4) ** 2.7 / 100) * buildingamounts[18]
          );
          p.cities.push({
            x: position.x,
            y: position.y,
          });
          recalcBuildings();
        } else {
          context.resources -= Math.floor(
            (Math.max(difficulty - 5, 4) ** 2.7 / 100) *
              context.buildingamounts[18]
          );
          const x = context.drawposition.x;
          const y = context.drawposition.y;
          context.cities.push({
            x: x,
            y: y,
            borders: [],
          });
          
          const tempcity = []
          for(const city of context.cities){
            tempcity.push([...city.borders])
            city.borders.length=0
          }
          for (let i=0;i<tempcity.length;i++) {
            
            for (const b of tempcity[i]) {
              const x = tiledecode(b).x;
              const y = tiledecode(b).y;
              if (borders[tilecode(x, y)] == undefined) {
                continue;
              }
              if (borders[tilecode(x, y)].id != context.id) {
                continue;
              }
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
                  hexdistance(x, y, city.x, city.y) < mincity.distance
                ) {
                  mincity = {
                    distance: hexdistance(x, y, city.x, city.y),
                    x: city.x,
                    y: city.y,
                  };
                  cIndex = k;
                }
              }
              borders[tilecode(x, y)].city = {
                x: mincity.x,
                y: mincity.y,
              };
              
              
                
                context.cities[cIndex].borders.push(tilecode(x, y));
                
              
            }
          }
          for (const b of context.cities[context.cities.length-1].borders) {
              let x = tiledecode(b).x
              let y = tiledecode(b).y
              for(let i=-1;i<2;i++){
                for(let j=-1;j<2;j++){

                  if (borders[tilecode(x + j, y + i)] == undefined) {
                    continue;
                  }
                  if (borders[tilecode(x + j, y + i)].id != context.id) {
                    continue;
                  }
                  addBorderLines(x+j,y+i)
                }
              }
            }
          
        }
      },
      requires(context) {
        return context == undefined
          ? resources >=
              Math.floor(((difficulty - 5) ** 2.7 / 100) * buildingamounts[18])
          : context.resources >=
              Math.floor(
                ((difficulty - 5) ** 2.7 / 100) * context.buildingamounts[18]
              );
      },
    },
    {
      name: "Trade School",
      letter: "TS",
      description:
        "A school for teaching miners and farmers.<br>Increases all production by 20% and requires 200 resources and 15 people to build.",
      unlocked: false,
      piecepositions: [
        { x: 1, y: 0, img: { dx: 232, dy: 190 } },
        { x: 0, y: 0, img: { dx: 211, dy: 190 } },
        { x: 0, y: 1, img: { dx: 215, dy: 211 } },
        { x: 1, y: 1, img: { dx: 235, dy: 211 } },
        { x: 1, y: -1, img: { dx: 232, dy: 169 } },
        { x: 0, y: -1, img: { dx: 211, dy: 169 } },
        { x: -1, y: -1, img: { dx: 190, dy: 169 } },
        { x: -1, y: 1, img: { dx: 195, dy: 211 } },
      ],
      near: "building",
      tab: "Misc",
      dimensions: { height: 3, width: 3, startx: -1, starty: -1 },
      effect(context) {
        if (context == undefined) {
          modifiers.food += 2;
          modifiers.resources += 2;
          resources -= 200;
          unemployed -= 15;
        } else {
          context.modifiers.food += 2;
          context.modifiers.resources += 2;
          context.resources -= 200;
          context.unemployed -= 15;
        }
      },
      requires(context) {
        return context == undefined
          ? resources >= 200 && unemployed >= 15
          : context.resources >= 200 && context.unemployed >= 15;
      },
    },
    {
      name: "Workshop",
      letter: "W",
      description:
        "A workshop for practicing and learning. Increases wisdom by 50 but uses up 5 resources each round<br>Requires 20 resources and 5 people to build.",
      unlocked: false,
      piecepositions: [
        { x: 0, y: 0, img: { dx: 1, dy: 169 } },
        { x: 1, y: 0, img: { dx: 21, dy: 169 } },
      ],
      near: "building",
      tab: "Misc",
      dimensions: { height: 2, width: 1, startx: 0, starty: 0 },
      effect(context) {
        if (context == undefined) {
          p.xp = 50;
          p.resources = -5;
          resources -= 20;
          unemployed -= 5;
        } else {
          p.xp = 50;
          p.resources = -5;
          context.resources -= 20;
          context.unemployed -= 5;
        }
      },
      requires(context) {
        return context == undefined
          ? resources >= 20 && unemployed >= 5
          : context.resources >= 20 && context.unemployed >= 5;
      },
    },
    {
      name: "Fishery",
      letter: "F",
      description:
        "A fishery for fishing. Every years' catch will vary in amount of food. Requires 10 resources and 2 people to build",
      unlocked: false,
      piecepositions: [
        { x: -1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 0 },
        { x: -1, y: -1 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },
      ],
      near: "river",
      tab: "Farms",
      dimensions: { height: 3, width: 3, startx: -1, starty: -1 },
      effect(context) {
        if (context == undefined) {
          p.food = getRandomInt(10, 15);
          resources -= 10;
          p.fish = true;
          unemployed -= 2;
        } else {
          p.food = getRandomInt(10, 15);
          context.resources -= 10;
          p.fish = true;
          context.unemployed -= 2;
        }
      },
      requires(context) {
        return context == undefined
          ? resources >= 10 && unemployed >= 2
          : context.resources >= 10 && context.unemployed >= 2;
      },
    },
  ],
  cities: [],
  food: 0,
  population: 0,
  military: 0,
  resources: 0,
  resources:0,
  fish: false,
  xp: 0,
  river: false,
  hill: false,
  entirehill: false,
};
for (const un of p.pieceROM) {
  unlocked.push(un.unlocked);
  buildindices.push(un.name);
  reset.push(un.unlocked);
}

function removebuildings(intensity = 4, onhill = false) {
  let casualties = 0;
  let amount = 0;

  const buildingschecked = [...gridstats];
  for (i = buildingschecked.length - 1; i > -1; i--) {
    buildingschecked[i].bindex = i;
    let remove = false;

    for (let j = 0; j != buildingschecked[i].positions.length; j++) {
      if (
        hillgrid[buildingschecked[i].positions[j].y / 20].includes(
          buildingschecked[i].positions[j].x
        )
      ) {
        remove = true;
      }
    }

    if (!buildingschecked[i].disabled && (!onhill || remove)) {
      amount += 1;
    } else {
      buildingschecked.splice(i, 1);
    }
  }
  let removeamount = Math.floor(amount / intensity);
  for (i = gridstats.length - 1; i > -1; i--) {
    const trueindex = getRandomInt(0, buildingschecked.length - 1);
    const randomb = buildingschecked[trueindex].bindex;

    buildingschecked.splice(trueindex, 1);

    buildingamounts[gridstats[randomb].index] -= 1;
    gridstats[randomb].disabled = true;
    for (const pos of gridstats[randomb].positions) {
      buildstats[pos].disabled = true;
    }
    switch (gridstats[randomb].index) {
      case "11":
        modifiers.military -= 1;
      case "18":
        for (let j = p.cities.length - 1; j > 0; j--) {
          if (
            p.cities[j].x == gridstats[randomb].citypos.x &&
            p.cities[j].y == gridstats[randomb].citypos.y
          ) {
            p.cities.splice(j, 1);
            break;
          }
        }
        recalcBuildings();
      case "19":
        modifiers.food -= 2;
        modifiers.resources -= 2;
    }
    currentpop -= gridstats[randomb].employmentrequired;
    casualties += gridstats[randomb].employmentrequired;
    removeamount -= 1;
    if (removeamount <= 0) {
      break;
    }
  }

  render();
  displayUI();
  return casualties;
}
function isallowed() {
  localallowed = false;
  for (i = 0, len = piece.length; i != len; i++) {
    if (
      position.x - widthmax / 2 + piece[i].x - spawnX > max.right ||
      position.x - widthmax / 2 + piece[i].x - spawnX < max.left ||
      position.y - heightmax / 2 + piece[i].y - spawnY > max.down ||
      position.y - heightmax / 2 + piece[i].y - spawnY < max.up
    ) {
      return false;
    }
    if (tilestats[tilecode(position.x, position.y)] == undefined) {
      return false;
    }

    if (
      p.river &&
      !exists("river", position.x + piece[i].x, position.y + piece[i].y)
    ) {
      return false;
    } else if (
      buildgrid[position.y + piece[i].y].includes(position.x + piece[i].x)
    ) {
      return false;
    } else if (
      !p.river &&
      exists("river", position.x + piece[i].x, position.y + piece[i].y)
    ) {
      return false;
    }
    if (
      p.pieceROM[p_index].near.includes("!hill") ||
      p.pieceROM[p_index].near.includes("not")
    ) {
      if (exists("hill", position.x + piece[i].x, position.y + piece[i].y)) {
        return false;
      }
    }
    if (p.pieceROM[p_index].near.includes("entire")) {
      if (!exists("hill", position.x + piece[i].x, position.y + piece[i].y)) {
        return false;
      }
    }

    if (!first_turn) {
      if (
        buildgrid[position.y + piece[i].y].includes(position.x + piece[i].x + 1)
      ) {
        localallowed = true;
      } else if (
        buildgrid[position.y + piece[i].y].includes(position.x + piece[i].x - 1)
      ) {
        localallowed = true;
      } else if (
        buildgrid[position.y + piece[i].y + 1].includes(position.x + piece[i].x)
      ) {
        localallowed = true;
      } else if (
        buildgrid[position.y + piece[i].y - 1].includes(position.x + piece[i].x)
      ) {
        localallowed = true;
      }
    } else {
      localallowed = true;
    }
  }
  if (!localallowed) return false;
  if (
    p.pieceROM[p_index].near != "building" &&
    !p.pieceROM[p_index].near.includes("!hill") &&
    !p.pieceROM[p_index].near.includes("entire")
  ) {
    localallowed = false;
  }
  for (i = 0; i != piece.length; i++) {
    if (p.pieceROM[p_index].near.includes("river")) {
      if (
        exists("river", position.x + piece[i].x, position.y + piece[i].y + 1)
      ) {
        localallowed = true;
        break;
      } else if (
        exists("river", position.x + piece[i].x, position.y + piece[i].y) - 1
      ) {
        localallowed = true;
        break;
      }
    }
    if (p.pieceROM[p_index].near == "hill") {
      if (exists("hill", position.x + piece[i].x, position.y + piece[i].y)) {
        localallowed = true;
        break;
      }
    }
  }
  return localallowed;
}

canvas.onmousemove = function (event) {
  if (ispainting) {
    position = {
      x: Math.ceil(event.clientX / scroll) + scrollX - 1,
      y: Math.floor(
        event.clientY / scroll + scrollY - screen.height / (20 * scroll)
      ),
    };
    if (position.x != oldposition.x || position.y != oldposition.y) {
      allowed = false;
      oldposition.x = position.x;
      oldposition.y = position.y;

      ctx.beginPath();
      render();
      allowed = isallowed();

      for (len = piece.length, i = 0; i != len; i++) {
        if (!allowed) {
          ctx.fillStyle = "rgba(255,0,0,0.5)";

          ctx.drawImage(
            buildimg,
            p.pieceROM[p_index].piecepositions[i].img.dx,
            p.pieceROM[p_index].piecepositions[i].img.dy,
            20,
            20,
            position.x * scroll - scrollX * scroll + piece[i].x * scroll,
            position.y * scroll + (-scrollY + piece[i].y) * scroll,
            scroll,
            scroll
          );

          ctx.fillRect(
            position.x * scroll - scrollX * scroll + piece[i].x * scroll,
            position.y * scroll + (-scrollY + piece[i].y) * scroll,
            scroll,
            scroll
          );
        } else {
          ctx.strokeStyle = "black";

          ctx.fillStyle = "rgba(0,255,0,0.7)";
          ctx.fillRect(
            position.x * scroll - scrollX * scroll + piece[i].x * scroll,
            position.y * scroll + (-scrollY + piece[i].y) * scroll,
            scroll,
            scroll
          );

          ctx.drawImage(
            buildimg,
            p.pieceROM[p_index].piecepositions[i].img.dx,
            p.pieceROM[p_index].piecepositions[i].img.dy,
            20,
            20,
            position.x * scroll - scrollX * scroll + piece[i].x * scroll,
            position.y * scroll + (-scrollY + piece[i].y) * scroll,
            scroll,
            scroll
          );
        }
      }
      ctx.stroke();
    }
  } else if (removing || repairing) {
    position = {
      x: Math.ceil(event.clientX / scroll) + scrollX - 1,
      y:
        Math.floor(event.clientY / scroll) +
        scrollY -
        screen.height / (20 * scroll),
    };

    render();

    ctx.beginPath();

    if (removing) {
      ctx.strokeStyle = "white";
    } else {
      ctx.strokeStyle = "#4d4d4d";
    }
    ctx.rect(
      position.x * scroll - scrollX * scroll,
      position.y * scroll - scrollY * scroll,
      scroll,
      scroll
    );
    ctx.stroke();
    ctx.closePath();
  }
};
function isremoving() {
  ispainting = false;
  repairing = false;
  if (removing == false) {
    removing = true;
  } else {
    removing = false;
  }
}
function isrepairing() {
  ispainting = false;
  removing = false;
  if (repairing == false) {
    repairing = true;
  } else {
    repairing = false;
  }
}

function renderclouds() {
  const grd = ctx.createLinearGradient(
    (spawnX - scrollX) * scroll + screen.width / 2 + max.right * scroll,
    0,
    (spawnX - scrollX) * scroll +
      screen.width +
      screen.width / 2 +
      max.right * scroll,
    0
  );
  grd.addColorStop(1, "#ffffff");
  grd.addColorStop(0.25, "#ffffff");
  grd.addColorStop(0.15, "rgba(255,255,255,0.8)");
  grd.addColorStop(0, "rgba(255,255,255,0)");
  ctx.fillStyle = grd;
  ctx.fillRect(
    (spawnX - scrollX) * scroll + screen.width / 2 + max.right * scroll,
    0,
    screen.width,
    screen.height
  );
  const ygrd = ctx.createLinearGradient(
    (spawnX - scrollX) * scroll - screen.width / 2 + max.left * scroll,
    0,
    (spawnX - scrollX) * scroll + screen.width / 2 + max.left * scroll,
    0
  );
  ygrd.addColorStop(0, "#ffffff");
  ygrd.addColorStop(0.75, "#ffffff");
  ygrd.addColorStop(0.85, "rgba(255,255,255,0.8)");
  ygrd.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = ygrd;
  ctx.fillRect(
    (spawnX - scrollX) * scroll - screen.width / 2 + max.left * scroll,
    0,
    screen.width,
    screen.height
  );
  const yxgrd = ctx.createLinearGradient(
    0,
    -80 + (spawnY - scrollY) * scroll + screen.height / 2 + max.down * scroll,
    0,
    -80 +
      (spawnY - scrollY) * scroll +
      900 +
      screen.height / 2 +
      max.down * scroll
  );
  yxgrd.addColorStop(1, "#ffffff");
  yxgrd.addColorStop(0.25, "#ffffff");
  yxgrd.addColorStop(0.15, "rgba(255,255,255,0.8)");
  yxgrd.addColorStop(0, "rgba(255,255,255,0)");
  ctx.fillStyle = yxgrd;
  ctx.fillRect(
    0,
    -80 + (spawnY - scrollY) * scroll + screen.height / 2 + max.down * scroll,
    screen.width,
    screen.height
  );
  const xygrd = ctx.createLinearGradient(
    0,
    -120 + (spawnY - scrollY) * scroll - screen.height / 2 + max.up * scroll,
    0,
    -120 + (spawnY - scrollY) * scroll + screen.height / 2 + max.up * scroll
  );
  xygrd.addColorStop(0, "#ffffff");
  xygrd.addColorStop(0.65, "#ffffff");
  xygrd.addColorStop(0.75, "rgba(255,255,255,0.8)");
  xygrd.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = xygrd;
  ctx.fillRect(
    0,
    -120 + (spawnY - scrollY) * scroll - screen.height / 2 + max.up * scroll,
    screen.width,
    screen.height
  );
  ctx.fillStyle = "rgba(0,0,0,1)";
}
canvas.onwheel = function (event) {
  scroll -= event.deltaY / 200;
  scroll = Math.round(Math.max(5, Math.min(50, scroll)));
  heightmax = Math.round((screen.height * 0.88) / scroll);
  widthmax = Math.round(screen.width / scroll);
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
};
function render() {
  ctx.clearRect(0, 0, screen.width, screen.height);

  ctx.fillStyle = "rgb(43,101,236)";
  ctx.fillRect(0, 0, screen.width, screen.height);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    canvas3,
    scrollX*16,
    scrollY*16,
    widthmax*16,
    heightmax*16,
    0,
    0,
    widthmax * scroll*1.01,
    heightmax * scroll
  );

  if (scroll > 8) {
    for (i = scrollY; i <= Math.min(4999, scrollY + heightmax); i++) {
      let plusindex = buildgrid[i][buildgrid[i].length - 1].plus;
      let minusindex = buildgrid[i][buildgrid[i].length - 1].minus;

      if (plusindex < buildgrid[i].length - 2) {
        while (buildgrid[i][plusindex + 1] < scrollX + widthmax) {
          plusindex += 1;
        }
      }
      while (buildgrid[i][plusindex] > scrollX + widthmax) {
        plusindex -= 1;
      }
      if (minusindex > 1) {
        while (buildgrid[i][minusindex - 1] > scrollX) {
          minusindex -= 1;
        }
      }
      while (buildgrid[i][minusindex] < scrollX) {
        minusindex += 1;
      }

      for (let j = minusindex - 1; j < plusindex + 1; j++) {
        const building = buildstats[tilecode(buildgrid[i][j], i)];
        if (building == undefined) {
          continue;
        }

        if (building.disabled) {
          ctx.drawImage(
            buildimg2,
            building.img.dx,
            building.img.dy,
            20,
            20,
            (buildgrid[i][j] - scrollX) * scroll,
            (i - scrollY) * scroll,
            scroll,
            scroll
          );
        } else if (!building.inrange) {
          ctx.drawImage(
            buildimg3,
            building.img.dx,
            building.img.dy,
            20,
            20,
            (buildgrid[i][j] - scrollX) * scroll,
            (i - scrollY) * scroll,
            scroll,
            scroll
          );
        } else {
          ctx.drawImage(
            buildimg,
            building.img.dx,
            building.img.dy,
            20,
            20,
            (buildgrid[i][j] - scrollX) * scroll,
            (i - scrollY) * scroll,
            scroll,
            scroll
          );
        }
      }

      buildgrid[i][buildgrid[i].length - 1].plus = plusindex;
      buildgrid[i][buildgrid[i].length - 1].minus = minusindex;
    }

    for (const road in roadgrid) {
      const pos = JSON.parse(road);

      ctx.drawImage(
        buildimg,
        roadgrid[road].x,
        roadgrid[road].y,
        20,
        20,
        (pos.x - scrollX) * scroll,
        (pos.y - scrollY) * scroll,
        scroll * 1.1,
        scroll * 1.1
      );
    }
  }
  ctx.imageSmoothingEnabled = false;

  ctx.drawImage(
    canvas4,
    scrollX,
    scrollY,
    widthmax,
    heightmax,
    0,
    0,
    widthmax * scroll,
    heightmax * scroll
  );

  ctx.lineWidth = Math.round(scroll / 3);
  const linepos = {
    up: { x: 0, y: 0 },
    down: { x: 0, y: 1 },
    right: { x: 1, y: 0 },
    left: { x: 0, y: 0 },
  };
  const inward = {
    up: { x: 0, y: Math.round(scroll / 6) },
    down: { x: 0, y: -Math.round(scroll / 6) },
    left: { x: Math.round(scroll / 6), y: 0 },
    right: { x: -Math.round(scroll / 6), y: 0 },
  };

  for (const line in borderlines) {
    ctx.beginPath();
    const lineposes = tiledecode(line);

    ctx.strokeStyle = `rgb(${borderlines[line].color.r},${borderlines[line].color.g},${borderlines[line].color.b})`;
    ctx.fillStyle = `rgb(${borderlines[line].color.r},${borderlines[line].color.g},${borderlines[line].color.b})`;

    ctx.moveTo(
      (lineposes.x -
        scrollX +
        linepos[line.substr(line.indexOf("|") + 1, line.length)].x) *
        scroll +
        inward[line.substr(line.indexOf("|") + 1, line.length)].x,
      (lineposes.y -
        scrollY +
        linepos[line.substr(line.indexOf("|") + 1, line.length)].y) *
        scroll +
        inward[line.substr(line.indexOf("|") + 1, line.length)].y
    );
    ctx.lineTo(
      (lineposes.x -
        scrollX +
        linepos[line.substr(line.indexOf("|") + 1, line.length)].x +
        (line.substr(line.indexOf("|") + 1, line.length) == "up" ||
        line.substr(line.indexOf("|") + 1, line.length) == "down"
          ? 1
          : 0)) *
        scroll +
        inward[line.substr(line.indexOf("|") + 1, line.length)].x,
      (lineposes.y -
        scrollY +
        linepos[line.substr(line.indexOf("|") + 1, line.length)].y +
        (line.substr(line.indexOf("|") + 1, line.length) == "left" ||
        line.substr(line.indexOf("|") + 1, line.length) == "right"
          ? 1
          : 0)) *
        scroll +
        inward[line.substr(line.indexOf("|") + 1, line.length)].y
    );
    switch (line.substr(line.indexOf("|") + 1, line.length)) {
      case "up":
        if (
          borderlines[tilecode(lineposes.x + 1, lineposes.y - 1) + "|left"] !=
          undefined
        ) {
          ctx.fillRect(
            (lineposes.x + 1 - scrollX) * scroll,
            (lineposes.y - scrollY) * scroll,
            Math.round(scroll / 3),
            Math.round(scroll / 3)
          );
        }
        if (
          borderlines[tilecode(lineposes.x - 1, lineposes.y - 1) + "|right"] !=
          undefined
        ) {
          ctx.fillRect(
            (lineposes.x - scrollX) * scroll - Math.round(scroll / 3),
            (lineposes.y - scrollY - 1) * scroll,
            Math.round(scroll / 3),
            Math.round(scroll / 3)
          );
        }
        break;
      case "right":
        if (
          borderlines[tilecode(lineposes.x + 1, lineposes.y + 1) + "|up"] !=
          undefined
        ) {
          ctx.fillRect(
            (lineposes.x + 1 - scrollX) * scroll - Math.round(scroll / 3),
            (lineposes.y - scrollY + 1) * scroll,
            Math.round(scroll / 3),
            Math.round(scroll / 3)
          );
        }
        if (
          borderlines[tilecode(lineposes.x + 1, lineposes.y - 1) + "|down"] !=
          undefined
        ) {
          ctx.fillRect(
            (lineposes.x - scrollX + 1) * scroll - Math.round(scroll / 3),
            (lineposes.y - scrollY) * scroll,
            Math.round(scroll / 3),
            Math.round(scroll / 3)
          );
        }
        break;
      case "down":
        if (
          borderlines[tilecode(lineposes.x + 1, lineposes.y + 1) + "|left"] !=
          undefined
        ) {
          ctx.fillRect(
            (lineposes.x + 1 - scrollX) * scroll - Math.round(scroll / 3),
            (lineposes.y - scrollY + 1) * scroll - Math.round(scroll / 3),
            Math.round(scroll / 3),
            Math.round(scroll / 3)
          );
        }
        if (
          borderlines[tilecode(lineposes.x - 1, lineposes.y + 1) + "|right"] !=
          undefined
        ) {
          ctx.fillRect(
            (lineposes.x - scrollX) * scroll - Math.round(scroll / 3),
            (lineposes.y - scrollY + 1) * scroll - Math.round(scroll / 3),
            Math.round(scroll / 3),
            Math.round(scroll / 3)
          );
        }
        break;
      case "left":
        if (
          borderlines[tilecode(lineposes.x - 1, lineposes.y + 1) + "|up"] !=
          undefined
        ) {
          ctx.fillRect(
            (lineposes.x - scrollX) * scroll,
            (lineposes.y - scrollY + 1) * scroll,
            Math.round(scroll / 3),
            Math.round(scroll / 3)
          );
        }
        if (
          borderlines[tilecode(lineposes.x - 1, lineposes.y - 1) + "|down"] !=
          undefined
        ) {
          ctx.fillRect(
            (lineposes.x - scrollX) * scroll,
            (lineposes.y - scrollY) * scroll - Math.round(scroll / 3),
            Math.round(scroll / 3),
            Math.round(scroll / 3)
          );
        }
        break;
    }

    ctx.stroke();
  }

  renderclouds();
  renderarmy();
  for (const n of nations) {
    ctx.fillStyle = "#586969";

    ctx.strokeStyle = "#3e4241";
    ctx.font = `bold ${scroll}px Roboto Slab`;
    ctx.beginPath();
    ctx.fillRect(
      (n.spawn.x - scrollX) * scroll - Math.round(scroll / 2),
      (n.spawn.y - scrollY - 1) * scroll,
      ctx.measureText(n.name + "  " + n.currentpop).width + scroll,
      scroll * 2
    );
    ctx.strokeRect(
      (n.spawn.x - scrollX) * scroll - Math.round(scroll / 2),
      (n.spawn.y - scrollY - 1) * scroll,
      ctx.measureText(n.name + "  " + n.currentpop).width + scroll,
      scroll * 2
    );
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = `rgb(${n.bordercolors.r}, ${n.bordercolors.g}, ${n.bordercolors.b})`;

    ctx.fillText(
      n.name + "  " + n.currentpop,
      (n.spawn.x - scrollX) * scroll,
      (n.spawn.y - scrollY) * scroll
    );
  }
}

function renderarmy() {
  ctx2.clearRect(0, 0, screen.width, screen.height);
  ctx2.lineWidth = scroll / 5;

  for (const n of nations) {
    ctx2.strokeStyle = `rgb(${n.linecolors.r}, ${n.linecolors.g}, ${n.linecolors.b})`;

    for (const army of n.armies) {
      ctx2.fillStyle = `rgb(${n.bordercolors.r}, ${n.bordercolors.g}, ${n.bordercolors.b})`;

      regpos = {
        x: (army.position.x - scrollX) * scroll,
        y: (army.position.y - scrollY) * scroll,
      };
      ctx2.beginPath();
      ctx2.moveTo(
        regpos.x + Math.cos((160 * Math.PI) / 180) * scroll,
        regpos.y + Math.sin((160 * Math.PI) / 180) * scroll
      );
      for (let i = 232; i < 593; i += 72) {
        ctx2.lineTo(
          regpos.x +
            Math.cos(((i - Math.floor(i / 360) * 360) * Math.PI) / 180) *
              Math.log(army.personnel / 200 + 2) *
              scroll,
          regpos.y +
            Math.sin(((i - Math.floor(i / 360) * 360) * Math.PI) / 180) *
              scroll *
              Math.log(army.personnel / 200 + 2)
        );
      }

      ctx2.fill();
      ctx2.stroke();
      ctx2.font = `${scroll}px Arial`;
      ctx2.fillStyle = "white";
      ctx2.fillText(
        shorten(army.personnel),
        regpos.x - (shorten(army.personnel).length * scroll) / 4,
        regpos.y + scroll * 2
      );
      //ctx2.fillRect((army.position.x-scrollX)*scroll,(army.position.y-scrollY)*scroll,scroll*Math.log(Math.max(army.personnel,10)),scroll*Math.log(Math.max(army.personnel,10)))
      ctx2.fillStyle = "rgba(255,0,0,0.5)";
    }
  }
  for (let i = arrows.length - 1; i > -1; i--) {
    const arrow = arrows[i];
    if (
      distance(
        arrow.position.x,
        arrow.position.y,
        arrow.destination.x,
        arrow.destination.y
      ) < 2
    ) {
      if (
        distance(
          arrow.position.x,
          arrow.position.y,
          arrow.army.position.x,
          arrow.army.position.y
        ) < 2
      ) {
        let damage = arrow.damage;
        arrow.army.troops.swords -= Math.ceil(damage / 9);
        damage -= Math.ceil(damage / 9);
        arrow.army.troops.archers -= damage;
        getNationById(arrow.army.id).currentpop -= damage;
      }
      arrows.splice(i, 1);
    }
    ctx2.lineWidth = Math.floor(scroll / 5);
    ctx2.strokeStyle = "black";

    const direction = Math.atan2(
      arrow.destination.y - arrow.position.y,
      arrow.destination.x - arrow.position.x
    );
    ctx2.beginPath();
    ctx2.moveTo(
      (arrow.position.x - scrollX) * scroll,
      (arrow.position.y - scrollY) * scroll
    );
    ctx2.lineTo(
      (arrow.position.x + Math.cos(direction) - scrollX) * scroll,
      (arrow.position.y + Math.sin(direction) - scrollY) * scroll
    );
    ctx2.stroke();
    arrow.position.x += Math.cos(direction);
    arrow.position.y += Math.sin(direction);
  }
}

function recalcBuildings() {
  if (difficulty < 10) {
    return;
  }
  outofrange = gridstats.length;

  for (const building of gridstats) {
    building.inrange = false;
    for (const city of p.cities) {
      for (const position of building.positions) {
        if (
          Math.abs(position.x - city.x) <= 30 &&
          Math.abs(position.y - city.y) <= 30
        ) {
          building.inrange = true;
          outofrange--;
          break;
        }
      }
    }
  }

  render();
}

function recalcroads(roads) {
  const valueindex = [
    "0000",
    "1000",
    "0100",
    "0010",
    "0001",
    "1100",
    "0110",
    "0011",
    "1001",
    "1110",
    "0111",
    "1011",
    "1101",
    "1010",
    "0101",
    "1111",
  ];
  const valuexy = [
    { x: 212, y: 1 },
    { x: 233, y: 1 },
    { x: 254, y: 1 },
    { x: 275, y: 1 },
    { x: 212, y: 21 },
    { x: 233, y: 21 },
    { x: 254, y: 21 },
    { x: 275, y: 21 },
    { x: 212, y: 42 },
    { x: 233, y: 42 },
    { x: 254, y: 42 },
    { x: 275, y: 42 },
    { x: 212, y: 63 },
    { x: 233, y: 63 },
    { x: 254, y: 63 },
    { x: 275, y: 63 },
  ];
  const constraints = [
    {
      istrue(whichroad) {
        const pos = JSON.parse(whichroad);
        return (
          roadgrid[JSON.stringify({ x: pos.x, y: pos.y - 1 })] != undefined
        );
      },
    },
    {
      istrue(whichroad) {
        const pos = JSON.parse(whichroad);
        return (
          roadgrid[JSON.stringify({ x: pos.x + 1, y: pos.y })] != undefined
        );
      },
    },
    {
      istrue(whichroad) {
        const pos = JSON.parse(whichroad);
        return (
          roadgrid[JSON.stringify({ x: pos.x, y: pos.y + 1 })] != undefined
        );
      },
    },
    {
      istrue(whichroad) {
        const pos = JSON.parse(whichroad);
        return (
          roadgrid[JSON.stringify({ x: pos.x - 1, y: pos.y })] != undefined
        );
      },
    },
  ];

  for (const road in roads) {
    if (roadgrid[roads[road]] != undefined) {
      let value = "";
      for (const el of constraints) {
        value += el.istrue(roads[road]) ? 1 : 0;
      }

      roadgrid[roads[road]] = valuexy[valueindex.indexOf(value.toString())];
    }
  }
}
canvas.onmousedown = function (event) {
  if (ispainting && allowed) {
    allowed = false;
    let isInRange = false;
    click.play();
    p.population = 0;
    p.military = 0;
    p.resources = 0;
    p.food = 0;
    p.xp = 0;
    p.fish = 0;
    const oldpop = unemployed;
    const gridposition = [];
    if (Math.floor(position.x - screen.width / 40) - spawnX + 5 > max.right) {
      max.right =
        Math.floor(position.x - screen.width / 2) / scroll - spawnX + 5;
    }
    if (Math.floor(position.x - screen.width / 40) - spawnX - 5 < max.left) {
      max.left =
        Math.floor(position.x - screen.width / 2) / scroll - spawnX - 5;
    }
    if (Math.floor(position.y - screen.height / 40) - spawnY + 10 > max.down) {
      max.down =
        Math.floor(position.y - screen.height / 2) / scroll - spawnY + 10;
    }
    if (Math.floor(position.y - screen.height / 40) - spawnY - 5 < max.up) {
      max.up = Math.floor(position.y - screen.height / 2) / scroll - spawnY - 5;
    }
    for (i = 0; i != piece.length; i++) {
      gridposition.push({
        x: position.x + piece[i].x,
        y: position.y + piece[i].y,
        img: p.pieceROM[p_index].piecepositions[i].img,
      });
      const point = buildgrid[position.y + piece[i].y][0];
      buildgrid[position.y + piece[i].y].splice(0, 0, position.x + piece[i].x);
      buildgrid[position.y + piece[i].y].sort(function (a, b) {
        return a - b;
      });

      if (
        p.pieceROM[p_index].name == "Road" ||
        p.pieceROM[p_index].name == "Bridge" ||
        p.pieceROM[p_index].name == "Bonfire" ||
        difficulty < 10
      ) {
        isInRange = true;
        if (p.pieceROM[p_index].name == "Road") {
          p.pieceROM[p_index].effect(undefined);
          buildingamounts[p_index] += 1;
          roadgrid[JSON.stringify({ x: position.x, y: position.y })] = {
            x: 0,
            y: 0,
          };
          recalcroads([
            JSON.stringify({ x: position.x, y: position.y }),
            JSON.stringify({ x: position.x + 1, y: position.y }),
            JSON.stringify({ x: position.x, y: position.y + 1 }),
            JSON.stringify({ x: position.x, y: position.y - 1 }),
            JSON.stringify({ x: position.x - 1, y: position.y }),
          ]);
          displayUI();
          render();
          allowed = false;
          first_turn = false;
          if (!p.pieceROM[p_index].requires(undefined)) {
            piece.length = 0;
            ispainting = false;
          }
          return;
        }
      }
      if (!isInRange) {
        for (j = 0; j < p.cities.length; j++) {
          if (
            Math.abs(p.cities[j].x - gridposition[i].x) <= 15 &&
            Math.abs(p.cities[j].y - gridposition[i].y) <= 15
          ) {
            isInRange = true;
            break;
          }
        }
      }
      buildstats[tilecode(position.x + piece[i].x, position.y + piece[i].y)] = {
        img: p.pieceROM[p_index].piecepositions[i].img,
        disabled: false,
        inrange: isInRange,
      };

      if (!exists("hill", position.x + piece[i].x, position.y + piece[i].y)) {
        p.entirehill = false;
      }
      if (exists("hill", position.x + piece[i].x, position.y + piece[i].y)) {
        p.hill = true;
      }
    }

    const oldresources = resources;
    p.pieceROM[p_index].effect(undefined);

    gridstats.push({
      index: p_index,
      letter: letter,
      population: p.population,
      employmentrequired: oldpop - unemployed,
      food: p.food,
      resources: p.resources,
      military: p.military,
      xp: p.xp,
      fish: p.fish,
      positions: gridposition.slice(0),
      resourcerefund: oldresources - resources,
      disabled: false,
      inrange: isInRange,
    });

    xp += Math.ceil(
      (oldresources - resources) * (1 + techstats.innovation) * 2
    );
    first_turn = false;
    if (p_index == 18) {
      gridstats[gridstats.length - 1].citypos = {
        x: position.x,
        y: position.y,
      };
    }
    if (!p.pieceROM[p_index].requires(undefined)) {
      piece.length = 0;
      ispainting = false;
    }

    buildingamounts[p_index] += 1;
    if (!isInRange) {
      outofrange++;
    }
    displayUI();
    render();
    if (tutorialindex == 10 || tutorialindex == 11 || tutorialindex == 12) {
      displayUI();
      if (tutorialindex != 12) {
        continuetutorial(++tutorialindex, 78.5, 87.5, false);
      } else {
        if (p.pieceROM[0].amountbought >= 2) {
          continuetutorial(++tutorialindex);
        }
      }
    }
  } else if (removing && buildgrid[position.y].includes(position.x)) {
    let found = false;
    let buildingindex = 0;
    if (
      roadgrid[JSON.stringify({ x: position.x, y: position.y })] != undefined
    ) {
      delete roadgrid[JSON.stringify({ x: position.x, y: position.y })];
      recalcroads([
        JSON.stringify({ x: position.x + 1, y: position.y }),
        JSON.stringify({ x: position.x, y: position.y + 1 }),
        JSON.stringify({ x: position.x, y: position.y - 1 }),
        JSON.stringify({ x: position.x - 1, y: position.y }),
      ]);
      render();
      return;
    }
    for (i = 0, len = gridstats.length; i < len; i++) {
      for (let j = 0, len = gridstats[i].positions.length; j < len; j++) {
        if (
          gridstats[i].positions[j].x == position.x &&
          gridstats[i].positions[j].y == position.y
        ) {
          buildingindex = i;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    for (const el of gridstats[buildingindex].positions) {
      const indexx = buildgrid[el.y].indexOf(el.x);
      buildgrid[el.y].splice(indexx, 1);
      delete buildstats[tilecode(el.x, el.y)];
      breaksound.play();
    }
    resources += Math.floor(gridstats[buildingindex].resourcerefund / 2);
    buildingamounts[gridstats[buildingindex].index] -= 1;

    switch (gridstats[buildingindex].index) {
      case "11":
        modifiers.military -= 1;
      case "18":
        for (i = 0, len = p.cities.length; i < len; i++) {
          if (
            p.cities[i].x == gridstats[buildingindex].citypos.x &&
            p.cities[i].y == gridstats[buildingindex].citypos.y
          ) {
            p.cities.splice(i, 1);
          }
        }
        recalcBuildings();
      case "19":
        modifiers.food -= 2;
        modifiers.resources -= 2;
    }
    gridstats.splice(buildingindex, 1);

    render();
    displayUI();
  } else if (repairing && buildgrid[position.y].includes(position.x)) {
    let found = false;
    let buildingindex = 0;
    for (let i = 0, len = gridstats.length; i < len; i++) {
      for (let j = 0, len = gridstats[i].positions.length; j < len; j++) {
        if (
          gridstats[i].positions[j].x == position.x &&
          gridstats[i].positions[j].y == position.y
        ) {
          buildingindex = i;
          found = true;
          break;
        }
      }
      if (found) break;
    }
    if (
      gridstats[buildingindex].disabled == true &&
      resources >= Math.round(gridstats[buildingindex].resourcerefund / 2) &&
      unemployed >= gridstats[buildingindex].employmentrequired
    ) {
      repairsound.play();
      resources -= Math.round(gridstats[buildingindex].resourcerefund / 2);
      gridstats[buildingindex].disabled = false;
      for (const pos of gridstats[buildingindex].positions) {
        buildstats[pos].disabled = false;
      }
      switch (gridstats[buildingindex].index) {
        case "11":
          modifiers.military += 1;
        case "18":
          p.cities.push(gridstats[buildingindex].citypos);
          recalcBuildings();
        case "19":
          modifiers.food += 2;
          modifiers.resources += 2;
      }
      render();
      displayUI();
    }
  }
};

document.onkeydown = function (event) {
  if (event.key == "Escape") {
    if (canvas.style.display == "block") {
      pause_menu();
    }
    return;
  }
  if (event.key == "-" && scroll > 1) {
    scroll -= 1;
    heightmax = Math.round((screen.height * 0.88) / scroll);
    widthmax = Math.round(screen.width / scroll);
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
    return;
  } else if (event.key == "=" && scroll < 50) {
    scroll += 1;
    heightmax = Math.round((screen.height * 0.88) / scroll);
    widthmax = Math.round(screen.width / scroll);
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
    return;
  } else if (event)
    if (
      techstats.exploration &&
      document.getElementById("popup_block_buttons").style.display != "block" &&
      canvas.style.display == "block"
    ) {
      if (psettings.arrowkeys) {
        switch (event.key) {
          case "ArrowUp":
            if (scrollY > 0 && scrollY - spawnY > max.up) {
              move(0, -1);
            }
            break;
          case "ArrowDown":
            if (scrollY < 4999 - heightmax && scrollY - spawnY < max.down) {
              move(0, 1);
            }
            break;
          case "ArrowLeft":
            if (scrollX > 0 && scrollX - spawnX > max.left) {
              move(-1, 0);
            }
            break;
          case "ArrowRight":
            if (scrollX < 4999 && scrollX - spawnX < max.right) {
              move(1, 0);
            }
            break;

          //case "r":
          //rotate()
          //break
        }
      } else {
        switch (event.key) {
          case "w":
            if (scrollY > 0 && scrollY - spawnY > max.up) {
              move(0, -1);
            }
            break;
          case "s":
            if (scrollY < 999 - heightmax && scrollY - spawnY < max.down) {
              move(0, 1);
            }
            break;
          case "a":
            if (scrollX > 0 && scrollX - spawnX > max.left) {
              move(-1, 0);
            }
            break;
          case "d":
            if (scrollX < 999 && scrollX - spawnX < max.right) {
              move(1, 0);
            }
            break;
          //case "r":
          //rotate()
          //break
        }
      }
    }
};
function rotate() {
  difference += 0.5;
  let x = [];
  let y = [];
  for (i = 0; i != piece.length; i++) {
    x.push(piece[i].x);
    y.push(piece[i].y);
  }
  let max = Math.max(...x);
  let min = Math.min(...x);
  let miny = Math.min(...y);
  let maxy = Math.max(...y);
  midpoint = { x: (min + max) / 2, y: (miny + maxy) / 2 };

  for (i = 0; i < piece.length; i++) {
    piece[i].x -= midpoint.x;
    piece[i].y -= midpoint.y;

    oldy = piece[i].y;
    piece[i].y = piece[i].x * -1;
    piece[i].x = oldy;
    piece[i].x += midpoint.x;
    piece[i].y += midpoint.y;
    piece[i].x = Math.floor(piece[i].x);
    piece[i].y = Math.floor(piece[i].y);
    if (Math.floor(difference) == 1) {
      piece[i].x += 1;
      piece[i].y += 1;
    }
  }
  if (Math.floor(difference) == 1) {
    difference = 0;
  }
  render();
}
function select(index) {
  removing = false;
  repairing = false;
  piece = [];
  p.river = false;
  p.hill = false;
  p.entirehill = true;
  for (i = 0; i != p.pieceROM[index].piecepositions.length; i++) {
    piece.push(p.pieceROM[index].piecepositions[i]);
  }
  if (p.pieceROM[index].name == "Bridge") {
    p.river = true;
  }

  letter = p.pieceROM[index].letter;
  p_index = index;
  p.pieceROM[index];
  ispainting = true;
}
function cancel() {
  piece = [];
  removing = false;
  ispainting = false;
  repairing = false;
  render();
}

function displaytab() {
  const selectcontainer = document.getElementById("select-grid");
  const ele = document.getElementsByClassName("select-choice");
  for (i = ele.length - 1; i > -1; i--) {
    ele[i].remove();
  }
  for (i = 0, len = p.pieceROM.length; i < len; i++) {
    if (p.pieceROM[i].tab == tab) {
      const button = document.createElement("button");
      button.style.animation = "none";
      button.innerHTML = p.pieceROM[i].name;
      button.className = "select-choice";
      button.id = i;
      button.onclick = function () {
        select(button.id);
      };
      if (
        !p.pieceROM[i].requires() ||
        !p.pieceROM[i].unlocked ||
        (tutorialindex == 10 && p.pieceROM[i].name != "Small Mine") ||
        (tutorialindex == 11 && p.pieceROM[i].name != "Small Farm") ||
        (tutorialindex == 12 && p.pieceROM[i].name != "Canopy")
      ) {
        button.disabled = true;
      } else {
        button.disabled = false;
        if (buildingamounts[i] < 1 && !psettings.noflash) {
          button.style.animation = "flash 2s step-start infinite";
        }
      }
      selectcontainer.insertBefore(
        button,
        document.getElementById("year_label")
      );
    }
  }
}
