import {useEffect, useRef} from "react";
import {select} from "d3-selection";

export const Axis = ({ scale, offsetX = 0, offsetY = 0, axisFunc, tickFormat = d => d, ticks = 10, removeDomain = false, tickSize = 4, className = '' }) => {

    const axisRef = useRef()

    useEffect(() => {
        const axisContainer = select(axisRef.current)
        axisContainer.call(axisFunc(scale).tickFormat(tickFormat).ticks(ticks).tickSize(tickSize))
        if (removeDomain) {
            axisContainer.call(g => g.select(".domain").remove())
        }
    }, [scale])

    return <g ref={axisRef} transform={`translate(${offsetX}, ${offsetY})`} className={'text-stone-500 ' + className}></g>
}