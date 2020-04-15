import React, { Component } from 'react'

export default class Style extends Component {
    render() {
        return (
            <div>
                This is a single Style configuration for {this.props.title}.
            </div>
        )
    }
}
