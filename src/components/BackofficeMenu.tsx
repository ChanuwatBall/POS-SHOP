import { IonContent, IonList, IonItem, IonLabel, IonIcon, IonMenuToggle } from "@ionic/react";
import { gridOutline, peopleOutline, barChartOutline, homeOutline, receiptOutline, cubeOutline, calendar, documentText, documentTextOutline, calendarOutline } from "ionicons/icons";
import "./css/MenuContent.css";

const BackofficeMenu = () => {
  const menus = [
    { label: "แดชบอร์ด", icon: gridOutline, link: "/backoffice/dashboard" },
    { label: "จัดการใบสั่งซื้อ", icon: receiptOutline, link: "/backoffice/purchaseOrder" },
    { label: "ปรับสต๊อกสินค้า", icon: cubeOutline, link: "/backoffice/updateStock" },
    { label: "การจัดการสินค้าใกล้หมด", icon: barChartOutline, link: "/backoffice/low-stock" },
    { label: "การจัดการวันหมดอายุสินค้า", icon: calendarOutline, link: "/backoffice/expiry-manager" },
    { label: "รายงานสินค้าคงคลัง", icon: documentTextOutline, link: "/backoffice/report/inventory" },
    { label: "กลับหน้าหลัก", icon: homeOutline, link: "/home" },
  ];

  return (
    <IonContent>
      <div className="ion-padding">BACKOFFICE</div>
      <IonList>
        {menus.map((m, i) => (
          <IonMenuToggle key={i} autoHide={false}>
            <IonItem routerLink={m.link} routerDirection="none" lines="none">
              <IonIcon icon={m.icon} slot="start" />
              <IonLabel>{m.label}</IonLabel>
            </IonItem>
          </IonMenuToggle>
        ))}
      </IonList>
    </IonContent>
  );
};

export default BackofficeMenu;
