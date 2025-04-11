import React, { useEffect, useRef, useState } from 'react';
import { 
  IonCard, 
  IonCardContent,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonFooter,
  IonButton,
  IonHeader,
  IonModal,
  IonContent,
  IonToolbar,
  IonIcon,
} from '@ionic/react'; 
import { OverlayEventDetail } from '@ionic/core/components';
import { addOutline, removeOutline } from 'ionicons/icons';

interface ReceiptProductsProps { 
    productsSelected:any[]
    editCount: Boolean
}
const ReceiptProducts: React.FC<ReceiptProductsProps> = ({productsSelected,editCount}) => {
  const [sum,setSum] = useState("0.00") 
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [open ,setOpen] = useState(false)
  const [productEdit,setProductEdit] = useState<any>()

   useEffect(()=>{
    console.log("productsSelected ",productsSelected)
     if(productsSelected.length > 0){
      let echProductPrice = 0
      productsSelected.map((e)=>{
        echProductPrice += e?.unitPrice * e?.count
      })
      setSum((echProductPrice).toFixed(2))
     }
   },[productsSelected])

   const editProdunctCount=(product:any,index:any)=>{
    if(editCount){
      setOpen(true)
      setProductEdit(product)
    }
   }

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  function onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      // setMessage(`Hello, ${event.detail.data}!`);
    }
  }

  return ( 
      <div  >
        <IonModal 
        isOpen={open} mode='ios'
        onIonModalDidDismiss={()=>{setOpen(false)}} 
        onWillDismiss={(event) => onWillDismiss(event)}
        >
          <IonHeader > 
            <IonToolbar className='ion-text-center'>{productEdit?.name}</IonToolbar>
          </IonHeader>
          <IonContent>
             <IonGrid className='ion-margin' >
               <IonRow>
                 <IonCol size='4' className='set-ceter'  >
                  <IonButton mode='ios'> <IonIcon icon={removeOutline} /> </IonButton>
                 </IonCol>
                 <IonCol size='4'  className='ion-text-center' >
                    {productEdit?.count}
                 </IonCol>
                 <IonCol size='4' className='set-ceter'>
                  <IonButton mode='ios'> <IonIcon icon={addOutline} /> </IonButton>
                 </IonCol>
               </IonRow>
             </IonGrid>
          </IonContent>
        </IonModal>

        <IonCard mode='ios' className='line-seed'>
            <div>
                <IonItem>
                    <IonLabel className='line-seed bold' > รายการชำระเงิน </IonLabel>
                    <IonLabel> 
                        <IonText color="medium" className='line-seed'  style={{ float: 'right' }}>
                        ราคาปลีก ⬇️
                        </IonText>
                    </IonLabel>
                </IonItem> 
                <IonItem lines='none' style={{fontSize:"small"}}>
                <IonRow  style={{width:"100%",fontWeight:"bold"}}>
                    <IonCol  className='ion-text-left ' ><IonLabel>รายการสินค้า</IonLabel></IonCol>
                    <IonCol size="3" className='ion-text-center ' ><IonLabel>ราคา</IonLabel></IonCol> 
                    <IonCol size="3" className='ion-text-center ' ><IonLabel>รวม</IonLabel></IonCol>
                </IonRow>
                </IonItem>
            </div>
          <IonCardContent className='ion-no-padding ion-paddinghorizontal' style={{height:"36vh" , overflowY:"scroll"}} >
            
            <IonGrid className='ion-padding-horizontal' > 
                {
                    productsSelected.map((e:any,index:any)=>
                    <IonRow key={index} style={{borderBottom:"1px dashed #ccc"}} onClick={()=>{editProdunctCount(e,index)}}>
                        <IonCol><IonText>{index+1}. {e?.name}</IonText></IonCol>
                        <IonCol size="3" className='ion-text-center' ><IonText>{e?.unitPrice}</IonText></IonCol> 
                        <IonCol size="3" className='ion-text-center'><IonText>{e?.unitPrice * e?.count}  <small>x{e?.count}</small></IonText></IonCol>
                    </IonRow>
                    )
                } 
            </IonGrid> 
           
          </IonCardContent>
          <IonFooter className='ion-padding'>
          <IonText className="ion-margin-top ion-margin-bottom">
            <IonItem className='ion-no-padding' >
                <IonLabel className='ion-no-padding ion-text-left' > วิธีชำระเงิน </IonLabel>
                <IonLabel className='ion-no-padding ion-text-right' >เงินสด</IonLabel>
            </IonItem>
            <IonItem  className='ion-no-padding'>
                <IonLabel className='ion-no-padding ion-text-ledt' > ราคาสุทธิ </IonLabel>
                <IonLabel className='ion-no-padding ion-text-right' > {sum}</IonLabel>
            </IonItem> 
            </IonText>
            <br/>
            <IonRow className="ion-justify-content-between ion-align-items-center">
              <IonCol>
                <IonText className="ion-text-bold">ราคาสุทธิ</IonText>
              </IonCol>
              <IonCol className="ion-text-right">
                <IonText color="primary" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  {sum}
                </IonText>
              </IonCol>
            </IonRow>
          </IonFooter>
        </IonCard>
       
      </div> 
  );
};

export default ReceiptProducts;
