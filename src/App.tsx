import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import Menu from './components/Menu';
import Payment from './pages/Payments';
import { Capacitor } from '@capacitor/core';
import Products from './pages/Products';
import Product from './pages/Product';
import Register from './pages/Register';
import { home, settings } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { getLogin } from './store/authSlice';
import { CheckLoginCookie } from './components/CheckCookie';
import MenuSplitContent from './components/MenuSplit';
import PinProducts from './pages/PinProducts';

setupIonicReact();

const App: React.FC = () =>{
  // const [cookies, setCookie, removeCookie] = useCookies(['login']);
  const logincookies = useSelector(getLogin)

  useEffect(()=>{ 
    console.log(" login cookies  ",logincookies)
    if (Capacitor.getPlatform() === 'electron') {
      console.log('Running on Electron');
    }
  },[logincookies])
  return( 
  <IonApp >
    <CheckLoginCookie />
      <IonReactRouter>
        {
          logincookies  ?
        <IonSplitPane contentId="main" when="lg"> {/* Keep menu open on large screens */}
          <IonMenu className='main-side-menu' contentId="main" type="overlay" swipeGesture={false}>
            <MenuSplitContent />
          </IonMenu>

          <IonRouterOutlet  id="main">
            <Route exact path="/login" component={Login} /> 
            <Route exact path="/home" component={Home} /> 
            <Route exact path="/payment" component={Payment} /> 
            <Route exact path="/products" component={Products} /> 
            <Route exact path="/products/add" component={Product} />  
            <Route exact path={"/pin-products"} component={PinProducts} />

            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>:
        <IonRouterOutlet  id="main">
            <Route exact path="/login" component={Login} /> 
            <Route exact path="/home" component={Home} /> 
            <Route exact path="/payment" component={Payment} /> 
            <Route exact path="/products" component={Products} /> 
            <Route exact path="/products/add" component={Product} />  
            <Route exact path={"/pin-products"} component={PinProducts} />

            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
        </IonRouterOutlet>
        }

      </IonReactRouter>
        
    </IonApp>
)};

export default App;
