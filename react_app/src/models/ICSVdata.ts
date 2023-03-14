import IPlayer from "./IPlayer";

export interface ICSVdata {
    data: IData[]
}

type IData = keyof IPlayer
