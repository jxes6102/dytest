export interface viewType {
    className: string;
    data: number;
}

export interface stepType {
    wherePlace: number;
    content: number;
}

export interface recordType {
    [propName: string]: stepType[];
}