import {useEffect, useRef, useState} from "react";
import useSize from "@react-hook/size";
import {csv} from "d3-fetch";
import {LineChart} from "./LineChart.jsx";
import {ScatterPlot} from "./ScatterPlot";
import {TextAnnotation} from "./TextAnnotation";

const ASPECT_RATIO = 0.666
const X_LABEL = {
    'democracy_eiu': 'Democracy-Index',
    'gdp': 'GDP per capita (in USD)',
}

const ANNOTATIONS = {
    'democracy_eiu': [
        {
            x: 3.24,
            y: 46,
            text: 'RUS',
            style: {
                textAnchor: 'middle',
                transform: 'translate(-3px, -12px)'
            }
        },
        {
            x: 4.35,
            y: 43,
            text: 'TUR',
            style: {
                textAnchor: 'middle',
                transform: 'translate(-3px, -12px)'
            }
        },
        {
            x: 5.25,
            y: 53,
            text: 'MEX',
            style: {
                textAnchor: 'middle',
                transform: 'translate(-3px, -10px)'
            }
        }
    ],
    'gdp': [{
        x: 112000,
        y: 78,
        text: 'LUX',
        style: {
            textAnchor: 'middle',
            transform: 'translate(4px, -11px)'
        }
    }, {
        x: 91000,
        y: 84,
        text: 'CHE',
        style: {
            textAnchor: 'middle',
            transform: 'translate(4px, -10px)'
        }
    },{
        x: 76000,
        y: 31,
        text: 'USA',
        style: {
            textAnchor: 'middle',
            transform: 'translate(4px, 20px)'
        }
    },
    ],
}

const X_FORMAT = {
    'gdp': d => `${d / 1000}k`,
    'democracy_eiu': d => `${d}`
}

export const ScatterPlotContainer = ({xKey = 'gdp'}) => {

    const [data, setData] = useState([]);
    const target = useRef(null)
    //const [xKey, setXKey] = useState('gdp')

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
                    {xKey === 'gdp' ?
                        <TextAnnotation className={'left-[64%] bottom-[8vw] md:bottom-[20%] text-right w-[100px] pr-0 pb-2 z-10 arrow-left-top max-md:invisible'}>Strong economy, but low trust</TextAnnotation> :
                        <>
                            <TextAnnotation
                                className={'left-[12vw] bottom-[40vw] md:bottom-[78%] text-right w-[122px] pr-0 pb-2 z-10 arrow-top-left '}></TextAnnotation>
                        </>}
                    <ScatterPlot data={data} xAcc={d => d[xKey]} xAxisLabel={X_LABEL[xKey]}
                                 annotations={ANNOTATIONS[xKey]} xDomain={xKey === 'gdp' ? [0, 121000] : [0, 10]}
                                 xTickFormat={X_FORMAT[xKey]}/>
                </div>
            </div>
        </>)
}