import { IonBreadcrumb, IonBreadcrumbs, IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonLabel, IonPage, IonRow } from "@ionic/react"
import { construct, cube, home } from "ionicons/icons";
import { useState } from "react";
import ProductsTable from "../components/ProductsTable";


const Products:React.FC=()=>{
    const [productView,setProductView] = useState<any>(null)
    const [products] = useState<any[]>([
        { id: 1, name: 'สินค้า A', unitPrice: 100, price: 100, instock: 10 , img: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081" },
        { id: 2, name: 'สินค้า B', unitPrice: 200, price: 200, instock: 5 , img: "https://img.freepik.com/free-photo/white-round-stand-podium-placing-products-3d-background_56104-2514.jpg?ga=GA1.1.834693362.1743170652&semt=ais_hybrid&w=740" },
        { id: 3, name: 'สินค้า C', unitPrice: 300, price: 300, instock: 0 , img: "https://img.freepik.com/free-photo/minimal-podium-product-display-stand-pedestal-studio-gray-color-background-3d-rendering_56104-1752.jpg?t=st=1745851054~exp=1745854654~hmac=dfa4588dd1dd285c520251f0251aeba1895e983f25054af19f5ca99284c5459a&w=1060" },
        { id: 4, name: 'สินค้า D', unitPrice: 150, price: 150, instock: 8 , img: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081" },
        { id: 5, name: 'สินค้า E', unitPrice: 90, price: 90, instock: 3 , img: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081" },
        { id: 6, name: 'สินค้า F', unitPrice: 100, price: 500, instock: 6 , img: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081" },
        { id: 7, name: 'สินค้า G', unitPrice: 500, price: 120, instock: 4 , img: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081" },
        { id: 8, name: 'สินค้า H', unitPrice: 80, price: 80, instock: 7 , img: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081" },
        { id: 9, name: 'สินค้า F', unitPrice: 100, price: 500, instock: 6 , img: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081" },
        { id: 10, name: 'สินค้า G', unitPrice: 500, price: 120, instock: 4 , img: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081" },
        { id: 11, name: 'สินค้า H', unitPrice: 80, price: 80, instock: 7 , img: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081" },
      
      ]);

    return(
    <IonPage>
        <div className='content-padding' >
        <IonHeader mode="ios" className="ion-border" >
            <IonBreadcrumbs>
                <IonBreadcrumb href="#home"> <IonIcon slot="start" icon={home}></IonIcon> Home</IonBreadcrumb>
                <IonBreadcrumb href="#electronics">  <IonIcon slot="start" icon={cube}></IonIcon> Stock</IonBreadcrumb>
                <IonBreadcrumb href="#cameras"><IonIcon slot="start" icon={construct}></IonIcon>  Products</IonBreadcrumb> 
            </IonBreadcrumbs>
        </IonHeader>
        <IonContent className="ion-padding" >
            <IonRow style={{height:"100%"}} >
                <IonCol size="3" >
                    <IonCard mode="ios">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="12" >
                                    <div className="nput-cash" >  
                                     <IonInput mode="ios" className="iput" placeholder="Search" > </IonInput>
                                    </div>
                                </IonCol>
                            </IonRow> 
                            <IonRow>
                               {productView && <IonCol size="12"  className="set-center" style={{maxHeight:"13rem"}}>
                                    <img src={productView?.img} alt="product preview"  height="100%" />
                                </IonCol> }
                                <IonCol size='12' ><IonLabel> </IonLabel></IonCol>
                               <IonCol size='12' ><IonLabel> ชื่อสินค้า: {productView?.name}</IonLabel></IonCol>
                               <IonCol size='12' > <IonLabel>ราคาต่อหน่วย: {productView?.unitPrice} บาท</IonLabel></IonCol>
                               <IonCol size='12' > <IonLabel>จำนวนคงเหลือ: {productView?.instock  }</IonLabel>  </IonCol>
                             </IonRow> 
                             <IonRow>
                                {/* <IonCol size='12' ><IonLabel>จำนวน:</IonLabel> </IonCol> */}
                                <IonCol size='4' className='ion-justify-content-center' style={{display:"flex"}} >
                                 
                                </IonCol>
                            </IonRow> 
                        </IonGrid>
                    </IonCard>
                </IonCol>
                <IonCol size="9">
                  <ProductsTable products={products} preview={(p:any)=>{setProductView(p)}}/>
                </IonCol>
            </IonRow>
           
        </IonContent>
        </div>
    </IonPage>
    )
}
export default Products;