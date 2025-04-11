import React from 'react';
import { IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import "./css/ButtonGroup.css"
 
const ButtonGroup= ({setCash}:any) => {
  return (
    <IonGrid style={{maxWidth:"20rem",marginTop:"1rem"}} >
      <IonRow>
        <IonCol size='4'  className='border right bottom' >
          <IonButton fill="clear" expand="block" color="dark" onClick={()=>{return setCash(1)}}>1</IonButton>
        </IonCol>
        <IonCol size='4' className='border right bottom' >
          <IonButton fill="clear" expand="block" color="dark" onClick={()=>{return setCash(2)}}>2</IonButton>
        </IonCol>
        <IonCol size='4' className='border bottom'>
          <IonButton fill="clear" expand="block" color="dark"  onClick={()=>{return setCash(5)}}>5</IonButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size='4' className='border right bottom' >
          <IonButton fill="clear" expand="block" color="dark"  onClick={()=>{return setCash(10)}}>10</IonButton>
        </IonCol>
        <IonCol size='4' className='border right bottom' >
          <IonButton fill="clear" expand="block" color="dark"  onClick={()=>{return setCash(20)}}>20</IonButton>
        </IonCol>
        <IonCol size='4' className='border bottom' >
          <IonButton fill="clear" expand="block" color="dark"  onClick={()=>{return setCash(50)}} >50</IonButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size='4' className='border right ' >
          <IonButton fill="clear" expand="block" color="dark"  onClick={()=>{return setCash(100)}}>100</IonButton>
        </IonCol>
        <IonCol size='4' className='border right ' >
          <IonButton fill="clear" expand="block" color="dark"  onClick={()=>{return setCash(500)}}>500</IonButton>
        </IonCol>
        <IonCol size='4' >
          <IonButton fill="clear" expand="block" color="dark"  onClick={()=>{return setCash(1000)}}>1000</IonButton>
        </IonCol>
      </IonRow>
      
    </IonGrid>
  );
};

export default ButtonGroup;
