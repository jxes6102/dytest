export interface viewType {
    className: string;
    data: number;
    size: string
    weight: number
}

export interface stepType {
    wherePlace: number;
    content: number;
    useSize:string
}

export interface recordType {
    [propName: string]: stepType[];
}

export interface buttonType {
    text:string;
    mode:string;
    className:string;
    isClose:boolean;
}

export interface xoType {
    styleName:string;
    amount:number;
    isChose:boolean;
    weight:number;
}
