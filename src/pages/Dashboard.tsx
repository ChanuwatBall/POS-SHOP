import { IonButton, IonButtons, IonCard, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonText, IonTitle } from "@ionic/react"
import { barChartOutline, cashOutline, cubeOutline, giftOutline, peopleOutline, trendingUpOutline } from "ionicons/icons"
import "./css/Dashboard.css"

const Dashboard=()=>{
    return(
        <IonPage>
            <IonContent>
                <IonHeader>

                </IonHeader>
                <IonCard mode="ios" className="welcome-card line-seed bold ion-padding"  >
                    <IonCardTitle>
                        ยินดีต้อนรับสู่ POS Shop 
                    </IonCardTitle>
                    <IonText>ระบบขายหน้าร้านทันสมัย เร็ว มช้งานง่าย</IonText><br/><br/>
                    <IonButtons>
                        <IonButton color={"light"} fill="default">
                            <IonIcon icon={cashOutline} /> &nbsp;
                            เปิดหน้าขาย
                        </IonButton>
                        <IonButton color={"primary"} fill="outline">
                            <IonIcon icon={cashOutline} /> &nbsp;
                            เพิ่มสินค้าใหม่
                        </IonButton>
                    </IonButtons>
                </IonCard>

                <IonGrid className="ion-padding" >
                    <IonRow>
                        <IonCol size="12" >
                            <IonLabel>การดำเนินการด่วน</IonLabel>
                        </IonCol>  
                    </IonRow>
                    <IonRow>
                        <IonCol size="3" >
                            <IonCard mode="ios" className="quick-access-card" >
                                <IonIcon icon={cashOutline} /> <br/>
                                <IonLabel>
                                    <strong>จุดขาย (POS)</strong> <br/>
                                    <IonText>ทำรายการการขายและพิมพ์ใบเสร็จอย่างรวดเร็ว</IonText>
                                </IonLabel>
                            </IonCard>
                        </IonCol>

                         <IonCol size="3" >
                            <IonCard mode="ios" className="quick-access-card"  >
                                <IonIcon icon={cubeOutline} /> <br/>
                                <IonLabel>
                                    <strong>การจัดการสินค้า</strong> <br/>
                                    <IonText>เริ่มต้นเพิ่มสินค้าใหม่</IonText>
                                </IonLabel>
                            </IonCard>
                        </IonCol>

                         <IonCol size="3" >
                            <IonCard mode="ios" className="quick-access-card"  >
                                <IonIcon icon={barChartOutline} /> <br/>
                                <IonLabel>
                                    <strong>จัดการสินค้าคงคลัง</strong> <br/>
                                    <IonText>ติดตามสต็อกและสถานะสินค้า</IonText>
                                </IonLabel>
                            </IonCard>
                        </IonCol>

                         <IonCol size="3" >
                            <IonCard mode="ios" className="quick-access-card"  >
                                <IonIcon icon={trendingUpOutline} /> <br/>
                                <IonLabel>
                                    <strong>รายงาน</strong> <br/>
                                    <IonText>วิเคาระห์ยอดขายด้วยรายงาน</IonText>
                                </IonLabel>
                            </IonCard>
                        </IonCol>

                         <IonCol size="3" >
                            <IonCard mode="ios" className="quick-access-card"  >
                                <IonIcon icon={peopleOutline} /> <br/>
                                <IonLabel>
                                    <strong>ลูกค้า</strong> <br/>
                                    <IonText>เพิ่มลูกค้า</IonText>
                                </IonLabel>
                            </IonCard>
                        </IonCol>

                         <IonCol size="3" >
                            <IonCard mode="ios" className="quick-access-card"  >
                                <IonIcon icon={giftOutline} /> <br/>
                                <IonLabel>
                                    <strong>ผู้จัดหา</strong> <br/>
                                    <IonText>เพิ่มผู้จัดหา</IonText>
                                </IonLabel>
                            </IonCard>
                        </IonCol>



                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}
export default Dashboard