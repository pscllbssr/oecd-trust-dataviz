import * as PropTypes from "prop-types";

export const YAxisLabel = ({children}) => <div className={'absolute top-0 bottom-0 left-0 text-center flex justify-start items-center text-stone-500 text-sm'}><span className={'translate-y-2/4 -rotate-90 inline-block origin-top-left leading-none '}>{children}</span></div>

YAxisLabel.propTypes = {children: PropTypes.node};