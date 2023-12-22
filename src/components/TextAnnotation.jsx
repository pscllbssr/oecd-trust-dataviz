import './TextAnnotation.css'

export const TextAnnotation = ({children, className = ''}) => <div
    className={'absolute text-xs text-stone-400 bg-stone-50 leading-[1.1] ' + className}>{children}</div>