import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Osm from '../Osm-providers';
import { useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import useGeolocation from '../useGeolocation';
import { useNavigate } from 'react-router-dom';
import { useCookies, Cookies } from 'react-cookie';

const markerIcon = new L.Icon({
    iconUrl: require("../../assets/placeholder.png"),
    iconSize: [30, 33],
    iconAnchor: [17, 33],
    popupAnchor: [0, -46]
})

const DisplayMap = () => {
    const [cookies, setCookie] = useCookies(['user']);
    const navigate = useNavigate();
    const [center, setCenter] = useState({ lat: 8.439620, lng: 124.613350 })
    const ZOOM_LEVEL = 16;
    const mapRef = useRef();

    const location = useGeolocation();

    const [details, setDetails] = useState(null);

    const showMyLocation = () => {
        try {
            fetch("https://geolocation-db.com/json/50ad4a90-fd5e-11ec-b463-1717be8c9ff1")
                .then(response => response.json())
                .then(data => setDetails(data));
            if (location.loaded && !location.error) {
                mapRef.current.flyTo(
                    [location.coordinates.lat, location.coordinates.lng],
                    ZOOM_LEVEL,
                    { animate: true })
            } else {
                alert(location.error.message)
            }
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <>
            {
                !details ?
                    <div className='mt-3'>
                        <h6><span className='font-weight-bold'>Name : </span><i>null</i></h6>
                        <h6><span className='font-weight-bold'>Email : </span><i>null</i></h6>
                        <h6><span className='font-weight-bold'>Location : </span><i>null</i></h6>
                    </div>
                    :
                    <div className='mt-3'>
                        <h6><span className='font-weight-bold'>Name : </span>{cookies.user.user.name}</h6>
                        <h6><span className='font-weight-bold'>Email : </span>{cookies.user.user.email}</h6>
                        <h6><span className='font-weight-bold'>Location : </span>{details.city}, {details.state}, {details.city}, {details.country_name}, {details.postal}, {details.country_code}</h6>
                    </div>
            }
            <div>
                <MapContainer
                    center={center}
                    zoom={ZOOM_LEVEL}
                    ref={mapRef}
                >
                    <TileLayer url={Osm.maptiler.url} attribution={Osm.maptiler.attribution} />
                    {location.loaded && !location.error && (
                        <Marker icon={markerIcon} position={[location.coordinates.lat, location.coordinates.lng]}>
                            <Popup>
                                <b>My Location</b>
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>
            <div className='text-center m-4'>
                <div onClick={showMyLocation} className='btn-map-child btn btn-primary font-weight-bold m-1'>SHOW MY LOCATION</div>
                <div onClick={() => navigate(-1)} className='btn-map-child btn btn-danger font-weight-bold m-1'>BACK</div>
            </div>
        </>
    );
}

export default DisplayMap;