import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { equals, pipe, values, map, prop, sortBy, identity, last, toPairs, reduce, fromPairs } from 'ramda'
import Measure from 'react-measure'

const calculateContainerWidth = (itemSizes, itemPositions, colWidth) => pipe(
    values,
    map(t => t.x),
    sortBy(identity),
    last
)(itemPositions) + colWidth

const calculateWidestItem = pipe(
    values,
    map(prop('width')),
    sortBy(identity),
    last
)

const calculateItemPositions = (sizes, colWidth, containerHeight) => pipe(
    toPairs,
    reduce((acc, [key, size]) => {
        const lastSize = last(acc.sizes) || { width: 0, height: 0 }
        const lastPosition = last(acc.positions) ? last(acc.positions)[1] : { x: 0, y: 0 }

        const currentColumn = size.height <= acc.heightRemaining ? acc.currentColumn : acc.currentColumn + 1

        const nextPosition = {
            x: currentColumn * colWidth,
            y: currentColumn === acc.currentColumn ? lastPosition.y + lastSize.height : 0
        }

        return {
            currentColumn,
            heightRemaining: containerHeight - nextPosition.y - size.height,
            sizes: [...acc.sizes, size],
            positions: [...acc.positions, [key, nextPosition]]
        }
    }, {
        currentColumn: 0,
        heightRemaining: containerHeight,
        sizes: [],
        positions: []
    }),
    prop('positions'),
    fromPairs
)(sizes)

const getContainerStyle = (width, columnHeight) => ({
    position: 'relative',
    height: `${columnHeight}px`,
    width: `${width}px`
})

const getItemStyle = ({ x, y } = {}, { width, height } = {}) => ({
    position: 'absolute',
    left: x || 0,
    top: y || 0,
    width: `${width}px`,
    height: `${height}px`
})

class ColumnLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sizes: {}
        }
    }

    handleResize(key, contentRect) {
        if (!this.state.sizes[key] || (!equals(contentRect.bounds.width, this.state.sizes[key].width) || !equals(contentRect.bounds.height, this.state.sizes[key].height))) {
            this.setState({ sizes: { ...this.state.sizes, [key]: contentRect.bounds } })
        }
    }

    render() {
        const { children: items, columnHeight } = this.props
        const activeSizes = items.reduce((acc, item) => ({ ...acc, [item.key]: this.state.sizes[item.key] || {} }), {})
        const colWidth = calculateWidestItem(activeSizes)
        const itemPositions = calculateItemPositions(activeSizes, colWidth, columnHeight)
        const containerWidth = calculateContainerWidth(this.state.sizes, itemPositions, colWidth) || 500

        return (
            <div style={{ ...this.props.style, ...getContainerStyle(containerWidth, columnHeight) }} className={this.props.className}>
                {items.map(item => (
                    <div style={getItemStyle(itemPositions[item.key], this.state.sizes[item.key])}>
                        <Measure
                            bounds
                            key={item.key}
                            onResize={contentRect => this.handleResize(item.key, contentRect)}>
                            {({ measureRef }) => (
                                <div style={{ display: 'inline-block' }} ref={measureRef}>{item}</div>
                            )}
                        </Measure>
                    </div>
                ))}
            </div>
        )
    }
}

ColumnLayout.propTypes = {
    columnHeight: PropTypes.number.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
}

ColumnLayout.defaultProps = {
    style: undefined,
    className: undefined
}

export default ColumnLayout
