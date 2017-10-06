## React Column Wrap

[![npm version](https://badge.fury.io/js/react-column-wrap.svg)](https://badge.fury.io/js/react-column-wrap)
[![Dependency Status](https://david-dm.org/djskinner/react-column-wrap.svg)](https://david-dm.org/djskinner/react-column-wrap)

A React component that renders its children in a column layout that supports wrapping.

It aims to achieve the layout behaviour that should be supported by flex box (flex-direction: column; flex-wrap: wrap;) but which [is not implemented properly in any major browser](https://stackoverflow.com/questions/33891709/when-flexbox-items-wrap-in-column-mode-container-does-not-grow-its-width).

## Install

`npm install react-column-wrap`

## ColumnLayout Component

Positions its children in a column layout.

Features
- Supports child items of any (including undefined) sizes.
- Updates when child item size changes (reorganising children and collapsing to a single column where possible).
- Creates columns of equal width based on the widest item.

Limitations
- First pass render looks ugly.
- Currently requires a fixed column height to be specified rather than calculating this from the containing element.

See the [demo](https://djskinner.github.io/react-column-wrap/)

### Props

#### `columnHeight`: PropTypes.number

Height in pixels of the container element. Items will be wrapped onto the next column where necessary.

#### `children`: PropTypes.node

The items to layout. Can be of mixed / undefined sizes as [react-measure]() is used to calculate the size of each item.

### Example

```javascript
import { ColumnWrap } from 'react-column-wrap'

<ColumnWrap columnHeight={1000}>
    <Item />
    <Item />
    <Item />
    <Item />
</ColumnWrap>
```
