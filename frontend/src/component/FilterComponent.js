import { IconButton, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
    input: {
        verticalAlign: 'middle',
        float: 'right',
        display: 'inline-block',
    },
    iconButton: {
        padding: '5px'
    }
});

const FilterComponent = ({ filterField, items, setFilteredItems, filterInput, setFilterInput }) => {

    const classes = useStyles();

    const filterItems = event => {
        setFilterInput(event.target.value);

        if (filterInput !== '') {
            const filteredData = items.filter(value => value[filterField].toLowerCase()
                .includes(filterInput.toLowerCase()));
            setFilteredItems(filteredData);

        } else {
            setFilteredItems(items);
        }
    }

    return (
        <TextField className={classes.input}
            label={'by ' + filterField.toUpperCase()}
            type='text'
            value={filterInput}
            onChange={filterItems}
            InputProps={{
                startAdornment: (
                    <InputAdornment position='start'>
                        <SearchOutlinedIcon />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton className={classes.iconButton}
                        onClick={() => setFilterInput('')}>
                            <CloseIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }} />
    );
}

export default FilterComponent;