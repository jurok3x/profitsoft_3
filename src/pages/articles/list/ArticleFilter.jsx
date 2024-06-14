
import { Box, TextField } from '@mui/material';
import FieldCategories from 'pages/articles/form/FieldCategories';
import React, { useCallback, useState } from 'react';

function ArticleFilter({ filter, onFilterChange }) {
    const { year: filterYear, title: filterTitle, field: filterField} = filter;

    const [title, setTitle] = useState(filterTitle);
    const [year, setYear] = useState(filterYear);
    const [activeYear, setActiveYear] = useState(filterYear);
    const [field, setField] = useState(filterField);

    const handleTitleChange = useCallback((event) => {
        const title = event.target.value;
        setTitle(title);
        onFilterChange({ title, field, year })
    }, [onFilterChange, title, field, year]);

    const handleFieldChange = useCallback((event) => {
        const field = event.target.value;
        setField(field);
        onFilterChange({ title, field, year })
    }, [onFilterChange, title, field, year]);

    const handleYearBlur = useCallback((event) => {
        const year = event.target.value;
        setYear(year);
        onFilterChange({ title, field, year })
    }, [onFilterChange, title, field, year]);

    const handleYearChange = useCallback((event) => {
        const activeYear = event.target.value;
        setActiveYear(activeYear);
    }, []);

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            display="flex"
            alignItems="center"
            noValidate
            autoComplete="off"
        >
            <TextField
                id="title-field"
                label="Title"
                type='search'
                variant="outlined"
                onChange={handleTitleChange}
                value={title}
                size='small'
            />
            <TextField
                id="year"
                label="Year"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                value={activeYear}
                onChange={handleYearChange}
                onBlur={handleYearBlur}
                size='small'
            />
            <FieldCategories
                value={field}
                onFieldChange={handleFieldChange}
            />
        </Box>
        );
    }

export default ArticleFilter;