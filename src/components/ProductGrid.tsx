import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonRippleEffect,
  IonSpinner,
} from "@ionic/react";
import "./css/ProductGrid.css";

const category = [
  "สินค้าแนะนำ",
  "อุปโภค บริโภค",
  "เครื่องเขียน",
  "ยาและเวชภัณฑ์",
  "วัสดุและอุปกรณ์ก่อสร้าง",
];

const categories=[
    {id:1 , title:"สินค้าแนะนำ"},
    {id:2 , title:"อุปโภค บริโภค"},
    {id:3 , title:"เครื่องเขียน"},
    {id:4 , title:"วัสดุและอุปกรณ์ก่อสร้าง"}
]
 
const productsCats:any[]=[ 
  {
    id:1 , 
    title:"สินค้าแนะนำ" ,
    products:[
      { id: 23 ,name:"Soap" ,unitPrice: 18.00 , instock: 20},
      { id: 43 ,name:"ยาสีฟัน",unitPrice: 59.00  , instock: 20},
      { id: 67 ,name:"แปรงสีฟัน" ,unitPrice: 15.00  , instock: 20}, 
      { id: 40 ,name:"ดินสอ"  ,unitPrice: 8.00  , instock: 20},
      { id: 32 ,name:"สมุด"  ,unitPrice: 12.00  , instock: 20},
    ]
  },
  {
    id:2 , 
    title:"อุปโภค บริโภค" ,
    products:[ 
      { id: 23 ,name:"Soap" ,unitPrice: 18.00  , instock: 20},
      { id: 43 ,name:"ยาสีฟัน",unitPrice: 59.00  , instock: 20},
      { id: 67 ,name:"แปรงสีฟัน" ,unitPrice: 15.00  , instock: 20}, 
    ]
  },
  { id:3 ,
    title:"เครื่องเขียน" ,
    products:[ 
      { id: 40 ,name:"ดินสอ"  ,unitPrice: 8.00  , instock: 20},
      { id: 32 ,name:"สมุด"  ,unitPrice: 12.00  , instock: 20},
    ]
  },
  {
    id:4 , 
    title:"วัสดุและอุปกรณ์ก่อสร้าง",
    products:[  
    ]
  }
]

interface ProductGridProps { 
  choose:(e:any)=>{ }
}
const ProductGrid: React.FC<ProductGridProps> = ({choose}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("สินค้าแนะนำ");
  const [category,setCatagories] = useState({id:1 , title:"สินค้าแนะนำ"})
  const [productsCat,setProducsCat] = useState<any[]>([])

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const renderProductGrid = () => { 
    return productsCat.length > 0 && productsCat[0].products.map((p:any, i:any) => (
      <IonCol 
       sizeMd="3" sizeSm="4" sizeXs="4"  key={i} 
      
       onClick={()=>{return choose(p)}}
      > <div  className="product-cell" > {p?.name}</div></IonCol>
    ));
  };

  const searchProductFromCat=(e:any)=>{
    // console.log("e ",e)
    setCatagories(e)
    setProducsCat(productsCats.filter((cat)=>cat?.id === e?.id))
  }
  useEffect(()=>{ 
    setTimeout(()=>{
      searchProductFromCat({id:1 , title:"สินค้าแนะนำ"})
    },200)
  },[])

  return ( 
      <div className="product-page">
        <IonGrid>
          <IonRow>
            <IonCol   size="3"  className="ion-hide-sm-down"  >
              <div className="ion-hide-md-down" style={{height:"90vh"}}>
                <SideBar setCatagories={(e:any)=>searchProductFromCat(e)} category={category} />
              </div>
            </IonCol> 
            <IonCol   className="ion-no-padding"  style={{paddingLeft:"1rem"}}> 
              {productsCat.length === 0 && <div className="set-center" style={{height:"100%"}}  >
               <IonSpinner name="circles" /> 
              </div>} 
              <IonRow>{renderProductGrid()}</IonRow> 
            </IonCol>
          </IonRow>
        </IonGrid> 
      </div> 
  );
};

export default ProductGrid;

export const SideBar=({setCatagories,category}:any)=>{
  return(
    <div className="sidebar">
          <button className="btn-blue-outeline ion-activatable ripple-parent" >
            <IonLabel>พักบิล</IonLabel>
            <IonRippleEffect></IonRippleEffect>
          </button>
          <button className="btn-blue-outeline  ion-activatable ripple-parent" >
            <IonLabel>เรียกบิลกลับ</IonLabel>
            <IonRippleEffect></IonRippleEffect>
          </button>
          

          <IonText className="category-title">หมวดหมู่สินค้า</IonText>
          {categories.map((cat:any,index:any) => (
            <button 
             key={index}
             className={ ` btn-light-outeline  ion-activatable ripple-parent ${cat?.id === category?.id ? "active":""}` }
             onClick={() => setCatagories(cat)}
            >
             <IonLabel>{cat?.title}</IonLabel>
             <IonRippleEffect></IonRippleEffect>
           </button> 
          ))}
          <br/>
          <IonButton expand="block" mode="ios"  >ตะกร้า</IonButton>
        </div>
  )
}