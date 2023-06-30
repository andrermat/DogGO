import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useEffect, useState } from 'react';


interface itemProps {
    itemImage:string
    itemName: string
    itemProps?:string
    itemPrice:number
    itemDescription:string
    callback: (itemImage: string,itemDescription:string, itemName:string, itemPrice:number, numberItems:number, itemProps?:string ) => void;
    numberItems:number;
}

export default function FoodItem(props:itemProps) {

    const [numberItems, setNumber] = useState<number>(props.numberItems);


    useEffect(() => {
        setNumber(props.numberItems);
      }, [props.numberItems]);
    const addCart = () =>{
        alert("Product added to the cart")
        props.callback(
            props.itemImage,props.itemDescription, props.itemName, props.itemPrice, numberItems,  props.itemProps )
        
    }
    
        return (
        <div style = {{display:"flex", backgroundColor:"white", borderRadius: "13px", marginBottom:"2vh", height:"auto", fontFamily: "'Poppins', sans-serif",}}>
            <img alt={props.itemName} style={{ marginBottom:"1vh", marginTop:"1vh", marginLeft:"1vw", minHeight:"3cm", height: "7cm", minWidth:"8cm", width: "20%", borderRadius:"7px", border:"2px black solid",}} src={props.itemImage}/>
            <div style = {{marginLeft:"1vw", backgroundColor:"white", width:"55%"}}>
                <h1 style = {{marginLeft:"1vw"}}>{props.itemName}</h1>
                <h3 style = {{marginLeft:"1vw"}}>- {props.itemProps}</h3>
                <p style = {{marginLeft:"1vw"}}>
                    {props.itemDescription}
                </p>
            </div>

            <div>
                <h1 style={{marginLeft:"1vw"}}>Price: {props.itemPrice}</h1>
                <div style={{textAlign:"center"}}>
                    <button onClick={addCart} style={{cursor:"pointer", backgroundColor:"white", marginTop:"2vh", marginBottom:"2vh", border:"3px black solid", borderRadius:"7px", fontSize:"30px", fontWeight:"bold", fontFamily: "'Poppins', sans-serif"}}>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}