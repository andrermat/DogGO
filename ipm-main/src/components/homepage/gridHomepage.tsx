
import Icon from '../general/appIcon';
import PetStore from '../PetStore/petStoreIcon';
import SocialMedia from '../general/socialMediaIcon';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import { sessionSelector } from '../../store/store';
import { useSelector } from 'react-redux';


export default function GridHomepage() {
    let session = useSelector(sessionSelector);


    return (
        <div>
            <div style={{ display: "flex", flexDirection: 'column', backgroundColor: "#343F4B", maxWidth: "100%", minHeight: "100vh", height: "auto" }}>
                <div style={{ marginTop: "3%", display: "flex", justifyContent: 'space-evenly', marginLeft: '10%', marginRight: '10%' }}>
                    <Link to="/dogWalking" style={{ textDecoration: "none" }}>
                        <Icon icon="dogWalking" description="Dog Walking" link="/dogWalking" />
                    </Link>
                    <Link to="/veterinary" style={{ textDecoration: "none" }}>
                        <Icon icon="veterinary" description="Veterinary Companion" link="/veterinary" />
                    </Link>
                    <Link to="/dogWalking" style={{ textDecoration: "none" }}>
                        <Icon icon="petSitting" description="Pet Sitting" link="/petSitting" />
                    </Link>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-evenly', marginTop: "2%", marginBottom: '2%', marginLeft: '10%', marginRight: '10%' }}>

                    <Link to="/bathingandtrimming" style={{ textDecoration: "none" }}>
                        <Icon icon="bathing" description="Bathing and Trimming" link="/bathingandtrimming" />
                    </Link>
                    <Link to="/meetandgreet" style={{ textDecoration: "none" }}>
                        <Icon icon="meeting" description="Meet&Greet Spots" link="/meetandgreet" />
                    </Link>

                    <Link to="/training" style={{ textDecoration: "none" }}>
                        <Icon icon="training" description="Training Classes" link="/training" />
                    </Link>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-evenly' }} >
                    <div>
                        <Link to="petstore" style={{ textDecoration: "none" }}>
                            <PetStore description="Pet Store" />
                        </Link>
                    </div>
                </div>
                <div>
                    <span style={{ position: "relative", right: "-90%", bottom: "20%" }}>
                        <SocialMedia app="facebook" link="https://www.facebook.com" />
                        <SocialMedia app="instagram" link="https://www.instagram.com" />
                        <SocialMedia app="linkedin" link="https://www.linkedin.com" />
                    </span>
                    {session.isLogged &&
                        <span>
                            <Alert style={{ height: "1.5cm", width: "auto", position: "fixed", bottom: "5px", left:"5px"}} severity="error" color="info">
                                <Link to="/createservice" style={{textDecoration:"none"}}>
                                    <p style={{ textDecoration: "none", color: "#343F4B", fontSize: "22px" }}><strong><u> Click here</u></strong> to offer a service.</p>
                                </Link>
                            </Alert>
                        </span>
                    }
                </div>
            </div>
        </div>

    );
}