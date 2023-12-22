import {scaleLinear} from "d3-scale";

const yearProgressScale = scaleLinear().domain([0, 1]).range([2006, 2022])


const StepTextbox = ({children, className = ''}) => <p
    className={'max-w-full text-left w-[560px] px-8 py-6 opacity-90 mb-6' + className}>{children}</p>

export const Steps = [
    {
        content: <>
            <StepTextbox className={'mt-[5vh] md:-pt-[20vh]'}>
                In the autumn of 2007, a significant political development unfolded as the Sejm, the expansive chamber
                of the Polish parliament, decided to dissolve itself. Subsequent parliamentary
                elections saw victory for the liberal-conservative Civic Platform, which assumed governance until 2015.
                Under its stewardship, Poland experienced a modest improvement in its rating.</StepTextbox>
            <StepTextbox className={''}>When the PiS took over the government again in 2015, confidence continued to
                rise. By 2017, over half of the Polish population expressed trust in the government for the first time.
                However, this surge was not sustained, experiencing a decline amid the challenges posed by the
                pandemic.</StepTextbox>
        </>,
        chartProps: {
            filterData: (data, progress) => data.filter(d => d.country === 'POL' && d.year <= yearProgressScale.domain([0, .9])(progress)),
            highlight: ['POL'],
            hasLeadingPoint: true,
            annotations: (progress) => [{
                x: 2006,
                y: 6,
                //text: <div>6% (<b>2006</b>)</div>
                text: '6.9%',
                style: {
                    textAnchor: 'end',
                    transform: 'translate(-6px, 4px)'
                }
            }, yearProgressScale.domain([0, .9])(progress) >= 2017 && {
                x: 2017,
                y: 50,
                //text: <div>6% (<b>2006</b>)</div>
                text: '50.1%',
                style: {
                    textAnchor: 'middle',
                    transform: 'translate(2px,-13px)'
                }
            }]
        }
    },
    {
        content: <>
            <StepTextbox className={''}>Similar trends manifested in Eastern European nations such as <b>Hungary</b>,
                the <b>Czech
                    Republic</b> and <b>Slovakia</b>.
                where incremental but consistent increases have been observed over time.</StepTextbox>
        </>,
        chartProps: {
            filterData: (data, progress) => data.filter(d => ['POL', 'CZE', 'HUN', 'SVK'].includes(d.country)),
            highlight: ['CZE', 'HUN', 'SVK'],
            annotations: (progress) => [
                {
                    x: 2022,
                    y: 42,
                    //text: <div>6% (<b>2006</b>)</div>
                    text: 'HUN',
                    style: {
                        textAnchor: 'start',
                        transform: 'translate(4px, -4px)'
                    }
                },
                {
                    x: 2021,
                    y: 21.5,
                    //text: <div>6% (<b>2006</b>)</div>
                    text: 'SVK',
                    style: {
                        textAnchor: 'start',
                        transform: 'translate(4px, 8px)',
                    }
                },
                {
                    x: 2022,
                    y: 34,
                    //text: <div>6% (<b>2006</b>)</div>
                    text: 'CZE',
                    style: {
                        textAnchor: 'start',
                        transform: 'translate(0px, 8px)',
                    }
                }
            ]
        }
    },
    {
        content: <>
            <StepTextbox className={''}>At the other end of the scale, we meet <b>Switzerland</b>. While also steadily
                enhancing its standing over the years, the Swiss commenced with an initial confidence level of
                approximately two-thirds of the population. Notably, in 2018, Switzerland attained the highest trust
                score in the entire dataset: 85 out of 100 people placed trust in Swiss institutions.</StepTextbox>
        </>,
        chartProps: {
            filterData: (data, progress) =>
                data.filter(d => ['CHE'].includes(d.country) && d.year <= yearProgressScale.domain([0, .8])(progress) || ['CZE', 'HUN', 'SVK', 'POL'].includes(d.country)),
            highlight: ['CHE'],
            hasLeadingPoint: true,
            annotations: (progress) => [{
                x: 2006,
                y: 63,
                //text: <div>6% (<b>2006</b>)</div>
                text: '63.2%',
                style: {
                    textAnchor: 'end',
                    transform: 'translate(-4px, -4px)'
                }
            }, yearProgressScale.domain([0, .8])(progress) >= 2018 && {
                x: 2018,
                y: 85,
                //text: <div>6% (<b>2006</b>)</div>
                text: '85.0%',
                style: {
                    textAnchor: 'middle',
                    transform: 'translateY(-12px)'
                }
            }]
        }
    },
    {
        content: <>
            <StepTextbox className={''}>In the realm of trust in national governments, Switzerland found itself in the
                company of other high-performing nations,
                including <b>Norway</b>, <b>Luxembourg</b> and <b>Finland</b> — front-runners in the pursuit of public
                confidence.</StepTextbox>
        </>,
        chartProps: {
            filterData: (data, progress) => data.filter(d => ['FIN', 'NOR', 'LUX', 'CHE', 'CZE', 'HUN', 'SVK', 'POL'].includes(d.country)),
            highlight: ['NOR', 'LUX', 'FIN'],
            annotations: (progress) => [
                {
                    x: 2022,
                    y: 63,
                    //text: <div>6% (<b>2006</b>)</div>
                    text: 'NOR',
                    style: {
                        textAnchor: 'start',
                        transform: 'translate(2px, 4px)'
                    }
                },
                {
                    x: 2019,
                    y: 78,
                    //text: <div>6% (<b>2006</b>)</div>
                    text: 'LUX',
                    style: {
                        textAnchor: 'start',
                        transform: 'translate(-10px, -8px)',
                    }
                },
                {
                    x: 2022,
                    y: 78,
                    //text: <div>6% (<b>2006</b>)</div>
                    text: 'FIN',
                    style: {
                        textAnchor: 'start',
                        transform: 'translate(2px, -0px)',
                    }
                }
            ]
        }
    },
    {
        content: <>
            <StepTextbox className={'relative z-[2] bg-stone-50'}>Spanning the years 2006 to 2022, a comprehensive
                survey encompassed residents from a total of 41 countries, seeking their perspective on the
                trustworthiness of their national governments. The OECD underscores this inquiry as "an important
                indicator" for gauging public perceptions of the quality of and connection to governmental institutions
                in democratic societies.
            </StepTextbox>
        </>,
        chartProps: {
            filterData: (data, progress) => data.filter(d => true),
            highlight: ['None'],
        }
    }
]