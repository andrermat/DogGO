import Button from "@mui/material/Button";
import HistoryItem from "./serviceHistoryItem";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { oldServiceRequest } from "../../Services/httpRequests";
import "../servicePages/navPageButtons.css"
import next from "../general/icons/next.png"
import leftArrow from "../general/icons/left.png"

const theme = createTheme({
  palette: {
    info: {
      // light: will be calculated from palette.primary.main,
      main: '#68D0D0',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#FFFFFF',
    },
  }
});
interface service {
  name: string;
  description: string;
  image: string;
  ownerImg: string;
  ownerName: string;
  ownerRating: number;
  cost: number;
  id: string;
  location: string;
}

export default function MyServicePage() {
  const [responseData, setResponseData] = useState<service[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    oldServiceRequest().then(
      (response) => {
        setResponseData(response.data);
        console.log(response.data)
      },
      (error) => {
        console.log(error)
      }
    );
  }, []);

  const nextPageHandler = () => {
    setPageNumber((prevState) => {
      return Math.min(prevState + 1, Math.ceil(responseData.length / 5))
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

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", flexDirection: 'column', backgroundColor: "#343F4B", maxWidth: "100%", minHeight: "100vh", height: "auto", fontFamily: "'Poppins', sans-serif", }}>
        <div style={{ width: "90%", marginLeft: "5%"}}>
          
          <h1 style={{ textAlign: "center", color: "white", fontSize: "46px" }}>Services History</h1>
          
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="outlined" color="secondary" startIcon={<KeyboardReturnIcon />} style={{ marginLeft: '2%' }}>
              <h1 style={{ fontSize: '10px' }}>Go Back</h1>
            </Button>
          </Link>
          
          <Link to="/createservice" style={{ textDecoration: "none", color: "white" }}>
            <h1 style={{ position: "absolute", fontSize: '19px', left: "64%", bottom: "60%", }}>See your previous service activity</h1>
          </Link>
        </div>

        <div style={{ width: "90%", marginTop: "2vh", marginLeft: "5%" }}>
          {responseData.length > 0 &&
            responseData.map((res, index) => (
              <>
                {index >= (pageNumber - 1) * 5 && index < (pageNumber) * 5 && <div key={index} >
                  <HistoryItem itemImage={res.image} itemName={res.name} itemLocation={res.location} itemPrice={res.cost} itemDescription={res.description} userImage={res.ownerImg} userName={res.ownerName} serviceId={res.id} />
                </div>}
              </>
            ))}
          {navPageButtons}
        </div>

      </div>
    </ThemeProvider>
  );
}