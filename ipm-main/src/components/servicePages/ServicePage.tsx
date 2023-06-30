import Service from '../general/cardService';
import "./navPageButtons.css"
import next from "../general/icons/next.png"
import leftArrow from "../general/icons/left.png"
import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { servicePage } from '../../Services/httpRequests';
import { useSelector } from 'react-redux';
import { root, sessionSelector } from '../../store/store';

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
interface service {
  name: string;
  description: string;
  image: string;
  cost: number;
  id: string;
}
interface props {
  service: string;
  serviceType: string;
}

export default function ServicePage(props: props) {


  const [responseData, setResponseData] = useState<service[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [locationR, setLocation] = useState("");
  const navigate = useNavigate();

  const location = useLocation()

  const session = useSelector(sessionSelector)

  //DogWalking/VeterinaryCompanionServices/
  //PetSittingServices/Bathing/MeetingandGreetingSpots/DogTrainingServices
  const searchLocationHandler = (e: any) => {
    setLocation(e.target.value)
  }

  useEffect(() => {
    servicePage(`?type=` + props.serviceType + `&location=` + locationR).then(
      (response) => {
        setResponseData(response.data);
      },
      (error) => {
        console.log(error)
      }
    );
  }, [locationR]);

  const nextPageHandler = () => {
    setPageNumber((prevState) => {
      return Math.min(prevState + 1, Math.ceil(responseData.length / 6))
    });
  };

  const prevPageHandler = () => {
    setPageNumber((prevState) => {
      return prevState > 0 ? prevState - 1 : prevState
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
      <span className="pageNumber">{pageNumber}</span>
      <img
        src={next}
        alt="página-seguinte"
        onClick={nextPageHandler}
        className="navArrow"
      />
    </div>
  );
  const redirect = (id: string) => {
    navigate(location.pathname + `/${id}`);
  };
  const goBack = () => {
    navigate(`/`);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", flexDirection: 'column', backgroundColor: "#343F4B", maxWidth: "100%", minHeight: "100vh", height: "auto" }}>
        <div>
          <h1 style={{ textAlign: "center", color: "#ffff", fontSize: "48px", marginTop: "2%", fontFamily: "'Poppins', sans-serif" }}>{props.service}</h1>

          <div style={{ display: "flex" }}>

            <Button onClick={goBack} size="large" variant="outlined" startIcon={<KeyboardReturnIcon />} style={{ marginLeft: '10%' }} color="info">
              <h1 style={{ fontSize: '15px' }}>Go Back</h1>
            </Button>

            <div style={{textAlign:"center", width: "100%", marginRight:"15%" }}>
              <b style={{color: "white", fontSize: '25px' }}>
                Location:
              </b>
              <input onChange={searchLocationHandler} style={{ marginLeft: "10px", width: "7cm" }} type="search" />
            </div>
          </div>

        </div>

        <div>
          <div style={{ display: "flex", marginLeft: "15%", flexWrap: 'wrap', width: '80%' }}>
            {responseData.length > 0 &&
              responseData.map((res, index) => (
                <>
                  {index >= (pageNumber - 1) * 6 && index < (pageNumber) * 6 && <div key={index} onClick={() => redirect(res.id)}>
                    <Service title={res.name} description={res.description} image={res.image} price={res.cost} />
                  </div>}
                </>
              ))}
          </div>
        </div>

        {navPageButtons}
      </div>

    </ThemeProvider>

  );
}