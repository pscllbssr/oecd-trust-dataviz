import {useEffect, useRef, useState} from "react";
import useSize from "@react-hook/size";
import {csv} from "d3-fetch";
import {LineChart} from "./LineChart.jsx";
import {ScatterPlot} from "./ScatterPlot";

const ASPECT_RATIO = 0.666
const X_LABEL = {
    'democracy_eiu': 'Democracy-Index',
    'gdp': 'GDP per capita',
}

const ANNOTATIONS = {
    'democracy_eiu': [
        {
            x: 3,
            y: 50,
            text: 'RUS',
            style: {textAnchor: 'start',
                transform: 'translate(-3px, -12px)'}
        },
        {
            x: 4.5,
            y: 53,
            text: 'TUR',
            style: {textAnchor: 'start',
                transform: 'translate(-3px, -12px)'}
        }
    ],
    'gdp': [{
        x: 117500,
        y: 73,
        text: 'LUX',
        style: {textAnchor: 'middle',
            transform: 'translate(0, -15px)'}
    }, {
        x: 86000,
        y: 82,
        text: 'CHE',
        style: {
            textAnchor: 'middle',
            transform: 'translate(0px, -10px)'
        }
    },
    ],
}

export const ScatterPlotContainer = ({xKey = 'gdp'}) => {

    const [data, setData] = useState([]);
    const target = useRef(null)
    //const [xKey, setXKey] = useState('gdp')

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
            {/*<div>
                <button onClick={() => setXKey('democracy_eiu')} className={'border p-1 border-black mx-2'}>Democracy-Index</button>
                <button onClick={() => setXKey('gdp')} className={'border p-1 border-black mx-2'}>GDP</button>
            </div>*/}
            <div className={'w-full flex justify-center mt-4'}>
                <div ref={target} className={'mx-2 mb-8 max-w-screen-md w-full aspect-[16/9] relative'}>
                    <ScatterPlot data={data} xAcc={d => d[xKey]} xAxisLabel={X_LABEL[xKey]} annotations={ANNOTATIONS[xKey]}/>
                </div>
            </div>
        </>)
}