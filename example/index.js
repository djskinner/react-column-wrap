/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { ColumnLayout } from '../src'

import './index.css'

// From https://stackoverflow.com/a/7352887/120497
function getRandColor(brightness) {
    // Six levels of brightness from 0 to 5, 0 being the darkest
    const rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256]
    const mix = [brightness * 51, brightness * 51, brightness * 51] // 51 => 255/5
    const mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(x => Math.round(x / 2.0))
    return `rgb(${mixedrgb.join(',')})`
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const getItemStyle = ({ large, largeWidth, largeHeight, smallWidth, smallHeight, color }) => ({
    display: 'inline-block',
    width: `${large ? largeWidth : smallWidth}px`,
    height: `${large ? largeHeight : smallHeight}px`,
    backgroundColor: color,
    padding: '20px',
    margin: '20px'
})

class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            large: true,
            largeWidth: getRandomInt(100, 300),
            largeHeight: getRandomInt(100, 300),
            smallWidth: getRandomInt(50, 150),
            smallHeight: getRandomInt(50, 150),
            color: getRandColor(5)
        }
    }

    render() {
        return (
            <button
                style={getItemStyle(this.state)}
                onClick={() => this.setState({ large: !this.state.large })}>
                {this.props.children}
            </button>
        )
    }
}

Item.propTypes = {
    children: PropTypes.node.isRequired
}

const getColStyle = () => ({
    border: '3px solid darkgreen'
})

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: (new Array(Number(10)).fill('')).map((v, i) => i)
        }
    }

    addItem() {
        this.setState({ items: [...this.state.items, this.state.items.length] })
    }

    removeItem() {
        this.setState({ items: this.state.items.slice(0, -1) })
    }

    render() {
        return (
            <div>
                <h1>React Column Wrap</h1>
                <p>Click the items to toggle their size and add/remove items with the buttons below to see how the layout behaves</p>
                <div>
                    <button onClick={() => this.addItem()} className="add-remove">+</button>
                    <button onClick={() => this.removeItem()} className="add-remove">-</button>
                </div>
                <ColumnLayout style={getColStyle()} columnHeight={1200}>
                    {this.state.items.map(item => <Item key={item}>{item}</Item>)}
                </ColumnLayout>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
