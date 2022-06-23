import "./App.css"

export default function Home(){
    return(
        <h1 style={{ backgroundColor:'skyblue',margin:'0px' ,display:"flex",justifyContent:'center',alignItems:'center',height:'100vh',fontSize:"64px", color:'white'}}>Welcome to &nbsp;<span style={{color:'blue'}} className="glow" ><a href="https://cycatz.com/" target="_blank" style={{ textDecoration:'none'}}>Cycatz</a></span></h1>
    );
}