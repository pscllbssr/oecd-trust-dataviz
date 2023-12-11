import {useEffect, useMemo, useRef, useState} from "react";
import useSize from "@react-hook/size";
import {SmallLines} from "./SmallLines";
import {csv} from "d3-fetch";
import {scaleLinear} from "d3-scale";
import {select} from "d3-selection";
import {curveLinear, line} from "d3-shape";

const SmallMultiple = ({children}) => <div className={'aspect-[4/3]'}>{children}</div>

const regions = [
    {
        title: 'North America',
        highlighted: ['USA', 'CAN'],
        xOffset: '',
        highlightColour: 'rgb(227, 26, 28)'
    },
    {
        title: 'Northern Europe',
        highlighted: ['NOR', 'SWE'],
        xOffset: '',
        highlightColour: "rgb(51, 160, 44)"
    },
    {
        title: 'Asia',
        highlighted: ['JPN', 'KOR', 'ISR', 'TUR'], // TUR?
        xOffset: '',
        highlightColour: "rgb(31, 120, 180)"

    },
    {
        title: 'Western Europe',
        highlighted: ['DEU', 'CHE', 'FRA'],
        xOffset: 'col-start-2',
        highlightColour: "rgb(51, 160, 44)"
    },
    {
        title: 'Eastern Europe',
        highlighted: ['POL', 'RUS', 'SVK', 'HUN', 'CZE', 'SVN'], // RUS?
        xOffset: '',
        highlightColour: "rgb(51, 160, 44)"
    },
    {
        title: 'Latin America',
        highlighted: ['MEX', 'COL', 'CRI', 'CHL', 'BRA'],
        xOffset: '',
        highlightColour: 'rgb(227, 26, 28)'
    },
    {
        title: 'Southern Europe',
        highlighted: ['ITA', 'ESP', 'GRC', 'PRT'],
        xOffset: '',
        highlightColour: "rgb(51, 160, 44)"
    },
    {
        title: 'Australia & New Zealand',
        highlighted: ['AUS', 'NZL'],
        xOffset: '',
        highlightColour: "rgb(31, 120, 180)"
    },
]

const MARGIN_BOTTOM = 30
const MARGIN_LEFT = 20

export const RegionalCharts = () => {

    const [data, setData] = useState([]);
    const target = useRef(null)
    const [width, height] = useSize(target)
    const chartHeight = width / 4 * 3

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

    return <div className={'overflow-x-scroll w-full p-4 max-w-screen-md w-full md:overflow-x-auto mb-8'}>
        <div className={'grid grid-cols-6 grid-rows-3 gap-4 min-w-[600px]'}>
            {
                regions.map((d, i) => (
                    <div className={`col-span-2 ${d.xOffset}`} ref={target}>
                        <SmallMultiple>
                            <h3 className={'pb-4'}>{d.title}</h3>
                            <SmallLines
                                data={data} width={width} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator}
                                highlighted={d.highlighted}
                                height={chartHeight}
                                hideX={![0].includes(i)}
                                hideY={![0].includes(i)}
                                highlightColour={d.highlightColour}
                            />
                        </SmallMultiple>
                    </div>
                ))
            }
        </div>
    </div>

}