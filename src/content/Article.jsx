import {TextParagraph} from "../components/TextParagraph";
import {Scrollama, Step} from "react-scrollama";
import {useState} from "react";
import {StickyFigure} from "../components/StickyFigure.jsx";
import {Steps} from "./Steps.jsx";
import {ChapterTitle} from "../components/ChapterTitle";
import {ScatterPlotContainer} from "../components/ScatterPlotContainer.jsx";
import * as PropTypes from "prop-types";
import {RegionalCharts} from "../components/RegionalCharts";

const TextWrapper = ({children}) => <section className={'w-full px-4 max-w-[620px]'}>{children}</section>

TextWrapper.propTypes = {children: PropTypes.node};
export const Article = () => {

    const [currentStepIndex, setCurrentStepIndex] = useState(null);
    const [progress, setProgress] = useState(0);

    // This callback fires when a Step hits the offset threshold. It receives the
    // data prop of the step, which in this demo stores the index of the step.
    const onStepEnter = ({data}) => {
        setCurrentStepIndex(data);
    };

    const onStepProgress = ({progress}) => {
        //console.log(response)
        setProgress(progress)
    }


    // bg-[url(https://unsplash.com/photos/7OxV_qDiGRI/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Y29ycnVwdGlvbnxlbnwwfHx8fDE3MDEyOTM0OTF8MA&force=true&w=1920)] bg-cover bg-center bg-no-repeat flex flex-col justify-end
    return <>
        <header
            className={'bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center pt-24 mb-12 md:mb-0'}>
            <div
                className={'flex flex-col items-center justify-center grow w-full px-4 max-w-[620px] font-serif'}>
                <h1 className={'mb-6 text-3xl md:text-5xl font-bold w-full'}>Win back the 94% percent.</h1>
                <p className={'mb-4 text-xl text-left w-full font-italic'}>A Story on how governments build trust.</p>
                <p className={'mb-4 w-full text-stone-500'}><a href={'https://pscl.lbssr.ch'} target={"_blank"}>Pascal
                    Albisser</a>, December 2023.</p>
            </div>
        </header>
        <article className={'flex flex-col items-center py-8'}>
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
                <TextParagraph>2006 is also the year in which just about 7 in a hundred Poles say that they trust their
                    government. This is the lowest figure in the OECD's data set on trust in national
                    governments:</TextParagraph>
            </TextWrapper>
            <div className={'w-full mb-8'}>
                <div style={{position: 'sticky', top: '12vh'}} className={'flex flex-grow justify-center z-0'}>
                    <div className={'max-w-screen-md w-full px-2'}>
                        <StickyFigure progress={progress} chartProps={Steps[currentStepIndex]?.chartProps}
                                      className={'w-full flex flex-grow justify-center'}/>
                    </div>
                </div>
                <Scrollama offset={0.5} onStepEnter={onStepEnter} progress debg onStepProgress={onStepProgress}>
                    {Steps.map((step, stepIndex) => (
                        <Step data={stepIndex} key={stepIndex}>
                            <div
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
                        </Step>
                    ))}
                </Scrollama>
            </div>
            <TextWrapper>
                <ChapterTitle>Regional Patterns</ChapterTitle>
                <TextParagraph>How well countries fare in this ranking depends on various factors. On the one hand,
                    corruption plays a major role, as the example from Poland above shows. But also the wider cultural
                    and economic context when it comes to trust in the government and institutions.</TextParagraph>
                <TextParagraph>The data set also contains a correspondingly large number of regional similarities. In
                    Asia, for example, there is a steady increase, similar to Eastern Europe. In Latin America and
                    Southern Europe, both hit hard by the 2008 financial crisis, confidence fell steadily and is only
                    slowly recovering. </TextParagraph>

            </TextWrapper>
            <RegionalCharts/>
            <TextWrapper>
                <ChapterTitle>The cost of trust</ChapterTitle>
                <TextParagraph>A look at the gross domestic product also shows that economic factors play a role.
                    Countries with a high economic output tend to score better in the citizens rating.</TextParagraph>
                <ChapterTitle>GDP per capita versus trust</ChapterTitle>
            </TextWrapper>
            <ScatterPlotContainer/>
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
                <ChapterTitle>More democracy is associated with higher trust</ChapterTitle>
            </TextWrapper>
            <ScatterPlotContainer xKey={'democracy_eiu'}/>
            <TextWrapper>
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


    </>
}