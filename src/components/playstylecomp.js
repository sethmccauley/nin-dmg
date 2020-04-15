import React from 'react';
import Heading from './heading';
import { TextField, Button } from '@material-ui/core';
import Style from './style';

class PlayStyleComp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            styleName: ''
        }
    }

    watchField = (e) => {
        this.setState({
            styleName: e.target.value
        })
    }

    render() {
        const styleCards = this.props.style.map((value, i) => {
            return (
                <Style
                    key={i}
                    title={value.name}
                    style={this.props.style[this.props.style.findIndex(val => val.name === value.name)]}
                    updateData={this.props.updateData}
                />
            )
        })
        return(
            <div className="w3-container w3-round App-playstyle">
                <Heading heading="Play Style"/>
                <div className='w3-container w3-left-align'>
                    <p style={{marginTop: '0px'}}>Play styles will act as a collection of configurations of food/buffs/weaponskills/etc to push to the data controller at the end.</p>
                    <TextField 
                        id='styleName' 
                        size='small' 
                        label='ex: Dynamis Wave 1' 
                        variant='outlined' 
                        style={{width: '50%'}}
                        onChange={this.watchField}
                    /> <Button variant='contained' color='primary' id='createStyle' onClick={() => this.props.createStyle(this.state.styleName)} disableElevation>Create</Button> <br />
                    <hr style={{border: '1px dashed teal'}}/>
                    {styleCards}
                </div>
            </div>
        )
    }
}

export default PlayStyleComp;