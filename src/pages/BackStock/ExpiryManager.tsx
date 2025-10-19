import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle } from "@ionic/react";
import { useSelector } from "react-redux";
import { useState } from "react";
import ExcelJS from "exceljs";
import { getProducts } from "../../store/productSlice";

interface ExpiryItem {
    id: string;
    name: string;
    lot: string;
    expiry: string;
}

const ExpiryManager: React.FC = () => {
    const products = useSelector(getProducts);
    const [selectedProduct, setSelectedProduct] = useState<string>("");
    const [lot, setLot] = useState<string>("");
    const [expiry, setExpiry] = useState<string>("");
    const [items, setItems] = useState<ExpiryItem[]>([]);

    const handleAdd = () => {
        const product = products.find((p: any) => p.id === selectedProduct);
        if (!product || !lot || !expiry) return;
        setItems([
            ...items,
            {
                id: product.id + lot + expiry,
                name: product.name,
                lot,
                expiry,
            },
        ]);
        setSelectedProduct("");
        setLot("");
        setExpiry("");
    };

    const handleDelete = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleExportExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Expiry Report");
        worksheet.columns = [
            { header: "สินค้า", key: "name", width: 30 },
            { header: "เลขล็อต", key: "lot", width: 18 },
            { header: "วันหมดอายุ", key: "expiry", width: 18 },
        ];
        items.forEach(item => {
            worksheet.addRow({
                name: item.name,
                lot: item.lot,
                expiry: item.expiry,
            });
        });
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ExpiryReport_${new Date().toISOString().slice(0, 10)}.xlsx`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    };

    return (
        <IonPage>
            <IonContent>
                <div className="bg-shade ion-padding" style={{ minHeight: "100vh" }}>
                    <IonHeader mode="ios">
                        <IonTitle>การจัดการวันหมดอายุของสินค้า</IonTitle>
                    </IonHeader>
                    <br /><br />
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                <div style={{ background: '#fff', padding: 20, borderRadius: 10 }}>
                                    
                                   
                                     <IonItem>
                                        <IonLabel position="stacked">สินค้า</IonLabel> 
                                          <IonSelect value={selectedProduct} placeholder="เลือกสินค้า" onIonChange={e => setSelectedProduct(e.detail.value)}>
                                        {products.map((p: any) => (
                                            <IonSelectOption key={p.id} value={p.id}>{p.name}</IonSelectOption>
                                        ))}
                                    </IonSelect>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="stacked">เลขล็อต</IonLabel> 
                                        <IonInput value={lot} placeholder="เลขล็อต" onIonInput={e => setLot(e.detail.value?.toString() || "")} />
                                    </IonItem>
                                     <IonItem>
                                        <IonLabel position="stacked">วันหมดอายุ</IonLabel>
                                         <IonInput type="date" value={expiry} placeholder="วันหมดอายุ" onIonInput={e => setExpiry(e.detail.value?.toString() || "")} />
                                    </IonItem>
                                     
                                    <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                                        <IonButton onClick={handleAdd}>+ เพิ่ม</IonButton>
                                        <IonButton color="success" onClick={handleExportExcel}>Excel Download</IonButton>
                                    </div>
                                </div>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="12">
                                <div style={{ background: '#fff', borderRadius: 10, marginTop: 30, padding: 20 }}>
                                    <table style={{ width: '100%' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ textAlign: 'left' }}>สินค้า</th>
                                                <th>เลขล็อต</th>
                                                <th>วันหมดอายุ</th>
                                                <th>ลบ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.length === 0 ? (
                                                <tr><td colSpan={4} style={{ textAlign: 'center' }}>-</td></tr>
                                            ) : (
                                                items.map(item => (
                                                    <tr key={item.id}>
                                                        <td>{item.name}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.lot}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.expiry}</td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <IonButton fill="clear" color="danger" onClick={() => handleDelete(item.id)}>Delete</IonButton>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ExpiryManager;
