import { IonContent, IonHeader, IonPage } from "@ionic/react"
import { useSelector } from "react-redux";
import { getCatagories } from "../store/productSlice";


const Categories:React.FC=()=>{ 
    const categories = useSelector(getCatagories)
    
    return(
    <IonPage>
        <IonContent>
            <IonHeader mode='md' className='ion-no-border ion-hide-sm-up' >
                     
            </IonHeader>
                    <IonContent  >
                        <div className='content-background' >
                        <table>
                            <thead>
                                <tr>
                                    {Object.keys(categories[0]).map(e=>
                                        <th>{e}</th>
                                    )}
                                </tr>
                            </thead>
                        </table>
                        </div>
                    </IonContent>
                </IonContent>

           
    </IonPage>
    )
}
export default Categories;