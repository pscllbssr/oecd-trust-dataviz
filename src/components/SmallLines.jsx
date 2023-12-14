import {useEffect, useMemo, useRef} from "react";
import {scaleLinear} from "d3-scale";
import {select} from "d3-selection";
import {curveLinear, line} from "d3-shape";
import {easeCubicInOut} from "d3-ease";
import {groups} from 'd3-array';
import {Axis} from "./Axis";
import {axisBottom, axisLeft} from "d3-axis";
import {GridLines} from "./GridLines.jsx";

const MARGIN_BOTTOM = 30
const MARGIN_LEFT = 20

export const SmallLines = ({
                               width,
                               height,
                               data,
                               xScale,
                               yScale,
                               lineGenerator,
                               highlighted = [],
                               hideX = true,
                               hideY = true,
                               highlightColour = "black"
                           }) => {

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
            .attr("stroke", d => highlighted.includes(d[0]) ? highlightColour : "grey")
            .attr("opacity", d => highlighted.includes(d[0]) ? 1 : .2)
            .attr("stroke-width", 1)
            .attr("id", d => d[0])

    }, [data, width, highlighted])

    return <svg width={width} height={height} ref={ref} className={'overflow-visible'}>
        <GridLines scale={yScale} offsetY={0} offsetX={MARGIN_LEFT} axisFunc={axisLeft} ticks={2}
                   size={width - MARGIN_LEFT}/>
        <Axis scale={xScale} axisFunc={axisBottom} offsetY={height - MARGIN_BOTTOM}
              tickFormat={d => hideX ? '' : String(d).substring(0)} ticks={4}/>
        <Axis scale={yScale} axisFunc={axisLeft} offsetX={MARGIN_LEFT} tickFormat={d => hideY ? '' : `${d}%`} ticks={2}
              removeDomain={true} tickSize={0}/>
        <g className={'lines'}></g>
    </svg>
}