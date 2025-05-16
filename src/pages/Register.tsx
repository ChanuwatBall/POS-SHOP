import { IonButton, IonCard, IonContent, IonFooter, IonIcon, IonInput, IonLabel, IonPage, IonText, useIonAlert } from "@ionic/react"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { chevronBackCircle, chevronForward, chevronForwardCircle } from "ionicons/icons";
import{ Swiper as SwiperType } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { registerShop } from "../actions";
import { useHistory } from "react-router";


const Register:React.FC=()=>{
    const [shopName , setShopName] = useState("")
    const [shopSite , setShopSite] = useState("")
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    const [cpassword , setCPassword] = useState("")
    
    const [email , setEmail] = useState("")
    const [swiperRef , setSwiperRef] = useState<any | SwiperType>(null)
    const [activeIndex , setActiveIndex] = useState(0)
    const history = useHistory();
    const [presentAlert] = useIonAlert();

    useEffect(()=>{

    },[ ])

    const registershop=async()=>{
        if( !shopName  || ! shopSite  || !username  || ! password  || !cpassword ){
            alert("โปรดระบุข้อมูลให้ครบถ้วน !! ")
        }else{
            const body = {  shopName ,shopSite ,username ,password ,email}
            const result = await registerShop(body)
            console.log("result",result)
            presentAlert({
                header: result?.result ? "Regiter Success Fully":"Register Failed!" ,  
                message:result?.description  ,
                buttons: [
                    {
                        text: 'Close',
                        role: 'cancel',
                        handler: () => {
                          console.log('Alert closed');
                        },
                    },
                    {
                        text: 'Goto Login Now',
                        role: 'confirm',
                        handler: () => {
                          console.log('Alert confirmed');
                          history.replace("/login")
                        },
                    }
                ],
              }) 
        }
    }

    return(
        <IonPage>
            <IonContent>
                <div style={{width:"100%",height:"100vh"}}  className="set-center" >
                 
                        <IonCard mode="ios" className="ion-padding"  style={{width:"25rem",height:"22rem"}}>
                            <IonLabel > 
                                <IonText style={{fontSize:"1.7em" , fontWeight:"bold",marginBottom:"1rem"}}>Register Shop</IonText><br/>
                                <sub>&nbsp;&nbsp;&nbsp;&nbsp;Already a member? <IonText color={"primary"} >Login</IonText></sub>
                            </IonLabel><br/><br/> 
                            <Swiper
                                spaceBetween={1} 
                                slidesPerView={1} pagination
                                onSlideChange={(swiper) => {setActiveIndex(swiper?.activeIndex)}}
                                onSwiper={(swiper) => {setSwiperRef(swiper); console.log(swiper)}}
                                style={{  height:"70%"}}
                            >
                                <SwiperSlide>
                                    <div   className="ion-padding-horizontal set-center" style={{width:"100%", height:"100%",position:"relative"}} >
                                        <IonInput
                                            placeholder="Shop Name"
                                            type="text"
                                            className="custom-input"
                                            mode='ios' required
                                            value={shopName} 
                                            onIonChange={(e:any)=>{setShopName(e.detail.value)}}
                                        /> 
                                         <IonInput
                                            placeholder="Shop Site"
                                            type="text" required
                                            className="custom-input"
                                            mode='ios'
                                            value={shopSite} pattern="url"
                                            onIonChange={(e:any)=>{setShopSite(e.detail.value)}}
                                        /> 
                                        <IonInput
                                            placeholder="Email"
                                            type="email" required
                                            className="custom-input"
                                            mode='ios'
                                            value={email}
                                            onIonChange={(e:any)=>{setEmail(e.detail.value)}}
                                        /> 
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div  className="ion-padding-horizontal set-center" style={{width:"100%", height:"100%",position:"relative"}} >
                                        <IonInput
                                            placeholder="Username"
                                            type="text" required
                                            className="custom-input"
                                            mode='ios'
                                            value={username}
                                            onIonChange={(e:any)=>{setUsername(e.detail.value)}}
                                        /> 
                                        <IonInput
                                            placeholder="Password"
                                            type="password" required
                                            className="custom-input"
                                            mode='ios'
                                            value={password}
                                            onIonChange={(e:any)=>{setPassword(e.detail.value)}}
                                        /> 
                                        <IonInput
                                            placeholder="Confirm Password"
                                            type="password"
                                            className="custom-input"
                                            mode='ios'
                                            value={cpassword}
                                            onIonChange={(e:any)=>{setCPassword(e.detail.value)}}
                                        /> 
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                           <IonFooter>   
                                { activeIndex > 0 &&
                                <IonButton 
                                    mode="ios" size="small" fill="clear" 
                                    style={{position:"absolute", left:"0px"}}
                                    onClick={()=>{swiperRef?.slidePrev()}}
                                >
                                 <IonIcon icon={chevronBackCircle} />  &nbsp; <IonText><small>Prev</small></IonText>  
                                </IonButton>
                                }
                                { activeIndex  == 0 && <IonButton 
                                    mode="ios" size="small" fill="clear" 
                                    style={{position:"absolute", right:"0px"}}
                                    onClick={()=>{swiperRef?.slideNext()}}
                                >
                                  <IonText><small>Next</small></IonText>  &nbsp;<IonIcon icon={chevronForwardCircle} />
                                </IonButton>}
                                { activeIndex  == 1 && <IonButton 
                                    mode="ios" size="small"  
                                    style={{position:"absolute", right:"0px"}}
                                    onClick={()=>{ registershop()}}
                                >
                                  <IonText><small>Register</small></IonText> 
                                </IonButton>}

                           </IonFooter>
                        </IonCard>
                 
                </div>
            </IonContent>
        </IonPage>
    )
}
export default Register;