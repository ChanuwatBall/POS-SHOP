import React, { useState } from "react";
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
 
const productsCats=[ 
  {
    id:1 , 
    title:"สินค้าแนะนำ" ,
    products:[
      { id: 23 ,name:"Soap" ,unitPrice: 18.00 },
      { id: 43 ,name:"ยาสีฟัน",unitPrice: 59.00 },
      { id: 67 ,name:"แปลงสีฟัน" ,unitPrice: 15.00 }, 
      { id: 40 ,name:"ดินสอ"  ,unitPrice: 8.00 },
      { id: 32 ,name:"สมุด"  ,unitPrice: 12.00 },
    ]
  },
  {
    id:2 , 
    title:"อุปโภค บริโภค" ,
    products:[ 
      { id: 23 ,name:"Soap" ,unitPrice: 18.00 },
      { id: 43 ,name:"ยาสีฟัน",unitPrice: 59.00 },
      { id: 67 ,name:"แปลงสีฟัน" ,unitPrice: 15.00 }, 
    ]
  },
  { id:3 ,
    title:"เครื่องเขียน" ,
    products:[ 
      { id: 40 ,name:"ดินสอ"  ,unitPrice: 8.00 },
      { id: 32 ,name:"สมุด"  ,unitPrice: 12.00 },
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
  const [productsCat,setProducsCat] = useState([ 
    {
      id:1 , 
      title:"สินค้าแนะนำ" ,
      products:[
        { id: 23 ,name:"Soap" ,unitPrice: 18.00 },
        { id: 43 ,name:"ยาสีฟัน",unitPrice: 59.00 },
        { id: 67 ,name:"แปลงสีฟัน" ,unitPrice: 15.00 }, 
        { id: 40 ,name:"ดินสอ"  ,unitPrice: 8.00 },
        { id: 32 ,name:"สมุด"  ,unitPrice: 12.00 },
      ]
    }])

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const renderProductGrid = () => { 
    return productsCat[0].products.map((p, i) => (
      <IonCol 
       size="2.5" key={i} 
       className="product-cell"
       onClick={()=>{return choose(p)}}
      >{p?.name}</IonCol>
    ));
  };

  const searchProductFromCat=(e:any)=>{
    // console.log("e ",e)
    setCatagories(e)
    setProducsCat(productsCats.filter((cat)=>cat?.id === e?.id))
  }

  return ( 
      <div className="product-page">
        <IonGrid>
          <IonRow>
            <IonCol   size="3"  >
              <div className="ion-hide-md-down" style={{height:"90vh"}}>
                <SideBar setCatagories={(e:any)=>searchProductFromCat(e)} category={category} />
              </div>
            </IonCol> 
            <IonCol  style={{paddingLeft:"1rem"}} >
              <IonGrid>
                <IonRow>{renderProductGrid()}</IonRow>
              </IonGrid>
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