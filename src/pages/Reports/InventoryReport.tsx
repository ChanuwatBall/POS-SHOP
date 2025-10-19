import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonTitle } from "@ionic/react"
import ExcelJS from "exceljs";
import "../css/Inventory.css"
import { useSelector } from "react-redux"
import { getCatagories, getProducts } from "../../store/productSlice"
import { useEffect, useState } from "react"

interface Product { id: String  ,name:String,unitPrice: Number , instock:Number  ,categories: Number[] ,img:String }
const InventoryReport: React.FC = () => {
        const categories = useSelector(getCatagories)
        const [cat ,setCat] = useState(1)
        const [productsCat,setProducsCat] = useState<any[]>([])
        const products:Product[] = useSelector(getProducts)

        useEffect(()=>{
            console.log("products ",products)
        },[])

        // ฟังก์ชันสำหรับ Export Excel
            const handleExportExcel = async () => {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet("Inventory Report");

                // คำนวณยอดรวมทั้งหมด
                const totalSum = products.reduce((sum, p) => sum + (Number(p.unitPrice) * Number(p.instock)), 0);

                // เพิ่มหัวข้อรายงาน
                worksheet.mergeCells('A1:E1');
                worksheet.getCell('A1').value = 'รายงานสินค้าคงคลัง ณ ปัจจุบัน';
                worksheet.getCell('A1').font = { size: 16, bold: true };
                worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

                // เพิ่มสรุปยอดรวม
                worksheet.mergeCells('A2:E2');
                worksheet.getCell('A2').value = `ยอดรวมทั้งหมด: ${totalSum.toLocaleString()} บาท`;
                worksheet.getCell('A2').font = { size: 14, bold: true };
                worksheet.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' };

                // กำหนดคอลัมน์หัวตาราง
                worksheet.columns = [
                    { header: "ลำดับ", key: "no", width: 8 },
                    { header: "สินค้า", key: "name", width: 30 },
                    { header: "จำนวน", key: "instock", width: 12 },
                    { header: "ต้นทุนต่อหน่วย", key: "unitPrice", width: 18 },
                    { header: "มูลค่าสินค้าในสต็อก", key: "totalValue", width: 22 },
                ];

                // เพิ่มข้อมูลสินค้า (เริ่มที่แถว 4)
                products.forEach((p: any, idx: number) => {
                    worksheet.addRow({
                        no: idx + 1,
                        name: p.name,
                        instock: p.instock,
                        unitPrice: p.unitPrice,
                        totalValue: p.unitPrice * p.instock,
                    });
                });

                // ขยับหัวตารางและข้อมูลลง 3 แถว (เพราะมีหัวข้อและยอดรวม 2 แถว)
                worksheet.spliceRows(3, 0, worksheet.columns.map(col => col.header));

                // สร้างไฟล์และดาวน์โหลด
                const buffer = await workbook.xlsx.writeBuffer();
                const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `InventoryReport_${new Date().toISOString().slice(0,10)}.xlsx`;
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 100);
            };
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
                                <IonButton fill='outline' mode='ios' size='small' style={{ height: "1.8rem" }} onClick={handleExportExcel}>
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