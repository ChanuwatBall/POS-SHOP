import React from "react";
import { IonSegment, IonSegmentButton, IonLabel, IonToolbar, IonImg, IonHeader, IonMenuButton, IonButtons, IonButton, IonIcon } from "@ionic/react";
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

  return (
    <IonHeader mode="md"  className="ion-no-border"> 
    <IonToolbar className="navbar  line-seed">  
      <IonButtons slot="start" >
         <IonButton onClick={openFirstMenu} fill="clear" className="ion-hide-md-up"> 
          <IonIcon icon={menuOutline}  /> 
        </IonButton>
        <IonImg alt="LOGO" className="logo" /> 
      </IonButtons>
     
      <ul     className="navbar-ul ion-justify-content-center" >
       
        {navItems.map((item) => (
          <li onClick={()=>handleChange(item?.path)} className={selectedPath === item.path ?"active":"" } key={item.path} value={item.path}>
            <IonLabel className={selectedPath === item.path ? "active-label " : ""}>
              {item.label}
            </IonLabel>
          </li>
        ))}
          <li onClick={()=>{signout()}}> <IonLabel>ออกจากระบบ</IonLabel> </li>
      </ul>
    </IonToolbar>
    </IonHeader>
  );
};

export default NavBar;
