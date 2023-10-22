import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {ExploreContainer} from '../components';
import '../theme/pages/Tab3.css';

const Tab3: React.FC = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={false}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 3 page" />
      </IonContent>
    </>
  );
};

export default Tab3;
