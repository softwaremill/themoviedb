import * as React from "react";
import "./pagination.css";

interface PaginationProps {
    currPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export class Pagination extends React.Component<PaginationProps, {}> {

     private pagination(currentPage: number, totalPages: number): number[] {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        let l;

        range.push(1);

        if (totalPages <= 1) {
            return range;
        }

        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
            if (i < totalPages && i > 1) {
                range.push(i);
            }
        }
        range.push(totalPages);

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push(-1);
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    }
    
    render() {
        const pages = this.pagination(this.props.currPage, this.props.totalPages);
        return <div className="ui floated right pagination menu">
            <a className={"icon item" + (this.props.currPage <= 1 ? " disabled" : "")}
                onClick={() => this.props.onPageChange(this.props.currPage - 1)}>
                <i className="left chevron icon"/>
            </a>
            {pages.map((page, idx) => <a
                className={"item" + (this.props.currPage == page ? " active" : "")}
                onClick={() => {
                    if (page > 0) {
                        this.props.onPageChange(page);
                    }
                }}
                key={`page/${idx}`}>
                {page < 0 ? '...' : page}
            </a>)}
            <a className={"icon item" + (this.props.currPage >= this.props.totalPages ? " disabled" : "")}
                onClick={() => this.props.onPageChange(this.props.currPage + 1)}>
                <i className="right chevron icon"/>
            </a>
        </div>
    }
}
