import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonInput, IonItem, IonLabel } from "@ionic/react";
import { useSelector } from "react-redux";
import { useState } from "react";
import ExcelJS from "exceljs";
import { getProducts } from "../../store/productSlice";

interface LowStockItem {
    id: string;
    name: string;
    currentStock: number;
    lowStock: number;
}

const LowStockManager: React.FC = () => {
    const products = useSelector(getProducts);
    const [selectedProduct, setSelectedProduct] = useState<string>("");
    const [lowStock, setLowStock] = useState<number>(0);
    const [items, setItems] = useState<LowStockItem[]>([]);

    const handleAdd = () => {
        const product = products.find((p: any) => p.id === selectedProduct);
        if (!product || !lowStock) return;
        if (items.some(item => item.id === product.id)) return;
        setItems([
            ...items,
            {
                id: product.id,
                name: product.name,
                currentStock: product.instock,
                lowStock: lowStock,
            },
        ]);
        setSelectedProduct("");
        setLowStock(0);
    };

    const handleDelete = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleExportExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Low Stock Report");
        worksheet.columns = [
            { header: "สินค้า", key: "name", width: 30 },
            { header: "จำนวน", key: "currentStock", width: 12 },
            { header: "จำนวนใกล้หมด", key: "lowStock", width: 15 },
        ];
        items.forEach(item => {
            worksheet.addRow({
                name: item.name,
                currentStock: item.currentStock,
                lowStock: item.lowStock,
            });
        });
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `LowStockReport_${new Date().toISOString().slice(0, 10)}.xlsx`;
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
                        <IonTitle>สร้างบันทึก การจัดการสินค้าใกล้หมด (เพื่อแจ้งเตือนหน้า Dashboard)</IonTitle>
                    </IonHeader>
                    <br /> <br />
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
                                        <IonLabel position="stacked">จำนวนใกล้หมด</IonLabel>
                                        <IonInput type="number" value={lowStock} placeholder="จำนวนใกล้หมด" onIonInput={e => setLowStock(Number(e.detail.value || 0))} />
                                    </IonItem>
                                    {/* <div style={{ marginTop: 20 }}>จำนวนใกล้หมด</div> */}
                                    {/* <IonInput type="number" value={lowStock} placeholder="จำนวนใกล้หมด" onIonInput={e => setLowStock(Number(e.detail.value || 0))} /> */}
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
                                                <th>จำนวน</th>
                                                <th>จำนวนใกล้หมด</th>
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
                                                        <td style={{ textAlign: 'center' }}>{item.currentStock}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.lowStock}</td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <IonButton color="danger" fill="clear" onClick={() => handleDelete(item.id)}>Delete</IonButton>
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

export default LowStockManager;
