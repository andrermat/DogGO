import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import FoodItem from './FoodItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../../../Services/httpRequests';
import Slider from '@mui/material/Slider';

import "../../servicePages/navPageButtons.css"
import next from "../../general/icons/next.png"
import leftArrow from "../../general/icons/left.png"
import Cart from '../../Cart/Cart';
import CheckoutPage from '../../Checkout/CheckoutPage';
import { Link } from 'react-router-dom';


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
export interface Product {
  name: string;
  characteristics?: string;
  price: number;
  photoUrl: string;
  description: string
}

export default function FoodStorePage() {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [filter, setFilter] = useState<string>("");
  const handleFilterChange = (event: any) => {
    setFilter(event.target.value);
  };
  const handleMinPrice = (event: any) => {
    setMinPrice(event.target.value);
  };
  const handleMaxPrice = (event: any) => {
    setMaxPrice(event.target.value);
  };

  const [responseData, setResponseData] = useState<Product[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    getProducts(filter, minPrice, maxPrice).then(
      (response) => {
        console.log(response.data)
        setResponseData(response.data);
      },
      (error) => {
        console.log(error)
      }
    );
  }, [filter, minPrice, maxPrice]);

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
  const [cart, setCart] = useState<Product[]>([])

  const [showCart, setShowCart] = useState<boolean>(false)
  const [totalCost, setTotalCost] = useState<number>(0)
  const productCallback = useCallback(
    (itemImage: string, itemDescription: string, itemName: string, itemPrice: number, numberItems: number, itemProps?: string) => {
      setCart([...cart, ({
        name: itemName,
        characteristics: itemProps,
        price: itemPrice,
        photoUrl: itemImage,
        description: itemDescription
      })])
      setTotalCost(totalCost + itemPrice)
    },
    [cart],
  );

  const goBackCallback = useCallback(
    (buttonClicked: boolean) => {
      setShowCart(false)
    },
    [showCart],
  );

  const backCartCallback = useCallback(
    () => {
      setShowCart(true)
      setShowCheckout(false)
    },
    [showCart],
  );

  const [showCheckout, setShowCheckout] = useState<boolean>(false)
  const [totalPayment, setTotalPayment] = useState<number>(0)
  const goCheckoutCallback = useCallback(
    (totalPay: number) => {

      setShowCheckout(true)
      setTotalPayment(totalPay)
    },
    [showCheckout, totalPayment],
  );

  const goCart = () => {
    setShowCart(true)
  }

  function valuetext(value: number) {
    return `${value}€`;
  }

  return (
    <ThemeProvider theme={theme}>
      {!showCart && !showCheckout &&
        <div style={{ display: "flex", flexDirection: 'column', backgroundColor: "#343F4B", maxWidth: "100%", minHeight: "100vh", height: "auto" }}>
          <div>
            <h1 style={{ textAlign: "center", color: "white", fontFamily: "'Poppins', sans-serif", fontSize: "48px" }}>Food Store</h1>
            <div style={{ marginLeft: "5%", display: "flex", width: "90%" }}>
              <Link to ="/petstore">
              <Button variant="outlined" color="info" startIcon={<KeyboardReturnIcon />} style={{ marginBottom: '1%', width:"115px"}}>
                <h1 style={{ fontSize: '10px' }}>Go Back</h1>
              </Button>
              </Link>

              <div style={{ display: "flex", width: "100%" }}>

                <div style={{display:"flex", marginLeft:"auto"}}>
                  <label style={{fontFamily: "'Poppins', sans-serif", fontSize: "20px", color: "white", marginLeft: "auto", marginRight: "auto" }}>
                    Characteristic:
                    <select value={filter} style={{borderRadius:"7px", width:"auto", marginLeft:"10px", fontSize: "20px"}} onChange={handleFilterChange}>
                      <option value=""></option>
                      <option value="Sterilized">Sterilized</option>
                      <option value="Hepatic">Hepatic</option>
                      <option value="Hipoalergic">Hipoalergic</option>
                      <option value="Natural">Natural</option>
                      <option value="Monoprotein">Monoprotein</option>
                      <option value="Cereal Free">Cereal Free</option>
                      <option value="Gluten Free">Gluten Free</option>
                    </select>
                  </label>
                </div>

                <div style={{display:"flex", marginLeft:"5vw", marginRight:"auto"}}>
                  <div>
                    <label style={{fontFamily: "'Poppins', sans-serif", fontSize: "20px", color: "white", marginLeft: "auto", marginRight: "auto" }}>
                      Minimum Price
                      <Slider
                        aria-label="Temperature"
                        defaultValue={0}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={0}
                        max={200}
                        onClick={handleMinPrice}
                      />
                    </label>
                  </div>

                  <div style={{marginLeft:"20px"}}>
                    <label style={{fontFamily: "'Poppins', sans-serif", fontSize: "20px", color: "white", marginLeft: "auto", marginRight: "auto" }}>
                      Maximum Price
                      <Slider
                        aria-label="Temperature"
                        defaultValue={200}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={0}
                        max={200}
                        onClick={handleMaxPrice}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <Button onClick={goCart} variant="outlined" color="info" style={{ marginLeft: "auto", marginBottom: '1%' }}>
                <h1 style={{ fontSize: '16px' }}>Cart</h1>
              </Button>
            </div>
          </div>

          <div style={{ width: "90%", margin: "auto", marginTop: "2vh" }}>
            {responseData.length > 0 &&
              responseData.map((res, index) => (
                <>
                  {index >= (pageNumber - 1) * 5 && index < (pageNumber) * 5 && <div key={index} >
                    <FoodItem callback={productCallback} numberItems={1} itemImage={res.photoUrl} itemDescription={res.description} itemName={res.name} itemPrice={res.price} itemProps={res.characteristics} />
                  </div>}
                </>
              ))}
            {navPageButtons}
          </div>
        </div>
      }
      {showCart && !showCheckout &&
        <Cart callback={goBackCallback} callbackCheckout={goCheckoutCallback} products={cart} totalCost={totalCost} />}
      {showCheckout &&
        <CheckoutPage callbackToCart={backCartCallback} totalCost={totalPayment} />
      }
    </ThemeProvider>

  );
}