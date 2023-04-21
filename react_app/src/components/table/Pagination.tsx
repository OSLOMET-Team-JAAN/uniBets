import React, {FC} from 'react';
import cl from '../../styles/Pagination.module.css'

interface Props {
    currentPage: number;
    totalPages: number;
    handlePagination: (pageNumber: number) => void;
}

const Pagination: FC<Props> = ({currentPage, totalPages, handlePagination,}) => {

    return (
        <>
            <div className={cl.pagination}>
                {/* --Case_1: Render Left side buttons -----------*/}
                {/* "Previous" buttons will be shown if 1st element inactive */}
                {currentPage !== 1 && (
                    <button
                        className={[cl.pageItem, cl.sides].join(' ')}
                        onClick={() => handlePagination(currentPage - 1)}
                        type="button"
                    >
                        {/*&laquo;*/}
                        Previous
                    </button>
                )}
                {/* --Case_2: Render 1st element --------------------*/}
                {/* 1st element will be visible always to bring user back to first page*/}
                <button
                    onClick={() => handlePagination(1)}
                    type="button"
                    className={`${cl.pageItem} ${currentPage === 1 ? cl.active : 1}`}
                >
                    {1}
                </button>
                {/* --Case_3: Render 2nd element - left side dots --------*/}
                {/* It will be visible when we have more than 3 pages (when page 4 is active)*/}
                {currentPage > 3 && <div className={cl.dots}
                >
                    &#8230;
                </div>}
                {/* ---Case_4: Render last active element --------------------*/}
                {currentPage === totalPages && totalPages > 3 && (
                    <button
                        onClick={() => handlePagination(currentPage - 2)}
                        type="button"
                        className={cl.pageItem}
                    >
                        {currentPage - 2}
                    </button>
                )}
                {/* --Case_5: Render 5th element --------------------*/}
                {currentPage > 2 && (
                    <button
                        onClick={() => handlePagination(currentPage - 1)}
                        type="button"
                        className={cl.pageItem}
                    >
                        {currentPage - 1}
                    </button>
                )}
                {/* --Case_6: Render 6th element --------------------*/}
                {currentPage !== 1 && currentPage !== totalPages && (
                    <button
                        onClick={() => handlePagination(currentPage)}
                        type="button"
                        className={[cl.pageItem, cl.active].join(' ')}
                    >
                        {currentPage}
                    </button>
                )}
                {/* --Case_7: Render penultimate element --------------------*/}
                {currentPage < totalPages - 1 && (
                    <button
                        onClick={() => handlePagination(currentPage + 1)}
                        type="button"
                        className={cl.pageItem}
                    >
                        {currentPage + 1}
                    </button>
                )}
                {/* --Case_8: Render 4th element when left dots invisible --------------------*/}
                {currentPage === 1 && totalPages > 3 && (
                    <button
                        onClick={() => handlePagination(currentPage + 2)}
                        type="button"
                        className={cl.pageItem}
                    >
                        {currentPage + 2}
                    </button>
                )}
                {/* -----------Case_9: right side dots --------*/}
                {currentPage < totalPages - 2 && <div className={cl.dots}
                >
                    &#8230;
                </div>}
                {/* Last active page will be visible always to deliver user to last page in any time */}
                <button
                    onClick={() => handlePagination(totalPages)}
                    type="button"
                    className={`${cl.pageItem} ${currentPage === totalPages ? cl.active : totalPages}`}
                >
                    {totalPages}
                </button>
                {/* ----------- Render Right side buttons --------*/}
                {/* It will be visible if last page is inactive */}
                {currentPage !== totalPages && (
                    <button
                        className={[cl.pageItem, cl.sides].join(' ')}
                        onClick={() => handlePagination(currentPage + 1)}
                        type="button"
                    >
                        {/*&raquo;*/}
                        Next
                    </button>
                )}
                Rows
            </div>
        </>

    );
};

export default Pagination;

// ------------------- REFERENCES -----------------------------------------
/*
    https://unicode-table.com/en/2026/
    https://javascript.plainenglish.io/building-a-pagination-component-in-react-with-typescript-2e7f7b62b35d
 */
