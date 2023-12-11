import {useEffect, useRef, useState} from "react";
import {select} from 'd3-selection'
import {scaleLinear} from 'd3-scale'
import {csv} from 'd3-fetch'
import useSize from "@react-hook/size";
import {LineChart} from "./LineChart";
const ASPECT_RATIO = 0.666

export const StickyFigure = ({progress, chartProps}) => {
    console.log(chartProps)
    const [data, setData] = useState([]);
    const target = useRef(null)
    const [width, height] = useSize(target)

    const filteredData = chartProps?.filterData ? chartProps.filterData(data, progress) : data.filter(d => d.country === 'POL' && d.year === 2006)
    const annotations = chartProps?.annotations ? chartProps.annotations(progress) : []
    const highlight = chartProps?.highlight ? chartProps.highlight : []

    useEffect(() => {
        csv('trust_data.csv', d => {
            return {
                year: +d.year,
                trust_pct: +d.trust_pct,
                country: d.country
            }
        }).then(data => setData(data))
    }, [])

    return (
        <div ref={target}>
            <LineChart data={filteredData} width={width} height={width * ASPECT_RATIO} highlight={highlight} annotations={annotations } />
        </div>)
}