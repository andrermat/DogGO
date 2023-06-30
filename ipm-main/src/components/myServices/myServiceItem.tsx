import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface itemProps {
    itemImage?:string
    itemName?:string
    itemLocation?: string
    itemDescription:string
    itemPrice?:number
}

export default function myServiceItem(props:itemProps) {

    const truncate = (input: string) =>
      input?.length > 10 ? `${input.substring(0, 120)}(...)` : input;

    return (
        <div style = {{display:"flex", backgroundColor:"white", borderRadius:"7px", marginBottom:"2vh", height:"5cm", width:"100%", fontFamily: "'Poppins', sans-serif", border:"1px black solid"}}>
            
            <img alt="service" style={{ marginBottom:"auto", marginTop:"auto", marginLeft:"1vw", height: "4cm", width: "6cm", borderRadius:"7px", border:"1px black solid"}} src={props.itemImage}/>
            
            <div style = {{marginLeft:"1%", width:"100%", marginBottom:"auto", marginTop:"auto"}}>
                <p style = {{marginLeft:"2vw",marginTop:"-1%",}}>
                    <span><strong>Service: </strong>{props.itemName}</span>
                    <p></p>
                    <span style={{marginRight:"3%"}}><strong>Location: </strong>{props.itemLocation}</span><span><strong>Price: </strong>{props.itemPrice} €/hora</span>
                    <p></p>
                    <span><strong>Description: </strong></span>
                    <p></p>
                    <span>{truncate(props.itemDescription)}</span>
                </p>
            </div>

            <div style={{color:"red", width:"25%"}}>
                <DeleteForeverIcon style={{marginLeft:"40%",marginTop:"35%"}} sx={{width:46,height:46,}}/>
            </div>
        </div>
    );
}