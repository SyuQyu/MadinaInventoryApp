import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonFooter,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
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

/* Theme variables */
import './theme/variables.css';
import { useEffect, useState } from 'react';
import useAuth from './context/auth';
import { routes } from './router'
import { Navigation } from './components';
import LoginPage from './pages/Login';
setupIonicReact();
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
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <IonPage>
            <Switch>
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
                    {
                      routes.map((route, index) => (
                        <Route
                          key={index}
                          path={route.path}
                          exact={route.exact}

                        >
                          <route.component />
                        </Route>
                      ))
                    }
                    <Redirect to="/home" />
                  </>
                )
              }
            </Switch>
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
