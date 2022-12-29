export interface stepType {
    wherePlace: number;
    content: number;
    useSize:string;
    stepID:number;
    status:string
}
export interface buttonType {
    text:string;
    mode:string;
    styleName:string;
    isClose:boolean;
}
//每一個格子
export interface viewType {
    styleName: string;
    data: number;
    size: string
    weight: number
}
//每一個選擇框
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
    
    get getData() {
        return this.data
    }
 }
export class selectData {
    private data:xoType[][] = []
    private styleData:string[] = ["bigSize","mediumSize","smallSize"]

    constructor(){
        this.creatData()
    }

    creatData() {
        for(let i = 0;i<2;i++) {
            this.data[i] = []
            for(let j = 0;j<3;j++) {
                this.data[i].push({
                    styleName:this.styleData[j],
                    amount:3,
                    isChose:false,
                    weight:3-j,
                })
            }
        }
    }

    get getData() {
        return this.data
    }
}
 
export class checkData {
    private data:stepType[][] = []

    constructor(){
        this.creatData()
    }

    creatData() {
        for(let i = 0;i<9;i++) this.data[i] = []
    }
    
    get getData() {
        return this.data
    } 
 }