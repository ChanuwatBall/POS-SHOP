import { IonContent, IonHeader, IonMenu, IonTitle, IonToolbar } from "@ionic/react"
import { SideBar } from "./ProductGrid";
import { useState } from "react";
const categories=[
    {id:1 , title:"สินค้าแนะนำ"},
    {id:2 , title:"อุปโภค บริโภค"},
    {id:3 , title:"เครื่องเขียน"},
    {id:4 , title:"วัสดุและอุปกรณ์ก่อสร้าง"}
]

const Menu=()=>{
  const [selectedCategory, setSelectedCategory] = useState<string>("สินค้าแนะนำ");
  const [category,setCatagories] = useState({id:1 , title:"สินค้าแนะนำ"})

    return(
        <IonMenu menuId="menu"  contentId="main">
            <IonHeader>
            <IonToolbar>
                <IonTitle>Menu Content</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                
                <SideBar setCatagories={setCatagories} category={category} />
            </IonContent>
        </IonMenu>
    )
}
export default Menu;