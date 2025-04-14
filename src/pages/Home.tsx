import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './css/Home.css';
import { useEffect, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import Menu from '../components/Menu';
import ReceiptProducts from '../components/ReceiptProducts';
import { useHistory } from 'react-router';

interface productsSelectedProps {
  id: Number ,name: String , count: any , unitPrice: Number
}
const Home: React.FC = () => {
  const [productsSelected,setProductSelected] = useState<any[]>([])
  const history = useHistory()
  
  useEffect(()=>{ },[productsSelected])

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
 
      setProductSelected(productsSelectedUpdate)
    }else{
      const productsSelectedUpdate = [...productsSelected,  {  ...product, ...{count:1 }} ] 
      setProductSelected(productsSelectedUpdate)
    }
  }
  return (
    <IonPage id="main">
      <IonContent   >   
          <div className='content-padding' style={{}}>
            <IonRow  style={{height:"100%"}} >
              <IonCol sizeXs='12' sizeMd='8' >
                <ProductGrid choose={async (product) => choose(product)} />
              </IonCol>
              <IonCol sizeXs='12' sizeMd='4' >
                 <ReceiptProducts productsSelected={productsSelected} editCount={true} /> 
                 <div className='ion-padding-horizontal' style={{width:"100%",backgroundColor:"#FFF"}} >
                
                    <IonButton 
                    mode='ios' 
                    expand='block' 
                    onClick={()=>{
                      history.push("/payment",{productsSelected:productsSelected} )
                    }}
                    >
                        <strong>ชำระเงิน</strong>
                    </IonButton>
                </div>
              </IonCol>
            </IonRow>
          </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
