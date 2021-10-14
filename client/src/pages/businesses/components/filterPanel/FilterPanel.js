import React, { useState } from 'react';
import { Row, Form } from 'react-bootstrap';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import './FilterPanel.scss';
import { Heading3 } from '../../../../components';

function FilterPanel(props) {
    const [alignment, setAlignment] = useState('');
    // const [mzushiChoice, setMzushiChoice] = useState(false);

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const closeFilterPanel = _ => {
        document.getElementById('filter-panel').classList.remove('active-filter-panel');
        document.getElementById('filter-panel').classList.add('remove-filter-panel');
        document.getElementById('overlay').classList.remove('active-overlay');
        document.getElementById('overlay').classList.add('remove-overlay');
        document.body.classList.remove('disable-scroll');
    }

    return (
        <div id="filter-panel" className="filter-panel">
            <div className="filter-panel-container">
                <Row className="justify-content-center">
                    <ToggleButtonGroup
                        value={alignment}
                        size="small"
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                    >
                        <ToggleButton className="first-toggle" disableRipple={true} value="left" aria-label="left aligned">
                            <strong className="bold-900">$</strong>
                        </ToggleButton>
                        <ToggleButton disableRipple={true} className="square-toggle" value="center" aria-label="centered">
                            <strong className="bold-900">$$</strong>
                        </ToggleButton>
                        <ToggleButton disableRipple={true} className="square-toggle" value="right" aria-label="right aligned">
                            <strong className="bold-900">$$$</strong>
                        </ToggleButton>
                        <ToggleButton className="last-toggle" disableRipple={true} value="justify" aria-label="justified">
                            <strong className="bold-900">$$$$</strong>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Row>
                <div className="margin-global-top-3" />
                <Row className="justify-content-center">
                    <div className="filter-panel-section-width">
                        <Form.Check
                            className="center-relative-vertical bold-600"
                            type='checkbox'
                            id="service"
                            label="mzushi’s choice"
                        // checked={radios.service}
                        // onClick={handleServiceClick}
                        // onChange={_ => { }}
                        />
                    </div>
                    {/* </Row> */}
                    <div className="margin-global-top-2" />
                    {/* <Row className="justify-content-center"> */}
                    <div className="filter-panel-section-width">
                        <Heading3
                            text="Features"
                            blue=""
                            classes="fit-content"
                            text2=""
                        />
                        <div className="filter-panel-section-list">
                            <Form.Check
                                type='checkbox'
                                id="service"
                                label="Lorem Ipsum"
                            // checked={radios.service}
                            // onClick={handleServiceClick}
                            // onChange={_ => { }}
                            />
                            <Form.Check
                                type='checkbox'
                                id="service"
                                label="Lorem Ipsum"
                            // checked={radios.service}
                            // onClick={handleServiceClick}
                            // onChange={_ => { }}
                            />
                            <Form.Check
                                type='checkbox'
                                id="service"
                                label="Lorem Ipsum"
                            // checked={radios.service}
                            // onClick={handleServiceClick}
                            // onChange={_ => { }}
                            />
                            <Form.Check
                                type='checkbox'
                                id="service"
                                label="Lorem Ipsum"
                            // checked={radios.service}
                            // onClick={handleServiceClick}
                            // onChange={_ => { }}
                            />
                            <Form.Check
                                type='checkbox'
                                id="service"
                                label="Lorem Ipsum"
                            // checked={radios.service}
                            // onClick={handleServiceClick}
                            // onChange={_ => { }}
                            />
                        </div>
                    </div>
                    {/* </Row> */}
                    <div className="margin-global-top-2 hide-1200 unhide-576" />
                    {/* <Row className="justify-content-center"> */}
                    <div className="filter-panel-section-width">
                        <Heading3
                            text="Province"
                            blue=""
                            classes="fit-content"
                            text2=""
                        />
                        <div className="filter-panel-section-list">
                            <Form.Check
                                type='checkbox'
                                id="service"
                                label="Lorem Ipsum"
                            // checked={radios.service}
                            // onClick={handleServiceClick}
                            // onChange={_ => { }}
                            />
                            <Form.Check
                                type='checkbox'
                                id="service"
                                label="Lorem Ipsum"
                            // checked={radios.service}
                            // onClick={handleServiceClick}
                            // onChange={_ => { }}
                            />
                            <Form.Check
                                type='checkbox'
                                id="service"
                                label="Lorem Ipsum"
                            // checked={radios.service}
                            // onClick={handleServiceClick}
                            // onChange={_ => { }}
                            />
                            <Form.Check
                                type='checkbox'
                                id="service"
                                label="Lorem Ipsum"
                            // checked={radios.service}
                            // onClick={handleServiceClick}
                            // onChange={_ => { }}
                            />
                            <Form.Check
                                type='checkbox'
                                id="service"
                                label="Lorem Ipsum"
                            // checked={radios.service}
                            // onClick={handleServiceClick}
                            // onChange={_ => { }}
                            />
                        </div>
                    </div>
                    {/* </Row> */}
                    <div className="margin-global-top-2 hide-1200 unhide-576" />
                    {/* <Row className="justify-content-center"> */}
                    <div className="filter-panel-section-width">
                        <Heading3
                            text="City"
                            blue=""
                            classes="fit-content"
                            text2=""
                        />
                        <div className="filter-panel-section-list">
                            <Form.Check
                                type='checkbox'
                                id="service"
                                label="Lorem Ipsum"
                            // checked={radios.service}
                            // onClick={handleServiceClick}
                            // onChange={_ => { }}
                            />
                            <Form.Check
                                type='checkbox'
                                id="service"
                                label="Lorem Ipsum"
                            // checked={radios.service}
                            // onClick={handleServiceClick}
                            // onChange={_ => { }}
                            />
                            <Form.Check
                                type='checkbox'
                                id="service"
                                label="Lorem Ipsum"
                            // checked={radios.service}
                            // onClick={handleServiceClick}
                            // onChange={_ => { }}
                            />
                            <Form.Check
                                type='checkbox'
                                id="service"
                                label="Lorem Ipsum"
                            // checked={radios.service}
                            // onClick={handleServiceClick}
                            // onChange={_ => { }}
                            />
                            <Form.Check
                                type='checkbox'
                                id="service"
                                label="Lorem Ipsum"
                            // checked={radios.service}
                            // onClick={handleServiceClick}
                            // onChange={_ => { }}
                            />
                        </div>
                    </div>
                    {/* </Row> */}
                    <div className="margin-global-top-2 hide-1200 unhide-576" />
                    {/* <Row className="justify-content-center"> */}
                    <div className="filter-panel-section-width">
                        <Heading3
                            text="Area"
                            blue=""
                            classes="fit-content"
                            text2=""
                        />
                        <div className="filter-panel-section-list">
                            <Form.Check
                                type='checkbox'
                                id="service"
                                label="Lorem Ipsum"
                            // checked={radios.service}
                            // onClick={handleServiceClick}
                            // onChange={_ => { }}
                            />
                            <Form.Check
                                type='checkbox'
                                id="service"
                                label="Lorem Ipsum"
                            // checked={radios.service}
                            // onClick={handleServiceClick}
                            // onChange={_ => { }}
                            />
                            <Form.Check
                                type='checkbox'
                                id="service"
                                label="Lorem Ipsum"
                            // checked={radios.service}
                            // onClick={handleServiceClick}
                            // onChange={_ => { }}
                            />
                            <Form.Check
                                type='checkbox'
                                id="service"
                                label="Lorem Ipsum"
                            // checked={radios.service}
                            // onClick={handleServiceClick}
                            // onChange={_ => { }}
                            />
                            <Form.Check
                                type='checkbox'
                                id="service"
                                label="Lorem Ipsum"
                            // checked={radios.service}
                            // onClick={handleServiceClick}
                            // onChange={_ => { }}
                            />
                        </div>
                    </div>
                </Row>
                <Row className="unhide-1200">
                    <button onClick={closeFilterPanel} type="button">Filter panel</button>
                </Row>
            </div>
        </div>
    );
}

export default FilterPanel;