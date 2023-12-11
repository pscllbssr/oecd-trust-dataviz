import {useEffect, useRef} from "react";
import {select} from "d3-selection";

export const GridLines = ({ scale, offsetX = 0, offsetY = 0, axisFunc, ticks = 10, size = 300}) => {

    const axisRef = useRef()

    useEffect(() => {
        select(axisRef.current).call(axisFunc(scale).tickFormat('').tickSize(-size).ticks(ticks)
            ).call(g => g.select(".domain").remove())
    }, [scale])

    return <g ref={axisRef} className={'gridlines text-stone-200'} transform={`translate(${offsetX}, ${offsetY})`}></g>
}