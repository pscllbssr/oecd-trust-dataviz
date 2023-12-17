import {TextParagraph} from "../components/TextParagraph";
import {Scrollama, Step} from "react-scrollama";
import {useRef, useState} from "react";
import {StickyFigure} from "../components/StickyFigure.jsx";
import {Steps} from "./Steps.jsx";
import {ChapterTitle} from "../components/ChapterTitle";
import {ScatterPlotContainer} from "../components/ScatterPlotContainer.jsx";
import * as PropTypes from "prop-types";
import {RegionalCharts} from "../components/RegionalCharts";
import useSize from "@react-hook/size";
import {ChartTitle} from "../components/ChartTitle";

const TextWrapper = ({children}) => <section className={'w-full px-4 max-w-[620px]'}>{children}</section>

const DashedLineSVG = ({ size = 16 }) => {
    const svgStyle = {
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-block'
    };

    return (
        <svg
            viewBox={`0 0 ${size} ${size}`}
            xmlns="http://www.w3.org/2000/svg"
            style={svgStyle}
            className={'fill-stone-100'}
        >
            <line
                x1="0"
                y1={size}
                x2={size}
                y2="0"
                stroke="black"
                strokeWidth="2"
                strokeDasharray="4 2"
            />
        </svg>
    );
};

TextWrapper.propTypes = {children: PropTypes.node};

export const ScrollyStep = ({step, stepIndex, currentStepIndex, progress}) => {

    console.log(progress, currentStepIndex)

    return <div
        style={{
            height: '95vh',
            borderRight: '10px solid gray',
            opacity: currentStepIndex === stepIndex ? 1 : 0.2,
            //marginTop: stepIndex === 0 ? '-50vw' : 0
        }}
        className={'z-10 flex flex-col items-center px-4 justify-around'}
    >
        {step.content}
    </div>
}

ScrollyStep.propTypes = {
    stepIndex: PropTypes.number,
    progress: PropTypes.number,
    currentStepIndex: PropTypes.number,
    step: PropTypes.any
};

const ChartDescription = ({children}) => <div
    className={'text-stone-400 font-light text-xs mx-8 -mt-4 mb-8 md:mx-0'}>{children}</div>

ChartDescription.propTypes = {children: PropTypes.node};

const LineHintIncrease = () => <span className={'inline-block vertical-center'}></span>
const LineHintDecrease = () => <span className={'inline-block vertical-center'}></span>

export const Article = () => {

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const articleRef = useRef()
    const [width, height] = useSize(articleRef)
    const mobile = width < 768
    const scrollyOffset = mobile ? 0.6 : 0.35

    // This callback fires when a Step hits the offset threshold. It receives the
    // data prop of the step, which in this demo stores the index of the step.
    const onStepEnter = ({data}) => {
        setProgress(0)
        setCurrentStepIndex(data);

    };

    const onStepProgress = ({progress}) => {
        //console.log(response)
        setProgress(progress)
    }

    const onStepExit = () => {
        console.log('leave')
        //setProgress(0) // @todo not yet finished
    }


    // bg-[url(https://unsplash.com/photos/7OxV_qDiGRI/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Y29ycnVwdGlvbnxlbnwwfHx8fDE3MDEyOTM0OTF8MA&force=true&w=1920)] bg-cover bg-center bg-no-repeat flex flex-col justify-end
    return <>
        <header
            className={'bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center pt-24 mb-12 md:mb-8'}>
            <div
                className={'flex flex-col items-center justify-center grow w-full px-4 max-w-[620px] font-serif'}>
                <h1 className={'mb-6 text-3xl md:text-5xl font-bold w-full'}>The tense relationship of money and
                    trust</h1>
                <p className={'mb-4 text-xl text-left w-full font-italic'}>In 2006 nearly all the polish people distrusted their government. See how Poland dealt with it, which countries have done better and possible
                    reasons for it. </p>
                <p className={'mb-4 w-full text-stone-500'}><a href={'https://pscl.lbssr.ch'} target={"_blank"}>Pascal
                    Albisser</a>, December 2023.</p>
            </div>
        </header>
        <article className={'flex flex-col items-center py-8'} ref={articleRef}>
            <TextWrapper>
                <TextParagraph>A seemingly normal Tuesday evening in early autumn 2006. The thermometer in Warsaw today
                    showed 22.6° degrees, the air is slowly cooling down. Quite a few Poles are probably drawn indoors,
                    some of them switch on the television. And those who watch the private news channel TVN24 witness a
                    scandal. </TextParagraph>
                <ChapterTitle>The government on a shopping spree in parliament
                </ChapterTitle>
                <TextParagraph>Images from a hidden camera flicker across the screens in Polish parlours. They show Adam
                    Lipinski from the ruling Law and Justice party (PiS) trying to persuade MP Renata Berger
                    (Samoobrona) to join his party. He offers her posts and money in return. </TextParagraph>
                <TextParagraph>The PiS is in an awkward position. Less than a year after its election victory, its
                    governing coalition with Samoobrona has collapsed. Because other parties are refusing to co-operate,
                    the PiS is trying to persuade MPs to defect in order to remain in power.</TextParagraph>
                <TextParagraph>2006 is also the year in which just about seven in a hundred Poles say that they have
                    confidence
                    government. This is the lowest figure in the OECD's data set on trust in national
                    governments:</TextParagraph>
            </TextWrapper>
            <section className={'w-full flex justify-center mb-4'}>
                <div className={'w-full py-8 mb-8 relative max-w-[1024px]'}>
                    <div
                        className={'sticky flex flex-grow justify-center z-[1] py-4 bg-stone-50 shadow-lg shadow-stone-50 top-0 md:justify-end md:ml-96 md:top-24 md:bg-none'}>
                        <div className={'max-w-screen-md w-full px-2 z-10'}>
                            <StickyFigure progress={progress} chartProps={Steps[currentStepIndex]?.chartProps}/>
                        </div>
                    </div>
                    <Scrollama offset={scrollyOffset} onStepEnter={onStepEnter} progress debu
                               onStepProgress={onStepProgress} onStepExit={onStepExit}>
                        {Steps.map((step, stepIndex) => (
                            <Step data={stepIndex} key={stepIndex}>
                                <div
                                    style={{
                                        //borderRight: '10px solid gray',
                                        opacity: currentStepIndex === stepIndex ? 1 : 0.2,
                                        //marginTop: stepIndex === 0 ? '-50vw' : 0
                                    }}
                                    className={'px-4 my-4 mb-12 flex flex-col justify-center items-center md:w-96'}
                                >
                                    {step.content}
                                </div>
                            </Step>
                        ))}
                    </Scrollama>
                </div>
            </section>
            <TextWrapper>
                <TextParagraph>How well countries fare in this ranking depends on various factors. On the one hand,
                    corruption plays a major role, as in the polish example above. But also the wider cultural
                    and economic context when it comes to trust in the government and institutions.</TextParagraph>
                <ChartTitle>Trust depends on where you live</ChartTitle>
                <TextParagraph>The data set also contains a correspondingly large number of regional similarities.
                    <ul className={'list-disc pl-4 py-2'}>
                    <li className={'mb-2'}>In <span className={'font-semibold'}>Asia</span>, for example, there is a
                    steady increase<LineHintIncrease/>, similar to <span
                            className={'font-semibold'}>Eastern Europe</span>.</li>
                    <li className={'mb-2'}> In <span
                        className={'font-semibold'}>Latin America</span> and <span className={'font-semibold'}>Southern Europe</span>, both hit hard by
                    the 2008 financial crisis, confidence fell
                    steadily<LineHintDecrease/>, and is only
                    slowly recovering. </li>

                    <li className={'mb-2'}>And although the post-soviet countries <b>Estonia</b>, <b>Latvia</b>,
                    and <b>Lithuania</b> are now regarded as Northern Europe, in terms of trust they are still
                    distinguishable from their scandinavian neighbours. Only Great Britain shows similar
                        values.</li>

                    </ul>
                    </TextParagraph>
            </TextWrapper>
            <RegionalCharts/>
            <TextWrapper>
                <ChapterTitle>The bedrock</ChapterTitle>
                <TextParagraph>
                    The OECD writes: "<i>Public trust is the bedrock of democracy and sound public governance.</i>"
                    However, a
                    functioning democracy is no guarantee of a high level of trust. On the contrary, freedom of
                    expression allows citizens to express their mistrust, unlike in authoritarian states. And yet, a
                    comparison with the Economist Intelligence Unit's Democracy Index shows that countries with a better
                    democracy score also have better trust ratings.
                </TextParagraph>
                <ChartTitle>More democracy is associated with higher trust</ChartTitle>
            </TextWrapper>
            <ScatterPlotContainer xKey={'democracy_eiu'}/>
            <TextWrapper>
                <ChartDescription>Note: Confidence in government is also measured in the EIU democracy-index, hence
                    there
                    might be a slight autocorrelation in here. However it is one question among lots of others - so I
                    consider it neglectable. For every country the latest available measure is taken.</ChartDescription>
                <ChapterTitle>The cost of trust</ChapterTitle>
                <TextParagraph>A look at the gross domestic product also shows that economic factors play a role.
                    Countries with a high economic output tend to score better in the citizens rating.</TextParagraph>
                <ChartTitle>GDP per capita versus trust</ChartTitle>
            </TextWrapper>
            <ScatterPlotContainer/>
            <TextWrapper>
                <ChartDescription>For every country the latest available measure is taken.</ChartDescription>
                <TextParagraph>
                    Many things can be bought, even in politics. However, the OECD data shows that trust is not so easy
                    to come by. It seems that it cannot be gained overnight with a few popular measures. And it is
                    easily destroyed again - by briefcases full of money to venal members of parliament or global
                    economic crises.
                </TextParagraph>
                <TextParagraph>
                    Rather, trust grows through small measures, through a long process over several governments. The
                    data also shows that this is possible. And it is necessary according to the OECD. Trust is essential
                    to tackle the major challenges of our time, such as climate change, labour market issues and an
                    ageing society.
                </TextParagraph>
            </TextWrapper>
        </article>
        <div className={'align-center mb-24'}>
            <hr className={'w-[50px] m-auto border-stone-500'}/>
        </div>
        <footer className={'w-full flex bg-stone-800 text-stone-300 justify-center py-16'}>
            <TextWrapper>
                <ChapterTitle>Methods & Sources</ChapterTitle>
                <TextParagraph>
                    The data on trust in government is provided by the OECD and can be downloaded via their <a
                    href={'https://data.oecd.org/gga/trust-in-government.htm'} target={'_blank'}>data portal</a>.
                </TextParagraph>
                <TextParagraph>
                    The Democracy index is published yearly by the Economist Intelligence Unit, a research and analysis
                    division of the same organistion which also publishes "The Economist". Data are collected and
                    republished by the Swedish NPO Gapminder and can be downloaded via <a
                    href={'https://ourworldindata.org/grapher/democracy-index-eiu'} target={'_blank'}>Our World in
                    Data</a>.
                </TextParagraph>
                <TextParagraph>
                    This work was done in the Data Visualisation & Narration module at Lucerne University of Applied
                    Sciences. The code is available at <a
                    href={'https://ourworldindata.org/grapher/democracy-index-eiu'} target={'_blank'}>Github</a>.
                </TextParagraph>
            </TextWrapper>
        </footer>


    </>
}