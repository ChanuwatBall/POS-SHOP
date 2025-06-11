import { IonSplitPane, IonMenu, IonContent, IonList, IonItem, IonLabel, IonRouterOutlet, IonIcon, IonMenuToggle, IonChip, IonBadge } from "@ionic/react"
import { albumsOutline, bagHandleOutline, barChartOutline, bookOutline, cubeOutline, gridOutline, home, logOutOutline, peopleOutline, pinOutline, receiptOutline, settings } from "ionicons/icons";
import "./css/MenuContent.css"
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { getBreakBill } from "../store/recieptsSlice";

const MenuSplitContent=()=>{
  const history = useHistory()
  const [cookies, setCookie, removeCookie] = useCookies(['login']);
  const billPaused = useSelector(getBreakBill)

  const logout=()=>{
    removeCookie("login")
    window.location.replace("")
  }
    return(
    <IonContent>
      <div className="ion-padding"  style={{width:"100%" }}>
        LOGO
      </div>
      <IonList>
        <IonMenuToggle autoHide={false}>
          <IonItem routerLink="/home" routerDirection="none" lines="none">
            <IonIcon icon={bagHandleOutline} slot="start" />
            <IonLabel>การขาย &nbsp;
               {billPaused.length > 0 && <IonBadge slot="end" color={"danger"} mode="ios" >{billPaused.length}</IonBadge> }
            </IonLabel>

           
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle autoHide={false}>
          <IonItem routerLink="/settings" routerDirection="none" lines="none">
            <IonIcon icon={pinOutline} slot="start" />
            <IonLabel>ปักหมุดสินค้า</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle autoHide={false}>
          <IonItem routerLink="/settings" routerDirection="none" lines="none">
            <IonIcon icon={receiptOutline} slot="start" />
            <IonLabel>บิลที่ขาย</IonLabel>
          </IonItem>
        </IonMenuToggle>

          <div className="devider"></div>
        <IonMenuToggle autoHide={false}>
          <IonItem routerLink="/home" routerDirection="none" lines="none">
            <IonIcon icon={cubeOutline} slot="start" />
            <IonLabel>จัดการสินค้า</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle autoHide={false}>
          <IonItem routerLink="/settings" routerDirection="none" lines="none">
            <IonIcon icon={albumsOutline} slot="start" />
            <IonLabel>หมวดหมู่สินค้า</IonLabel>
          </IonItem>
        </IonMenuToggle> 
          <div className="devider"></div>

        <IonMenuToggle autoHide={false}>
          <IonItem routerLink="/settings" routerDirection="none" lines="none">
            <IonIcon icon={gridOutline} slot="start" />
            <IonLabel>แดชบอร์ด</IonLabel>
          </IonItem>
        </IonMenuToggle>  
        <IonMenuToggle autoHide={false}>
          <IonItem routerLink="/settings" routerDirection="none" lines="none">
            <IonIcon icon={peopleOutline} slot="start" />
            <IonLabel>สมาชิก</IonLabel>
          </IonItem>
        </IonMenuToggle> 
        <IonMenuToggle autoHide={false}>
          <IonItem routerLink="/settings" routerDirection="none" lines="none">
            <IonIcon icon={barChartOutline} slot="start" />
            <IonLabel>จัดการหลังร้าน</IonLabel>
          </IonItem>
        </IonMenuToggle> 
          <div className="devider"></div>

        <IonMenuToggle autoHide={false}>
          <IonItem routerLink="/settings" routerDirection="none" lines="none">
            <IonIcon icon={bookOutline} slot="start" />
            <IonLabel>คู่มือ</IonLabel>
          </IonItem>
        </IonMenuToggle>   
         <IonMenuToggle autoHide={false}>
          <IonItem onClick={()=>{logout()}} >
            <IonIcon icon={logOutOutline} slot="start" />
            <IonLabel>ออกจากระบบ</IonLabel>
          </IonItem>
        </IonMenuToggle>  


      </IonList>
    </IonContent>
    )
}

export default MenuSplitContent;