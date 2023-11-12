import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonFooter,
  IonPage,
  IonRouterOutlet,
  IonToolbar,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css'; DIMATIIN NGERUSAK REACT TO PRINT
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import useAuth from './context/auth';
import { routesAdmin, routesStaff } from './router'
import { Navigation } from './components';
import LoginPage from './pages/Login';
setupIonicReact();

/* RSuite CSS */
import 'rsuite/dist/rsuite.min.css';
const App: React.FC = () => {
  const { isLoggedIn, token, dataUser } = useAuth();
  const UrlGetter = () => {
    const url = window.location.href;
    const lastSlashIndex = url.lastIndexOf('/');
    const lastSegment = url.substring(lastSlashIndex + 1).toLowerCase();
    return lastSegment;
  }

  console.log(isLoggedIn, token, dataUser, UrlGetter());

  if (isLoggedIn && token && UrlGetter() === 'login') {
    window.location.href = "/home";
  }

  const Routing = () => {
    if (parseInt(dataUser?.role_id) === 1) {
      return routesAdmin.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))
    } else {
      return routesStaff.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))
    }
  }
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <IonPage>
            {
              !isLoggedIn || token === null ? (
                <>
                  <Route path={'/login'} exact>
                    <LoginPage />
                  </Route>
                  <Redirect to="/login" />
                </>
              ) : (
                <>
                  <Routing />
                  <Redirect to="/home" />
                </>
              )
            }
            {
              isLoggedIn && token !== null ? (
                <IonFooter translucent={true}>
                  <IonToolbar>
                    <Navigation />
                  </IonToolbar>
                </IonFooter>
              ) : null
            }
          </IonPage>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
