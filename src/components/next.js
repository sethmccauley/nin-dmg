import React, { Component } from 'react'

export default class Next extends Component {
    render() {
        const { action, step } = this.props
        return (
            <div className="w3-container" style={{minWidth: '100px', order: '3', flex: '1'}}>
                { step > 5 ? 
                '' : 
                    <div style={{position: 'relative', top: '30%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                        <i onClick={() => action()} className="fa fa-chevron-circle-right fa-2x" style={{cursor: 'pointer'}}></i><br/>Next
                    </div>
                }
            </div>
        )
    }
}
