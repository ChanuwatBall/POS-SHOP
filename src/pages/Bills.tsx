import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonToolbar } from "@ionic/react"
import moment from "moment";
import { useState } from "react";
import { Calendar, DateRangePicker } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "./css/Bills.css"
import { caretDown, caretUp, closeCircle } from "ionicons/icons";

const Bills:React.FC =()=>{
    const bills = [
        {
            id:"bill0001",
            date: "24 มิถุนายน 2568" ,
            tottal: 84.00 ,
            create: "2025-06-24 19:12:39"
        },
         {
            id:"bill0001",
            date: "24 มิถุนายน 2568" ,
            tottal: 84.00 ,
            create: "2025-06-24 19:12:39"
        }
    ]
    const [popupdate , setPopupDate] = useState(false)
    const [selectionRange , setRange] = useState({
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    })
    const handleSelect=(e:any)=>{
        console.log("date select ", e)
        setRange(e?.selection)
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
                                
                                            <IonCard mode="ios" className="ion-no-margin">
                                            <IonCardHeader>  {b?.date} </IonCardHeader>
                                            <IonCardContent> 
                                                <IonLabel>{b?.tottal} Bath</IonLabel> <br/>
                                                <IonLabel>{b?.create}</IonLabel> 
                                            </IonCardContent>
                                            </IonCard>
                                    </IonCol>
                                    )
                                } 
                                    </IonRow>
                            </IonCol>
                            <IonCol size="5" >
                                <div className='receipt-product' style={{width:"100%", height:"95vh"}}  > 
                             
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