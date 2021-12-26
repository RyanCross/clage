import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { aoe4Maps } from "./maps";
import { IMapProvider, AoeIVMap } from "./types";

class MapProvider implements IMapProvider {
  maps: AoeIVMap[];

  getRandomMap(options: string[]): AoeIVMap {
    if (options.length === 0) {
      return this.maps[getRandomInt(0, this.maps.length)];
    }

    const filteredMaps = this.maps.filter((map) => options.includes(map.type));
    return filteredMaps[getRandomInt(0, filteredMaps.length)];
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomNum: number = Math.floor(Math.random() * (max - min) + min);
    return randomNum; //The maximum is exclusive and the minimum is inclusive
  }

  constructor(maps: AoeIVMap[]) {
    this.maps = maps;
  }
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let randomNum: number = Math.floor(Math.random() * (max - min) + min);
  return randomNum; //The maximum is exclusive and the minimum is inclusive
}

function main() {
  yargs(hideBin(process.argv))
    .command(
      "map",
      "Returns a random map of any type. Or if optional flags are provided, maps of just those types.",
      {},
      (args) => {
        let options = [];
        const mapProvider = new MapProvider(aoe4Maps);
        if (args.land) {
          options.push("Land");
        }
        if (args.water) {
          options.push("Water");
        }
        if (args.hybrid) {
          options.push("Hybrid");
        }

        console.log(mapProvider.getRandomMap(options).name);
      }
    )
    .option("land", {
      alias: "l",
      type: "boolean",
      description: "Include land maps",
    })
    .option("water", {
      alias: "w",
      type: "boolean",
      description: "Include water maps",
    })
    .option("hybrid", {
      alias: "h",
      type: "boolean",
      description: "Include hybrid maps",
    })
    .parse();
}

main();
