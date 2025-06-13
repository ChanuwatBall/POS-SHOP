import { IonBadge, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonModal, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './css/Home.css';
import { useEffect, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import Menu from '../components/Menu';
import ReceiptProducts from '../components/ReceiptProducts';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getBreakBill, getProductReceipt, getReceiptTotal, setBreakBill, setProductReceipt, setReceiptTotal } from '../store/recieptsSlice';
import { useCookies } from 'react-cookie';
import { setLogin } from '../store/authSlice';
import { closeCircle, receiptOutline, timeOutline } from 'ionicons/icons';
import moment from 'moment';

interface productsSelectedProps {
  id: Number ,name: String , count: any , unitPrice: Number
}

const Home:React.FC=()=>{
    const productsSelected:any[] = useSelector(getProductReceipt) 
      const dispatch = useDispatch();
      const history = useHistory()
      const sum = useSelector(getReceiptTotal)
      const billPaused = useSelector(getBreakBill)
      const [openModal , setOpenModal] = useState(false)
      const [ionalert , dimissAlert] = useIonAlert()
      
      
      useEffect(()=>{  
      },[productsSelected])
    
      const choose=(product:any)=>{ 
        const isadd:any= productsSelected.filter((e:productsSelectedProps)=> e?.id === product?.id)
      
    
        if(isadd.length > 0){
          const update = {...isadd[0] , ...{count: isadd[0]?.count +1}}
          const indexs = productsSelected.indexOf(isadd[0])
          const productsSelectedUpdate = [
            ...productsSelected.slice(0, indexs),
            update,
            ...productsSelected.slice(indexs + 1)
          ];
      
          dispatch(setProductReceipt(productsSelectedUpdate))
    
        }else{
          const productsSelectedUpdate = [...productsSelected,  {  ...product, ...{count:1 }} ] 
 
          dispatch(setProductReceipt(productsSelectedUpdate))
        }
      }

  const puaseBill=()=>{
    if(productsSelected.length  > 0 ){
      const billtopause ={
        products : productsSelected ,
        sum : sum ,
        time: moment().format()
      }
      dispatch(setBreakBill([...billPaused , billtopause]))
      setTimeout(()=>{
        dispatch(setProductReceipt([]))
        dispatch(setReceiptTotal(0))
      },200)
    }else{
      ionalert({
        mode:"ios" , 
        header:"แจ้งเตือน",
        message: "ไม่พบรายการ ไม่สามารถพักบิลได้" ,
        buttons : ["OK"]
      })
    }
  }
  const restoreBill=(bill:any)=>{
     if(productsSelected.length  > 0 ){
       ionalert({
        mode:"ios" , 
        header:"แจ้งเตือน",
        message: "ไม่สามารถเรียกบิลได้ขณะขายสินค้า " ,
        buttons : ["OK"]
      })
     }else{
      const lst = billPaused;
      dispatch(setProductReceipt(bill?.products))
      dispatch(setReceiptTotal(bill?.sum))

      dispatch(setBreakBill(lst.filter((e:any)=> e?.time == bill?.time)))
     }
  }

    return(
    <IonPage>
       <IonHeader mode='md' className='ion-no-border ion-hide-sm-up' >
         <IonToolbar> <IonMenuButton/> </IonToolbar>
       </IonHeader>
        <IonContent  >
            <div className='content-background' >
            <IonGrid>
                <IonRow>
                    <IonCol size='7' >
                       <ProductGrid choose={async (product) => choose(product)} >
                       
                        <div className='set-center flex-row flex-start' style={{width:"70%"}} >
                          <IonButton  fill='outline' mode='ios' size='small'  onClick={()=>{puaseBill()}} > 
                            <IonIcon icon={receiptOutline} />&nbsp;
                            <IonLabel>พักบิล</IonLabel> &nbsp;
                            {billPaused.length > 0 && <IonBadge color={"danger"}  mode='ios' >{billPaused.length}</IonBadge> }
                          </IonButton>
                          <IonButton  fill='outline' mode='ios' size='small' onClick={()=>{setOpenModal(true)}} > 
                            <IonIcon icon={timeOutline} /> &nbsp;
                            <IonLabel>เรียกบิล</IonLabel>
                          </IonButton>
                          &nbsp;
                          <IonSelect value={1} style={{width:"9rem"}}>
                              <IonSelectOption value={1}> label 1 </IonSelectOption>
                              <IonSelectOption value={2}> label 2 </IonSelectOption>
                          </IonSelect>
                        </div> 
                        
                        
                        <IonButton>
                           <IonIcon icon={timeOutline} />
                        </IonButton>
                       </ProductGrid>
                    </IonCol>
                    <IonCol >
                        <ReceiptProducts productsSelected={productsSelected} editCount={true} >
                            <div className='ion-padding-horizontal' style={{width:"100%",backgroundColor:"#FFF"}} >
                                <IonButton 
                                mode='ios' 
                                expand='block' 
                                onClick={()=>{
                                history.push("/payment" )
                                }}
                                >
                                    <strong>ชำระเงิน</strong>
                                </IonButton>
                            </div>
                        </ReceiptProducts> 

                    </IonCol>
                </IonRow>
            </IonGrid>
            </div>
        </IonContent>
        <ModalPauseBills  
          open={openModal}  
          openModal={(e:any)=>{setOpenModal(e)}}  
          selectBill={(bill:any)=>{restoreBill(bill)}}
        />
    </IonPage>
    )
}

export default Home

const ModalPauseBills=({open , openModal , selectBill}:any)=>{
  const billPaused = useSelector(getBreakBill)
  return(
   <IonModal isOpen={open} mode='ios' onIonModalDidDismiss={()=>{openModal(false)}} >
      <IonHeader mode='ios' className='ion-no-header' >
        <IonToolbar>
           <IonLabel className='set-center flex-row flex-start' >   
             <IonIcon icon={timeOutline} /> &nbsp;
             <IonText>เรียกบิลกลับ</IonText>
            </IonLabel>
           <IonButton fill='clear' slot='end' >
            <IonIcon icon={closeCircle} />
           </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <IonList>
            <IonListHeader>
             <IonLabel>
              <IonText>รายการบิลที่ถูกพัก</IonText> &nbsp;
              <IonText>{billPaused.length} รายการ</IonText>
              </IonLabel> 
            </IonListHeader>
            {
              billPaused.map((bill:any , index:any)=>
               <IonItem button key={index} onClick={()=>{selectBill(bill)}} >
                <IonLabel>
                  {moment(bill?.time).format("DD/MM/YYYYY HH:MM")}
                </IonLabel>
                <IonLabel slot='end' >
                  {bill?.sum}
                </IonLabel>
               </IonItem>
              )
            }
          </IonList>
      </IonContent>
    </IonModal>
  )
}