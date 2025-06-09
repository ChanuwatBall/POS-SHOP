import React, { ReactNode, useEffect, useRef, useState } from 'react';
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
  useIonAlert,
  IonButtons,
} from '@ionic/react'; 
import { OverlayEventDetail } from '@ionic/core/components';
import { addOutline, removeOutline } from 'ionicons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getProductReceipt, getReceiptTotal, setReceiptTotal } from '../store/recieptsSlice';
import "./css/ReceiptProducts.css"

interface ReceiptProductsProps { 
    productsSelected:any[]
    editCount: Boolean
    children: ReactNode
}
const ReceiptProducts: React.FC<ReceiptProductsProps> = ({editCount , children}) => {
  // const [sum,setSum] = useState("0.00") 
  const productsSelected:any[] = useSelector(getProductReceipt)
  const sum = useSelector(getReceiptTotal)
  const dispatch = useDispatch()
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [open ,setOpen] = useState(false)
  const [productEdit,setProductEdit] = useState<any>()
  const [productEditCount,setProductEditCount] = useState<any>(0) 
  const [alertRemove] = useIonAlert();
  const [alertLimitStock] = useIonAlert();

   useEffect(()=>{ 
     if(productsSelected.length > 0){
      let echProductPrice = 0
      productsSelected.map((e)=>{
        echProductPrice += e?.unitPrice * e?.count
      })
      // setSum((echProductPrice).toFixed(2))
      dispatch(setReceiptTotal((echProductPrice).toFixed(2)))
     }
   },[productsSelected])

   const editProdunctCount=(product:any,index:any)=>{
    if(editCount){
      setOpen(true)
      setProductEdit(product)
      setProductEditCount(product?.count)
    }
   }

  function confirm() {
    // modal.current?.dismiss(input.current?.value, 'confirm');

  } 

  function onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      // setMessage(`Hello, ${event.detail.data}!`);
    }
  }

  const addCount=()=>{ 
    if(productEditCount < productEdit?.instock){
      setProductEditCount((e:any)=> e += 1) 
    }else{
      alertLimitStock({
        header:"สินค้าในสต๊อคไม่เพียงพอ ?" , 
        mode:"ios",
        buttons:[
          {
            text: 'ยืนยัน',
            role: 'confirm',
            handler: () => {
              console.log('Alert confirmed');
            },
          },
        ]
      })
    }
  }
  const delCount=()=>{
    if(productEditCount > 1){
      setProductEditCount((e:any)=> e -= 1)
    }else{
      alertRemove({
        header:"ต้องการนำรายการสินค้าออก ?" , 
        mode:"ios",
        buttons:[
          {
            text: 'ยกเลิก',
            role: 'cancel',
            handler: () => {
              console.log('Alert canceled');
            },
          },
          {
            text: 'ยืนยัน',
            role: 'confirm',
            handler: () => {
              console.log('Alert confirmed');
            },
          },
        ]
      })
    }
  }

  return ( 
      <div className='receipt-product'  >
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
                <IonCol size='12' ><IonLabel> ชื่อสินค้า: {productEdit?.name}</IonLabel></IonCol>
                <IonCol size='12' > <IonLabel>ราคาต่อหน่วย: {productEdit?.unitPrice} บาท</IonLabel></IonCol>
                <IonCol size='12' > <IonLabel>จำนวนคงเหลือ: {productEdit?.instock - productEditCount}</IonLabel>  </IonCol>
              </IonRow>
               <IonRow>
                 <IonCol size='12' ><IonLabel>จำนวน:</IonLabel> </IonCol>
                 <IonCol size='4' className='ion-justify-content-center' style={{display:"flex"}} >
                  <IonButton mode='ios'  onClick={delCount}> <IonIcon icon={removeOutline} /> </IonButton>
                 </IonCol>
                 <IonCol size='4' className='ion-justify-content-center' style={{display:"flex"}} >
                    <IonLabel className='line-seed bolder' style={{fontSize:"2rem"}} >{productEditCount}</IonLabel>
                 </IonCol>
                 <IonCol size='4' className='ion-justify-content-center' style={{display:"flex"}}>
                  <IonButton mode='ios' onClick={addCount}> <IonIcon icon={addOutline} /> </IonButton>
                 </IonCol>
               </IonRow>
             </IonGrid>
          </IonContent>
          <IonFooter className='ion-padding' >
             <IonButtons className='set-center' style={{flexDirection:"row" , justifyContent:"flex-end"}} >
                <IonButton color={"danger"} onClick={()=>setOpen(false)}> ยกเลิก </IonButton> &nbsp;
                <IonButton onClick={()=>{confirm()}} > ตกลง </IonButton>
             </IonButtons>
          </IonFooter>
        </IonModal>

        <IonCard mode='ios' className='line-seed'  >
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
            <ProductSelectedList 
             productsSelected={productsSelected}
             editProdunctCount={editProdunctCount}
            />
            {/* <IonGrid className='ion-padding-horizontal' > 
                {
                    productsSelected.map((e:any,index:any)=>
                    <IonRow key={index} 
                    style={{borderBottom:"1px dashed #ccc"}} 
                    onClick={()=>{editProdunctCount(e,index)}}>
                        <IonCol><IonText>{index+1}. {e?.name}</IonText></IonCol>
                        <IonCol size="3" className='ion-text-center' ><IonText>{e?.unitPrice}</IonText></IonCol> 
                        <IonCol size="3" className='ion-text-center'><IonText>{e?.unitPrice * e?.count}  <small>x{e?.count}</small></IonText></IonCol>
                    </IonRow>
                    )
                } 
            </IonGrid>  */}
           
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
       {children}
      </div> 
  );
};

export default ReceiptProducts;

export const ProductSelectedList=({productsSelected,editProdunctCount}:any)=>{

  return(
    <IonGrid className='ion-padding-horizontal' > 
      {
          productsSelected.map((e:any,index:any)=>
          <IonRow key={index} 
          style={{borderBottom:"1px dashed #ccc"}} 
          onClick={()=>{editProdunctCount(e,index)}}>
              <IonCol><IonText>{index+1}. {e?.name}</IonText></IonCol>
              <IonCol size="3" className='ion-text-center' ><IonText>{e?.unitPrice}</IonText></IonCol> 
              <IonCol size="3" className='ion-text-center'><IonText>{e?.unitPrice * e?.count}  <small>x{e?.count}</small></IonText></IonCol>
          </IonRow>
          )
      } 
    </IonGrid> 
  )
}