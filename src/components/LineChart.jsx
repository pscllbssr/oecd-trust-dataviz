import {useEffect, useMemo, useRef} from "react";
import {scaleBand, scaleLinear, scaleOrdinal, scaleTime} from "d3-scale";
import {axisBottom, axisLeft} from "d3-axis";
import {select} from "d3-selection";
import {curveLinear, line} from "d3-shape";
import {easeCubicInOut} from "d3-ease";
import {groups, range} from 'd3-array';
import * as PropTypes from "prop-types";
import {useChartDimensions} from "../hooks/useChartDimensions.js";
import {Axis} from "./Axis.jsx";
import 'd3-transition';
import {GridLines} from "./GridLines.jsx";
import {YAxisLabel} from "./YAxisLabel.jsx";
import {XAxisLabel} from "./XAxisLabel.jsx";

const chartSettings = {
    "marginTop": 5,
    "marginRight": 43,
    "marginBottom": 43,
    "marginLeft": 55
}

export const LineChart = ({data = [], highlight = [], annotations = [], width, height}) => {

    console.log(annotations)

    const [containerRef, dms] = useChartDimensions(chartSettings)

    const xScale = useMemo(() => (scaleLinear()
        //.domain(range(2006, 2022))
        .domain([2005.5, 2022.5])
        .range([0, dms.boundedWidth])), [dms.boundedWidth])

    const yScale = useMemo(() => (scaleLinear().domain([0, 100]).range([dms.boundedHeight, 0])), [dms.boundedHeight])

    const chartCanvas = select(containerRef.current).select('g.chart')

    //  Setup functions to draw Lines ---------------//
    const lineGenerator = line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.trust_pct))
        .curve(curveLinear);

    useEffect(() => {
        if (data.length === 0) return

        // setting up svg
        const groupedData = groups(data, d => d.country)

        chartCanvas
            .selectAll(".line")
            .data(groupedData, d => d[0])
            .join("path")
            //.transition().duration(100).ease(easeCubicInOut)
            .attr("d", d => lineGenerator(d[1]))
            .attr("fill", "none")
            .attr("class", "line")
            .attr("stroke", d => highlight.length === 0 || highlight.includes(d[0]) ? "black" : "lightgrey")
            .attr("stroke-width", 2)
            .attr("id", d => d[0])

        chartCanvas
            .selectAll(".point")
            .data(data, d => `${d.country}-${d.year}`)
            .join("circle")
            .attr('cx', d => xScale(d.year))
            .attr('cy', d => yScale(d.trust_pct))
            //.transition(transition().duration(100).ease(easeCubicInOut))
            .attr('r', 3)
            .attr("stroke", "white")
            .attr("fill", d => highlight.length === 0 || highlight.includes(d.country) ? "black" : "lightgrey")
            .attr("class", "point")
            .attr("id", d => `${d.country}-${d.year}`)

    }, [data, width])

    return <div ref={containerRef} style={{height: height, width: width}} className={'relative'}>
        <XAxisLabel>Year</XAxisLabel>
        <YAxisLabel>Trust</YAxisLabel>
        <svg width={dms.width} height={dms.height}>
            <GridLines scale={yScale} offsetY={dms.marginTop} offsetX={dms.marginLeft} axisFunc={axisLeft} ticks={4}
                       size={dms.boundedWidth}/>
            <Axis scale={yScale} offsetY={dms.marginTop} offsetX={dms.marginLeft} axisFunc={axisLeft}
                  tickFormat={d => `${d}%`}/>
            <Axis scale={xScale} offsetY={dms.boundedHeight + dms.marginTop} offsetX={dms.marginLeft}
                  axisFunc={axisBottom}/>
            <g className={'chart'} transform={`translate(${[
                dms.marginLeft,
                dms.marginTop
            ].join(",")})`}/>
            <g className={'annotations'} transform={`translate(${[
                dms.marginLeft,
                dms.marginTop
            ].join(",")})`}>{annotations.map(a => <text x={xScale(a.x)} y={yScale(a.y)}
                                                        style={a.style}>{a.text}</text>)} </g>
        </svg>
    </div>

}