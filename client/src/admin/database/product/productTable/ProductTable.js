import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { TableToolbar } from "../tableToolbar/TableToolbar";
import { TableHead } from '../tableHead/TableHead';
import { stableSort } from '../../stabalizedSort';
import { getComparator } from '../../comparator';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Col, Row } from 'react-bootstrap';
import { ImageList, ImageListItem } from '@mui/material';


export default function ProductTable(props) {

    const {
        rows,
        filteredRows,
        setFilteredRows,
        tableOrder,
        searchField
    } = props;

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState(tableOrder);
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchText, setSearchText] = React.useState('');
    const [open, setOpen] = React.useState([].fill(false, 0, rows.length));

    React.useEffect(() => {
        if (rows.length > 0) {
            setFilteredRows(rows.filter(row => {
                return row[searchField].toLowerCase().includes(searchText.toLowerCase());
            }));
        }
    }, [searchText, rows, setFilteredRows, searchField]);

    const handleSearch = event => {
        setSearchText(event.target.value);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = filteredRows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableToolbar selected={selected} handleSearch={handleSearch} searchText={searchText} numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <TableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={filteredRows.length}
                        />
                        {/* <TableBody> */}
                        {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                   filteredRows.slice().sort(getComparator(order, orderBy)) */}
                        {filteredRows.length > 0 && stableSort(filteredRows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableBody key={row.id}>
                                        <TableRow
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                    onChange={_ => { }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell>{row.productCode}</TableCell>
                                            <TableCell>{row.category}</TableCell>
                                            <TableCell>{row.price}</TableCell>
                                            <TableCell>{row.taxBehavior}</TableCell>
                                            <TableCell>{row.quantity}</TableCell>
                                            <TableCell>
                                                {row.active ? (
                                                    <CheckIcon />
                                                ) : (
                                                    <CloseIcon />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    aria-label="expand row"
                                                    size="small"
                                                    onClick={() => {
                                                        const openArray = [...open];
                                                        openArray[index] = !openArray[index];
                                                        setOpen(openArray);
                                                    }}
                                                >
                                                    {open[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                                                <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                                    <Box sx={{ margin: 1 }}>
                                                        <Typography variant="h5" gutterBottom component="div">
                                                            Product Details
                                                        </Typography>
                                                        <Row>
                                                            <Col md={6}>
                                                                <Typography variant="h6" gutterBottom>
                                                                    Story
                                                                </Typography>
                                                                <Typography variant="body2" gutterBottom>
                                                                    {row.story}
                                                                </Typography>
                                                            </Col>
                                                            <Col md={6}>
                                                                <Typography variant="h6" gutterBottom>
                                                                    Story Image
                                                                </Typography>
                                                                <Typography variant="body2" gutterBottom>
                                                                    <img src={row.storyImagePath} alt="storyImage" />
                                                                </Typography>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={6}>
                                                                <Typography variant="h6" gutterBottom>
                                                                    Short Description
                                                                </Typography>
                                                                <Typography variant="body2" gutterBottom>
                                                                    {row.shortDescription}
                                                                </Typography>
                                                                <Typography variant="body2" gutterBottom>
                                                                    {row.detailsKeys && row.detailsKeys.length > 0 ? (
                                                                        row.detailsKeys.map((key, index) => {
                                                                            return (
                                                                                <Typography key={index} variant="body2" gutterBottom>
                                                                                    <Typography variant="h6" gutterBottom>
                                                                                        {key}
                                                                                    </Typography>
                                                                                    {
                                                                                        row.details[key].map((detail, index) => {
                                                                                            return (
                                                                                                <Typography key={index} variant="body2" gutterBottom>
                                                                                                    {
                                                                                                        detail.label !== "" ? (
                                                                                                            <>{detail.label}: {detail.text}</>
                                                                                                        ) : (
                                                                                                            <>{detail.text}</>
                                                                                                        )
                                                                                                    }
                                                                                                </Typography>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                    {/* <Typography variant="body2" gutterBottom>
                                                                                        {row.details[key]}
                                                                                    </Typography> */}
                                                                                </Typography>
                                                                            )
                                                                        })
                                                                    ) : (
                                                                        <Typography variant="body2" gutterBottom>
                                                                            No details
                                                                        </Typography>
                                                                    )
                                                                    }
                                                                </Typography>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <Typography variant="h6" gutterBottom>
                                                                    Product Images
                                                                </Typography>
                                                                {
                                                                    row.images && row.images.length > 0 ? (
                                                                        <>
                                                                            <div className="margin-global-top-1" />
                                                                            <ImageList sx={{ height: 450 }} cols={6}>
                                                                                {row.images.map((item, index) => (
                                                                                    <ImageListItem key={item.path}>
                                                                                        <img
                                                                                            src={item.path}
                                                                                            srcSet={item.path}
                                                                                            alt="Preview"
                                                                                            loading="lazy"
                                                                                        />
                                                                                    </ImageListItem>
                                                                                ))}
                                                                            </ImageList>
                                                                        </>
                                                                    ) : null
                                                                }
                                                            </Col>
                                                        </Row>
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                        {/* </TableBody> */}
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}