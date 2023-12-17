import {useEffect, useMemo, useRef, useState} from "react";
import useSize from "@react-hook/size";
import {SmallLines} from "./SmallLines";
import {csv} from "d3-fetch";
import {scaleLinear} from "d3-scale";
import {select} from "d3-selection";
import {curveLinear, line} from "d3-shape";
import './RegionalCharts.css'

const SmallMultiple = ({children}) => <div className={'aspect-[4/3]'}>{children}</div>

const regions = [
    {
        title: 'North America',
        highlighted: ['USA', 'CAN'],
        xOffset: '',
        highlightColour: 'black'//'rgb(227, 26, 28)'
    },
    {
        title: 'Northern Europe',
        highlighted: ['NOR', 'SWE', 'DNK', 'FIN', 'GBR', 'ISL', 'LVA', 'LTU', 'EST'], // POST SOVIET?
        xOffset: '',
        highlightColour: 'black'//"rgb(51, 160, 44)"
    },
    {
        title: 'Asia',
        highlighted: ['JPN', 'KOR', 'ISR'], //, 'TUR'], // TUR?
        xOffset: '',
        highlightColour: 'black'//"rgb(31, 120, 180)"

    },
    {
        title: 'Western Europe',
        highlighted: ['DEU', 'CHE', 'FRA', 'AUT', 'BEL', 'LUX', 'NLD'],
        xOffset: 'col-start-2',
        highlightColour: 'black'//"rgb(51, 160, 44)"
    },
    {
        title: 'Eastern Europe',
        highlighted: ['POL', 'RUS', 'SVK', 'HUN', 'CZE', 'SVN'], // RUS? POST-SOVIET
        xOffset: '',
        highlightColour: 'black'//"rgb(51, 160, 44)"
    },
    {
        title: 'Latin America',
        highlighted: ['MEX', 'COL', 'CRI', 'CHL', 'BRA'],
        xOffset: '',
        highlightColour: 'black'//'rgb(227, 26, 28)'
    },
    {
        title: 'Southern Europe',
        highlighted: ['ITA', 'ESP', 'GRC', 'PRT', 'SVN'], // POST-SOVIET
        xOffset: '',
        highlightColour: 'black'//"rgb(51, 160, 44)"
    },
    {
        title: 'Australia & New Zealand',
        highlighted: ['AUS', 'NZL'],
        xOffset: '',
        highlightColour: 'black'//"rgb(31, 120, 180)"
    },
]

const MARGIN_BOTTOM = 30
const MARGIN_LEFT = 0

export const RegionalCharts = () => {

    const [data, setData] = useState([]);
    const target = useRef(null)
    const [width, height] = useSize(target)
    const chartHeight = width * 0.9

    const xScale = useMemo(() => (scaleLinear()
        .domain([2006, 2022])
        .range([MARGIN_LEFT, width])), [width])

    const yScale = useMemo(() => (scaleLinear().domain([0, 100]).range([chartHeight - MARGIN_BOTTOM, 0])), [chartHeight])

    //  Setup functions to draw Lines ---------------//
    const lineGenerator = line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.trust_pct))
        .curve(curveLinear);

    useEffect(() => {
        csv('trust_data.csv', d => {
            return {
                year: +d.year,
                trust_pct: +d.trust_pct,
                country: d.country
            }
        }).then(data => setData(data))
    }, [])

    return <div className={'overflow-x-scroll w-full max-w-screen-lg w-full md:overflow-x-visible mb-8 py-4 pl-12 pr-4'}>
        <div className={'grid grid-cols-6 grid-rows-3 gap-x-6 gap-y-1 min-w-[600px]'}>
            {
                regions.map((d, i) => (
                    <div className={`col-span-2 ${d.xOffset} region-${i}`} ref={target}>
                        <SmallMultiple>
                            <h3 className={'pb-2 text-center'}>{d.title}</h3>
                            <SmallLines
                                data={data} width={width} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator}
                                highlighted={d.highlighted}
                                height={chartHeight}
                                hideX={false} // ![0, 3, 5].includes(i)}
                                hideY={![0, 3, 5].includes(i)}
                                //highlightColour={d.highlightColour}
                            />
                        </SmallMultiple>
                    </div>
                ))
            }
        </div>
    </div>

}