export interface BreakBill { products: any[] ,  create: string,  total:  number }
export interface StateType {
    productReceipt: any[]
    receiptTotal: number
    breakBill: BreakBill[]
}

export default {}