import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonMenuToggle,
  IonBadge,
  IonAccordion,
  IonAccordionGroup,
} from "@ionic/react";
import {
  albumsOutline,
  bagHandleOutline,
  barChartOutline,
  bookOutline,
  cubeOutline,
  gridOutline,
  logOutOutline,
  peopleOutline,
  pinOutline,
  receiptOutline,
} from "ionicons/icons";

import { useCookies } from "react-cookie";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { getBreakBill } from "../store/recieptsSlice";
import "./css/MenuContent.css";

const MenuSplitContent = () => {
  const history = useHistory();
  const [cookies, , removeCookie] = useCookies(["login"]);
  const billPaused = useSelector(getBreakBill);

  const logout = () => {
    removeCookie("login");
    window.location.replace("");
  };

  /** 🔹 Define Menu Sections Dynamically */
  const mainMenus = [
    {
      label: "การขาย",
      icon: bagHandleOutline,
      link: "/home",
      badge: billPaused.length > 0 ? billPaused.length : null,
    },
    { label: "ปักหมุดสินค้า", icon: pinOutline, link: "/pin-products" },
    { label: "บิลที่ขาย", icon: receiptOutline, link: "/bills" },
  ];

  const productMenus = [
    { label: "จัดการสินค้า", icon: cubeOutline, link: "/products" },
    { label: "หมวดหมู่สินค้า", icon: albumsOutline, link: "/categories" },
  ];

  const backofficeMenus = [
    {
      label: "แดชบอร์ด",
      icon: gridOutline,
      link: "/backoffice/dashboard",
    },
    {
      label: "จัดการใบสั่งซื้อ",
      icon: peopleOutline,
      link: "/backoffice/purchaseOrder",
    },
    {
      label: "ปรับสต๊อก นับสินค้า",
      icon: peopleOutline,
      link: "/backoffice/updateStock",
    },
    {
      label: "รายงาน (เปิดแท็บใหม่)",
      icon: peopleOutline,
      external: true,
      link: "/backoffice/report",
    },
  ];

  const miscMenus = [
    { label: "คู่มือ", icon: bookOutline, link: "/settings" },
    { label: "ออกจากระบบ", icon: logOutOutline, action: logout },
  ];

/* ใน component */
const location = useLocation();

/* ปรับ renderMenuItems function */
const renderMenuItems = (menus: any[]) =>
  menus.map((item, index) => {
    const isActive = item.link && location.pathname === item.link;

    return (
      <IonMenuToggle key={index} autoHide={false}>
        {item.external ? (
          <IonItem
            onClick={() => window.open(item.link, "_blank")}
            lines="none"
            className={isActive ? "active" : ""}
          >
            <IonIcon icon={item.icon} slot="start" />
            <IonLabel>{item.label}</IonLabel>
          </IonItem>
        ) : item.action ? (
          <IonItem
            onClick={item.action}
            lines="none"
            className={isActive ? "active" : ""}
          >
            <IonIcon icon={item.icon} slot="start" />
            <IonLabel>{item.label}</IonLabel>
          </IonItem>
        ) : (
          <IonItem
            routerLink={item.link}
            routerDirection="none"
            lines="none"
            className={isActive ? "active" : ""}
          >
            <IonIcon icon={item.icon} slot="start" />
            <IonLabel>
              {item.label}
              {item.badge && (
                <IonBadge slot="end" color="danger" mode="ios">
                  {item.badge}
                </IonBadge>
              )}
            </IonLabel>
          </IonItem>
        )}
      </IonMenuToggle>
    );
  });
  
  return (
    <IonContent>
      <div className="ion-padding" style={{ width: "100%" }}>
        LOGO
      </div>

      <IonList style={{ fontSize: ".7em" }}>
        {renderMenuItems(mainMenus)}

        <div className="devider"></div>
        {renderMenuItems(productMenus)}

        <div className="devider"></div>
        <IonAccordionGroup>
          <IonAccordion value="backoffice">
            <IonItem slot="header" color="light">
              <IonIcon icon={barChartOutline} slot="start" />
              <IonLabel>จัดการหลังร้าน</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              {renderMenuItems(backofficeMenus)}
            </div>
          </IonAccordion>
        </IonAccordionGroup>

        <div className="devider"></div>
        {renderMenuItems(miscMenus)}
      </IonList>
    </IonContent>
  );
};

export default MenuSplitContent;
