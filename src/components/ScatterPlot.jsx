import {axisBottom, axisLeft} from "d3-axis";
import {useChartDimensions} from "../hooks/useChartDimensions.js";
import {useEffect, useMemo} from "react";
import {scaleLinear} from "d3-scale";
import {select} from "d3-selection";
import {Axis} from "./Axis.jsx";
import {extent} from "d3-array";
import {easeCubicInOut} from "d3-ease";
import {transition} from "d3-transition";

const chartSettings = {
    "marginTop": 5,
    "marginRight": 43,
    "marginBottom": 20,
    "marginLeft": 30
}

export const ScatterPlot = ({data, xAcc = d => d.gdp}) => {

    const [containerRef, dms] = useChartDimensions(chartSettings)

    const xScale = useMemo(() => (scaleLinear().domain(extent(data, d => xAcc(d)))
        .range([0, dms.boundedWidth])).nice(), [dms])

    const yScale = useMemo(() => (scaleLinear().domain([0, 100]).range([dms.boundedHeight, 0])), [dms])

    const chartCanvas = select(containerRef.current).select('g.chart')

    const t = transition().duration(100).delay(0)

    useEffect(() => {
        if (data.length === 0) return
        console.log(data)
        chartCanvas
            .selectAll(".point")
            .data(data)
            .join("circle")

            .transition(t)
            .ease(easeCubicInOut)
            .attr('cx', d => xScale(xAcc(d)))
            .attr('cy', d => yScale(d.trust_pct))
            .attr('r', 3)
            .attr("fill", "black")
            .attr("class", "point")
            .attr("stroke", "black")
            .attr("id", d => `${d.country}`)
    }, [data, dms])

    return <div ref={containerRef} className={'absolute inset-0'}>
        <svg width={dms.width} height={dms.height}>
            <g className={'chart'} transform={`translate(${[
                dms.marginLeft,
                dms.marginTop
            ].join(",")})`} />
            <Axis scale={yScale} offsetY={dms.marginTop} offsetX={dms.marginLeft} axisFunc={axisLeft}/>
            <Axis scale={xScale} offsetY={dms.boundedHeight + dms.marginTop} offsetX={dms.marginLeft} axisFunc={axisBottom}/>
        </svg></div>
}