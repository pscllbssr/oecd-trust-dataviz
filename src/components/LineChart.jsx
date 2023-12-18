import {useEffect, useMemo, useRef} from "react";
import {scaleBand, scaleLinear, scaleOrdinal, scaleTime} from "d3-scale";
import {axisBottom, axisLeft} from "d3-axis";
import {select} from "d3-selection";
import {curveLinear, line} from "d3-shape";
import {easeCubicInOut} from "d3-ease";
import {groups, range, max} from 'd3-array';
import * as PropTypes from "prop-types";
import {useChartDimensions} from "../hooks/useChartDimensions.js";
import {Axis} from "./Axis.jsx";
import 'd3-transition';
import {GridLines} from "./GridLines.jsx";
import {YAxisLabel} from "./YAxisLabel.jsx";
import {XAxisLabel} from "./XAxisLabel.jsx";
import {DataColorGradient} from "./DataColorGradient.jsx";

const chartSettings = {
    "marginTop": 5,
    "marginRight": 43,
    "marginBottom": 43,
    "marginLeft": 50
}

export const LineChart = ({data = [], highlight = [], annotations = [], hasLeadingPoint = false, width, height}) => {

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
            .attr("id", d => d[0])
            .attr("class", "line")
            .transition()
            .attr("d", d => lineGenerator(d[1]))
            .attr("fill", "none")
            .attr("stroke", d => highlight.length === 0 || highlight.includes(d[0]) ? "url(#line-gradient)" : "lightgrey")
            .attr("stroke-width", d => highlight.length === 0 || highlight.includes(d[0]) ? 3 : 2)

        // leading point
        const highlightData = data.filter(d => highlight.includes(d.country) && hasLeadingPoint)
        const maxYear = max(highlightData, d => d.year)
        chartCanvas
            .selectAll(".leading-point")
            .data(highlightData.filter(d => d.year === maxYear), d => `leading-point-${d.country}`)
            .join("circle")
            //.transition()
            .attr('cx', d => xScale(d.year))
            .attr('cy', d => yScale(d.trust_pct))
            //.transition(transition().duration(100).ease(easeCubicInOut))
            .attr('r', 4)
            .attr("stroke", d => highlight.length === 0 || highlight.includes(d.country) ? "black" : "lightgrey")
            .attr("stroke-width", 2)
            .attr("fill", d => highlight.length === 0 || highlight.includes(d.country) ? "white" : "lightgrey")
            .attr("class", "leading-point")
            .attr("id", d => `${d.country}-${d.year}`)

    }, [data, width])

    return <div ref={containerRef} style={{height: height, width: width}} className={'relative'}>
        <XAxisLabel>Year</XAxisLabel>
        <YAxisLabel height={dms.boundedHeight}>
            <div className={'flex justify-between'}><span
                className={'text-[#b35806] pt-4 font-light'}>← Low</span><span>Trust</span><span className={'text-[#313695] pb-4 font-light'}>High →</span></div>
        </YAxisLabel>
        <svg width={dms.width} height={dms.height}>
            <DataColorGradient/>
            <GridLines scale={yScale} offsetY={dms.marginTop} offsetX={dms.marginLeft} axisFunc={axisLeft} ticks={4}
                       size={dms.boundedWidth}/>
            <Axis scale={yScale} offsetY={dms.marginTop} offsetX={dms.marginLeft} axisFunc={axisLeft}
                  tickFormat={d => `${d}%`} removeDomain={true} ticks={4} tickSize={0}/>
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
                                                        style={a.style}
                                                        className={'text-sm font-medium'}>{a.text}</text>)} </g>
        </svg>
    </div>

}