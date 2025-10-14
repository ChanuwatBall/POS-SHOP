import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonTitle } from "@ionic/react"
import "../css/Inventory.css"
import { useSelector } from "react-redux"
import { getCatagories, getProducts } from "../../store/productSlice"
import { useState } from "react"

interface Product { id: String  ,name:String,unitPrice: Number , instock:Number  ,categories: Number[] ,img:String }
const InventoryReport: React.FC = () => {
    const categories = useSelector(getCatagories)
    const [cat ,setCat] = useState(1)
      const [productsCat,setProducsCat] = useState<any[]>([])
      const products:Product[] = useSelector(getProducts)

    return (
        <IonPage>
            <IonContent  >
                <div className="bg-shade ion-padding " style={{minHeight:"100vh"}}>
                <IonHeader mode="ios" >
                    <IonTitle>รายงานสินค้าคงคลัง ณ ปัจจุบัน</IonTitle>
                </IonHeader><br />

                <div className="set-center ion-margin-top" >
                    <IonSearchbar mode="ios" style={{ maxWidth: "30rem" }}  ></IonSearchbar>

                    ยอดรวม : 13,765.00 บาท
                    <div className="table">
                        <div className="table-header">
                            <div className="left">

                                <IonButton fill='outline' mode='ios' size='small' style={{ height: "1.8rem" }}>
                                    <IonSelect className='select-categories' mode='ios'
                                        interface="popover" value={cat}
                                        onIonChange={(e) => { setCat(e.detail.value) }}
                                    >
                                        {
                                            categories.map((cat) =>
                                                <IonSelectOption value={cat.id}> {cat?.name} </IonSelectOption>
                                            )
                                        }
                                    </IonSelect>
                                </IonButton>
                                <IonButton fill='outline' mode='ios' size='small' style={{ height: "1.8rem" }}>
                                    Export Excel
                                </IonButton>
                            </div>
                        </div>
                        <div className="table-body">
                                 <IonRow className="table-header ion-text-center ion-padding-vertical">
                                    <IonCol size="1">ลำดับ</IonCol>
                                    <IonCol size="4">สินค้า</IonCol>
                                    <IonCol size="2">จำนวน</IonCol>
                                    <IonCol size="2">ต้นทุนต่อหน่วย</IonCol>
                                    <IonCol size="3">มูลค่าสินค้าในสต็อก</IonCol>
                                </IonRow>
                            <IonGrid>

                                 {products.length === 0 ? (
                                    <IonRow className="ion-text-center ion-padding">
                                    <IonCol>ไม่พบข้อมูลสินค้า</IonCol>
                                    </IonRow>
                                ) : (
                                    products.map((p:any, index) => {
                                    const totalValue = p.unitPrice * p.instock;
                                    return (
                                        <IonRow
                                        key={p.id}
                                        className="table-row ion-text-center ion-align-items-center"
                                        >
                                        <IonCol size="1">{index + 1}</IonCol>
                                        <IonCol size="4">{p.name}</IonCol>
                                        <IonCol size="2">{p.instock}</IonCol>
                                        <IonCol size="2">{p.unitPrice.toLocaleString()}</IonCol>
                                        <IonCol size="3">{totalValue.toLocaleString()}</IonCol>
                                        </IonRow>
                                    );
                                    })
                                )}
                            </IonGrid>
                        </div>
                    </div>
                </div>

                </div>
            </IonContent>
        </IonPage>
    )
}
export default InventoryReport;