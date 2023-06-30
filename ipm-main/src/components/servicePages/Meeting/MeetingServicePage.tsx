import Service from '../../general/cardService';

import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

export default function MeetingServicePage() {

    return (
    <ThemeProvider theme={theme}>
        <div style = {{display: "flex", flexDirection: 'column', backgroundColor: "#343F4B", maxWidth: "100%",minHeight:"100vh", height:"auto"}}>
            <div>
                <h1 style = {{textAlign: "center", color: "#FFFF",fontSize: "48px", marginTop: "2%", fontFamily: "'Poppins', sans-serif"}}>Meeting and Greeting Spots</h1>
                <Button size = "large" variant="outlined" color = "info" startIcon={<KeyboardReturnIcon />} style = {{marginLeft:'5%'}}>
                    <h1 style = {{fontSize:'15px'}}>Go Back</h1>
                </Button>

            </div>
            <div>
                <div style = {{ marginTop: "2%", display: "flex", justifyContent: 'space-evenly', marginBottom: '1%', marginLeft:'10%' , marginRight:'10%'}}>
                    <Service title="Let's have a meeting for our dogs!!!!" description= "My name is Jorge and I love dogs so much that I'm willing to take yours to the vet." image= "https://www.cesarsway.com/wp-content/uploads/2015/06/Cesars-dog-park-tips.jpg" />
                    <Service title="Let's have a meeting for our dogs!!!!" description= "My name is Jorge and I love dogs so much that I'm willing to take yours to the vet." image= "https://www.kxan.com/wp-content/uploads/sites/40/2020/07/DOG-PARK-DOGS.jpg?w=1280" />
                    <Service title="Let's have a meeting for our dogs!!!!" description= "My name is Jorge and I love dogs so much that I'm willing to take yours to the vet." image= "https://www.hillspet.com.pt/content/dam/cp-sites/hills/hills-pet/en_us/exported/dog-care/play-exercise/images/group-of-dogs-at-dog-park.jpg" />
                </div>
                <div style = {{ display: "flex", justifyContent: 'space-evenly', marginBottom: '5%', marginLeft:'10%' , marginRight:'10%'}}>
                    <Service title="Let's have a meeting for our dogs!!!!" description= "My name is Jorge and I love dogs so much that I'm willing to take yours to the vet." image= "https://s28489.pcdn.co/wp-content/uploads/2021/04/Dog-park-2-May-16.jpg.optimal.jpg" />
                    <Service title="Let's have a meeting for our dogs!!!!" description= "My name is Jorge and I love dogs so much that I'm willing to take yours to the vet." image= "https://www.longbeach.gov/globalassets/park/media-library/images/park-and-facilities/parks-and-facilities-directory/dog-parks/bigstock-beagle-dogs-8023113.jpg" />
                    <Service title="Let's have a meeting for our dogs!!!!" description= "My name is Jorge and I love dogs so much that I'm willing to take yours to the vet." image= "https://1.bp.blogspot.com/-pDv4sle44cA/Vy2y2WCvGtI/AAAAAAAAEss/k6aDgbVb47wajWgZlwauW6igHJwj88AyACLcB/s1600/Dog-Park-Dog-Playing-Nicely-resized.jpg" />
                </div>
            </div>
        </div>
    </ThemeProvider>

    );
}