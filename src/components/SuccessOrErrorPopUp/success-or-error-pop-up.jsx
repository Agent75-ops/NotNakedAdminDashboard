import ReactDOM from 'react-dom';
import styled,{keyframes} from "styled-components";
import { useEffect, useState } from "react";

const slideIn = keyframes`
from {
    transform: translateX(30px);
    opacity: 0;
}
to {
    transform: translateX(0);
    opacity: 1;
}
`;

const Container = styled.div`
width:50%;
min-width:250px;
max-width:430px;
background : white;
border-radius:10px;
position:fixed;
z-index:100;
top:18vh;
right:3%;
padding:1% 1.3%;
animation-duration: 0.3s; 
animation-timing-function: ease-in-out; 
box-shadow:0px 0px 10px ${({$color})=>$color};
animation-name: ${({$animate}) => ($animate =='in' ? slideIn : '')};

@media screen and (max-width:600px){
    right:15%;
}
`
const Content = styled.div`
width:100%;
height:100%;
display:flex;
justify-content:space-between;
align-items:center;
gap:20px;
`
const StatusCircle = styled.div`
width:40px;
height:40px;
background:${({$color})=>$color};
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
`

const Icon = styled.i`
font-size:1.3rem;
color:white;
text-shadow:0px 1px 3px black;
`

const Text = styled.div`
display:flex;
flex-direction:column;
align-items:start;
gap:2px;
`
const Header = styled.p`
margin:0;
font-size:clamp(.8rem , 2.3vw ,1.1rem);
font-weight:600;
color:${({$color})=>$color};
`
const Message = styled.p`
margin:0;
font-size:clamp(.7rem,2vw,.9rem);
font-weight:600;
color:grey;
`
const ClosePopUp  = styled.i`
font-size:clamp(.7rem,2vw,.9rem);
font-weight:600;
cursor:pointer;
`

function PopUp({color,text,status,setSettings,serverError,show}){
    const [animate, setAnimate] = useState("in");

    function handleCloseButtonClick(e){
        serverError.get() && serverError.set(false);
        setSettings({show: false, status: "", message: "" });
    }

    return(
        <>
            {ReactDOM.createPortal(
                <>
                    {show && (<Container $animate={animate} $color={color}>
                        <Content>
                            <div style={{display:'flex',gap:'20px',alignItems:"center"}}>
                                <StatusCircle $color={color}>
                                    {status=="Error" && <Icon className="fa-solid fa-x"/>}
                                    {status=="Success" && <Icon className="fa-solid fa-check"/>}
                                </StatusCircle>
                                <Text>
                                    <Header $color={color}>{status}</Header>
                                    <Message>{text}</Message>
                                </Text>
                            </div>
                            <ClosePopUp className="fa-solid fa-x" onClick={handleCloseButtonClick}/>
                        </Content>
                    </Container>)}
                </>,
                document.body
            )}
        </>
    )
}

// props are serverError , settings , setSettings
export default function SuccessOrErrorPopUp({serverError, outerSettings, setOuterSettings}){
    const [settings ,setSettings] = useState({show:false,status:"",message:""})

    useEffect(()=>{
        if (outerSettings && JSON.stringify(outerSettings) !== JSON.stringify(settings))
        setSettings(outerSettings);
    },[outerSettings])
    
    useEffect(()=>{
        if (outerSettings && JSON.stringify(outerSettings) !== JSON.stringify(settings))
        setOuterSettings(settings) 
    },[settings])

    useEffect(()=>{
        if (serverError){
            if (serverError.get()) {
                setSettings({
                show: true,
                status: "Error",
                message: "Oops...Looks like our servers are down!",
                });
            }else{
                setSettings({show: false, status: "", message: "" });
            }
        }
    } , [serverError?.get()])

    return (
        <PopUp
        show={settings.show}
        status={settings.status}
        text={settings.message}
        color={settings.status === 'Error' ? 'rgba(255,0,0,0.8)' : 'rgba(0,255,0,.8)'}
        setSettings={setSettings}
        serverError={serverError}
        />
    );
}