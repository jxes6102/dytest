export interface viewType {
    styleName: string;
    data: number;
    size: string
    weight: number
}

export interface stepType {
    wherePlace: number;
    content: number;
    useSize:string;
    stepID:number;
}

export interface recordType {
    [propName: string]: stepType[];
}

export interface buttonType {
    text:string;
    mode:string;
    styleName:string;
    isClose:boolean;
}

export interface xoType {
    styleName:string;
    amount:number;
    isChose:boolean;
    weight:number;
}
