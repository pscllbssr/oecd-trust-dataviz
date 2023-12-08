import {scaleLinear} from "d3-scale";

const yearProgressScale = scaleLinear().domain([0,1]).range([2006, 2022])


const StepTextbox = ({children}) => <p className={'max-w-full text-left w-[560px] bg-white px-8 py-6 z-10 shadow-md opacity-90'}>{children}</p>

export const Steps = [
    {
        content: <>
            <StepTextbox> asdfasdf <b>dini mueter</b></StepTextbox>
        </>,
        chartProps: {
            filterData: (data, progress) => data.filter( d => d.country === 'POL' && d.year <= yearProgressScale(progress))
        }
    },
    {
        content: <>
            <StepTextbox> asdfasdf <b>dini mueter</b></StepTextbox>
        </>,
        chartProps: {
            filterData: (data, progress) => data.filter( d => ['CHE'].includes(d.country) && d.year <= yearProgressScale.domain([0,.9])(progress) || ['POL'].includes(d.country))
        }
    },
    {
        content: <>
            <StepTextbox> asdfasdf <b>dini mueter</b></StepTextbox>
        </>,
        chartProps: {
            filterData: (data, progress) => data.filter( d => ['NOR', 'LUX', 'CHE', 'POL'].includes(d.country))
        }
    }
]