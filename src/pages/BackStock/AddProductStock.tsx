import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
  IonList,
  IonModal
} from '@ionic/react';

const categories = [
  { id: 1, name: "Favorite" },
  { id: 2, name: "ขนม-เครื่องดื่ม" },
  { id: 3, name: "ของใช้" }
];

export default function AddProductStock() {
  const [product, setProduct] = useState<any>({
    id: '',
    name: '',
    unitPrice: '',
    instock: '',
    categories: [],
    img: ''
  });
  const [modal,setModal] = useState(false)

  const [productList, setProductList] = useState<any[]>([]);

  const addProduct = () => {
    if (product.name && product.unitPrice && product.instock) {
      const newProduct = { ...product, id: 'P-' + Date.now() };
      setProductList([...productList, newProduct]);
      setProduct({ id: '', name: '', unitPrice: '', instock: '', categories: [], img: '' });
    }
  };

  return (
    <IonPage>
      <IonHeader className='ion-no-border' >
        <IonToolbar>
          <IonTitle>เพิ่มสินค้าเข้าสต็อก</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
 
        <IonModal isOpen={modal} onIonModalDidDismiss={(e)=>{setModal(false)}} >
          <IonContent>
              <IonCard  style={{boxShadow:"none"}} >
              <IonCardHeader>
                <IonCardTitle>ข้อมูลสินค้าใหม่</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>

                <IonItem>
                  <IonLabel position="stacked">ชื่อสินค้า</IonLabel>
                  <IonInput value={product.name} onIonChange={(e:any) => setProduct({ ...product, name: e.detail.value })} />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">ราคาต่อหน่วย (บาท)</IonLabel>
                  <IonInput type="number" value={product.unitPrice} onIonChange={(e:any) => setProduct({ ...product, unitPrice: parseFloat(e.detail.value) })} />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">จำนวนในสต็อก</IonLabel>
                  <IonInput type="number" value={product.instock} onIonChange={(e:any) => setProduct({ ...product, instock: parseInt(e.detail.value) })} />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">หมวดหมู่สินค้า</IonLabel>
                  <IonSelect multiple value={product.categories} placeholder="เลือกหมวดหมู่" onIonChange={(e:any) => setProduct({ ...product, categories: e.detail.value })}>
                    {categories.map(cat => (
                      <IonSelectOption key={cat.id} value={cat.id}>{cat.name}</IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">URL รูปสินค้า (ไม่บังคับ)</IonLabel>
                  <IonInput value={product.img} onIonChange={(e:any) => setProduct({ ...product, img: e.detail.value })} />
                </IonItem>

                <IonButton expand="block" onClick={addProduct} className="ion-margin-top">บันทึกสินค้า</IonButton>

              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonModal>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>รายการสินค้าในสต็อก</IonCardTitle>
            <IonButton   size='small' mode='ios'  onClick={()=>{setModal(true)}} >
              Add
            </IonButton>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow className="ion-text-center">
                <IonCol>ลำดับ</IonCol>
                <IonCol>สินค้า</IonCol>
                <IonCol>จำนวน</IonCol>
                <IonCol>ราคา</IonCol>
              </IonRow>
              {productList.map((item, idx) => (
                <IonRow key={item.id} className="ion-text-center">
                  <IonCol>{idx + 1}</IonCol>
                  <IonCol>{item.name}</IonCol>
                  <IonCol>{item.instock}</IonCol>
                  <IonCol>{item.unitPrice}</IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
} 
