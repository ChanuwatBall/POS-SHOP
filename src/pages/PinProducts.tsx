import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonPage, IonRow, IonSearchbar, useIonAlert } from "@ionic/react"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getProductsBackup, setProducts, setProductsBackup } from "../store/productSlice";
import ProductGrid from "../components/ProductGrid";
import { addCircleOutline } from "ionicons/icons";
import  "../components/css/ProductGrid.css"
import "./css/PinProduts.css"

let countclick = 0
const PinProducts:React.FC =()=>{
    const products = useSelector(getProducts)
    const productsBackup = useSelector(getProductsBackup)
    const [productSearch,setProductSearch] = useState<any[]>([])
    const [keyword,setKeyWord] = useState("")
    const [modal,setModal] = useState(false)
    const [ionalert,dimissAlert] = useIonAlert()
    const dispatch = useDispatch()

    const chooseUnpin=(p:any)=>{
         ionalert({
                header:"ลบ "+p?.name ,
                message:"ลบ "+p?.name +" ออกจากรายการ ปักหมุดสินค้า ?",
                mode:"ios",
                buttons:[ 
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                         dimissAlert()
                        },
                    },
                    {
                        text: 'OK',
                        role: 'confirm',
                        handler: () => {
                            unpinProduct(p)
                         console.log('Alert confirmed');
                        },
                    },
                ]
            })
    }

    const unpinProduct=(product:any)=>{
        try { 
            const currcat = product?.categories.filter( (catid:any)=> catid != 1)
            let update ={...product , ...{categories: currcat }} 
            let updateProducts = productsBackup.map((prevItems:any) => {
                if (prevItems?.id ===  update?.id) {
                    return update;
                }else{
                    return prevItems
                } 
            });
            console.log(" updateProducts ",updateProducts)
            dispatch(setProducts(updateProducts))
            dispatch(setProductsBackup(updateProducts))
        } catch (error) {
            ionalert({
                header:"เกิดข้อผิดพลาด !!",
                message:"ไม่สามารถ ปักหมุดสินค้าได้ในขณะนี้",
                mode:"ios",
                buttons:["OK"]
            })
        } 
    }

     const renderProductGrid = () => { 
        return productsBackup.filter((p)=>  p.categories.includes(1)).slice(0,50).reverse().map((p:any, i:any) => (
          <IonCol 
           sizeMd="3" sizeSm="4" sizeXs="4"  key={i}  
           onClick={()=>{return chooseUnpin(p)}}
          > <button  className="product-cell line-seed " > <IonLabel className="cursor-pointer">{p?.name}</IonLabel></button></IonCol>
        ));
      };

      const chooseProducts=(product:any)=>{
        countclick+=1
        try { 
            let update ={...product , ...{categories: [...product?.categories, 1] }} 
            let updateProducts = productsBackup.map((prevItems:any,index) => {
                if (prevItems?.id ===  update?.id) {
                    return update;
                }else{
                    return prevItems
                } 
            });
            console.log(" updateProducts ",updateProducts)
            dispatch(setProducts(updateProducts))
            dispatch(setProductsBackup(updateProducts))
        } catch (error) {
            ionalert({
                header:"เกิดข้อผิดพลาด !!",
                message:"ไม่สามารถ ปักหมุดสินค้าได้ในขณะนี้",
                mode:"ios",
                buttons:["OK"]
            })
        } 
        setModal(false)
        console.log("countclick ",countclick)
      }
          
      const searchProductd=async(keyword:any)=>{
        setKeyWord(keyword) 
        if(keyword.length > 1){
            const result:any[] = await productsBackup.filter((e)=> 
                e.name.toLowerCase().match(keyword.toLowerCase()) &&
                 e.categories.includes(1) === false
            ) 
            console.log("result ",result)
            setProductSearch(result)
        }else{
            setProductSearch([])
        }
      }

      const openModalAgain=async()=>{
        if(keyword.length > 1){
            const result:any[] = await productsBackup.filter((e)=> 
                e.name.toLowerCase().match(keyword.toLowerCase()) &&
                 e.categories.includes(1) === false
            ) 
            console.log("result ",result)
            setProductSearch(result)
        }else{
            setProductSearch([])
        }
      }

    return(
    <IonPage>
        <IonModal mode="ios" className="modal-search-product" isOpen={modal} 
          onIonModalDidDismiss={()=>{setModal(false)}}
          onIonModalDidPresent={()=>{openModalAgain()}}
        >
            <IonContent className="ion-padding" >
                <IonSearchbar mode="ios" value={keyword} 
                //   onIonChange={(e:any)=>{searchProductd(e.detail.value)}} ฝ
                  onIonInput={(e:any)=>{searchProductd(e.detail.value)}} 
                ></IonSearchbar>
                <IonList>
                    {keyword.length > 0 && <IonListHeader>ผลการค้นหา</IonListHeader>}
                    {
                        productSearch.map((p,index)=>
                            <IonItem key={index} onClick={()=>{chooseProducts(p)}} >
                                <IonLabel>{p?.name}</IonLabel>
                            </IonItem>
                        )
                    }
                </IonList>
            </IonContent>
        </IonModal>
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
                                    > <button  className="product-cell line-seed " 
                                         onClick={()=>{ setModal(true)}}
                                        >
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