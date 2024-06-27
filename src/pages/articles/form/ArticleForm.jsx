import { Button, Grid, TextField } from "@mui/material";
import useUser from "misc/hooks/useUser";
import React, { useState } from "react";
import FieldCategories from "./FieldCategories";

const ArticleForm = ({ article={}, onSubmit, onCancel }) => {
    const [errors, setErrors] = useState({});
    const user = useUser();
    const { title, text, year, field, journal, author } = article;
    const authorId = author?.id || null;
    const [formData, setFormData] = useState({
        title: title || '',
        text: text || '',
        year: year?.toString() || '',
        field: field || '',
        journal: journal || '',
        authorId: authorId || user.id
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }
        if (!formData.year.trim()) {
            newErrors.year = 'Year is required';
        } else if (isNaN(formData.year) || parseInt(formData.year) < 1000 || parseInt(formData.year) > 9999) {
            newErrors.year = 'Year must be a valid 4-digit number';
        }
        if (!formData.journal.trim()) {
            newErrors.journal = 'Journal is required';
        }
        if (!formData.field.trim()) {
            newErrors.field = 'Field is required';
        }
        if (Object.keys(newErrors).length === 0) {
            onSubmit(formData);
        } else {
            setErrors(newErrors);
        }
    };

    const handleCancel = () => {
        onCancel();
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        error={!!errors.title}
                        helperText={errors.title}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Text"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        error={!!errors.year}
                        helperText={errors.year}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Journal"
                        name="journal"
                        value={formData.journal}
                        onChange={handleChange}
                        error={!!errors.journal}
                        helperText={errors.journal}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FieldCategories
                        value={formData.field}
                        onFieldChange={handleChange}
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" color="error" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </form>
        );
};

export default ArticleForm;
