import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { bookmark, home, settings } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/global.scss";

import HomePage from "./pages/home/HomePage";
import FavorisPage from "./pages/favoris/FavorisPage";
import ParametrePage from "./pages/parametre/ParametrePage";
import SearchJobPage from "./pages/search/SearchPage";
import JobPage from "./pages/job/JobPage";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/jobs">
            <HomePage />
          </Route>
          <Route exact component={SearchJobPage} path={"/jobs/search"} />
          <Route exact component={JobPage} path={"/jobs/details/:jobId"} />
          <Route exact path="/favoris">
            <FavorisPage />
          </Route>
          <Route path="/parametre">
            <ParametrePage />
          </Route>
          <Route exact path="/">
            <Redirect to="/jobs" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="jobs" href="/jobs">
            <IonIcon icon={home} />
            <IonLabel>Accueil</IonLabel>
          </IonTabButton>
          <IonTabButton tab="favoris" href="/favoris">
            <IonIcon icon={bookmark} />
            <IonLabel>Favoris</IonLabel>
          </IonTabButton>
          <IonTabButton tab="parametre" href="/parametre">
            <IonIcon icon={settings} />
            <IonLabel>Paramètre</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
