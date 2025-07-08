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
  IonTextarea,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
  IonList, 
  IonButtons,
  IonModal,
  IonIcon
} from '@ionic/react';
// import pdfMake from 'pdfmake/build/pdfmake';
import {PDFMake} from "../../utils/ReceiptPdfMake"
import { addCircle } from 'ionicons/icons';
import {fontPdfMake} from  "../../utils/vfs_fonts"
  

export default function PurchaseOrder() {
  const [modal , setModal] = useState(false)
  const [orders, setOrders] = useState<any[]>([]);
  const [newOrder, setNewOrder] = useState<any>({
    date: '',
    supplier: '',
    note: '',
    items: [],
    status: 'สั่งซื้อแล้ว'
  });
  const [newItem, setNewItem] = useState({ name: '', qty: '', unit: '' });

  const addOrder = () => {
    const id = orders.length + 1;
    const total = newOrder.items.reduce((sum:any, item:any) => sum + (parseFloat(item.qty) || 0), 0);
    setOrders([...orders, { id, ...newOrder, total }]);
    setNewOrder({ date: '', supplier: '', note: '', items: [], status: 'สั่งซื้อแล้ว' });
    setModal(false)
  };

  const addItemToOrder = () => {
    if(newItem?.name && newItem?.qty && newItem?.unit){
      setNewOrder({ ...newOrder, items: [...newOrder.items, newItem] });
      setNewItem({ name: '', qty: '', unit: '' });
    }
  };

  const updateStatus = (id:any) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: 'รับสินค้าแล้ว' } : order));
  };

  const printOrder = (order:any) => {
    const doc :any = {
      content: [
        { text: 'ใบสั่งซื้อ', style: 'header' },
        { text: `หมายเลข: ${order.id}\nวันที่: ${order.date}\nซัพพลายเออร์: ${order.supplier}\nหมายเหตุ: ${order.note}`, margin: [0, 10] },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto'],
            body: [
              ['สินค้า', 'จำนวน', 'หน่วย'],
              ...order.items.map((item:any) => [item.name, item.qty, item.unit])
            ]
          }
        }
      ],
      styles: { header: { fontSize: 18, bold: true } },
      defaultStyle: {
        font: "THSarabunNew",
      },
    };
    PDFMake.createPdf(doc).open();
  };

  return (
    <IonPage>
      <IonHeader className='ion-no-border' >
        <IonToolbar>
          <IonTitle>จัดการใบสั่งซื้อ</IonTitle>
          <IonButton mode='ios' size='small' slot='end'  style={{marginRight:"2rem"}}
           onClick={()=>{setModal(true)}}
          >
            <IonIcon  icon={addCircle} /> &nbsp;
            <IonLabel>เพิ่มใบสั่งซื้อ</IonLabel>
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonModal mode='ios' isOpen={modal} onIonModalDidDismiss={()=>{setModal(false)}} >
          <IonContent >
           <IonCard style={{boxShadow:"none"}} >
            <IonCardHeader>
              <IonCardTitle>เพิ่มรายการสั่งซื้อใหม่</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>

              <IonItem>
                <IonLabel position="stacked">วันที่</IonLabel>
                <IonInput type="date" value={newOrder.date} onIonChange={(e) => setNewOrder({ ...newOrder, date: e.detail.value })} />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">ซัพพลายเออร์</IonLabel>
                <IonInput value={newOrder.supplier} onIonChange={(e) => setNewOrder({ ...newOrder, supplier: e.detail.value })} />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">โน้ต</IonLabel>
                <IonTextarea value={newOrder.note} onIonChange={(e) => setNewOrder({ ...newOrder, note: e.detail.value })} />
              </IonItem>
              
              <IonCard> 
                <IonGrid>
                  <IonRow>
                    <IonCol size="3.5">
                      <IonInput className='input ' style={{margin:"0px",paddingLeft:"2px"}}  placeholder="ชื่อสินค้า" value={newItem.name} onIonChange={(e:any) => setNewItem({ ...newItem, name: e.detail.value })} />
                    </IonCol>
                    <IonCol size="3.5">
                      <IonInput  className='input ' style={{margin:"0px",paddingLeft:"2px"}} placeholder="จำนวน" value={newItem.qty} onIonChange={(e:any) => setNewItem({ ...newItem, qty: e.detail.value })} />
                    </IonCol>
                    <IonCol size="3">
                      <IonInput  className='input ' style={{margin:"0px",paddingLeft:"2px"}}  placeholder="หน่วย" value={newItem.unit} onIonChange={(e:any) => setNewItem({ ...newItem, unit: e.detail.value })} />
                    </IonCol>
                    <IonCol size="2"className='set-center'  >
                      <IonButton size='small' onClick={addItemToOrder}>
                        <IonIcon icon={addCircle} />
                      </IonButton>
                    </IonCol>
                  </IonRow>  
                </IonGrid>
              </IonCard>

              <IonList>
                {newOrder.items.map((item:any, idx:any) => (
                  <IonItem key={idx}>{item.name} - {item.qty} {item.unit}</IonItem>
                ))}
              </IonList>

              <IonButton expand="block" onClick={addOrder}>บันทึกรายการ</IonButton>

            </IonCardContent>
          </IonCard>
          </IonContent>
        </IonModal>
       

        <IonCard style={{boxShadow:"none"}}>
          <IonCardHeader>
            <IonCardTitle>ประวัติการสั่งซื้อ</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow className="ion-text-center ion-padding-bottom">
                <IonCol>ลำดับ</IonCol>
                <IonCol>วันที่</IonCol>
                <IonCol>หมายเลข</IonCol>
                <IonCol>Supplier</IonCol>
                <IonCol>ยอดซื้อ</IonCol>
                <IonCol>สถานะ</IonCol>
                <IonCol>การจัดการ</IonCol>
              </IonRow>
              {orders.map(order => (
                <IonRow key={order.id} className="ion-text-center">
                  <IonCol>{order.id}</IonCol>
                  <IonCol>{order.date}</IonCol>
                  <IonCol>{order.id}</IonCol>
                  <IonCol>{order.supplier}</IonCol>
                  <IonCol>{order.total}</IonCol>
                  <IonCol>{order.status}</IonCol>
                  <IonCol>
                    <IonButtons>
                      <IonButton size="small" onClick={() => printOrder(order)}>พิมพ์</IonButton>
                      {order.status === 'สั่งซื้อแล้ว' && (
                        <IonButton size="small" onClick={() => updateStatus(order.id)}>อัปเดต</IonButton>
                      )}
                    </IonButtons>
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
