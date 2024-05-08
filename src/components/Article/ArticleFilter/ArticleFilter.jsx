
import { Box, TextField } from '@mui/material';
import MenuItem from 'components/MenuItem';
import React, { useCallback, useEffect, useState } from 'react';

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
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [field, setField] = useState('');

    const handleTitleChange = useCallback((event) => {
        const newTitle = event.target.value;
        setTitle(newTitle);
        onParamsChange({ title: newTitle, year, field});
    }, [ onParamsChange ]);

    const handleFieldChange = useCallback((event) => {
        const newField = event.target.value;
        setField(newField);
        onParamsChange({ title, year, field: newField});
    }, [ onParamsChange ]);

    const handleYearBlur = useCallback((event) => {
        const newYear = event.target.value;
        onParamsChange({ title, year: newYear, field });
    }, [ onParamsChange ]);

    const handleYearChange = useCallback((event) => {
        const newYear = event.target.value;
        setYear(newYear);
    }, [ onParamsChange ]);

    useEffect(() => {
        onFilterChange({ title, year, field});
    }, []);

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