import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonMenuButton, IonModal, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react"
import { useSelector } from "react-redux";
import { getCatagories } from "../store/productSlice";
import "./css/Categories.css"
import { addCircle, closeCircle } from "ionicons/icons";
import { useState } from "react";


const Categories:React.FC=()=>{ 
    const categories = useSelector(getCatagories)
    const [modal,setModal] = useState(false)
    const [catName,setCatName] = useState("")
    
    return(
    <IonPage> 
            <IonContent  >
                <div className='content-background ion-padding ' >
                   <div  className="table" > 
                   <div className="set-center flex-row flex-start" > 
                        <IonMenuButton></IonMenuButton>
                        <IonTitle>
                            หมวดหมู่สินค้า
                        </IonTitle>
                    </div>
                    <IonRow>
                        <IonCol size="12" className="set-center flex-row flex-start" >
                            <IonSearchbar   mode="ios" ></IonSearchbar> 
                             <IonButton mode="ios" fill="clear" onClick={()=>{setModal(true)}} > 
                                <IonIcon icon={addCircle} />  
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    <br/><br/>
                        <table>
                            <thead>
                        <tr>
                            <th id="order" >Order</th> 
                            {Object.keys(categories[0]).map(e=>
                                <th id={e} >{e}</th>
                            )}
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>

                            </thead>
                            <tbody>
                        {
                            categories.map((cat,index)=> 
                            <tr className={`row ${index%2==0? "odd":"even"}`} >
                                <td className="ion-text-center">{index+1}</td>
                                <td>{cat.id}</td>
                                <td className="ion-text-left">{cat.name}</td>
                                <td> <button>Edit</button></td>
                                <td> <button> Delete</button></td>
                            </tr>
                            )
                        }
                            </tbody>
                        </table>
                </div> 
                </div>
            </IonContent> 
            <IonModal isOpen={modal} mode="ios" onIonModalDidDismiss={()=>{setModal(false)}} >
                <IonToolbar mode="md" >   
                    <IonTitle slot="start" >
                       &nbsp; เพิ่มหมวดหมู่สินค้า
                    </IonTitle>
                    <IonButton slot="end" color={"danger"} mode="ios" fill="clear" size="small" >
                        <IonIcon icon={closeCircle} />
                    </IonButton>
                </IonToolbar>
                <IonContent className="ion-padding" >
                        
                        <IonGrid>
                            <IonRow>
                                <IonCol size="12" >
                                    <div className="input" style={{width:"100%"}} >
                                        <IonInput 
                                          value={catName} mode="ios"
                                          onIonChange={(e)=>{setCatName(e.detail.value!)}}
                                        > 
                                        </IonInput>
                                    </div>
                                </IonCol>
                                <IonCol size="12" >
                                    <IonButton expand="block" > Add New Categortes</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                </IonContent>
            </IonModal>
    </IonPage>
    )
}
export default Categories;