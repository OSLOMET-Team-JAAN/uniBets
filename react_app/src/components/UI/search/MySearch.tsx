import React from 'react';
import styles from '../../../styles/MySearch.module.css';

interface IFilter {
    value: string,
    filters?: any,
    handleSearch: (value: any, columnName: any) => void,
    placeholder?: string,
}

const MySearch = ({value, filters, handleSearch}: IFilter) => {
    return (
        <input
            type="search"
            value={filters[value] || ''}
            autoComplete="off"
            className={styles.mySearch}
            placeholder={`Search ${value}`}
            onChange={(event) => handleSearch(event.target.value, value)}
        />
    );
};

export default MySearch;