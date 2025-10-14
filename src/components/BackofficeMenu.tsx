import { IonContent, IonList, IonItem, IonLabel, IonIcon, IonMenuToggle } from "@ionic/react";
import { gridOutline, peopleOutline, barChartOutline, homeOutline } from "ionicons/icons";
import "./css/MenuContent.css";

const BackofficeMenu = () => {
  const menus = [
    { label: "แดชบอร์ด", icon: gridOutline, link: "/backoffice/dashboard" },
    { label: "จัดการใบสั่งซื้อ", icon: peopleOutline, link: "/backoffice/purchaseOrder" },
    { label: "ปรับสต๊อกสินค้า", icon: barChartOutline, link: "/backoffice/updateStock" },
    { label: "กลับหน้าหลัก", icon: homeOutline, link: "/home" },
    { label: "รายงานสินค้าคงคลัง", icon: barChartOutline, link: "/backoffice/report/inventory" },
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
