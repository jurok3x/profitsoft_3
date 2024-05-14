import { TextField } from "@mui/material";
import MenuItem from "components/MenuItem";

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
    {
        value: 'CHEMISTRY',
        label: 'Chemistry',
    },
    {
        value: 'MATHEMATICS',
        label: 'Mathematics',
    },
    {
        value: 'ASTRONOMY',
        label: 'Astronomy',
    },
];

function FieldCategories({ value, onFieldChange, errors }) {

    return (
            <TextField
                fullWidth
                id="select-field"
                select
                label="Field"
                name="field"
                size='small'
                onChange={onFieldChange}
                value={value}
                error={!!errors?.field}
                helperText={errors?.field}
            >
                {fields.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        );
}

export default FieldCategories;