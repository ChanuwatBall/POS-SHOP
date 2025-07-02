import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react"
import { useSelector } from "react-redux";
import { getCatagories } from "../store/productSlice";
import "./css/Categories.css"
import { addCircle } from "ionicons/icons";


const Categories:React.FC=()=>{ 
    const categories = useSelector(getCatagories)
    
    return(
    <IonPage>
        <IonContent>
            <IonHeader mode='md' className='ion-no-border ion-hide-sm-up' >
                     
            </IonHeader>
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
                                
                                     <IonButton mode="ios" fill="clear" >  <IonIcon icon={addCircle} />  </IonButton>
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
                </IonContent>

           
    </IonPage>
    )
}
export default Categories;