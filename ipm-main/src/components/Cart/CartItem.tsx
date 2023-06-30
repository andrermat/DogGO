import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

interface itemProps {
    itemImage:string
    itemName: string
    itemPrice:number
    itemCharacteristics?:string
}

export default function CartItem(props:itemProps) {
    return (
        <div style = {{display:"flex", backgroundColor:"white", borderRadius:"7px", marginBottom:"2vh", maxHeight:"4.5cm", height:"5cm"}}>
            <img style={{ marginBottom:"1vh", marginTop:"1vh", marginLeft:"1vw", height: "4cm", width: "6cm", borderRadius:"7px", border:"3px black solid"}} src={props.itemImage}/>
            <div style = {{marginLeft:"1vw", backgroundColor:"white"}}>
                <h2 style = {{marginLeft:"2vw"}}>{props.itemName}</h2>
                <p style = {{marginLeft:"2vw"}}>
                    {props.itemCharacteristics}
                </p>
            </div>

            <div style = {{marginLeft:"1vw", backgroundColor:"white", borderRadius:"7px",}}>
                <div>
                    <h3>Price: {props.itemPrice}</h3>
                </div>
            </div>
        </div>
    );
}