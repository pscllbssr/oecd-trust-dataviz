import {useEffect, useRef, useState} from "react";
import useSize from "@react-hook/size";
import {csv} from "d3-fetch";
import {LineChart} from "./LineChart.jsx";
import {ScatterPlot} from "./ScatterPlot";

const ASPECT_RATIO = 0.666

export const ScatterPlotContainer = (props) => {

    const [data, setData] = useState([]);
    const target = useRef(null)
    const [xKey, setXKey] = useState('gdp')

    const filteredData = data

    useEffect(() => {
        csv('scatterplot.csv', d => {
            return {
                gdp: +d.gdp,
                democracy_eiu: +d.democracy_eiu,
                trust_pct: +d.trust_pct,
                country: d.country
            }
        }).then(data => setData(data))
    }, [])

    return (
        <>
            <div>
                <button onClick={() => setXKey('democracy_eiu')} className={'border p-1 border-black mx-2'}>Democracy-Index</button>
                <button onClick={() => setXKey('gdp')} className={'border p-1 border-black mx-2'}>GDP</button>
            </div>
            <div className={'w-full flex justify-center'}>
                <div ref={target} className={'m-2 max-w-screen-md w-full aspect-[16/9] relative'}>
                    <ScatterPlot data={data} xAcc={d => d[xKey]}/>
                </div>
            </div>
        </>)
}