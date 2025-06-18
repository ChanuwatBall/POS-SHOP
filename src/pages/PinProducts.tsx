import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRow } from "@ionic/react"
import React from "react";
import { useSelector } from "react-redux";
import { getProducts } from "../store/productSlice";
import ProductGrid from "../components/ProductGrid";
import { addCircleOutline } from "ionicons/icons";
import  "../components/css/ProductGrid.css"

const PinProducts:React.FC =()=>{
    const products = useSelector(getProducts)

    const choose=(p:any)=>{

    }

     const renderProductGrid = () => { 
        return products.filter((p)=>  p.categories.includes(1)).slice(0,50).map((p:any, i:any) => (
          <IonCol 
           sizeMd="3" sizeSm="4" sizeXs="4"  key={i}  
           onClick={()=>{return choose(p)}}
          > <button  className="product-cell line-seed " > <IonLabel className="cursor-pointer">{p?.name}</IonLabel></button></IonCol>
        ));
      };

    return(
    <IonPage>
        <IonContent>
            <div className='content-background ion-padding' style={{paddingRight:"0px",}} >
                <IonGrid>
                    <IonRow>
                        <IonCol size="8" > 
                           <div className="product-page">
                            <IonGrid>
                            <IonRow>
                                {renderProductGrid()} 
                                {
                                    Array.from(new Array(10)).map((p,i)=>
                                    <IonCol 
                                        sizeMd="3" sizeSm="4" sizeXs="4"  key={i}  
                                    > <button  className="product-cell line-seed " >
                                            <IonIcon icon={addCircleOutline} />
                                        </button>
                                    </IonCol>
                                    )
                                }
                            </IonRow> 
                            </IonGrid>
                               
                            </div>
                        </IonCol>
                        <IonCol size="4" >
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

export default PinProducts;