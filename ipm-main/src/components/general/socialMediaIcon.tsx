
import { ReactComponent as Facebook} from './icons/facebook.svg';
import { ReactComponent as Instagram} from './icons/instagram.svg';
import { ReactComponent as Linkedin} from './icons/linkedin.svg';


interface  socialMediaProps {
     link?: string,
     app?: string,
}

export default function SocialMediaIcon(props: socialMediaProps) {


    const styling = {
        width:'3%',
        height: '3%',
        marginRight: '0.2%',
        fill: "white",
    }


    function IconApp(props: socialMediaProps) {
        const app = props.app;

        if(app === "facebook") {
            return <Facebook style = {styling}/>
        } else if(app === "instagram") {
            return <Instagram style = {styling}/>
        } else {
            return <Linkedin style = {styling}/>
        }
    }

    return (
            <a href={props.link}>
                <IconApp app = {props.app} />
            </a>
    );
}