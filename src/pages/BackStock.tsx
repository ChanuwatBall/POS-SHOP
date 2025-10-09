import { IonContent, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonSearchbar, IonSegment, IonSegmentButton, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { home, person, receiptOutline } from "ionicons/icons"; 
import { Route, Redirect } from "react-router";
import PurchaseOrder from "./BackStock/PosPurchaseOrder";
import Dashboard from "./Dashboard";

const BackStock:React.FC=()=>{ 
    return( 
     <IonPage>
        <IonContent className="ion-padding" >
            <IonSearchbar></IonSearchbar>
        </IonContent>
     </IonPage>
    )
}

export default BackStock;