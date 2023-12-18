import * as PropTypes from "prop-types";

export const YAxisLabel = ({children, height = '100%'}) => <div
    className={'absolute top-0 bottom-0 left-0 text-center flex items-center text-stone-500 text-sm justify-around'}
    style={{height: height}}>
    <div className={'rotate-180 writing-lr h-full'}>{children}</div>
</div>

YAxisLabel.propTypes = {children: PropTypes.node};