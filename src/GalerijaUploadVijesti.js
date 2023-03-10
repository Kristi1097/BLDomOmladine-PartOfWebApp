import React, { useState } from "react";
import ReactDOM from "react-dom";
import RUG from "react-upload-gallery";
import "react-upload-gallery/dist/style.css";
import useFetch from "./useFetch";
import { initialState } from "./data";
import { useParams } from "react-router-dom";
export var nazivi;

export default function GalerijaUploadVijesti({ vijest }) {

  // const {errord,isPendingd,data: slike}=useFetch('http://localhost:8000/domSlike/slikeVijesti/{naziv}');
  /* let slike = []
   function addImg(img) {
 slike.push(img)
   };
   /*  let images = []
   
     for(var i in slike){
       var raspored = slike[i].dogadjajRasporedVeb;
       for(var j in raspored) {
         const imObject = {
          slike[j].idSlika:j,
          slike[j].naziv,
          size:slike.nazivSala,
           source: raspored[j].zauzetaOd,
         }
         console.log({imObject});
          images.push(imObject)
       }     
           }*//*http://localhost:8080/domSlike/slikeVijesti*/
  const { idVijest } = useParams();
  let images = [];
  const [imageName,setImageName]=useState();
function setImageNameF(naziv){
  images.push(naziv);
}
function copyImageNames(){
for(var i in images)
for(var i in vijest){
  vijest.slikaVeb[i].idSlika=i;
    vijest.slikaVeb[i].naziv=images[i];}
}
  return (
    <>
      <RUG action={global.urls.links.dodavanjeSlikeVijesti}
        source={response => {
          setImageName(response.naziv);
          return response.naziv;}}
        //setImageName={response.naziv}
        
        //initialState={imagesData}
        />
        {vijest && setImageNameF(imageName)}
        {images &&  copyImageNames()}
    </>
  );
}
const style = {
  title: {
    textAlign: "center",
    fontFamily: "Helvetica",
    marginTop: 50
  }
};

