import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { ExploreContainer } from '../components';
import '../theme/pages/Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonContent fullscreen={false}>
      <ExploreContainer name="Tab 1 page" />
    </IonContent>
  );
};

export default Tab1;
