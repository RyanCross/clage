/*
    Maps are broken into three broad categories:
    Land - Terrain is entirely land.
    Water - Maps where water is the primary focus of play.
    Hybrid - Water is an available and contested resource, but is not the entire focus of the map.
*/
export type MapType = "Land" | "Hybrid" | "Water";

export interface AoeIVMap {
  name: string;
  type: MapType;
}

export interface IMapProvider {
  maps: AoeIVMap[];
  getRandomMap(options: string[]): AoeIVMap;
  getRandomInt(min: number, max: number): number;
}
