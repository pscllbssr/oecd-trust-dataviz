import {axisBottom, axisLeft} from "d3-axis";
import {useChartDimensions} from "../hooks/useChartDimensions.js";
import {useEffect, useMemo} from "react";
import {scaleLinear} from "d3-scale";
import {select} from "d3-selection";
import {Axis} from "./Axis.jsx";
import {extent} from "d3-array";
import {easeCubicInOut} from "d3-ease";
import {transition} from "d3-transition";
import {XAxisLabel} from "./XAxisLabel";
import {YAxisLabel} from "./YAxisLabel";
import {GridLines} from "./GridLines";
import {DataColorGradient} from "./DataColorGradient";

const chartSettings = {
    "marginTop": 0,
    "marginRight": 43,
    "marginBottom": 45,
    "marginLeft": 55
}

export const ScatterPlot = ({data, xAcc = d => d.gdp, xAxisLabel = '', annotations = [], xDomain = [0,10], xTickFormat}) => {

    const [containerRef, dms] = useChartDimensions(chartSettings)

    const xScale = useMemo(() => (scaleLinear().domain(xDomain)
        .range([0, dms.boundedWidth])).nice(), [dms])

    const yScale = useMemo(() => (scaleLinear().domain([0, 100]).range([dms.boundedHeight, 0])), [dms])

    const chartCanvas = select(containerRef.current).select('g.chart')

    //const t = transition().duration(100).delay(0)

    useEffect(() => {
        if (data.length === 0) return

        chartCanvas
            .selectAll(".point")
            .data(data)
            .join("circle")
            //.transition(t)
            //.ease(easeCubicInOut)
            .attr('cx', d => xScale(xAcc(d)))
            .attr('cy', d => yScale(d.trust_pct))
            .attr('r', 3)
            .attr("fill", "url(#scatter-line-gradient)")
            .attr("class", "point")
            .attr("stroke", "transparent")
            .attr("id", d => `${d.country}`)
    }, [data, dms])

    return <div ref={containerRef} className={'absolute inset-0'}>
        <XAxisLabel>{xAxisLabel}</XAxisLabel>
        <YAxisLabel height={dms.boundedHeight}><div className={'flex justify-between'}><span
            className={'text-[#b35806] pt-0 font-light'}>← Low</span><span>Trust</span><span
            className={'text-[#313695] pb-2 font-light'}>High →</span></div></YAxisLabel>
        <svg width={dms.width} height={dms.height}>
            <DataColorGradient id={'scatter-line-gradient'} />
            <Axis scale={yScale} offsetY={dms.marginTop} offsetX={dms.marginLeft} axisFunc={axisLeft}
                  tickFormat={d => `${d}%`} ticks={5} className={'axisLeft'}/>
            <GridLines scale={yScale} ticks={5} offsetY={dms.marginTop} axisFunc={axisLeft} offsetX={dms.marginLeft}
                       size={dms.boundedWidth}/>
            <Axis scale={xScale} offsetY={dms.boundedHeight + dms.marginTop} offsetX={dms.marginLeft} tickFormat={xTickFormat}
                  axisFunc={axisBottom} ticks={5}/>
            <g className={'chart'} transform={`translate(${[
                dms.marginLeft,
                dms.marginTop
            ].join(",")})`}/>
            <g className={'annotations'} transform={`translate(${[
                dms.marginLeft,
                dms.marginTop
            ].join(",")})`}>{annotations.map(a => <text x={xScale(a.x)} y={yScale(a.y)}
                                                        style={a.style} className={'stroke-stone-50'}>{a.text}</text>)}</g>
        </svg>
    </div>
}