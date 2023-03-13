import IPlayer from "./IPlayer";

export interface ICSVdata {
    data: IData[],
    setData: () => void
}

type IData = keyof IPlayer
