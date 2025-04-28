import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react"
import { barcode } from "ionicons/icons";
import { useState } from "react";

const ProductsTable=({products,preview}:any)=>{
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
  
    const filteredProducts = products.filter((p:any)=>
      p.name.toLowerCase().includes(searchText.toLowerCase())
    );
  
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  
    return (  
  
        <div className="ion-padding"> 
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}} >
          <IonSearchbar
            mode="ios"
            value={searchText}
            onIonInput={e => setSearchText(e.detail.value!)}
            placeholder="ค้นหาสินค้า..."
          />
          <IonSelect value={"all"}  style={{width:"10rem"}} interface="popover" mode="ios">
            <IonSelectOption value={"all"}> ทั้งหมด </IonSelectOption>
            <IonSelectOption value={"cat1"} >  หมวด 1 </IonSelectOption>
            <IonSelectOption value={"cat2"} >  หมวด 2 </IonSelectOption>
          </IonSelect>
        </div>
  
          <IonGrid>
            <IonRow>
              <IonCol size="1"><strong>รหัส</strong></IonCol>
              <IonCol  size="1.5" ><strong> รูป</strong></IonCol>
              <IonCol><strong>ชื่อสินค้า</strong></IonCol>
              <IonCol><strong>ราคา</strong></IonCol>
              <IonCol><strong>จำนวนคงเหลือ</strong></IonCol>
              <IonCol><strong>การจัดการ</strong></IonCol>
              <IonCol className="set-center"><strong>Barcode</strong></IonCol>
            </IonRow>

            {currentItems.map((product:any) => (
              <IonRow key={product.id} onClick={()=>{return preview(product)}} >
                <IonCol size="1">{product.id}</IonCol>
                <IonCol size="1.5"   ><img src={product.img}  style={{maxHeight:"2.5rem"}} /> </IonCol>
                <IonCol>{product.name}</IonCol>
                <IonCol>{product.price.toLocaleString()} บาท</IonCol>
                <IonCol>{product.instock}</IonCol>
                <IonCol>
                  <IonButton color="primary" size="small">แก้ไข</IonButton>
                  <IonButton color="danger" size="small">ลบ</IonButton>
                </IonCol>
                <IonCol className="set-center"> <IonIcon  icon={barcode} style={{fontSize:"1.5rem"}}/>  </IonCol>
              </IonRow>
            ))}
          </IonGrid>
  
          {/* Pagination */}
          <IonRow className="ion-justify-content-between ion-padding-top">
            <IonCol size="auto">
              <IonButton
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                ก่อนหน้า
              </IonButton>
            </IonCol>
            <IonCol className="ion-text-center">
              หน้า {currentPage} จาก {totalPages}
            </IonCol>
            <IonCol size="auto">
              <IonButton
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                ถัดไป
              </IonButton>
            </IonCol>
          </IonRow>
        </div>
   
    );
  };

  export default ProductsTable;