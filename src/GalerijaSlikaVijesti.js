import React from "react";
import ImageGallery from "react-image-gallery";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import images from "./images";
import { useParams } from "react-router-dom";
//import "react-image-gallery/styles/css/image-gallery.css";
import "./image-gallery.css"

export default function Galerija({vijest}) {
  const { idVijest } = useParams();
  let images = [];
  let imagesData = [{ }];

  function getImageNames() {
    let i = -1;
    images = vijest.slikaVeb.map(() => {
      i++;
      return global.urls.links.vijestiSlikeVijesti + vijest.slikaVeb[i].naziv;
    });
  };

  function getImagesData(images) {
    let j = -1;
    imagesData = images.map(()=>{
      j++;
      return { original :  images[j], thumbnail : images[j]};
    });
  };

  function renderLeftNav(onClick, disabled) {
    return (
      <button
        type="button"
        className="image-gallery-left-nav"
        aria-label="Prev Slide"
        disabled={disabled}
        onClick={onClick}
      >
        <FaArrowLeft/>
      </button>
    );
  }

  function renderRightNav(onClick, disabled) {
    return (
      <button
        type="button"
        className="image-gallery-right-nav"
        aria-label="Next Slide"
        disabled={disabled}
        onClick={onClick}
      >
        <FaArrowRight/>
      </button>
    );
  }

  return (
    <div className="galerijaSlikaVijesti">
         {vijest && getImageNames()}
         {images && getImagesData(images)}
         {imagesData && <ImageGallery
           items={imagesData}
           renderLeftNav={renderLeftNav}
           renderRightNav={renderRightNav}
      />}
    </div>
  );
}
