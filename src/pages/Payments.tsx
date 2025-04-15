import { IonButton, IonCol, IonContent, IonInput, IonLabel, IonPage, IonRow, IonText } from "@ionic/react"
import "./css/Payment.css"
import { useHistory } from "react-router"
import { useEffect, useRef, useState } from "react"
import ReceiptProducts from "../components/ReceiptProducts"
import ButtonGroup from "../components/ButtonGroup"
import CalculatorKeypad from "../components/CalculatorKeypad"
import { useDispatch, useSelector } from "react-redux"
import { getProductReceipt, setProductReceipt, setReceiptTotal } from "../store/recieptsSlice"

const Payment:React.FC=()=>{
    const productsSelected:any[] = useSelector(getProductReceipt)
    const dispatch = useDispatch() 
    const history:any = useHistory()
    const [sum,setSum] = useState("0.00")
    const [cash ,setCash] = useState<any>(0)
    const [change ,setChange] = useState<any>(0)

    
    const cashInputRef = useRef<any>(null);
    useEffect(()=>{   
        if(productsSelected){
            let echProductPrice = 0
            productsSelected.map((e)=>{
              echProductPrice += e?.unitPrice * e?.count
            })
            setSum((echProductPrice).toFixed(2))
        }
        focusCash()
    },[productsSelected])
    const focusCash=()=>{
      const inputEl = cashInputRef.current;
      setTimeout(() => inputEl.setFocus(), 100);
      setTimeout(async () => {
        const nativeInput = await inputEl.getInputElement();
        const length = nativeInput.value?.length || 0;
        nativeInput.setSelectionRange(length, length); // Move cursor to end
      }, 50); 
    }

    const countCash=(receiptcash:any)=>{
      let lastcash = Number(cash) + Number(receiptcash);
      console.log(`countCash lastcash ${lastcash}` )
      let newcash = lastcash
      setCash(newcash)
      const c = lastcash - Number(sum)
      console.log(`countCash ${lastcash} - ${sum} = ${lastcash - Number(sum)}`)
      setChange(c.toFixed(2))
      focusCash()
    }

    const backspceCount=(left:any)=>{
      let lastcash = Number(left);
      console.log(`countCash lastcash ${lastcash}` )
      let newcash = lastcash
      setCash(newcash)
      const c = lastcash - Number(sum)
      console.log(`countCash ${lastcash} - ${sum} = ${lastcash - Number(sum)}`)
      setChange(c.toFixed(2))
      if(lastcash === 0){
        setChange("0.00")
      } 
      focusCash()
    }

    const clearInput=()=>{
      setCash("0")
      setChange("0.0")
    }

    const paynow=()=>{
      dispatch(setProductReceipt([]))
      dispatch(setReceiptTotal( "0.00"))
      history.replace("/")
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
                    <IonInput  ref={cashInputRef}
                      mode="ios" 
                      placeholder="0.0" 
                      value={cash} autoFocus
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
                  input={cash.toString()} 
                  setInput={(e:any)=>{ countCash(e);focusCash()}} 
                  backspce={(e:any)=>{backspceCount(e);console.log("e" , e)}}
                  clearInput={()=>{clearInput()}}
                  />
                  <IonRow  style={{ width:"20rem"}}>
                    <IonCol size="6">  
                      <IonButton mode="ios" expand="block"  color={"secondary"} >
                       <IonLabel color={"dark"}> ส่วนลด </IonLabel>
                      </IonButton> 
                    </IonCol>
                    <IonCol size="6"> 
                      <IonButton mode="ios"  expand="block"  color={"primary"}onClick={()=>paynow()}  >
                       <IonLabel> ชำระเงิน </IonLabel>
                      </IonButton> 
                    </IonCol>
                  </IonRow>
                </div>
              </IonCol>
            </IonRow>
          </div>
        </IonContent>
    </IonPage>
    )
}
export default Payment;