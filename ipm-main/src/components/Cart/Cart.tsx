import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Product } from '../PetStore/FoodStore/foodStorePage';
import { useEffect, useState } from 'react';
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
        main:'#FFFFFF',
    },
 }
});
interface cartProps{
    products:Product[]
    callback: (buttonClicked: boolean) => void;
    callbackCheckout: (totalPay: number) => void;
    totalCost:number
}

export default function CartPage(props:cartProps) {
    const buttonStyle = {
        backgroundColor:'#68D0D0',fontFamily: "'Poppins', sans-serif",
        borderRadius:"13px",
        fontSize:"32px",
        marginTop:"1cm",
        fontWeight:"bold",
        border:"white 3px solid",
    }
    const returnShop = () => {
        props.callback(false)
    }  
    const [shippingSelected, setShippingSelected] = useState(0);

    const selectedStandard = () =>{
        setShippingSelected(0)
    }

    const selectedExpress = () =>{
        setShippingSelected(5)
    }

    const checkout = () =>{
        props.callbackCheckout(props.totalCost + shippingSelected)
    }
    const [pageNumber, setPageNumber] = useState(1);
    const nextPageHandler = () => {
        setPageNumber((prevState) => {
          return Math.min(prevState + 1, Math.ceil(props.products.length / 5))
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
            <div style = {{display: "flex", flexDirection: 'column', backgroundColor: "#343F4B", maxWidth: "100%", minHeight:"100vh", height:"auto", fontFamily: "'Poppins', sans-serif",}}>
                <div>
                    <h1 style = {{textAlign: "center", color: "white",fontSize:"36px"}}>My Cart</h1>
                        <Button onClick={returnShop} variant="outlined" color="secondary" startIcon={<KeyboardReturnIcon />} style = {{marginLeft:'2%'}}>
                            <h1 style = {{fontSize:'10px'}}>Go Back</h1>
                        </Button>
                </div>

                <div style={{display:"flex", width:"90%", margin:"auto"}}>
                    <div style={{width:"70%", minHeight:"10cm", height:"auto", margin:"auto"}}>
                        <h1 style={{color:"white"}}>Products in Cart:</h1>
                        {props.products.length > 0 &&
            props.products.map((res, index) => (
              <>
                {index >= (pageNumber - 1) * 5 && index < (pageNumber) * 5 && <div key={index} >
                <CartItem itemImage={res.photoUrl} itemName={res.name} itemPrice={res.price} itemCharacteristics={res.characteristics}/>
                </div>}
              </>
            ))}
            {navPageButtons}
                        <div style={{background:"white", display:"flex", border:"white 3px solid", borderRadius:"7px",marginBottom:"2%",}}>
                            <h1 style={{color:"black", marginLeft:"1vw"}}> Shipping:</h1>
                            <div style= {{marginLeft:"3%"}}>
                                <input onChange={selectedStandard} type="radio" id="standard" name="shipping" value="standard" style={{marginLeft:"2vw", color:"white", width:"0.5cm", height:"0.5cm", marginTop:"1cm"}}/>
                                <label htmlFor="standard" style={{color:"black", fontWeight:"bold", fontSize:"0.8cm", marginTop:"0.65cm"}}>Standard</label>
                            </div>
                            <div>
                                <input onChange={selectedExpress} type="radio" id="express" name="shipping" value="express" style={{color:"white", width:"0.5cm", height:"0.5cm", marginLeft:"5vw", marginTop:"1cm"}}/>
                                <label htmlFor="express" style={{color:"black", fontWeight:"bold", fontSize:"0.8cm", marginTop:"0.65cm"}}>Express (+5€)</label>
                            </div>
                        </div>
                    </div>

                    <div style={{width:"30%", minHeight:"10cm", height:"auto"}}>
                            <h1 style={{color:"white", marginLeft:"0.5cm"}}>Resume:</h1>
                            <div style={{background:"white", border:"white 3px solid", width:"90%", marginLeft:"0.5cm", borderRadius:"7px",fontSize:"23px"}}>
                                <p style={{color:"black", marginLeft:"0.5cm"}}><strong>Cost:</strong> {props.totalCost}</p>
                                <p style={{color:"black", marginLeft:"0.5cm"}}><strong>Shipping:</strong> {shippingSelected}</p>
                                <p style={{color:"black", marginLeft:"0.5cm"}}><strong>Total:</strong> {props.totalCost + shippingSelected}</p>
                            </div>
                            <div style={{textAlign:"center"}}>
                                    <Button onClick= {checkout} style={buttonStyle}>
                                        <ShoppingCartCheckoutIcon sx= {{ml:"2px", mr: "10px",color:"secondary.main",}}></ShoppingCartCheckoutIcon>
                                        <span style={{color:"white",}}>Checkout</span>
                                    </Button>
                            </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}