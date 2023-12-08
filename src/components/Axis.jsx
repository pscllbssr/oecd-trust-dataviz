import {useEffect, useRef} from "react";
import {select} from "d3-selection";

export const Axis = ({ scale, offsetX = 0, offsetY = 0, axisFunc }) => {

    const axisRef = useRef()

    useEffect(() => {
        select(axisRef.current).call(axisFunc(scale))
    }, [scale])

    return <g ref={axisRef} transform={`translate(${offsetX}, ${offsetY})`}></g>
}