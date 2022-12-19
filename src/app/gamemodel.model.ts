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

export class viewData {
    private data:viewType[] = []

    constructor(){
        this.creatData()
    }

    creatData() {
        for(let i = 0;i<9;i++) {
            this.data.push({
                styleName:"square"+ i.toString(),
                data:0,
                size:'',
                weight:0
            })
        }
    }
    
    getData() {
        return this.data
    }
 }

 export class selectData {
    private data:xoType[] = []
    private styleData:string[] = ["bigSize","mediumSize","smallSize"]

    constructor(){
        this.creatData()
    }

    creatData() {
        for(let i = 0;i<3;i++) {
            this.data.push({
                styleName:this.styleData[i],
                amount:3,
                isChose:false,
                weight:3-i,
            })
        }
    }
    
    getData() {
        return this.data
    } 
 }