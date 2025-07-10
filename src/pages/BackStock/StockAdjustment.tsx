
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
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption
} from '@ionic/react';

const sampleProducts = [
  { id: 'P-001', name: 'สบู่', instock: 100 },
  { id: 'P-002', name: 'ยาสีฟัน', instock: 50 },
  { id: 'P-003', name: 'แปรงสีฟัน', instock: 80 }
];

export default function StockAdjustment() {
  const [adjustments, setAdjustments] = useState<any[]>([]);
  const [newAdjustmentName, setNewAdjustmentName] = useState('');
  const [newAdjustmentItems, setNewAdjustmentItems] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [actualQty, setActualQty] = useState('');

  const addAdjustmentItem = () => {
    const product = sampleProducts.find(p => p.id === selectedProductId);
    if (product && actualQty !== '') {
      setNewAdjustmentItems([
        ...newAdjustmentItems,
        { productId: product.id, name: product.name, systemQty: product.instock, actualQty: parseInt(actualQty) }
      ]);
      setSelectedProductId('');
      setActualQty('');
    }
  };

  const saveAdjustment = () => {
    if (newAdjustmentName && newAdjustmentItems.length) {
      const newEntry = {
        id: 'ADJ-' + Date.now(),
        name: newAdjustmentName,
        date: new Date().toLocaleDateString(),
        status: 'รอดำเนินการ',
        items: newAdjustmentItems
      };
      setAdjustments([...adjustments, newEntry]);
      setNewAdjustmentName('');
      setNewAdjustmentItems([]);
    }
  };

  const updateStatus = (id:any) => {
    setAdjustments(adjustments.map(adj => adj.id === id ? { ...adj, status: 'เสร็จสิ้น' } : adj));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>การปรับสต็อก</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>เพิ่มใบปรับสต็อกใหม่</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>

            <IonItem>
              <IonLabel position="stacked">ชื่อการปรับสต็อก</IonLabel>
              <IonInput value={newAdjustmentName} onIonChange={(e:any) => setNewAdjustmentName(e.detail.value)} />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">สินค้า</IonLabel>
              <IonSelect value={selectedProductId} placeholder="เลือกสินค้า" onIonChange={e => setSelectedProductId(e.detail.value)}>
                {sampleProducts.map(p => (
                  <IonSelectOption key={p.id} value={p.id}>{p.name}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            {selectedProductId && (
              <IonItem>
                <IonLabel>จำนวนในระบบ: {sampleProducts.find(p => p.id === selectedProductId)?.instock}</IonLabel>
              </IonItem>
            )}

            <IonItem>
              <IonLabel position="stacked">จำนวนจริง</IonLabel>
              <IonInput type="number" value={actualQty} onIonChange={(e:any) => setActualQty(e.detail.value)} />
            </IonItem>

            <IonButton expand="block" onClick={addAdjustmentItem} className="ion-margin-top">เพิ่มรายการสินค้า</IonButton>

            <IonList>
              {newAdjustmentItems.map((item, idx) => (
                <IonItem key={idx}>{item.name} - ระบบ: {item.systemQty} ชิ้น, นับได้: {item.actualQty} ชิ้น</IonItem>
              ))}
            </IonList>

            <IonButton expand="block" color="primary" onClick={saveAdjustment} className="ion-margin-top">บันทึกใบปรับสต็อก</IonButton>

          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>รายการใบปรับสต็อก</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow className="ion-text-center">
                <IonCol>ID</IonCol>
                <IonCol>ชื่อการปรับ</IonCol>
                <IonCol>วันที่</IonCol>
                <IonCol>สถานะ</IonCol>
                <IonCol>การจัดการ</IonCol>
              </IonRow>
              {adjustments.map(adj => (
                <IonRow key={adj.id} className="ion-text-center">
                  <IonCol>{adj.id}</IonCol>
                  <IonCol>{adj.name}</IonCol>
                  <IonCol>{adj.date}</IonCol>
                  <IonCol>{adj.status}</IonCol>
                  <IonCol>
                    <IonButton size="small" onClick={() => alert(JSON.stringify(adj.items, null, 2))}>ดู/แก้ไข</IonButton>
                    {adj.status !== 'เสร็จสิ้น' && (
                      <IonButton size="small" color="success" onClick={() => updateStatus(adj.id)}>เสร็จสิ้น</IonButton>
                    )}
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
} 
