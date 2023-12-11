import * as PropTypes from "prop-types";

export const XAxisLabel = ({children}) => <div className={'absolute bottom-0 left-0 right-0 text-center text-stone-500 text-sm'}>{children}</div>

XAxisLabel.propTypes = {children: PropTypes.node};