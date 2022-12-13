import "./menu-item.scss";

import { useNavigate } from 'react-router-dom';

export const MenuItem = ({title, imageUrl, size, linkUrl}) => {

  const navigateTo = useNavigate();

  return (
    <div 
      className={`${size} menu-item`} 
      onClick={() => navigateTo(linkUrl)}
    >
      <div 
        className="background-image" 
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
      </div>
      <div className="content">
        <h1 className="title">{ title.toUpperCase() }</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};