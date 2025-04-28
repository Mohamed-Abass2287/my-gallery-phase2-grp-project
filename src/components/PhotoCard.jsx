import React from "react";

const PhotoCard = ({ photo }) => {
  return (
    <div className="photo-card">
      <img src={photo.file_path} alt={photo.description} />
      <p>{photo.description}</p>
    </div>
    
  );
 
};

export default PhotoCard;


