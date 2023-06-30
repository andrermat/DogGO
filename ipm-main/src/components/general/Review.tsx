interface reviewProps {
    reviewText: string
    reviewRating: number
}

export default function Review(props:reviewProps) {
    return(
        <div style={{borderRadius:"7px", border:"black solid 3px", height:"auto", marginBottom:"2vh"}}>
            <h5 style={{marginLeft:"1vh"}}>Rating: {props.reviewRating}/5 stars</h5>
            <p style={{marginLeft:"1vh"}}>
                {props.reviewText}
            </p>
        </div>
    )
}