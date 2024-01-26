
function PopUp(props){

    const closebutton = () => {
        props.setAction(false);
        props.setTrigger(false)
    }

    const yesbutton = () => {
        props.setAction(true);
        props.setTrigger(false)
    }
    
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                { props.children }
                
                {
                    props.isConfirm ?
                    (
                        <div>
                            <button className="div-button round-edge" onClick={yesbutton} style={{marginLeft: 20, width: 100}}>Okay</button>
                        </div>
                    ):
                    (
                        <div>
                            <button className="inactive-button round-edge" onClick={closebutton} style={{width: 100}}>No</button>
                            <button className="div-button round-edge" onClick={yesbutton} style={{marginLeft: 20, width: 100}}>Yes</button>
                        </div>
                    )
                }

            </div>
        </div>
    ) : "";
}

export default PopUp;