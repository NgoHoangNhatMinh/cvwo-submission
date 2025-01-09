import FacebookIcon from "../assets/facebook_icon.png"
import GithubIcon from "../assets/github_icon.png"
import InstagramIcon from "../assets/instagram_icon.png"
import GmailIcon from "../assets/gmail_icon.png"
import Logo from "../assets/react.svg"
import { Link } from "react-router-dom"

function Footer() {
    return <div className="FooterContainer">
        <div className="CopyrightContainer">
            <p>(Not) &copy; 2025 CVWO</p>
        </div>
        <div className="LogoContainer">
            <Link to="/" className="Logo"><img src={Logo} alt="" /></Link>
        </div>
        <div className="SocialsContainer">
            <a href="https://github.com/NgoHoangNhatMinh" target="_blank"><img src={FacebookIcon} alt="" className="SocialIcon"/></a>
            <a href="https://github.com/NgoHoangNhatMinh" target="_blank"><img src={GithubIcon} alt="" className="SocialIcon"/></a>
            <a href="https://github.com/NgoHoangNhatMinh" target="_blank"><img src={InstagramIcon} alt="" className="SocialIcon"/></a>
            <a href="https://github.com/NgoHoangNhatMinh" target="_blank"><img src={GmailIcon} alt="" className="SocialIcon"/></a>
        </div>
    </div>
}

export default Footer;