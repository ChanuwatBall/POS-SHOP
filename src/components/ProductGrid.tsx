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
  IonBadge,
  IonIcon,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonButtons,
} from "@ionic/react";
import "./css/ProductGrid.css";
import { useDispatch, useSelector } from "react-redux";
import { getBreakBill, getProductReceipt, setBreakBill, setProductReceipt, setReceiptTotal } from "../store/recieptsSlice";
import { BreakBill } from "../types/statetypes";
import moment from "moment";
import { timeOutline } from "ionicons/icons";

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
      > <button  className="product-cell line-seed " > <IonLabel className="cursor-pointer">{p?.name}</IonLabel></button></IonCol>
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
            {/* <IonCol   size="3"  className="ion-hide-sm-down"  >
              <div className="ion-hide-md-down" style={{height:"90vh"}}>
                <SideBar setCatagories={(e:any)=>searchProductFromCat(e)} category={category} />
              </div>
            </IonCol>  */}
            <IonCol size="12" className="set-center flex-row flex-between" >
              <IonButtons> 
                 <IonButton style={{width:"5rem"}}> พักบิล</IonButton>
                <IonButton style={{width:"5rem"}}> เรียกบิล</IonButton>
                <IonSelect value={1} style={{width:"9rem"}}>
                    <IonSelectOption value={1}> label 1 </IonSelectOption>
                    <IonSelectOption value={2}> label 2 </IonSelectOption>
                </IonSelect> 
              </IonButtons>

              <IonButton>
                 <IonIcon icon={timeOutline} />
              </IonButton>
                
            </IonCol>
            <IonCol size="12"  className="ion-no-padding"  style={{paddingLeft:"1rem"}}> 
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
  const dispatch = useDispatch()
  const breakbills:BreakBill[] = useSelector(getBreakBill)
  const productsSelected:any[] = useSelector(getProductReceipt)
  const currentRep = useSelector(getProductReceipt)
  const [openmodal ,setOpenModal] = useState(false)
   

  const createBreakBill=async()=>{
    console.log(" productsSelected size ",productsSelected.length)
    if(productsSelected.length == 0){
       alert("ไม่สามารถพักบิลได้")
    }else{
      let echProductPrice = 0
      await currentRep.map((e)=>{
        echProductPrice += e?.unitPrice * e?.count
      })
      let newbrekbill:BreakBill | null = {
        products:  currentRep ,  create: moment().format() ,  total: echProductPrice 
      }
      dispatch(setBreakBill([...breakbills ,newbrekbill]))
      setTimeout(()=>{
        dispatch(setProductReceipt([]))
        dispatch(setReceiptTotal( "0.00"))
      },300)
    }
  }
  const callBillBack=(bill:BreakBill,index:any)=>{  
      dispatch(setProductReceipt(bill?.products))
      dispatch(setReceiptTotal( bill?.total))
      let removeBreakBill = breakbills.filter(e=> e != bill)
      dispatch(setBreakBill( removeBreakBill )) 

      setOpenModal(false)
  }
  const callBillModal=()=>{
    if(productsSelected.length > 0){
     alert("ไม่สามารถเรียกบิลกลับได้")
    }else{
      setOpenModal(true)
    }
  }

  return(
    <div className="sidebar">
          <button className="btn-blue-outeline ion-activatable ripple-parent" onClick={()=>{createBreakBill()}}>
            <IonLabel>พักบิล</IonLabel>
            <IonRippleEffect></IonRippleEffect>
          </button>
          <button className="btn-blue-outeline  ion-activatable ripple-parent" style={{position:"relative"}} 
          onClick={()=>callBillModal() }>
            <IonLabel>เรียกบิลกลับ</IonLabel>
            <IonRippleEffect></IonRippleEffect>
            {breakbills.length > 0 && 
            <IonBadge mode="ios"  color={"danger"}
              style={{position:"absolute", right:"0px" ,top:"0px", }}> 
               <IonLabel className="set-center" style={{flexDirection:"row"}}>
                {breakbills?.length} &nbsp; <IonIcon icon={timeOutline} /> </IonLabel>
            </IonBadge>}
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

          <IonModal isOpen={openmodal} mode="ios" onIonModalDidDismiss={()=>{setOpenModal(false)}} >
            <IonHeader mode="ios" >
              <IonToolbar>
                 <IonTitle className="line-seed bold">เรียกบิลกลับ</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                {
                  breakbills.map((bill:BreakBill,index:any)=>
                   <IonItem key={index} mode="ios" button onClick={()=>{callBillBack(bill,index)}}>
                      <IonLabel>{moment(bill?.create).format("DD/MMM/YYYY  HH:mm")}</IonLabel>
                      <IonLabel slot="end" >  {bill?.total.toFixed(2)} บาท</IonLabel>
                   </IonItem>
                  )
                }
              </IonList>
            </IonContent>
          </IonModal>
   </div>
  )
}
 