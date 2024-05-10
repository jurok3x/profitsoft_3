
import { Box, TextField } from '@mui/material';
import MenuItem from 'components/MenuItem';
import React, { useCallback, useState } from 'react';

const fields = [
    {
        value: '',
        label: 'All',
    },
    {
        value: 'BIOLOGY',
        label: 'Biology',
    },
    {
        value: 'MEDICINE',
        label: 'Medicine',
    },
    {
        value: 'PHYSICS',
        label: 'Physics',
    },
    {
        value: 'COMPUTER_SCIENCE',
        label: 'Computer Science',
    },
];

function ArticleFilter({ onFilterChange }) {
    const getFilterParameter = (parameter) => {
        const storedParameter = localStorage.getItem(parameter);
        return storedParameter ? storedParameter : '';
    };

    const [title, setTitle] = useState(getFilterParameter('title'));
    const [year, setYear] = useState(getFilterParameter('year'));
    const [activeYear, setActiveYear] = useState(getFilterParameter('year'));
    const [field, setField] = useState(getFilterParameter('field'));

    const handleTitleChange = useCallback((event) => {
        const title = event.target.value;
        setTitle(title);
        localStorage.setItem('title', title);
        onFilterChange({ title, field, year })
    }, []);

    const handleFieldChange = useCallback((event) => {
        const field = event.target.value;
        setField(field);
        localStorage.setItem('field', field);
        onFilterChange({ title, field, year })
    }, []);

    const handleYearBlur = useCallback((event) => {
        const year = event.target.value;
        setYear(year);
        localStorage.setItem('year', year);
        onFilterChange({ title, field, year })
    }, []);

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
            <TextField
                id="select-field"
                select
                label="Field"
                size='small'
                onChange={handleFieldChange}
                value={field}
            >
                {fields.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
        );
    }

export default ArticleFilter;