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
                <p className={'mb-4 w-full text-stone-500'}><a href={'https://pscl.lbssr.ch'} target={"_blank"}>Pascal Albisser</a>, December 2023.</p>
            </div>
        </header>
        <article className={'flex flex-col items-center py-8'}>
            <TextWrapper>
                <TextParagraph>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et
                    dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                    rebum.
                    Stet
                    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                    amet,
                    consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam
                    erat,
                    sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                    gubergren,
                    no
                    sea takimata sanctus est Lorem ipsum dolor sit amet.</TextParagraph>
                <ChapterTitle>northern an central europe scores best</ChapterTitle>
                <TextParagraph>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et
                    dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                    rebum.
                    Stet
                    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                    amet,
                    consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam
                    erat,
                    sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                    gubergren,
                    no
                    sea takimata sanctus est Lorem ipsum dolor sit amet.</TextParagraph>
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
                                className={'z-10 flex flex-col items-center px-4'}
                            >
                                {step.content}
                            </div>
                        </Step>
                    ))}
                </Scrollama>
            </div>
            <TextWrapper>
                <ChapterTitle>Regional Patterns</ChapterTitle>
                <TextParagraph>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et
                    dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                    rebum.
                    Stet
                    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                    amet,
                    consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam
                    erat,
                    sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                    gubergren,
                    no
                    sea takimata sanctus est Lorem ipsum dolor sit amet.</TextParagraph>

            </TextWrapper>
            <RegionalCharts/>
            <TextWrapper>
                <ChapterTitle>Why Though?</ChapterTitle>
                <TextParagraph>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et
                    dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                    rebum.
                    Stet
                    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                    amet,
                    consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam
                    erat,
                    sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                    gubergren,
                    no
                    sea takimata sanctus est Lorem ipsum dolor sit amet.</TextParagraph>
            </TextWrapper>
            <ScatterPlotContainer/>
            <TextWrapper>
                <TextParagraph>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et
                    dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                    rebum.
                    Stet
                    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                    amet,
                    consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam
                    erat,
                    sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                    gubergren,
                    no
                    sea takimata sanctus est Lorem ipsum dolor sit amet.
                </TextParagraph>
            </TextWrapper>
        </article>


    </>
}