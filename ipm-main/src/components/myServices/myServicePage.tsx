import Button from "@mui/material/Button";
import HistoryItem from "./myServiceItem";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { myServiceRequest } from "../../Services/httpRequests";
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
  cost: number;
  id: string;
  location: string;
}

export default function MyServicePage() {
  const [responseData, setResponseData] = useState<service[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  useEffect(() => {
    myServiceRequest(`number=` + pageNumber + `&size=5`).then(
      (response) => {
        setResponseData(response.data.content);
      },
      (error) => {
        console.log(error)
      }
    );
  }, []);

  const nextPageHandler = () => {
    setPageNumber((prevState) => {
      if (responseData.length === 3) {
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

  useEffect(() => {
    console.log(responseData)
  }, [responseData])

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


  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", flexDirection: 'column', backgroundColor: "#343F4B", maxWidth: "100%", minHeight: "100vh", height: "auto", fontFamily: "'Poppins', sans-serif", }}>
        <h1 style={{ textAlign: "center", color: "white", fontSize: "46px" }}>My Services</h1>

        <div style={{ marginLeft: "5%", display: "flex", width: "90%" }}>

          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="outlined" color="secondary" startIcon={<KeyboardReturnIcon />}>
              <h1 style={{ fontSize: '10px' }}>Go Back</h1>
            </Button>
          </Link>

          <Link to="/createservice" style={{ textDecoration: "none", marginLeft: "auto" }}>
            <Button variant="contained" color="info" startIcon={<AddIcon />}>
              <h1 style={{ fontWeight: "bold", fontSize: '10px' }}>Create New Service</h1>
            </Button>
          </Link>

        </div>

        <div style={{ width: "90%", marginTop: "2vh", marginLeft: "5%"}}>

          {responseData.length > 0 &&
            responseData.map((res, index) => (
              <div key={index}>
                <HistoryItem itemImage={res.image} itemName={res.name} itemLocation={res.location} itemPrice={res.cost} itemDescription={res.description} />
              </div>))}
          {navPageButtons}

        </div>
      </div>
    </ThemeProvider>
  );


}