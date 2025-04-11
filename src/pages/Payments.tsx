import { IonButton, IonCol, IonContent, IonInput, IonLabel, IonPage, IonRow, IonText } from "@ionic/react"
import "./css/Payment.css"
import { useHistory } from "react-router"
import { useEffect, useState } from "react"
import ReceiptProducts from "../components/ReceiptProducts"
import ButtonGroup from "../components/ButtonGroup"
import CalculatorKeypad from "../components/CalculatorKeypad"

const Payment:React.FC=()=>{
    const [productsSelected,setProductSelected] = useState<any[]>([])
    const history:any = useHistory()
    const [sum,setSum] = useState("0.00")
    const [cash ,setCash] = useState<any>(0)
    const [change ,setChange] = useState<any>(0)

    useEffect(()=>{  
        setProductSelected(history.location.state?.productsSelected)
        if(history.location.state?.productsSelected){
            let echProductPrice = 0
            productsSelected.map((e)=>{
              echProductPrice += e?.unitPrice * e?.count
            })
            setSum((echProductPrice).toFixed(2))
        }
    },[productsSelected])

    const countCash=(receiptcash:any)=>{
      let lastcash = Number(cash) + receiptcash;
      console.log(`countCash lastcash ${lastcash}` )
      let newcash = lastcash.toFixed(2)
      setCash(newcash)
      const c = lastcash - Number(sum)
      console.log(`countCash ${lastcash} - ${sum} = ${lastcash - Number(sum)}`)
      setChange(c.toFixed(2))
    }

    const clearInput=()=>{
      setCash("0.0")
      setChange("0.0")
    }
 
    return(
    <IonPage>
        <IonContent>
        <div className='content-padding' >
            <IonRow  style={{height:"100%"}} >
              <IonCol size='4' > 
                 <ReceiptProducts 
                   productsSelected={productsSelected} 
                   editCount={false}
                 />
              </IonCol>
              <IonCol size='4' >
                <div className="ion-text-center set-center " style={{width:"100%",paddingTop:"1rem" }} >
                    <IonText style={{fontSize:"1.5rem"}}> <strong>ยอดรวมที่ต้องจ่าย</strong></IonText><br/>
                    <IonText  style={{fontSize:"4rem"}} color="primary" className=""> 
                        <strong> {sum} </strong> 
                    </IonText><br/>
                    <ButtonGroup setCash={(cash:any)=>{countCash(cash);}}/> <br/><br/>
                    <IonButton style={{width:"70%"}} mode="ios" color={"secondary"} expand="block" >
                        <IonLabel className="line-seed bold" color={"dark"}   >ติดหนี้</IonLabel>
                    </IonButton> 
                    <IonButton style={{width:"70%"}} mode="ios" color={"secondary"} expand="block" >
                        <IonLabel className="line-seed bold" color={"dark"} >พร้อมเพย์</IonLabel>
                    </IonButton> 
                </div>
              </IonCol>
              <IonCol size='4' >
              <div className="  " style={{width:"100%",paddingTop:"1rem" }} >
                <div className="input-cash" >
                    <IonLabel>เงินสด</IonLabel>
                    <IonInput 
                      mode="ios" 
                      placeholder="0.0" 
                      value={cash}
                      onIonChange={(e:any)=>{ setCash(e.detail.value) }}
                    > 
                    </IonInput>
                 </div>
                 <div className="input-cash" >
                    <IonLabel>เงินทอน</IonLabel>
                    <IonInput 
                      mode="ios" 
                      placeholder="0.0" 
                      value={change} 
                      onIonChange={(e:any)=>{ setChange(e.detail.value) }}
                    > 
                    </IonInput>
                 </div>
                 <CalculatorKeypad 
                  input={Number(cash)} 
                  setInput={(e:any)=>{countCash(Number(e))}} 
                  clearInput={()=>{clearInput()}}
                  />

                </div>
              </IonCol>
            </IonRow>
          </div>
        </IonContent>
    </IonPage>
    )
}
export default Payment;