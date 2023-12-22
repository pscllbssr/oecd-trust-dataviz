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
import {DataColorGradient} from "../components/DataColorGradient";

const TextWrapper = ({children}) => <section className={'w-full px-4 max-w-[620px]'}>{children}</section>

const DashedLineSVG = ({size = 16}) => {
    const svgStyle = {
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-block',
        transform: 'rotate(15deg)'
    };

    return (
        <svg
            viewBox={`0 0 ${size} ${size}`}
            xmlns="http://www.w3.org/2000/svg"
            style={svgStyle}
            className={'fill-stone-100 mr-1'}
        >
            <defs>
                <DataColorGradient id={'e'}/>
            </defs>
            <line
                x1="0"
                y1={size}
                x2={size}
                y2="0"
                strokeWidth="2"
                strokeDasharray="5 3"
                stroke={'url(#e)'}
            />
        </svg>
    );
};

const LineSVG = ({size = 16}) => {
    const svgStyle = {
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-block',
        transform: 'rotate(15deg)'
    };

    return (
        <svg
            viewBox={`0 0 ${size} ${size}`}
            xmlns="http://www.w3.org/2000/svg"
            style={svgStyle}
            className={'fill-stone-100 mr-1'}
        >
            <defs>
                <DataColorGradient id={'e'}/>
            </defs>
            <line
                x1="0"
                y1={size}
                x2={size}
                y2="0"
                stroke={'url(#e)'}
                strokeWidth={2}
            />
        </svg>
    );
};

TextWrapper.propTypes = {children: PropTypes.node};

export const ScrollyStep = ({step, stepIndex, currentStepIndex, progress}) => {


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
    className={'text-stone-400 font-light text-xs -mt-4 mb-8 md:mx-0 w-full'}>{children}</div>

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
                <p className={'mb-4 text-xl text-left w-full font-italic'}>In 2006 nearly all the polish people
                    distrusted their government. See how Poland dealt with it, which countries have done better and
                    possible
                    reasons for it. </p>
                <p className={'mb-4 w-full text-stone-500'}><a href={'https://pscl.lbssr.ch'} target={"_blank"}>Pascal
                    Albisser</a>, December 2023.</p>
            </div>
        </header>
        <article className={'flex flex-col items-center py-8'} ref={articleRef}>
            <TextWrapper>
                <TextParagraph>A seemingly normal Tuesday evening in early autumn 2006. The thermometer in Warsaw marked
                    22.6° degrees in the afternoon, but the air is slowly cooling down. Quite a few Poles are probably
                    drawn indoors, some switching on their television. Those tuned to the private news channel TVN24
                    are thrust
                    into the midst of a scandal. </TextParagraph>
                <ChapterTitle>The government on a shopping spree in parliament
                </ChapterTitle>
                <TextParagraph>Images from a hidden camera flicker across the screens in Polish parlours. The footage
                    revealed Adam Lipinski of the ruling Law and Justice party (PiS) engaged in a dubious attempt to
                    lure MP Renata Berger from the Samoobrona party to join his ranks. In exchange for her allegiance,
                    he dangled offers of lucrative positions and financial incentives. </TextParagraph>
                <TextParagraph>The PiS of 2006 found itself in a precarious position, grappling with the fallout of its
                    shattered coalition with Samoobrona less than a year after its electoral triumph. Faced with the
                    reluctance of other political factions to collaborate, the PiS embarked on a strategic campaign to
                    entice MPs to defect, desperate to cling to the reins of power.</TextParagraph>
                <TextParagraph>2006 is also the year in which only about seven in a hundred Poles say that they have
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
                    corruption plays a major role, as in the polish example above. But also the broader cultural and
                    economic milieu significantly shapes the level of trust bestowed upon governments and
                    institutions.</TextParagraph>
                <ChartTitle>Trust depends on where you live</ChartTitle>
                <TextParagraph>For instance, the OECD points out there are regional similarities. In countries and
                    cultures where people generally trust each other, also confidence in government tends to be high.
                    This is confirmed when taking a closer look at the data:
                    <ul className={'list-disc pl-4 py-2'}>
                        <li className={'mb-2'}>In <span className={'font-semibold'}>Asia</span> there is a
                            steady increase<LineHintIncrease/>, similar to <span
                                className={'font-semibold'}>Eastern Europe</span>.
                        </li>
                        <li className={'mb-2'}><span
                            className={'font-semibold'}>Latin America</span> and <span className={'font-semibold'}>Southern Europe</span>,
                            both
                            grappling with the repercussions of the 2008 financial crisis, have experienced a protracted
                            decline in confidence, only now exhibiting gradual signs of recovery.
                        </li>

                        <li className={'mb-2'}>And although the <DashedLineSVG/><span className={'font-bold'}>post-soviet countries</span> Estonia,
                            Latvia, and Lithuania have come to be categorized as <b>Northern Europe</b>, in terms of
                            trust they are still
                            distinguishable from their Scandinavian neighbours. Notably also Great Britain shows similar
                            low
                            values.
                        </li>
                    </ul>
                </TextParagraph>
                <h2 className={'font-bold text-lg mb-2 text-center'}>
                    <span className={'mx-auto'}>Trust in regions</span>
                </h2>
                <TextParagraph>
                    <div className={'flex justify-center text-stone-500 -mb-4'}>
                        <span className={'inline-block mr-6'}><DashedLineSVG/>post-soviet countries</span>
                        <span><LineSVG/>other countries</span>
                    </div>
                </TextParagraph>
            </TextWrapper>
            <RegionalCharts/>
            <TextWrapper>
                <ChapterTitle>The bedrock</ChapterTitle>
                <TextParagraph>
                    The OECD emphasizes, "Public trust is the bedrock of democracy and sound public governance."
                    However, having a functioning democracy doesn't automatically ensure high trust levels. In fact, in
                    democracies, citizens can freely express their mistrust, a freedom not granted in authoritarian
                    states. And yet, a comparison with the Economist Intelligence Unit's Democracy Index shows that
                    in general countries with a better democracy score also have better trust ratings. Interestingly,
                    countries undergoing an authoritarian shift, such as <b>Russia</b>, <b>Turkey</b> and <b>Mexico</b>,
                    deviate from this pattern.
                </TextParagraph>
                <ChartTitle>More democracy is associated with higher trust</ChartTitle>
            </TextWrapper>
            <ScatterPlotContainer xKey={'democracy_eiu'}/>
            <TextWrapper>
                <ChartDescription>Note: Confidence in government is also measured in the EIU democracy-index, hence
                    there
                    might be a slight autocorrelation in here. However it is one <a
                        href={'https://docs.google.com/spreadsheets/d/1d0noZrwAWxNBTDSfDgG06_aLGWUz4R6fgDhRaUZbDzE/edit#gid=935776888'}
                        target={'_blank'}>among more than 60 questions</a> - so I
                    consider it neglectable. For every country the latest available measure is taken.</ChartDescription>
                <ChapterTitle>The cost of trust</ChapterTitle>
                <TextParagraph>Apart from politics, economic factors also come into play. This is revealed by a look at the
                    gross domestic product. Nations
                    boasting a robust economic output generally garner higher ratings in citizen satisfaction.
                    This is exemplified by the trust frontrunners, <b>Luxembourg</b> and <b>Switzerland</b>, both
                    characterized by robust economies. However the <b>United States</b> deviates from this trend, exhibiting
                    a low trust score despite its high economic output.
                </TextParagraph>
                <ChartTitle>GDP per capita versus trust</ChartTitle>
            </TextWrapper>
            <ScatterPlotContainer/>
            <TextWrapper>
                <ChartDescription>For every country the latest available measure is taken.</ChartDescription>
                <TextParagraph>
                    Many things can be bought, even in politics. However, the OECD data shows that trust is not so easy
                    to come by. The OECD data underscores that building trust is no swift endeavor, impervious to the
                    allure of quick-fix strategies. Conversely, it proves fragile, susceptible to erosion through the
                    influence of unscrupulous monetary transactions with parliamentarians or the tumult of global
                    economic crises.
                </TextParagraph>
                <TextParagraph>
                    Rather, trust grows through small measures, through a sustained process spanning multiple
                    administrations.
                    The data also indicates the achievability of this undertaking. Moreover, the OECD contends that this
                    deliberate cultivation
                    of trust is not merely an option but a necessity. In addressing the formidable challenges of our
                    era—ranging from climate change and labor market complexities to the aging of societies—trust stands
                    as an indispensable currency.
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
                    href={'https://data.oecd.org/gga/trust-in-government.htm'} target={'_blank'}>data portal</a>. It
                    represents the share of each countries population answering "yes" to the question: "In this country,
                    do you
                    have confidence in national government?".
                </TextParagraph>
                <TextParagraph>
                    The Democracy index is published yearly by the Economist Intelligence Unit, a research and analysis
                    division of the same organistion which also publishes "The Economist". It is comprised out of over
                    60 indicators such as "Is there a free print media?" or "Are citizens allowed to form political and
                    civic organisations, free of state interference and
                    surveillance?". Data are collected and
                    republished by the Swedish NPO Gapminder and can be downloaded via <a
                    href={'https://ourworldindata.org/grapher/democracy-index-eiu'} target={'_blank'}>Our World in
                    Data</a>.
                </TextParagraph>
                <TextParagraph>
                    The gross domestic product per capita is provided by <a
                    href={'https://data.worldbank.org/indicator/NY.GDP.PCAP.CD'} target={'_blank'}>World Bank national
                    accounts data, and OECD National Accounts data files.</a>.
                </TextParagraph>
                <TextParagraph>
                    Disclaimer: the text of this article was improved with the help OpenAI's ChatGPT, asking it to
                    replace some of my bumpy sentences with more fluent ones in a journalistic language, sticking to the
                    stated facts.
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