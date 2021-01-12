import React from 'react';
import { IconButton, Select, Typography } from "@material-ui/core";
import './Pagination.scss';

function Pagination({ className, pageSize = 10, page = 1, count = 0, onChange, ...props }) {
    const totalPagesState = React.useState(1);
    const pageRangeState = React.useState([0, 0]);

    React.useEffect(() => {
        if (pageSize === 0 || !pageSize) {
            if (onChange) onChange(1, 10);
            return;
        }
        if (page === 0 || !page) {
            if (onChange) onChange(2, 1);
            return;
        }
        if (count < pageSize * (page - 1)) {
            if (onChange) onChange(2, 1);
            return;
        }
        const totalPages = Math.ceil(count / pageSize);
        totalPagesState[1](totalPages);
        const startNo = Math.min(count, 1 + pageSize * (page - 1));
        const endNo = Math.min(count, pageSize * page);
        if (startNo === NaN) startNo = 0;
        if (endNo === NaN) endNo = 0;
        pageRangeState[1]([startNo, endNo]);
    }, [page, pageSize, count]);

    return (
        <div className={`row ml-0 mr-0 pagination ${className}`} {...props}>
            <div className="align-center-vh mr-2">
                <Typography noWrap className="c-blue">
                    Rows per page:
          </Typography>
            </div>
            <div className="align-center-vh mr-5">
                <Select
                    native
                    value={pageSize ?? 10}
                    onChange={(e) => {
                        if (onChange) onChange(1, parseInt(e.target.value) ?? 10);
                    }}
                >
                    {[2, 5, 10, 15, 20, 25, 30].map((o, oi) => (
                        <option value={o} key={`Page-Option-${o}-${oi}`}>
                            {o}
                        </option>
                    ))}
                </Select>
            </div>

            <div className="align-center-vh">

                <Typography noWrap className='mr-3 c-blue'>
                    {`${pageRangeState[0][0]} - ${pageRangeState[0][1]} of ${count}`}
                </Typography>

                <div
                    className="left-arrow"
                    onClick={(e) => {
                        if (onChange) onChange(2, page - 1);
                    }}
                    disabled={pageRangeState[0][0] === 0 || pageRangeState[0][0] === 1}
                >
                    <i className="fas fa-chevron-left c-blue"></i>
                </div>


                <div
                    className="right-arrow"
                    onClick={(e) => {
                        if (onChange) onChange(2, page + 1);
                    }}
                    disabled={pageRangeState[0][1] >= count}
                >
                    <i className="fas fa-chevron-right c-blue"></i>
                </div>
            </div>

        </div>
    );
}

export default Pagination

