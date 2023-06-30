import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {data} from 'azure-maps-control'
import "../navPageButtons.css"
import next from "../../general/icons/next.png"
import leftArrow from "../../general/icons/left.png"

import ContactsIcon from '@mui/icons-material/Contacts';

import Review from '../../general/Review';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { sessionSelector } from '../../../store/store';
import { getReviews, getService } from '../../../Services/httpRequests';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Map, { Point } from '../../Map/Map';

const theme = createTheme({
    palette: {
        info: {
            // light: will be calculated from palette.primary.main,
            main: '#FFFFFF',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        }
    }
});

interface Review {
    ownerName: string;
    text: string;
    rating: number;
}


interface service {
    title: string;
    description: string;
    name: string;
    image: string;
    cost: number;
    type: string;
    location: string;
    id: string;
    lat: number;
    lon: number;
    ownerEmail: string;
    ownerPhoneNumber: string;
    ownerName: string;
}

export default function DogWalkingService() {
    const [responseData, setResponseData] = useState<service>();
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation()
    const session = useSelector(sessionSelector)
    const random = new data.Position(0,0)
    const [point, setPoint] = useState<Point>({point:random});
    const pointsCallback = useCallback(
        (points: Point) => {
          setPoint(points);
        },
        [point]
      );
    useEffect(() => {

        if (params.id) {
            getService(params.id).then(
                (response) => {
                    setResponseData(response.data);
                    setPoint({point: new data.Position(response.data.lon, response.data.lat)})
                },
                (error) => {
                    console.log(error)
                }
            );
        }
    }, []);
    const [showReviews, setShowReviews] = useState<boolean>(false);
    const showHandler = () =>{
        setShowReviews(true)
    }
    

    const [responseDataReviews, setResponseDataReviews] = useState<Review[]>([]); //assumindo que nao ha data de pedidos ativos no inicio - antes de fetch -fazer set no fetch se return > 0
    const [pageNumber, setPageNumber] = useState(0);
    useEffect(() => {
        if(showReviews)
        getReviews(`?serviceId=` + params.id + `&number=` + pageNumber + `&size=3`).then(
            (response) => {
                setResponseDataReviews(response.data.content);
            },
            (error) => {
                console.log(error)
            }
        );
    }, [pageNumber, showReviews]);

    const nextPageHandler = () => {
        setPageNumber((prevState) => {
          if (responseDataReviews.length === 3) {
            return prevState + 1;
          } else {
            return prevState;
          }
        });
      };
    
      const prevPageHandler = () => {
        setPageNumber((prevState) => {
          if (prevState > 0) {
            return prevState - 1;
          } else {
            return prevState;
          }
        });
      };
    
      const navPageButtons = (
        <div className="navPage">
          <img
            src={leftArrow}
            alt="página-anterior"
            onClick={prevPageHandler}
            className="navArrow"
          />
          <span className="pageNumber2">{pageNumber + 1}</span>
          <img
            src={next}
            alt="página-seguinte"
            onClick={nextPageHandler}
            className="navArrow"
          />
        </div>
      );
    

    const goBack = () =>{
        let url = location.pathname.split("/")
        navigate('/' + url[1])
    }
    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: "flex", flexDirection: 'column', backgroundColor: "#343F4B", maxWidth: "100%", minHeight: "100vh", height: "auto", fontFamily: "'Poppins', sans-serif", }}>
                <div>
                    <h1 style={{ textAlign: "center", color: "white" }}>{responseData?.type}</h1>
                    <Button onClick = {goBack}color="info" variant="outlined" startIcon={<KeyboardReturnIcon />} style={{ marginLeft: '5%' }}>
                        <h1 style={{ fontSize: '10px' }}>Go Back</h1>
                    </Button>
                </div>
                <div style={{ display: "flex", background: "white", border: "solid 3px white", height: "auto", width: "90vw", marginLeft: "5%", marginBottom: "5%", borderRadius: "7px", marginTop: "2%" }}>
                    <div style={{ marginLeft: "1vw" }}>
                        <div style={{ display: "flex" }}>
                            <img style={{ marginTop: "1vh", height: "25vh", width: "20vw", borderRadius: "7px" }} src={responseData?.image} />
                            <div>
                                <h1 style={{ fontSize: "5vh", width: "40vw", marginLeft: "1vw" }}>{responseData?.name}</h1>
                                <h3 style={{ fontSize: "3vh", marginLeft: "1vw" }}> <u>Preço: {responseData?.cost}€/Hora</u> </h3>
                            </div>
                        </div>
                        <div style={{ width: "62vw" }}>
                       
                            <div style={{ display: "flex" }}>
                                <h3>Location: {responseData?.location} </h3>
                            </div>
                            <h2>Description:</h2>
                            <p style={{ fontSize: "2vh" }}>
                                {responseData?.description}
                            </p>
                        </div>
                        <br />
                        {!showReviews && 
                        <Button onClick={showHandler}>Show Reviews</Button>}
                        {showReviews &&
                        <div>
                        <h3>Reviews:</h3>
                            {responseDataReviews.length > 0 &&
                                responseDataReviews.map((res, index) => (
                                    <div key={index}>
                                          <Review reviewRating={res.rating} reviewText={res.text} />
                                    </div>))}
                                    {navPageButtons}
                        </div>
                        }
                        
                    </div>

                    <div style={{ marginLeft: "1vw", marginRight: "1%" }}>
                        <div style={{ marginTop: "1vh", border: "2px black solid", borderRadius: "7px", height: "auto", width: "23vw" }}>
                            <div style={{ marginLeft: "1vw" }}>
                                <h1 style={{ fontSize: "3vh" }}> <ContactsIcon /> Contacts:</h1>
                                <h3>E-mail: {responseData?.ownerEmail}</h3>
                                <h3>Personal Number: {responseData?.ownerPhoneNumber}</h3>
                            </div>
                        </div>
                        <div style={{ textAlign: "center", marginTop: "2vh", border: "2px black solid", borderRadius: "7px", height: "25vh", width: "23vw" }}>
                            <Map points={point} callback={pointsCallback} viewOnly zoom={4}/>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

/**/