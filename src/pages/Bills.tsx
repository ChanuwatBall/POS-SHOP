import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonText, IonToolbar } from "@ionic/react"
import moment from "moment";
import { useState } from "react";
import { Calendar, DateRangePicker } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "./css/Bills.css"
import { caretDown, caretUp, closeCircle, printOutline } from "ionicons/icons";
import { generateReceiptPdfMake } from "../utils/ReceiptPdfMake";

 const bills = [
        {
            id:"bill0001",
            date: "24 มิถุนายน 2568" , 
            create: "2025-06-24 19:12:39",
            products:[
                { id: 35 ,name:"เลย์ ดั้งเดิมแผ่นหยัก 20g."  ,unitPrice: 6.00 , count: 1 , price: 6.00},
                { id: 36 ,name:"เลย์ ดั้งเดิมแผ่นเรียบ 20g."  ,unitPrice: 6.00, count: 2 , price: 12.00 },
                { id: 37 ,name:"เลย์ โนริสาหร่ายแผ่นเรียบ 20g."  ,unitPrice: 6.00, count: 1, price: 6.00  }, 
            ],
            total: 24.00 ,
            cash: 100.00 ,
            change: 76.00
        },
         {
            id:"bill0002",
            date: "24 มิถุนายน 2568" , 
            create: "2025-06-24 19:12:39",
            products:[
                { id: 23 ,name:"Soap" ,unitPrice: 18.00 ,count: 1 , price: 18.00  },
                { id: 43 ,name:"ยาสีฟัน",unitPrice: 59.00 ,count: 1 , price: 59.00    },
                { id: 67 ,name:"แปรงสีฟัน" ,unitPrice: 15.00 ,count: 1 , price: 15.00    },
            ],
            total:  92.00 ,
            cash: 100.00 ,
            change: 8.00
        }
    ]

const Bills:React.FC =()=>{ 
    const [popupdate , setPopupDate] = useState(false)
    const [billdetail,setBillDtail] = useState<any>(null)
    const [selectionRange , setRange] = useState({
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    })
    const handleSelect=(e:any)=>{
        console.log("date select ", e)
        setRange(e?.selection)
    }

    const billDetail=(bill:any)=>{
        setBillDtail(bill)
    }

    const printBill=()=>{
        generateReceiptPdfMake({
            date:billdetail?.date ,
            products: billdetail?.products , 
            total:billdetail?.total , 
            cash:billdetail?.cash ,
            change: billdetail?.change
        })
    }

    return(
        <IonPage>
            <IonHeader mode='md' className='ion-no-border ion-hide-sm-up' >
                  <IonToolbar> <IonMenuButton/> </IonToolbar>
            </IonHeader>
             <IonContent  >
                 <div className='content-background ion-padding' >
                  
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <div style={{position:"relative"}}> 
                                    <div className="date-picker set-center flex-row" onClick={()=>setPopupDate(!popupdate)}>
                                        เลือกวันที่: &nbsp;
                                        {moment(selectionRange?.startDate).format("DD-MMM-YYYY")} To &nbsp;
                                        {moment(selectionRange?.endDate).format("DD-MMM-YYYY")}  &nbsp;
                                    <IonButton fill="clear" size="small" color={"medium"} onClick={()=>{setPopupDate(false)}} >   
                                        <IonIcon icon={  popupdate ? caretUp:caretDown}   />  </IonButton>
                                    </div>

                                    {popupdate && <div className="popup-date"   > <DateRangePicker 
                                        ranges={[selectionRange]}
                                        onChange={handleSelect}
                                    /></div>} </div>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="7" >
                                <IonRow>
                                {
                                bills.map((b,index)=>
                                    <IonCol size="6"  key={index}>  
                                        <IonCard mode="ios" className="ion-no-margin" onClick={()=>{billDetail(b)}}>
                                        <IonCardHeader>  {b?.date} </IonCardHeader>
                                        <IonCardContent> 
                                            <IonLabel color={"dark"}>
                                             <strong>{b?.total?.toFixed(2)} Bath</strong>
                                            </IonLabel> <br/>
                                            <IonLabel>{b?.create}</IonLabel> 
                                        </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                    )
                                } 
                                    </IonRow>
                            </IonCol>
                            <IonCol size="5" >
                                <div className='receipt-product ion-text-center ion-padding ' 
                                style={{width:"100%", height:"85vh",overflowY:"scroll",position:"relative"}}  > 
                                 <button onClick={()=>{printBill()}} className="btn-print-bill" ><IonIcon icon={printOutline} /></button>
                                  { billdetail && <div>
                                    <IonLabel className="ion-text-center">
                                     <strong>ใบเสร็จรับเงิน</strong>
                                    </IonLabel> <br/><br/>
                                    <div className="bill-head ion-text-left "> 
                                    <IonLabel className="text-small" >
                                        <IonText>{moment().format("DD MMMM YYYY เวลา HH:mm:ss")}</IonText><br/>
                                        <IonText>พนักงาน: Employee1 </IonText><br/> 
                                    </IonLabel><br/>
                                    <IonText className="text-small">
                                      <strong>รายการสินค้า</strong>
                                    </IonText> 
                                    </div>
                                    <div className="bill-products"> 
                                        {
                                            billdetail?.products.map((p:any,index:any)=> 
                                                <div key={index} className="product text-small" 
                                                style={{width:"100%", display:"flex", justifyContent:"space-between"}}>
                                                    <IonLabel>{p?.name} x{p?.count}</IonLabel> 
                                                    <IonLabel>{p?.price?.toFixed(2)}</IonLabel>
                                                </div>
                                            )
                                        }
                                    </div><br/> 
                                    
                                    <div className="totals" style={{borderTop:"1px dashed #DDD",paddingTop:"5px",paddingBottom:"5px"}} >
                                        <div className="product text-small" style={{width:"100%", display:"flex", justifyContent:"space-between"}}>
                                            <IonLabel>รวม </IonLabel> 
                                            <IonLabel>{billdetail?.total?.toFixed(2)}</IonLabel>
                                        </div>
                                        <div className="product text-small" style={{width:"100%", display:"flex", justifyContent:"space-between"}}>
                                            <IonLabel>ภาษี 7%</IonLabel> 
                                            <IonLabel>00.00</IonLabel>
                                        </div>
                                         <div className="product text-small text-bold " style={{width:"100%", display:"flex", justifyContent:"space-between"}}>
                                            <IonLabel>รวมทั้งหมด</IonLabel> 
                                            <IonLabel>{billdetail?.total?.toFixed(2)}</IonLabel>
                                        </div>
                                    </div>
                                    <div className="totals" style={{borderTop:"1px dashed #DDD",paddingTop:"5px"}} >
                                        <div className="product text-small" style={{width:"100%", display:"flex", justifyContent:"space-between"}}>
                                            <IonLabel>การชำระเงิน </IonLabel>  
                                        </div>
                                        <div className="product text-small" style={{width:"100%", display:"flex", justifyContent:"space-between"}}>
                                            <IonLabel>เงินสด</IonLabel> 
                                            <IonLabel>{billdetail?.cash?.toFixed(2)}</IonLabel>
                                        </div>
                                         <div className="product text-small text-bold " style={{width:"100%", display:"flex", justifyContent:"space-between"}}>
                                            <IonLabel>เงินทอน</IonLabel> 
                                            <IonLabel>{billdetail?.change?.toFixed(2)}</IonLabel>
                                        </div>
                                    </div>

                                    <IonRow>
                                        <IonCol size="6" >

                                        </IonCol>
                                    </IonRow>
                                    </div>}
                                </div>
                            </IonCol>
                           
                        </IonRow>
                    </IonGrid>
                 </div>
             </IonContent>
                
        </IonPage>
    )
}
export default Bills;