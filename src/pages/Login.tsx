 // src/pages/Login.tsx
import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonLabel,
  IonImg,
} from '@ionic/react';
import './css/Login.css';
import { useHistory } from 'react-router';
import { useCookies } from 'react-cookie';

const Login: React.FC = () => {
   const [username , setUserName] = useState("test")
   const [password ,setPassword] = useState("testdev11")
   const history = useHistory()
   const [cookies, setCookie, removeCookie] = useCookies(['login']);

   const submit=()=>{
    if(username !== "test" ||  password !== "testdev11" ){ 
      alert("ชื่อผูใช้ หรือรหัสผ่านไม่ถูกต้อง !!")
      
    }else{
      setCookie("login",username+":"+password )
      history.replace("/home") 
    }
   }

   useEffect(()=>{
    if(cookies?.login){
      history.replace("/home")
    }
   },[])

  return (
    <IonPage>
      <IonContent fullscreen className="login-container">
        <div className="login-box">
          <h1>Login</h1>
          <IonInput
            placeholder="Username"
            type="text"
            className="custom-input"
            mode='ios'
            value={username}
            onIonChange={(e:any)=>{setUserName(e.detail.value)}}
          />
          <IonInput
            placeholder="Password"
            type="password"
            className="custom-input"
            mode='ios'
            value={password}
            onIonChange={(e)=>{setPassword(e.detail.value!)}}
          /> <br/>
          <IonButton  onClick={submit} expand="block" mode='ios' className="login-button">
            Log in
          </IonButton>
        </div>
        <div className="image-box">
          <IonImg src="assets/img/casheiar.jpg" alt="Illustration" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
