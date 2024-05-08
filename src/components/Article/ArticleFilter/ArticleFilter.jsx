
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
    const [field, setField] = useState(getFilterParameter('field'));

    const handleTitleChange = useCallback((event) => {
        const newTitle = event.target.value;
        setTitle(newTitle);
        localStorage.setItem('title', newTitle.toString());
        onFilterChange({ title: newTitle, year, field});
    }, [ onFilterChange, year, field ]);

    const handleFieldChange = useCallback((event) => {
        const newField = event.target.value;
        setField(newField);
        localStorage.setItem('field', newField.toString());
        onFilterChange({ title, year, field: newField});
    }, [ onFilterChange, title, year ]);

    const handleYearBlur = useCallback((event) => {
        const newYear = event.target.value;
        localStorage.setItem('year', newYear.toString());
        onFilterChange({ title, year: newYear, field });
    }, [ onFilterChange, title, field ]);

    const handleYearChange = useCallback((event) => {
        const newYear = event.target.value;
        setYear(newYear);
    }, [ ]);

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
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
                value={year}
                onChange={handleYearChange}
                onBlur={handleYearBlur}
                size='small'
            />
            <TextField
                id="select-field"
                select
                label="Field"
                helperText="Select field of science"
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