import { IonCol, IonContent, IonGrid, IonImg, IonLabel, IonPage, IonRippleEffect, IonRow } from "@ionic/react";
import React, { useState } from "react";

const Product:React.FC=()=>{
    const [imgPlaceholder] = useState("https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=")

    return(<IonPage>
        <IonContent>
            <div className='content-padding ion-padding' >
              
                <IonGrid>
                    <IonRow>
                        <IonCol size="3" style={{position:"relative"}} >
                          <IonImg  src={imgPlaceholder} style={{width:"100%"}} />
                          <div className="set-center ion-padding ion-activatable ripple-parent" style={{position:"absolute",width:"98%",bottom:"5px" }} >
                            <IonLabel>Click to upload</IonLabel>
                            <IonRippleEffect></IonRippleEffect>
                          </div>
                        </IonCol>
                        <IonCol size="6" >

                        </IonCol>
                    </IonRow>
                    <IonRow>

                    </IonRow>
                </IonGrid>
            </div>
        </IonContent>
    </IonPage>
    )
}
export default Product;