import Service from '../../general/cardService';
import "../navPageButtons.css"
import next from "../../general/icons/next.png"
import leftArrow from "../../general/icons/left.png"
import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
//import { dogWalkingService } from '../../../Services/httpRequests';

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
    title: string;
    description: string;
    image: string;
    price: number;
  }
  interface props{
    service:string;
  }

export default function ServicePage(props:props) {

  const [responseData, setResponseData] = useState<service[]>([
{
    title: "ola",
    description: "coiso",
    image: "https://4.bp.blogspot.com/-5jECXwTg6iA/XLdmkDDx3OI/AAAAAAAAEfc/hUsg50qNBewqJu_8lhRO3cT5ldlDuxcQgCLcBGAs/s1600/vet-help-dog.jpg",
    price: 2
},
{
    title: "ola",
    description: "coiso",
    image: "https://4.bp.blogspot.com/-5jECXwTg6iA/XLdmkDDx3OI/AAAAAAAAEfc/hUsg50qNBewqJu_8lhRO3cT5ldlDuxcQgCLcBGAs/s1600/vet-help-dog.jpg",
    price: 2
},
{
    title: "ola",
    description: "coiso",
    image: "https://4.bp.blogspot.com/-5jECXwTg6iA/XLdmkDDx3OI/AAAAAAAAEfc/hUsg50qNBewqJu_8lhRO3cT5ldlDuxcQgCLcBGAs/s1600/vet-help-dog.jpg",
    price: 2
},
{
    title: "ola",
    description: "coiso",
    image: "https://4.bp.blogspot.com/-5jECXwTg6iA/XLdmkDDx3OI/AAAAAAAAEfc/hUsg50qNBewqJu_8lhRO3cT5ldlDuxcQgCLcBGAs/s1600/vet-help-dog.jpg",
    price: 2
},

  ]);
  const [pageNumber, setPageNumber] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
      /*
    dogWalkingService(`?by=heroDate&order=heroDate&dir=DESC&number=0&size=20`).then(
      (response) => {
        setResponseData(response.data.content);
      },
      (error) => {
      }
    );
    */
  }, [pageNumber]);
  const nextPageHandler = () => {
    setPageNumber((prevState) => {
      if (responseData.length === 20) {
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
      <span className="pageNumber">{pageNumber + 1}</span>
      <img
        src={next}
        alt="página-seguinte"
        onClick={nextPageHandler}
        className="navArrow"
      />
    </div>
  );
  const redirect = (id: string) => {
    navigate(`/dogWalking/${id}`);
  };

    return (
    <ThemeProvider theme={theme}>
        <div style = {{display: "flex", flexDirection: 'column', backgroundColor: "#343F4B", maxWidth: "100%", minHeight:"100vh", height:"auto" }}>
            <div>
                <h1 style = {{textAlign: "center", color: "#ffff",fontSize: "48px", marginTop: "2%", fontFamily: "'Poppins', sans-serif"}}>{props.service}</h1>
                <Button size = "large" variant="outlined" startIcon={<KeyboardReturnIcon />} style = {{marginLeft:'10%'}} color= "info">
                    <h1 style = {{fontSize:'15px'}}>Go Back</h1>
                </Button>
            </div>
            <div>
                <div style = {{ margin: "auto", display: "flex", justifyContent: 'space-evenly', flexWrap: 'wrap', width: '90%'}}>
                {responseData &&
                responseData.length > 0 &&
                responseData.map((res, index) => (
                    <div key = {index} onClick= {()=> redirect("123")}>
                    <Service title={res.title} description= {res.description} image= {res.image} price= {res.price}/>
                    </div>
                    ))}
                </div>
            </div>
            {navPageButtons}
        </div>

    </ThemeProvider>

    );
}