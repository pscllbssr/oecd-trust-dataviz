import {useEffect, useMemo, useRef} from "react";
import {scaleLinear} from "d3-scale";
import {select} from "d3-selection";
import {curveLinear, line} from "d3-shape";
import {easeCubicInOut} from "d3-ease";
import {groups} from 'd3-array';
import {Axis} from "./Axis";
import {axisBottom, axisLeft} from "d3-axis";


export const SmallLines = ({width, height, data, xScale, yScale, lineGenerator, highlighted = []}) => {

    const ref = useRef()
    const chartCanvas = select(ref.current).select('g.lines')

    useEffect(() => {
        if (data.length === 0) return

        // setting up svg
        const groupedData = groups(data, d => d.country)

        chartCanvas
            .selectAll(".line")
            .data(groupedData)
            .join("path")
            //.transition(t)
            //.ease(easeCubicInOut)
            .attr("d", d => lineGenerator(d[1]))
            .attr("fill", "none")
            .attr("class", "line")
            .attr("stroke", d => highlighted.includes(d[0]) ? "red" : "grey")
            .attr("opacity", d => highlighted.includes(d[0]) ? 1 : .2)
            .attr("stroke-width", 1)
            .attr("id", d => d[0])

    }, [data, width, highlighted])

    return <svg width={width} height={height} ref={ref}>
        <g className={'lines'}></g>
        <Axis scale={xScale} axisFunc={axisBottom} offsetY={height}/>
        <Axis scale={yScale} axisFunc={axisLeft}/>
    </svg>
}