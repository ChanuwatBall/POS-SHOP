import { IonBreadcrumb, IonBreadcrumbs, IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonLabel, IonModal, IonPage, IonRow } from "@ionic/react"
import { addCircleOutline, close, closeCircle, construct, cube, home } from "ionicons/icons";
import { useState } from "react";
import ProductsTable from "../components/ProductsTable";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { getProducts } from "../store/productSlice";
import Barcode from "react-barcode";


const Products:React.FC=()=>{
    const history = useHistory()
    const [productView,setProductView] = useState<any>(null)
    const [modal,setModal] = useState(false)
    const products = useSelector(getProducts) 
    const [pname,setPName] = useState("")
    const [punitPrice,setPUnitPrice] = useState(0)
    const [pbarcode , setPBarcode] = useState("")
    const [unitsPricing , setUnitPricing] = useState(
        [
            {name:"แพ็ค",multiplier:6 , barcode:"PACK06-0056" ,price: 30.5 },
            {name:"dozen",multiplier:6 , barcode:"DOZEN12-0056" ,price: 59.00 },
        ]
    )

    const editProduce=(product:any)=>{
        setProductView(product);
        setPName(product?.name)
        setPUnitPrice(product?.unitPrice)
        setPBarcode(product?.id)
        
        setModal(true)
    }

    return(
    <IonPage>
        <IonContent>
         <div className='content-background ion-padding'> 
        <IonContent className="ion-padding" >
            <IonRow style={{height:"100%"}} > 
                <IonCol >
                  <ProductsTable products={products} preview={(p:any)=>{editProduce(p) }}/>
                </IonCol> 
            </IonRow> 
        </IonContent>
        <IonModal isOpen={modal} mode="ios" onIonModalDidDismiss={()=>{setModal(false)}} >
            <IonContent>
                <IonGrid>
                            <IonRow >
                                <IonCol size="12"  className="set-center" style={{flexDirection:"row" , justifyContent:"flex-end"}} >
                                   
                                    <IonButton fill="clear" size="small" color={"danger"}  onClick={()=>{setModal(false);setProductView(null)}}>
                                        <IonIcon icon={closeCircle} />
                                    </IonButton>
                                </IonCol>
                            </IonRow> 
                            <IonRow>
                               {productView && <IonCol size="12"  className="set-center" style={{maxHeight:"13rem"}}>
                                    <img src={productView?.img} alt="product preview"  height="100%" />
                                </IonCol> }
                                {/* <IonCol size='12' ><IonLabel> </IonLabel></IonCol> */}
                               <IonCol size='6' >
                                <IonLabel> ชื่อสินค้า: </IonLabel>
                                    <div className="input">
                                        <IonInput  
                                            mode="ios" value={pname} 
                                            onIonChange={(e:any)=>{setPName(e.detail.value)}} 
                                        > 
                                    </IonInput>
                                    </div>
                                </IonCol>
                               <IonCol size='6' > 
                                <IonLabel>ราคาต่อหน่วย:  </IonLabel>
                                 <div className="input">
                                        <IonInput  
                                            mode="ios" value={punitPrice} 
                                            onIonChange={(e:any)=>{setPUnitPrice(e.detail.value)}} 
                                        > 
                                    </IonInput>
                                    </div>
                                </IonCol>
                               <IonCol size='6' >    
                                <IonLabel>คงเหลือ:  </IonLabel>
                                 <div className="input">
                                        <IonInput  
                                            mode="ios" value={productView?.instock } 
                                            disabled 
                                        > 
                                    </IonInput>
                                    </div>
                                </IonCol>
                                <IonCol size='6' > 
                                <IonLabel> Barcode:  </IonLabel> 
                                    <div className="input">
                                        <IonInput  
                                            mode="ios" value={pbarcode} 
                                            onIonChange={(e:any)=>{setPBarcode(e.detail.value)}} 
                                        > 
                                    </IonInput>
                                    </div>
                                     <Barcode value={pbarcode}   height={20} width={2.3} />
                                </IonCol>
                             </IonRow> 
                             <IonRow>
                                {/* <IonCol size='12' ><IonLabel>จำนวน:</IonLabel> </IonCol> */}
                                <IonCol size='4' className='ion-justify-content-center' style={{display:"flex"}} >
                                 
                                </IonCol>
                            </IonRow> 

                            {
                                unitsPricing.map((e)=> 
                                <IonRow>
                                    <IonCol size="4" >
                                        <div className="input">
                                        <IonInput  
                                                mode="ios" value={pbarcode} 
                                                onIonChange={(e:any)=>{setPBarcode(e.detail.value)}} 
                                            > 
                                        </IonInput>
                                        </div>
                                    </IonCol>
                                </IonRow>
                                )
                            }
                           
                        </IonGrid>
            </IonContent>
        </IonModal>
        </div>
        </IonContent>
    </IonPage>
    )
}
export default Products;