import React from "react";
import { IonSegment, IonSegmentButton, IonLabel, IonToolbar, IonImg, IonHeader, IonMenuButton, IonButtons, IonButton, IonIcon, IonMenu, IonContent, IonTitle, IonList, IonItem } from "@ionic/react";
import { useLocation, useHistory } from "react-router-dom";
import "./css/NavBar.css";
import { useCookies } from "react-cookie";
import { menuController } from '@ionic/core/components';
import { menuOutline } from 'ionicons/icons';

const NavBar: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
   const [cookies, setCookie, removeCookie] = useCookies(['login']);
  async function openFirstMenu() {
    await menuController.open('menu');
  }
  async function openNavBar() {
    await menuController.open('nav-bar');
  }
  const navItems = [
    { label: "หน้าแรก", path: "/home" },
    { label: "ชำระเงิน", path: "/payment" },
    { label: "สินค้าและสต๊อก", path: "/stock" },
    { label: "ประวัติใบเสร็จ", path: "/history" },
    { label: "รายงาน", path: "/report" },
    { label: "ตั้งค่า", path: "/settings" },
    // { label: "ออกจากระบบ", path: "/logout" },
  ];

  const selectedPath = location.pathname;

  const handleChange = (value:any) => {
    history.push(value);
  };
  const signout =()=>{
    removeCookie("login")
    history.replace("/")
  }

  return (<>
    <IonHeader mode="md"  className="ion-no-border"> 
    <IonToolbar className="navbar  line-seed">  
      <IonButtons slot="start" >
         <IonButton onClick={openFirstMenu} fill="clear" className="ion-hide-md-up"> 
          <IonIcon icon={menuOutline}  /> 
        </IonButton>
        <IonImg alt="LOGO" className="logo" /> 
      </IonButtons>
     
      <ul     className="navbar-ul ion-justify-content-center  ion-hide-md-down" >
       
        {navItems.map((item) => (
          <li onClick={()=>handleChange(item?.path)} className={selectedPath === item.path ?"active":"" } key={item.path} value={item.path}>
            <IonLabel className={selectedPath === item.path ? "active-label " : ""}>
              {item.label}
            </IonLabel>
          </li>
        ))}
          <li onClick={()=>{signout()}}> <IonLabel>ออกจากระบบ</IonLabel> </li>
      </ul>

      <IonButtons slot="end" >
         <IonButton onClick={openNavBar} fill="clear" className="ion-hide-md-up"> 
          <IonIcon icon={menuOutline}  /> 
        </IonButton> 
      </IonButtons>
    </IonToolbar>
    </IonHeader>
    <IonMenu menuId="nav-bar" side="end" contentId="main">
      <IonContent>
        <IonTitle>Nav Bar</IonTitle>
        <IonList>
        {navItems.map((item) => (
          <IonItem  mode="ios" onClick={()=>handleChange(item?.path)} className={selectedPath === item.path ?"active":"" } key={item.path}  >
            <IonLabel className={selectedPath === item.path ? "active-label " : ""}>
              {item.label}
            </IonLabel>
          </IonItem>
        ))}
        </IonList>
      </IonContent>
    </IonMenu>
    </>
  );
};

export default NavBar;
