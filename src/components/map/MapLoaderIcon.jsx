import { DivIcon } from 'leaflet';


export const createLoaderIcon = () => {
  const loaderHTML = `
    <div class="map-loader" style="
      width: 44.8px;
      height: 44.8px;
      position: relative;
      transform: rotate(45deg);
    ">
      <div class="map-loader-base" style="
        position: absolute;
        inset: 0;
        border-radius: 50% 50% 0 50%;
        background: transparent;
        background-image: radial-gradient(circle 11.2px at 50% 50%, transparent 94%, #ff4747);
      "></div>
      <div class="map-loader-pulse" style="
        position: absolute;
        inset: 0;
        border-radius: 50% 50% 0 50%;
        background: transparent;
        background-image: radial-gradient(circle 11.2px at 50% 50%, transparent 94%, #ff4747);
        animation: map-pulse-loader 1s infinite;
        transform: perspective(336px) translateZ(0px);
      "></div>
    </div>
  `;
  
  return new DivIcon({
    className: 'custom-loader-marker',
    html: loaderHTML,
    iconSize: [44.8, 44.8],
    iconAnchor: [22.4, 22.4],
  });
};
