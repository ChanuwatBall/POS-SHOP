import { IonSplitPane, IonMenu, IonContent, IonList, IonItem, IonLabel, IonRouterOutlet, IonIcon, IonMenuToggle, IonChip, IonBadge, IonAccordion, IonAccordionGroup } from "@ionic/react"
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
      <IonList style={{fontSize:".7em"}} >
        <IonMenuToggle autoHide={false}>
          <IonItem routerLink="/home" routerDirection="none" lines="none">
            <IonIcon icon={bagHandleOutline} slot="start" />
            <IonLabel>การขาย &nbsp;
               {billPaused.length > 0 && <IonBadge slot="end" color={"danger"} mode="ios" >{billPaused.length}</IonBadge> }
            </IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle autoHide={false}>
          <IonItem routerLink="/pin-products" routerDirection="none" lines="none">
            <IonIcon icon={pinOutline} slot="start" />
            <IonLabel>ปักหมุดสินค้า</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle autoHide={false}>
          <IonItem routerLink="/bills" routerDirection="none" lines="none">
            <IonIcon icon={receiptOutline} slot="start" />
            <IonLabel>บิลที่ขาย</IonLabel>
          </IonItem>
        </IonMenuToggle>

          <div className="devider"></div>
        <IonMenuToggle autoHide={false}>
          <IonItem routerLink="/products" routerDirection="none" lines="none">
            <IonIcon icon={cubeOutline} slot="start" />
            <IonLabel>จัดการสินค้า</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle autoHide={false}>
          <IonItem routerLink="/categories" routerDirection="none" lines="none">
            <IonIcon icon={albumsOutline} slot="start" />
            <IonLabel>หมวดหมู่สินค้า</IonLabel>
          </IonItem>
        </IonMenuToggle> 
          <div className="devider"></div>
      <IonAccordionGroup>
        <IonAccordion value="first">
          <IonItem slot="header" color="light">
             <IonIcon icon={barChartOutline} slot="start" /> 
            <IonLabel>จัดการหลังร้าน</IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
             <IonMenuToggle autoHide={false}>
              <IonItem routerLink="/backoffice/dashboard" routerDirection="none" lines="none">
                <IonIcon icon={gridOutline} slot="start" />
                <IonLabel>แดชบอร์ด</IonLabel>
              </IonItem>
            </IonMenuToggle>  
            <IonMenuToggle autoHide={false}>
              <IonItem routerLink="/backoffice/purchaseOrder" routerDirection="none" lines="none">
                <IonIcon icon={peopleOutline} slot="start" />
                <IonLabel>จัดการใบสั่งซื้อ</IonLabel>
              </IonItem>
            </IonMenuToggle> 
            <IonMenuToggle autoHide={false}>
              <IonItem routerLink="/backoffice/updateStock" routerDirection="none" lines="none">
                <IonIcon icon={peopleOutline} slot="start" />
                <IonLabel>ปรับสต๊อก นับสินค้า</IonLabel>
              </IonItem>
            </IonMenuToggle> 
          </div>
        </IonAccordion> 
      </IonAccordionGroup>
 
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