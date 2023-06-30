import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CartItem from '../Cart/CartItem';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useState } from 'react';

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
interface CheckoutProps{
    totalCost:number
    callbackToCart: () => void;
}

export default function CartPage(props:CheckoutProps) {

    const buttonStyle = {
        backgroundColor:'white',
        opacity:'0.8',
        fontFamily: "'Poppins', sans-serif",
        borderRadius:"10px",
        width:"70%",
        fontSize:"26px",
        marginTop:"1cm",
        fontWeight:"bold",
        border:"#68D0D0 1px solid",
    }
    const [hasGarantee, setHasGarantee] = useState<number>(0)
    const garantee = (e:any) =>{
        if(e.target.checked)
            setHasGarantee(4)
        else
            setHasGarantee(0)
    }
    const returnShop = () => {
        props.callbackToCart()
    }  
    return (
        <ThemeProvider theme={theme}>
            <div style = {{display: "flex", flexDirection: 'column', backgroundColor: "#343F4B", maxWidth: "100%", minHeight:"100vh", height:"auto", fontFamily: "'Poppins', sans-serif",}}>
                    <div>
                    <h1 style = {{textAlign: "center", color: "white",fontSize:"36px"}}>Checkout</h1>
                        <Button onClick={returnShop} variant="outlined" color="secondary" startIcon={<KeyboardReturnIcon />} style = {{marginLeft:'2%'}}>
                            <h1 style = {{fontSize:'10px'}}>Go Back</h1>
                        </Button>
                    </div>
                    <div style={{display:"flex", width:"80%",marginLeft: "2%",marginTop:"2%",flexDirection:"row",alignItems:"flex-start",}}>
                        <div style= {{marginBottom:"4%",flexDirection:"column"}}>
                                <p style={{fontSize:"22pt", color:"white", marginLeft:"2%",fontWeight:"bold"}}>Shipping Adress:</p>
                                <form style={{background:"#98BABA",borderRadius:"13px",padding:"2%",}}>
                                    <div style={{color:"white",fontSize:"22px",}}>
                                            <label htmlFor="email" style={{marginLeft:"5%"}}>Email:* </label>
                                            <input id="email" type="email" style={{borderRadius:"7px", border:"3px white solid", marginLeft:"1%", fontSize:"22pt", width:"30%", height:"1cm",marginBottom:"2%",marginRight:"3%",}} required/>

                                            <label htmlFor="name">Name:* </label>
                                            <input id="name" type="text" style={{borderRadius:"7px", border:"3px white solid", marginLeft:"1vw", fontSize:"22pt", width:"30%", height:"1cm",marginBottom:"2%"}} required></input>
                                            <p></p>
                                            <label htmlFor="address" style={{marginLeft:"1%"}}>Address:*</label>
                                            <input id="address" type="text" style={{borderRadius:"7px", border:"3px white solid", marginLeft:"1vw", fontSize:"22pt", width:"77%", height:"1cm",marginBottom:"2%"}} required></input>
                                            <p></p>
                                            <label htmlFor="locality" style={{marginLeft:"2%"}}>Locality:*</label>
                                            <input id="locality" type="text" style={{borderRadius:"7px", border:"3px white solid", marginLeft:"1vw", fontSize:"22pt", width:"30%", height:"1cm",marginBottom:"2%"}} required></input>

                                            <label htmlFor="zip" style={{marginLeft:"2%"}}>Zip Code:*</label>
                                            <input id="zip" type="text" style={{borderRadius:"7px", border:"3px white solid", marginLeft:"1%", fontSize:"22pt", width:"30%", height:"1cm",marginBottom:"4%"}} required></input>
                                            <p></p>
                                            <label htmlFor="phone" style={{marginLeft:"1%"}}>Phone Number:*</label>
                                            <input id="phone" type="tel" style={{borderRadius:"7px", border:"3px white solid", marginLeft:"1vw", fontSize:"22pt", width:"50%", height:"1cm",marginBottom:"2%"}} required></input>
                                    </div>
                                </form>
                                <div style={{background:"#98BABA",borderRadius:"13px", width:"68%",padding:"2%",marginTop:"4%"}}>
                                        <span>
                                            <b style={{fontSize:"22pt", color:"white", marginLeft:"2%",fontWeight:"bold", marginRight:"2%"}}>Payment Method:</b>
                                            <select name="payment" id="payment" style= {{borderRadius: "13px",fontSize:"25px",textAlign:"center",fontFamily: "'Poppins', sans-serif",border:"1px white solid",}}>
                                                <option value="cobranca">Cash on Delivery</option>
                                                <option value="multibanco" selected>Credit Card</option>
                                                <option value="transferencia">Money Transfer</option>
                                                <option value="paypal">Paypal</option>
                                            </select>
                                        </span>
                                </div>
                        </div>
                        <div style={{display:"flex", width:"30%",marginLeft: "15%",flexDirection:"column",}}>
                            <p style={{fontSize:"22pt", color:"white", marginLeft:"2%",fontWeight:"bold",}}>Your order
                            <ShoppingBasketIcon sx={{ml:"3%",mb:"-2px"}}/> </p>
                            <div style= {{background:"#98BABA",borderRadius:"13px",fontSize:"22px", color:"white",}}>
                                <div style={{marginLeft:"5%"}}>
                                    <p><strong>Subtotal:</strong> {props.totalCost}</p>
                                    <p><input onChange={garantee} type="checkbox" id="garantee" name="garantee"/>
                                    <label htmlFor="garantee"> Garantia (3,99€)</label></p>
                                    <p><strong>Total:</strong> {props.totalCost + hasGarantee}</p>
                                </div>
                                <div style={{textAlign:"center",marginBottom:"4%",}}>
                                    <Link to ="/petstore">
                                    <Button style={buttonStyle}>
                                        <span style={{color:"#68D0D0",}}>Confirm</span>
                                    </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </ThemeProvider>
    );
}