import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import Map, { Point } from '../Map/Map'
import { data } from 'azure-maps-control'
import { createServiceRequest, getLocation } from '../../Services/httpRequests';
import { useNavigate } from 'react-router';

const theme = createTheme({
  palette: {
    info: {
      // light: will be calculated from palette.primary.main,
      main: '#FFFFFF',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#343F4B',
    }
  }
});

const isName = (value: string) => value.trim().length > 0;
const isPrice = (value: number) => value > 0;
interface inputHandler {
  serviceTitleIsValid: boolean,
  priceIsValid: boolean,
  descriptionIsValid: boolean,
  typeIsValid: boolean,
  pointIsValid:boolean,
  photoIsValid: boolean,
  serviceTitle: string,
  description: string,
  type: string,
  price: number
}


export default function ServicePage() {
  const [error, setError] = useState<String>("");
  const [input, setInput] = useState<inputHandler>({
    serviceTitleIsValid: false,
    priceIsValid: false,
    typeIsValid: true,
    descriptionIsValid: false,
    photoIsValid: false,
    pointIsValid: false,
    serviceTitle: "",
    description: "",
    type: "DogWalking",
    price: 0
  });
  const [photo, setPhoto] = useState<any>()
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const [serviceTitleHasError, setServiceTitleHasError] = useState<boolean>(false);

  const serviceTitleChangeHandler = (event: any) => {
    if (isName(event.target.value)) {
      setInput({ ...input, serviceTitleIsValid: true, serviceTitle: event.target.value  });
      setServiceTitleHasError(false)
    }
    else {
      setInput({ ...input, serviceTitleIsValid: false, serviceTitle: event.target.value  });
      setServiceTitleHasError(true)
    }
  }
  const [priceHasError, setPriceHasError] = useState<boolean>(false);

  const priceChangeHandler = (event: any) => {
    if (isPrice(event.target.value)) {
      setInput({ ...input, priceIsValid: true, price: event.target.value  });
      setPriceHasError(false)
    }
    else {
      setInput({ ...input, priceIsValid: false, price: event.target.value  });
      setPriceHasError(true)
    }
  }
  const [descriptionHasError, setDescriptionHasError] = useState<boolean>(false);

  const descriptionChangeHandler = (event: any) => {
    if (isName(event.target.value)) {
      setInput({ ...input, descriptionIsValid: true, description: event.target.value });
      setDescriptionHasError(false)
    }
    else {
      setInput({ ...input, descriptionIsValid: false, description: event.target.value });
      setDescriptionHasError(true)
    }
  }

  const typeChangeHandler = (event: any) => {
    if (isName(event.target.value)) {
      setInput({ ...input, typeIsValid: true, type: event.target.value.replaceAll(" ", "")});
    }
    else {
      setInput({ ...input, typeIsValid: false, type: event.target.value });
    }
  }
  const [photoState, setPhotoHasError] = useState<boolean>(false);

  const photoChangeHandler = (event: any) => {
    setPhoto(event.target.files[0]);
    if (event.target.files[0] !== null) {
      setInput({ ...input, photoIsValid: true });
      setPhotoHasError(false)
    }
    else {
      setInput({ ...input, photoIsValid: true });
      setPhotoHasError(true)
    }
  }
  useEffect(() => {
    if (input.descriptionIsValid && input.priceIsValid && input.serviceTitleIsValid && input.photoIsValid && input.typeIsValid && input.pointIsValid) {
      setFormIsValid(true);
    }
    else
      setFormIsValid(false);
  }, [input.descriptionIsValid, input.priceIsValid, input.serviceTitleIsValid, input.photoIsValid, input.typeIsValid, input.pointIsValid])
  const random = new data.Position(0, 0)
  const [point, setPoint] = useState<Point>({ point: random });

  useEffect(()=>{
    if(point.point !== random)
    setInput({ ...input, pointIsValid: true });
  }, [point])

  const pointsCallback = useCallback(
    (pointInc: Point) => {
      setPoint(pointInc)
    },
    [],
  );
  const navigate = useNavigate();


  const formSubmissionHandler = (event: any) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    setError("");


    getLocation(point.point[1], point.point[0]).then(
      (response: any) => {
        const formData = new FormData();
        if (photo !== null) {
          formData.append("image", photo as any);
        }
        console.log(input)

        formData.append(
          "service",
          new Blob([JSON.stringify({
            name: input.serviceTitle,
            description: input.description,
            type: input.type,
            cost: input.price,
            lat: point.point[1],
            lon: point.point[0],
            location: response.data.addresses[0].address.countrySecondarySubdivision
          })], { type: "application/json" })
        );
        createServiceRequest(formData).then(
          (response: any) => {
            navigate("/")
          },
          (error: any) => {
            if (error.status === 409) {
              setError("Esta conta já está associada a outra conta juntos");
            } else if (error.status === 403) {
              setError("Esta conta está desativada");
            } else if (error.status === 400) {
              setError("Credênciais inválidas");
            } else if (error.status === 404) {
              setError("Não existe um utilizador registado com este e-mail");
            } else {
              setError("Algo Inesperado aconteceu, tente novamente");
            }
          }
        );
      },
      (error: any) => {

      })


  };
  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", flexDirection: 'column', backgroundColor: "#343F4B", maxWidth: "100%", minHeight: "100vh", height: "auto", fontFamily: "'Poppins', sans-serif", }}>
        <div>
          <h1 style={{ textAlign: "center", color: "#FFFF", fontSize: "48px", marginTop: "2%", }}>Create New Service</h1>
          <Button size="large" variant="outlined" color="info" startIcon={<KeyboardReturnIcon />} style={{ marginLeft: '2%' }}>
            <h1 style={{ fontSize: '15px' }}>Go Back</h1>
          </Button>
        </div>
        <div style={{ marginTop: "4vh", marginLeft: "1vw" }}>
          <div style={{ display: "flex", marginBottom: "2%", }}>
            <b style={{ fontSize: "22pt", color: "white" }}>Service Title:</b>
            <input onChange={serviceTitleChangeHandler} min="1"  style={{ borderRadius: "7px", border: "3px white solid", marginLeft: "1vw", fontSize: "22pt", width: "40vw", height: "1cm" }} type="text" />
          </div>
          <div style={{ marginTop: "2vh", }}>
            <div style={{ display: "flex", marginTop: "2vh", marginBottom: "2%", }}>
              <b style={{ color: "white", fontSize: "22pt", height: "1cm" }}>Price:</b>
              <input onChange={priceChangeHandler} style={{ textAlign: "center", width: "2cm", minWidth: "2cm", borderRadius: "7px", border: "3px white solid", fontSize: "22pt", height: "1cm", marginLeft: "1vw" }} type="number" />
              <b style={{ color: "white", fontSize: "22pt", height: "1cm" }}> (€/Hora)</b>
              <b style={{ fontSize: "22pt", color: "white", marginLeft: "2vw" }}>Type:</b>
              <select onChange={typeChangeHandler} style={{ textAlign: "center", width: "auto", minWidth: "2cm", borderRadius: "7px", border: "3px white solid", fontSize: "22pt", height: "1cm", marginLeft: "1vw" }}>
                <option>Dog Walking</option>
                <option>Veterinary Companion Services</option>
                <option>Pet Sitting Services</option>
                <option>Bathing</option>
                <option>Meeting and Greeting Spots</option>
                <option>Dog Training Services</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: "2vh", marginBottom: "2%", }}>
            <b style={{ fontSize: "22pt", color: "white" }}>Description:</b><br />
            <textarea onChange={descriptionChangeHandler} rows={10} cols={10} style={{ marginTop: "1vh", borderRadius: "7px", border: "3px white solid", fontSize: "22pt", width: "97vw", height: "3cm", }} />
          </div>
        </div>
        <div style={{ marginTop: "2vh", textAlign: "center", marginBottom: "2%" }}>
          <input onChange={photoChangeHandler} style={{ marginRight: "-60%", fontWeight: "bold", border: "1px white solid", borderRadius: "7px", fontSize: "22pt" }} type="file" />
        </div>
        <div style={{height:'450px'}}>
          <Map callback={pointsCallback} points={point} viewOnly={false} zoom= {10}/>
        </div>
        <Button disabled={!formIsValid} color="secondary" onClick={formSubmissionHandler} style={{ fontWeight: "bold", cursor: "pointer", border: "3px white solid", borderRadius: "7px", fontSize: "22pt", height: "44px", width: "25%", marginLeft: "2%", fontFamily: "'Poppins', sans-serif", marginBottom: "2%", }}>
          <span style={{ color: "white" }}>Create Service</span>
        </Button>
      </div>
    </ThemeProvider>
  );
}