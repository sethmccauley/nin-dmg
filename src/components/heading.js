import React from 'react';

class Heading extends React.Component {
    render() {
        return(
            <div className="w3-content w3-left-align w3-padding">
                <h2 style={{fontWeight: '600', fontSize: '1.8em'}}>{this.props.heading}</h2>
            </div>
        )
    }
}

export default Heading;