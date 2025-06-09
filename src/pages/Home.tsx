import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './css/Home.css';
import { useEffect, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import Menu from '../components/Menu';
import ReceiptProducts from '../components/ReceiptProducts';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getProductReceipt, getReceiptTotal, setProductReceipt } from '../store/recieptsSlice';
import { useCookies } from 'react-cookie';
import { setLogin } from '../store/authSlice';

interface productsSelectedProps {
  id: Number ,name: String , count: any , unitPrice: Number
}

const Home:React.FC=()=>{
    const productsSelected:any[] = useSelector(getProductReceipt) 
      const dispatch = useDispatch();
      const history = useHistory()
      const [cookies, setCookie, removeCookie] = useCookies(['login']);
      
      useEffect(()=>{ 
        // console.log("cookies.login ",cookies)
        // dispatch(setLogin(cookies.login))
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
     
          // setProductSelected(productsSelectedUpdate)
          dispatch(setProductReceipt(productsSelectedUpdate))
    
        }else{
          const productsSelectedUpdate = [...productsSelected,  {  ...product, ...{count:1 }} ] 
          // setProductSelected(productsSelectedUpdate)
          dispatch(setProductReceipt(productsSelectedUpdate))
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
                       <ProductGrid choose={async (product) => choose(product)} />
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
    </IonPage>
    )
}

export default Home