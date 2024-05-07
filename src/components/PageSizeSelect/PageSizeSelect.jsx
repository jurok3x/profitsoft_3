import { FormControl, InputLabel } from '@mui/material';
import MenuItem from 'components/MenuItem';
import Select from 'components/Select';
import React, { useCallback } from 'react';

import styles from './styles.module.css';

function PageSizeSelect ({ pageSize = 10, onPageSizeChange}) {

    const handlePageSizeChanged = useCallback((event) => {
        console.log(event.target.value)
        onPageSizeChange(event.target.value);
    }, [ onPageSizeChange ]);
    
    return(
        <>
            <FormControl className={styles.select}>
                <InputLabel id="page-size-select-label">Page size</InputLabel>
                <Select
                    labelId="page-size-select-label"
                    id="page-size-select"
                    label="Size"
                    onChange={handlePageSizeChanged}
                    value={pageSize}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                </Select>
            </FormControl>
        </>
    );
}

    export default PageSizeSelect;