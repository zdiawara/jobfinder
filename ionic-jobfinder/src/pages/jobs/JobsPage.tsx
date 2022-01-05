import { IonContent, IonIcon, IonPage, IonSearchbar } from "@ionic/react";
import {
  fastFood,
  searchOutline,
  bookmarkOutline,
  location,
  locationOutline,
} from "ionicons/icons";
import { FC, useEffect, useRef } from "react";

import "./JobsPage.scss";

import image from "../../assets/images/utilisateur.png";
import jobicon2 from "../../assets/images/jobicon2.png";
import jobicon from "../../assets/images/jobIcon.png";
import google from "../../assets/images/google.png";
import facebook from "../../assets/images/facebook.png";
import { useHistory } from "react-router";

const JobsPage: FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="header">
          <div>
            <h1 className="title">JOB</h1>
            <h3 className="subtitle">Finder</h3>
          </div>
          <div className="avatar">
            <img src={image} alt="" />
          </div>
        </div>

        <IonSearchbar className="search" searchIcon={searchOutline} mode="md" />

        <div className="categories">
          <div className="categorie active">
            {/* <img src={economy} alt="" /> */}
            <span className="title">Economie</span>
          </div>
          <div className="categorie">
            {/* <img src={informatique} alt="" /> */}
            <span className="title">Informatique</span>
          </div>
          <div className="categorie">
            {/* <img src={architecture} alt="" /> */}
            <span className="title">Architecture</span>
          </div>
        </div>

        <div className="jobs">
          <Job icon={jobicon} />
          <Job icon={google} />
          <Job icon={facebook} />
          <Job icon={jobicon2} />
        </div>
      </IonContent>
    </IonPage>
  );
};

type JobProps = {
  icon: string;
};

const Job: FC<JobProps> = ({ icon }) => {
  const imgRef = useRef<any>();
  const media = useRef<any>();
  const history = useHistory();

  useEffect(() => {
    const rgb = averageColor(imgRef.current);
    media.current.style.backgroundColor = `rgba(${rgb.r},${rgb.g},${rgb.b}, .1)`;
  }, []);

  return (
    <div onClick={() => history.push("/jobs/1")} className="job">
      <div className="job-header">
        <div className="job-media" ref={media}>
          <img src={icon} ref={imgRef} alt="" />
        </div>
        <div className="title-wrapper">
          <h3 className="job-subtitle">Pigo Design</h3>
          <h1 className="job-title">Developpeur de la mort qui tue</h1>
        </div>
        <IonIcon icon={bookmarkOutline} />
      </div>
      <div className="job-footer">
        <div className="job-location">
          <IonIcon color="dark" icon={locationOutline} />
          Burkina Faso
        </div>
        <div className="job-salaire--wrapper">
          <span className="job-salaire">€12K</span>
          <span>/mo</span>
        </div>
      </div>
    </div>
  );
};
//@ts-ignore
function averageColor(imageElement) {
  // Create the canavs element
  var canvas = document.createElement("canvas"),
    // Get the 2D context of the canvas
    context = canvas.getContext && canvas.getContext("2d"),
    imgData,
    width,
    height,
    length,
    // Define variables for storing
    // the individual red, blue and
    // green colors
    rgb = { r: 0, g: 0, b: 0 },
    // Define variable for the
    // total number of colors
    count = 0;

  // Set the height and width equal
  // to that of the canvas and the image
  height = canvas.height =
    imageElement.naturalHeight ||
    imageElement.offsetHeight ||
    imageElement.height;
  width = canvas.width =
    imageElement.naturalWidth || imageElement.offsetWidth || imageElement.width;

  // Draw the image to the canvas
  context?.drawImage(imageElement, 0, 0);

  // Get the data of the image
  imgData = context?.getImageData(0, 0, width, height);

  // Get the length of image data object
  length = imgData?.data.length || 0;

  if (imgData) {
    for (var i = 0; i < length; i += 4) {
      // Sum all values of red colour
      rgb.r += imgData.data[i];

      // Sum all values of green colour
      rgb.g += imgData.data[i + 1];

      // Sum all values of blue colour
      rgb.b += imgData.data[i + 2];

      // Increment the total number of
      // values of rgb colours
      count++;
    }
  }

  // Find the average of red
  rgb.r = Math.floor(rgb.r / count);

  // Find the average of green
  rgb.g = Math.floor(rgb.g / count);

  // Find the average of blue
  rgb.b = Math.floor(rgb.b / count);

  return rgb;
}

export default JobsPage;
