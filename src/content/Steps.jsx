import {scaleLinear} from "d3-scale";

const yearProgressScale = scaleLinear().domain([0, 1]).range([2006, 2022])


const StepTextbox = ({children, className = ''}) => <p
    className={'max-w-full text-left w-[560px] bg-stone-50 px-8 py-6 z-10 shadow-md opacity-90 mb-16 ' + className}>{children}</p>

export const Steps = [
    {
        content: <div>
            <StepTextbox className={'mt-[5vh] mb-[50vh]'}>In autumn 2007, the Sejm (large chamber of the Polish parliament) decided to dissolve itself.
                The following parliamentary elections were won by the liberal-conservative Civic Platform, which
                governed until 2015 and under which Poland's rating improved a least a little.</StepTextbox>
            <StepTextbox className={'mb-[10vh]'}>When the PiS took over the government again in 2015, confidence continued to rise.
                In <b>2017</b>, more than half of Poles even expressed their trust in the government for the first time.
                However, the figure subsequently fell again during the pandemic.</StepTextbox>
        </div>,
        chartProps: {
            filterData: (data, progress) => data.filter(d => d.country === 'POL' && d.year <= yearProgressScale.domain([0, .9])(progress)),
            highlight: ['POL'],
            hasLeadingPoint: true,
            annotations: (progress) =>[{
                x: 2006,
                y: 6,
                //text: <div>6% (<b>2006</b>)</div>
                text: '6.9%',
                style: {textAnchor: 'middle',
                transform: 'translate(4px, 17px)'}
            }, yearProgressScale.domain([0, .9])(progress) >= 2017 && {
                x: 2017,
                y: 50,
                //text: <div>6% (<b>2006</b>)</div>
                text: '50.1%',
                style: {textAnchor: 'middle',
                    transform: 'translate(2px,-13px)'}}]
        }
    },
    {
        content: <>
            <StepTextbox className={'mt-[30vh] mb-[30vh]'}>Other countries in Eastern Europe such as <b>Hungary</b>, the <b>Czech
                Republic</b> and <b>Slovakia</b> show similar numbers.
                Their ratings show a light but steady increase over time.</StepTextbox>
        </>,
        chartProps: {
            filterData: (data, progress) => data.filter(d => ['CZE', 'HUN', 'SVK', 'POL'].includes(d.country)),
            highlight: ['CZE', 'HUN', 'SVK']
        }
    },
    {
        content: <>
            <StepTextbox className={'mt-[30vh] mb-[30vh]'}>At the other end of the scale, we meet <b>Switzerland</b>. The Swiss have also improved their
                score
                over the years. However, in contrast to Poland, they start with around two thirds of the population and
                even achieve the highest trust score in the entire data set in 2018: 85 out of 100 people trust Swiss
                institutions.</StepTextbox>
        </>,
        chartProps: {
            filterData: (data, progress) =>
                data.filter(d => ['CHE'].includes(d.country) && d.year <= yearProgressScale.domain([0, .8])(progress) || ['CZE', 'HUN', 'SVK', 'POL'].includes(d.country)),
            highlight: ['CHE'],
            hasLeadingPoint: true,
            annotations: (progress) =>[{
                x: 2006,
                y: 63,
                //text: <div>6% (<b>2006</b>)</div>
                text: '63.2%',
                style: {textAnchor: 'middle',
                    transform: 'translateY(-15px)'}
            }, yearProgressScale.domain([0, .8])(progress) >= 2018 && {
                x: 2018,
                y: 85,
                //text: <div>6% (<b>2006</b>)</div>
                text: '85.0%',
                style: {textAnchor: 'middle',
                    transform: 'translateY(-15px)'}}]
        }
    },
    {
        content: <>
            <StepTextbox className={'mt-[30vh] mb-[30vh]'}>Alongside the Swiss Confederation, <b>Norway</b> and <b>Luxembourg</b> are the frontrunners
                when it comes to
                trust in the national government. <b>Add 2-3 notes from norway in-depth study</b></StepTextbox>
        </>,
        chartProps: {
            filterData: (data, progress) => data.filter(d => ['NOR', 'LUX', 'CHE', 'CZE', 'HUN', 'SVK', 'POL'].includes(d.country)),
            highlight: ['NOR', 'LUX']
        }
    },
    {
        content: <div>
            <StepTextbox className={'mt-[30vh] mb-[20vh]'}>In the years 2006 - 2022, the inhabitants of a total of <b>41 countries</b> were asked: <b>Do
                you trust
                the national government?</b>. These mainly include members of the OECD and partner countries, i.e.
                primarily
                countries that belong to the so-called Western world. </StepTextbox>
            <StepTextbox className={'mt-[30vh] mb-[60vh]'}>The OECD considers this "<i>an <b>important indicator</b> to measure how people perceive the quality of, and
                how they associate with, government institutions in democratic countries</i>".
            </StepTextbox>
        </div>,
        chartProps: {
            filterData: (data, progress) => data.filter(d => true),
            highlight: ['None'],
        }
    }
]