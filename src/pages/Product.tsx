import { IonCol, IonContent, IonGrid, IonIcon, IonImg, IonInput, IonLabel, IonPage, IonRippleEffect, IonRow, IonTitle } from "@ionic/react";
import React, { useState } from "react";
import "./css/Product.css"
import { closeCircle } from "ionicons/icons";

const Product:React.FC=()=>{
    const [imgPlaceholder] = useState("https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=")
    const [imgs , setImgs] = useState<any[]>([])

    const uploaded=(event:any)=>{
        console.log("uploaded ",event)
        if(imgs.length < 10){
            const selectedFile = event.target.files[0];
            const reader = new FileReader(); 
            reader.onloadend = () => {
                console.log("Base64:", reader.result); // ใช้เก็บ, preview, ส่งผ่าน API ก็ได้
                setImgs((e) => [...e, reader.result ])
            };
            
            reader.readAsDataURL(selectedFile);
        }else{
            alert("สามารถเพิ่มได้ไม่เกิน 10 รูป.")
        }
    }
    return(<IonPage>
        <IonContent>
            <div className='content-padding ion-padding' >
              <IonTitle>เพิ่มสินค้า</IonTitle>
                <IonGrid>
                    <IonRow>
                        <IonCol size="3" style={{position:"relative"}} >
                          <IonImg  src={imgs.length == 0 ?imgPlaceholder:imgs[imgs.length-1]} style={{width:"100%" }} />
                          {/* <div className="set-center ion-padding ion-activatable ripple-parent" style={{position:"absolute",width:"98%",bottom:"5px" }} >
                            <IonLabel>Click to upload</IonLabel>
                            <IonRippleEffect></IonRippleEffect>
                          </div> */}
                        <label htmlFor="file-upload" className="custom-file-upload">
                          <IonLabel>Click to upload</IonLabel>
                        </label>
                        <input id="file-upload" type="file" onChange={uploaded} />
                        </IonCol>
                        <IonCol size="6" >
                            {/* {imgs} */}
                            {imgs.slice(0,imgs.length-1).reverse().map((img,index)=> <div style={{position:"relative",float:"left",margin :"2.5px"}} key={index} > 
                               <img  src={img} style={{height:"10rem"}} />
                               <IonIcon icon={closeCircle} color="danger" style={{position:"absolute",zIndex:2,marginRight:"-1rem"}} />
                             </div>
                            )}
                        </IonCol>
                        <IonCol>

                        </IonCol>
                    </IonRow>
                            <IonRow>
                                <IonCol size="12" >
                                    <div className="input-cash"  >
                                        <IonInput mode="ios" placeholder="name" style={{width:"100%"}} />
                                    </div>
                                    <div className="input-cash"   >
                                        <IonInput mode="ios" placeholder="name" style={{width:"100%"}} />
                                    </div> 
                                    <div className="input-cash"  >
                                        <IonInput mode="ios" placeholder="name" style={{width:"100%"}} />
                                    </div>
                                    <div className="input-cash"   >
                                        <IonInput mode="ios" placeholder="name" style={{width:"100%"}} />
                                    </div>
                                </IonCol>
                            </IonRow>
                   
                </IonGrid>
            </div>
        </IonContent>
    </IonPage>
    )
}
export default Product;