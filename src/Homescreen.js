import bearlogo from "./resources/Bear.png"

function HomeScreen(){
    return(
        <div>
            <img src={bearlogo} className="HomeLogo"></img>
        </div>
    );
}

export default HomeScreen;