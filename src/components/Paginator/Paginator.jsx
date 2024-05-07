import { Pagination } from '@mui/material';
import React, { useCallback } from 'react';
import styles from './styles.module.css';

function Paginator ({ totalPages, onPageSelect, currentPage }) {

    const handleSelectPage = useCallback((event, value) => {
        onPageSelect(value);
    }, [ onPageSelect ]);
    
    return(
        <>
            <Pagination
                className={styles.paginator}
                count={totalPages}
                page={currentPage}
                onChange={handleSelectPage}
                variant="outlined"
                shape="rounded"
            />
        </>
    );
}

    export default Paginator;