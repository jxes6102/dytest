export interface stepType {
    wherePlace: number
    content: number
    useSize:number
    stepID:number
    status:string
}
//每一個格子
export interface viewType {
    data: number
    size: number
    weight: number
}
//每一個選擇框
export interface xoType {
    amount:number
    isChose:boolean
    weight:number
}
export class viewData {
    private data:viewType[] = []

    constructor(){
        this.creatData()
    }

    creatData() {
        for(let i = 0;i<9;i++) {
            this.data.push({
                data:0,
                size:0,
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

    constructor(){
        this.creatData()
    }

    creatData() {
        for(let i = 0;i<2;i++) {
            this.data[i] = []
            for(let j = 0;j<3;j++) {
                this.data[i].push({
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