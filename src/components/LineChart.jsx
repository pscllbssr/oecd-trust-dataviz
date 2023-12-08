import {useEffect, useMemo, useRef} from "react";
import {scaleBand, scaleLinear, scaleOrdinal, scaleTime} from "d3-scale";
import {axisBottom, axisLeft} from "d3-axis";
import {select} from "d3-selection";
import {curveLinear, line} from "d3-shape";
import {transition} from "d3-transition";
import {easeCubicInOut} from "d3-ease";
import {groups, range} from 'd3-array';
import * as PropTypes from "prop-types";
import {useChartDimensions} from "../hooks/useChartDimensions.js";
import {Axis} from "./Axis.jsx";

const chartSettings = {
    "marginTop": 5,
    "marginRight": 43,
    "marginBottom": 17,
    "marginLeft": 30
}

export const LineChart = ({data = [], width, height}) => {

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

    const t = transition().duration(100).delay(0)

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
            .attr("stroke", "black")
            .attr("stroke-width", 3)
            .attr("id", d => d[0])

        chartCanvas
            .selectAll(".point")
            .data(data)
            .join("circle")
            .attr('cx', d => xScale(d.year))
            .attr('cy', d => yScale(d.trust_pct))
            //.transition(t)
            //.ease(easeCubicInOut)
            .attr('r', 3)
            .attr("fill", "black")
            .attr("class", "point")
            .attr("stroke", "black")
            .attr("id", d => `${d.country}-${d.year}`)

    }, [data, width])

    return <div ref={containerRef} style={{ height: height, width: width }}>
        <svg width={dms.width} height={dms.height}>
        <g className={'chart'} transform={`translate(${[
            dms.marginLeft,
            dms.marginTop
        ].join(",")})`} />
        <Axis scale={yScale} offsetY={dms.marginTop} offsetX={dms.marginLeft} axisFunc={axisLeft}/>
        <Axis scale={xScale} offsetY={dms.boundedHeight + dms.marginTop} offsetX={dms.marginLeft} axisFunc={axisBottom}/>
    </svg></div>

}