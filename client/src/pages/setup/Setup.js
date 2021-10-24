import React, { useEffect, useState, Fragment, useContext } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ClickButton, Heading1 } from '../../components';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import './Setup.scss';
import api from '../../api';
import { TextField } from '@material-ui/core';
import UserContext from '../../contexts/userContext';
import { useHistory } from 'react-router';

function Setup(props) {
    const user = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (user.userState) {
            if (user.userState.accountSetup) history.push('/');
        } else history.push('/login');
    }, [history, user.userState]);

    const [businessName, setBusinessName] = useState({ text: '', error: false, errorText: '' });
    const [businessDescription, setBusinessDescription] = useState({ text: '', error: false, errorText: '' });
    const [logo, setLogo] = useState({ picturePreview: '', imgURl: '', error: false });
    const [alignment, setAlignment] = useState('one');

    const [minPrice, setMinPrice] = useState({ text: '', error: false, errorText: '' });
    const [maxPrice, setMaxPrice] = useState({ text: '', error: false, errorText: '' });

    const [webUrl, setWebUrl] = useState({ text: '' });

    const [monday, setMonday] = useState({ check: false, startValue: null, endValue: null });
    const [tuesday, setTuesday] = useState({ check: false, startValue: null, endValue: null });
    const [wednesday, setWednesday] = useState({ check: false, startValue: null, endValue: null });
    const [thursday, setThursday] = useState({ check: false, startValue: null, endValue: null });
    const [friday, setFriday] = useState({ check: false, startValue: null, endValue: null });
    const [saturday, setSaturday] = useState({ check: false, startValue: null, endValue: null });
    const [sunday, setSunday] = useState({ check: false, startValue: null, endValue: null });

    const [categories, setCategories] = useState([]);

    const [features, setFeatures] = useState([]);

    const [province, setProvince] = useState({ value: [], error: false, errortext: '', readOnly: false });
    const [provinceList, setProvinceList] = useState([]);
    const [provinceLoading, setProvinceLoading] = useState(false);

    const [city, setCity] = useState({ value: [], error: false, errortext: '', readOnly: true });
    const [cityList, setCityList] = useState([]);
    const [cityLoading, setCityLoading] = useState(false);

    const [area, setArea] = useState({ value: [], error: false, errortext: '', readOnly: true });
    const [areaList, setAreaList] = useState([]);
    const [areaLoading, setAreaLoading] = useState(false);

    const [addressLine1, setAddressLine1] = useState({ text: '', error: false, errorText: '' });
    const [addressLine2, setAddressLine2] = useState({ text: '' });
    const [landmark, setLandmark] = useState({ text: '' })

    const [radios, setRadios] = useState({ delivery: true, service: false });

    const [provinceDS, setProvinceDS] = useState({ value: [], error: false, errortext: '', readOnly: false });
    const [provinceDSList, setProvinceDSList] = useState([]);
    const [provinceDSLoading, setProvinceDSLoading] = useState(false);

    const [cityDS, setCityDS] = useState({ value: [], readOnly: true });
    const [cityDSList, setCityDSList] = useState([]);
    const [cityDSLoading, setCityDSLoading] = useState(false);

    const [areaDS, setAreaDS] = useState({ value: [], readOnly: true });
    const [areaDSList, setAreaDSList] = useState([]);
    const [areaDSLoading, setAreaDSLoading] = useState(false);
    
    const [disabledBtn, setDisabledBtn] = useState(true);

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    const handleBusinessName = event => {
        if (event.target.value === '') setBusinessName({ text: event.target.value, errorText: 'Business name is required!', error: true });
        else setBusinessName({ text: event.target.value, errorText: '', error: false });
    }
    const handleBusinessDescription = event => {
        if (event.target.value === '') setBusinessDescription({ text: event.target.value, errorText: 'Business description is required!', error: true });
        else setBusinessDescription({ text: event.target.value, errorText: '', error: false });
    }
    const handleFileClick = _ => {
        document.getElementById('logo-upload').click();
    }
    const logoChange = event => {
        let reader = new FileReader();
        if (event.target.files && event.target.files[0]) {
            if (event.target.files[0].size / 1024 < 300) {
                reader.readAsDataURL(event.target.files[0]);
                const objectUrl = URL.createObjectURL(event.target.files[0]);
                reader.onload = ((theFile) => {
                    var image = new Image();
                    image.src = theFile.target.result;
                    setLogo(prevState => ({ ...prevState, picturePreview: event.target.files[0], imgURl: objectUrl, error: false }));

                    // image.onload = function () {
                    //     // access image size here 
                    //     console.log(this.width, this.height);
                    //     if (this.width / this.height !== 1) {
                    //         alert("Please upload a square logo.");
                    //     }
                    //     else {
                    //         setLogo(prevState => ({ ...prevState, picturePreview: objectUrl, imgURl: event.target.files[0] }));
                    //     }
                    // };
                });
            } else {
                setLogo(prevState => ({ ...prevState, error: true }));
                alert("Image is too large.")
            }
        }
    }
    const handleMinPrice = event => {
        const minprice = /^\d*\.?\d*$/;
        if (event.target.value === '') setMinPrice({ text: event.target.value, errorText: 'Minimum price is required!', error: true });
        else if (!event.target.value.match(minprice)) setMinPrice({ text: event.target.value, errorText: "Only numericals are allowed!", error: true });
        else setMinPrice({ text: event.target.value, errorText: '', error: false });
    }
    const handleMaxPrice = event => {
        const maxprice = /^\d*\.?\d*$/;
        if (event.target.value === '') setMaxPrice({ text: event.target.value, errorText: 'Maximum price is required!', error: true });
        else if (!event.target.value.match(maxprice)) setMaxPrice({ text: event.target.value, errorText: "Only numericals are allowed!", error: true });
        else setMaxPrice({ text: event.target.value, errorText: '', error: false });
    }
    const handleWebUrl = event => {
        const urlCheck = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/g;
        if (!event.target.value.match(urlCheck)) setWebUrl({ text: event.target.value, errorText: "Please enter a valid URL!", error: true });
        else setWebUrl({ text: event.target.value });
    }
    const handleMondayCheck = _ => {
        setMonday(prevState => ({ ...prevState, check: !monday.check }));
    }
    const handleTuesdayCheck = _ => {
        setTuesday(prevState => ({ ...prevState, check: !tuesday.check }));
    }
    const handleWednesdayCheck = _ => {
        setWednesday(prevState => ({ ...prevState, check: !wednesday.check }));
    }
    const handleThursdayCheck = _ => {
        setThursday(prevState => ({ ...prevState, check: !thursday.check }));
    }
    const handleFridayCheck = _ => {
        setFriday(prevState => ({ ...prevState, check: !friday.check }));
    }
    const handleSaturdayCheck = _ => {
        setSaturday(prevState => ({ ...prevState, check: !saturday.check }));
    }
    const handleSundayCheck = _ => {
        setSunday(prevState => ({ ...prevState, check: !sunday.check }));
    }

    const handleCategory = id => {
        const newArray = [...categories];
        for (let i = 0; i < newArray.length; i++) {
            const element = newArray[i];
            if (element._id === id) newArray[i].active = 'active';
            else newArray[i].active = '';
        }
        setCategories(newArray);
    }

    const handleFeatures = id => {
        const newArray = [...features];
        for (let i = 0; i < newArray.length; i++) {
            const element = newArray[i];
            if (element._id === id) {
                if (element.active === 'active') newArray[i].active = '';
                else newArray[i].active = 'active';
            }
        }
        setFeatures(newArray);
    }

    const changeProvince = async array => {
        if (array.length === 0) {
            setProvince({ value: array, error: true, errortext: 'Province is required!', readOnly: false });
            setCity({ value: [], error: false, errortext: '', readOnly: true });
            setArea({ value: [], error: false, errortext: '', readOnly: true });
        }
        else {
            setProvince({ value: array, error: false, errortext: '', readOnly: false });
            setCity({ value: [], error: false, errortext: '', readOnly: false });
            setArea({ value: [], error: false, errortext: '', readOnly: true });
        }
    }
    const handleProvinceSearch = async (query) => {
        setProvinceLoading(true);
        setProvinceList([]);
        const response = await fetch(`${api}/province/get-provinces-search?provinceText=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            credentials: 'include',
            withCredentials: true,
        });
        const content = await response.json();
        setTimeout(() => {
            setProvinceList(content.data);
            setProvinceLoading(false);
        }, 1000)
    };
    const filterByProvince = () => true;

    const changeCity = async array => {
        if (array.length === 0) {
            setCity({ value: array, error: true, errortext: 'City is required!', readOnly: false });
            setArea({ value: [], error: false, errortext: '', readOnly: false });
        }
        else {
            setCity({ value: array, error: false, errortext: '', readOnly: false });
            setArea({ value: [], error: false, errortext: '', readOnly: false });
        }
    }
    const handleCitySearch = async (query) => {
        setCityLoading(true);
        setCityList([]);
        const response = await fetch(`${api}/city/get-cities-search?cityText=${query}&provinces=${JSON.stringify(province.value)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            credentials: 'include',
            withCredentials: true,
        });
        const content = await response.json();
        setTimeout(() => {
            setCityList(content.data);
            setCityLoading(false);
        }, 1000)
    };
    const filterByCity = () => true;

    const changeArea = async array => {
        if (array.length === 0) setArea({ value: array, error: true, errortext: 'Area is required!', readOnly: false });
        else setArea({ value: array, error: false, errortext: '', readOnly: false });
    }
    const handleAreaSearch = async (query) => {
        setAreaLoading(true);
        setAreaList([]);
        const response = await fetch(`${api}/area/get-areas-search?areaText=${query}&cities=${JSON.stringify(city.value)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            credentials: 'include',
            withCredentials: true,
        });
        const content = await response.json();
        setTimeout(() => {
            setAreaList(content.data);
            setAreaLoading(false);
        }, 1000)
    };
    const filterByArea = () => true;

    const handleAddressLine1 = event => {
        if (event.target.value === '') setAddressLine1({ text: event.target.value, errorText: 'Address line 1 is required!', error: true });
        else setAddressLine1({ text: event.target.value, errorText: '', error: false });
    }
    const handleAddressLine2 = event => {
        setAddressLine2({ text: event.target.value });
    }
    const handleLandmark = event => {
        setLandmark({ text: event.target.value });
    }

    const changeProvinceDS = async array => {
        if (array.length === 0) {
            console.log(1)
            setProvinceDS({ value: array, error: true, errortext: 'Province(s) is required!', readOnly: false });
            setCityDS({ value: [], readOnly: true });
            setAreaDS({ value: [], readOnly: true });
        }
        else {
            setProvinceDS({ value: array, error: false, errortext: '', readOnly: false });
            setCityDS({ value: [], readOnly: false });
            setAreaDS({ value: [], readOnly: true });
        }
    }
    const handleProvinceDSSearch = async (query) => {
        setProvinceDSLoading(true);
        setProvinceDSList([]);
        const response = await fetch(`${api}/province/get-provinces-search?provinceText=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            credentials: 'include',
            withCredentials: true,
        });
        const content = await response.json();
        setTimeout(() => {
            setProvinceDSList(content.data);
            setProvinceDSLoading(false);
        }, 1000)
    };
    const filterByProvinceDS = () => true;

    const changeCityDS = async array => {
        if (array.length === 0) {
            setCityDS({ value: array, readOnly: false });
            setAreaDS({ value: [], readOnly: false });
        }
        else {
            setCityDS({ value: array, readOnly: false });
            setAreaDS({ value: [], readOnly: false });
        }
    }
    const handleCityDSSearch = async (query) => {
        setCityDSLoading(true);
        setCityDSList([]);
        const response = await fetch(`${api}/city/get-cities-search?cityText=${query}&provinces=${JSON.stringify(provinceDS.value)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            credentials: 'include',
            withCredentials: true,
        });
        const content = await response.json();
        setTimeout(() => {
            setCityDSList(content.data);
            setCityDSLoading(false);
        }, 1000)
    };
    const filterByCityDS = () => true;

    const changeAreaDS = async array => {
        if (array.length === 0) setAreaDS({ value: array, readOnly: false });
        else setAreaDS({ value: array, readOnly: false });
    }
    const handleAreaDSSearch = async (query) => {
        setAreaDSLoading(true);
        setAreaDSList([]);
        const response = await fetch(`${api}/area/get-areas-search?areaText=${query}&cities=${JSON.stringify(cityDS.value)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            credentials: 'include',
            withCredentials: true,
        });
        const content = await response.json();
        setTimeout(() => {
            setAreaDSList(content.data);
            setAreaDSLoading(false);
        }, 1000)
    };
    const filterByAreaDS = () => true;

    useEffect(() => {
        (async () => {
            const response = await fetch(`${api}/category/table-data`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const content = await response.json();
            const catList = [];
            let flag = false;
            content.data.forEach(element => {
                if (flag) element['active'] = '';
                else {
                    element['active'] = 'active';
                    flag = true;
                }
                catList.push(element);
            });
            setCategories(catList);
        })()
    }, []);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${api}/features/table-data`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const content = await response.json();
            const featureList = [];
            content.data.forEach(element => {
                element['active'] = '';
                featureList.push(element);
            });
            setFeatures(featureList);
        })()
    }, []);

    // useEffect(() => {
    //     setCategories([
    //         { _id: 0, name: 'Plumber', active: '' },
    //         { _id: 1, name: 'Plumber', active: '' },
    //         { _id: 2, name: 'Plumber', active: '' },
    //         { _id: 3, name: 'Plumber', active: '' },
    //         { _id: 4, name: 'Plumber', active: '' },
    //         { _id: 5, name: 'Plumber', active: '' },
    //         { _id: 6, name: 'Plumber', active: '' },
    //         { _id: 7, name: 'Plumber', active: '' },
    //         { _id: 8, name: 'Plumber', active: '' },
    //         { _id: 9, name: 'Plumber', active: '' },
    //         { _id: 10, name: 'Plumber', active: '' },
    //     ]);
    // }, []);

    // useEffect(() => {
    //     setFeatures([
    //         { _id: 0, name: 'Wifi', active: '' },
    //         { _id: 1, name: 'Wifi', active: '' },
    //         { _id: 2, name: 'Wifi', active: '' },
    //         { _id: 3, name: 'Wifi', active: '' },
    //         { _id: 4, name: 'Wifi', active: '' },
    //         { _id: 5, name: 'Wifi', active: '' },
    //         { _id: 6, name: 'Wifi', active: '' },
    //         { _id: 7, name: 'Wifi', active: '' },
    //         { _id: 8, name: 'Wifi', active: '' },
    //         { _id: 9, name: 'Wifi', active: '' },
    //         { _id: 10, name: 'Wifi', active: '' },
    //     ]);
    // }, []);

    const handleDeliveryClick = _ => {
        setRadios({ delivery: true, service: false })
    }

    const handleServiceClick = _ => {
        setRadios({ delivery: false, service: true })
    }
    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append(
            "image",
            // imageState.picturePreview
            logo.picturePreview
        );
        const activeDays = [];
        if (monday.check) activeDays.push({name: 'Monday', workingHourStart: monday.startValue, workingHourEnd: monday.endValue});
        if (tuesday.check) activeDays.push({name: 'Tuesday', workingHourStart: tuesday.startValue, workingHourEnd: tuesday.endValue});
        if (wednesday.check) activeDays.push({name: 'Wednesday', workingHourStart: wednesday.startValue, workingHourEnd: wednesday.endValue});
        if (thursday.check) activeDays.push({name: 'Thursday', workingHourStart: thursday.startValue, workingHourEnd: thursday.endValue});
        if (friday.check) activeDays.push({name: 'Friday', workingHourStart: friday.startValue, workingHourEnd: friday.endValue});
        if (saturday.check) activeDays.push({name: 'Saturday', workingHourStart: saturday.startValue, workingHourEnd: saturday.endValue});
        if (sunday.check) activeDays.push({name: 'Sunday', workingHourStart: sunday.startValue, workingHourEnd: sunday.endValue});
        const category = categories.find(element => element.active === 'active');
        delete category.active;
        const featuresList = features.filter(element => element.active === 'active');
        const finalFeaturesList = featuresList.forEach(function(v){ delete v.active });
        formData.append(
            "data",
            JSON.stringify({ businessName: businessName.text, businessDescription: businessDescription.text, alignment: alignment, minPrice: minPrice.text, maxPrice: maxPrice.text, webUrl: webUrl.text, activeDays, category, finalFeaturesList, area: area.value, addressLine1: addressLine1.text, addressLine2: addressLine2.text, landmark: landmark.text, radios, provinceDS: provinceDS.value, cityDS: cityDS.value, areaDS: areaDS.value, user: user.userState })
        );
        // console.log(logo.picturePreview);
        try {
            const response = await fetch(`${api}/startup/startup-setup`, {
                method: 'POST',
                headers: {
                    'Accept': 'multipart/form-data',
                    'Cache-Control': 'no-store'
                },
                body: formData
            });
            const content = await response.json();
            if (content.data) history.push("/__/auth/action?mode=accountSetup");
            else alert("Error setting up account, please contact support if this issue persists.");
        } catch (error) {
            alert("Error setting up account, please contact support if this issue persists.");
        }
    }

    useEffect(() => {
        let flag = true;
        if (businessName.error === true) flag = true;
        else if (businessName.text.length === 0) flag = true;
        else if (businessDescription.error === true) flag = true;
        else if (businessDescription.text.length === 0) flag = true;
        else if (logo.error === true) flag = true;
        else if (logo.imgURl === '') flag = true;
        else if (minPrice.error === true) flag = true;
        else if (minPrice.text.length === 0) flag = true;
        else if (maxPrice.error === true) flag = true;
        else if (maxPrice.text.length === 0) flag = true;
        else if (province.error === true) flag = true;
        else if (province.value.length === 0) flag = true;
        else if (city.error === true) flag = true;
        else if (city.value.length === 0) flag = true;
        else if (area.error === true) flag = true;
        else if (area.value.length === 0) flag = true;
        if (addressLine1.error === true) flag = true;
        else if (addressLine1.text.length === 0) flag = true;
        else if (provinceDS.error === true) flag = true;
        else if (provinceDS.value.length === 0) flag = true;
        else flag = false;
        setDisabledBtn(flag);
    }, [businessName, businessDescription, logo, minPrice, maxPrice, province, city, area, addressLine1, provinceDS]);

    return (
        <Container className="setup">
            <div className="margin-global-top-5" />
            <Row>
                <Col>
                    <Heading1
                        text="Your Journey Starts Here!"
                        classes="text-center"
                    />
                </Col>
            </Row>
            <Row>
                <Form onSubmit={onSubmit} className="form-style margin-global-top-1">
                    <input
                        type="password"
                        autoComplete="on"
                        value=""
                        style={{ display: 'none' }}
                        readOnly={true}
                    />
                    <Row className="justify-content-between">
                        <Col className="form-group-right" lg={6}>
                            <Row>
                                <Form.Group controlId="firstName">
                                    <Form.Label className="bold-600">Business Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={handleBusinessName}
                                        onBlur={handleBusinessName}
                                        value={businessName.text}
                                    />
                                    <div className="error-text">{businessName.errorText}</div>
                                </Form.Group>
                            </Row>
                            <div className="margin-global-top-2" />
                            <Row>
                                <Form.Group controlId="email">
                                    <Form.Label className="bold-600">Business Description</Form.Label>
                                    <textarea
                                        maxLength={1250}
                                        rows={7}
                                        onChange={handleBusinessDescription}
                                        onBlur={handleBusinessDescription}
                                        value={businessDescription.text}
                                    />
                                    <div className="error-text">{businessDescription.errorText}</div>
                                </Form.Group>
                            </Row>
                        </Col>
                        <Col className="form-group-left margin-global-top-2-xs" lg={6}>
                            <Form.Group controlId="firstName">
                                <Form.Label className="bold-600">Add your Logo Here</Form.Label>
                                <input onChange={logoChange} accept="image/*" type="file" id="logo-upload" style={{ display: 'none' }} />
                                <ClickButton
                                    text="Choose Here"
                                    onClick={handleFileClick}
                                    classes=""
                                />
                            </Form.Group>
                            {
                                logo.imgURl !== '' ? (
                                    <div>
                                        <div className="margin-global-top-2" />
                                        <img src={logo.imgURl} alt="Preview" />
                                    </div>
                                ) : null
                            }
                            {/* <div className="margin-global-top-2" />
                            <img
                                src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                                alt="Test"
                            /> */}
                        </Col>
                    </Row>
                    <Row className="justify-content-between">
                    </Row>
                    <div className="margin-global-top-4" />
                    <Row>
                        <Col lg={6} className="form-group-right">
                            <Row>
                                <Form.Group controlId="email">
                                    <ToggleButtonGroup
                                        value={alignment}
                                        size="small"
                                        exclusive
                                        onChange={handleAlignment}
                                        aria-label="text alignment"
                                    >
                                        <ToggleButton className="first-toggle" disableRipple={true} value="one" aria-label="left aligned">
                                            <strong className="bold-900">$</strong>
                                        </ToggleButton>
                                        <ToggleButton disableRipple={true} className="square-toggle" value="two" aria-label="centered">
                                            <strong className="bold-900">$$</strong>
                                        </ToggleButton>
                                        <ToggleButton disableRipple={true} className="square-toggle" value="three" aria-label="right aligned">
                                            <strong className="bold-900">$$$</strong>
                                        </ToggleButton>
                                        <ToggleButton className="last-toggle" disableRipple={true} value="four" aria-label="justified">
                                            <strong className="bold-900">$$$$</strong>
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Form.Group>
                            </Row>
                            <div className="margin-global-top-1" />
                            <Row>
                                <Form.Group as={Col} controlId="firstName">
                                    <Form.Label className="bold-600">Add your Price Range</Form.Label>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} xs={6} controlId="firstName">
                                    <Form.Label>Minimum Price</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={handleMinPrice}
                                        onBlur={handleMinPrice}
                                        value={minPrice.text}
                                    />
                                    <div className="error-text">{minPrice.errorText}</div>
                                </Form.Group>
                                <Form.Group as={Col} xs={6} controlId="firstName">
                                    <Form.Label>Maximum Price</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={handleMaxPrice}
                                        onBlur={handleMaxPrice}
                                        value={maxPrice.text}
                                    />
                                    <div className="error-text">{maxPrice.errorText}</div>
                                </Form.Group>
                            </Row>
                            <div className="margin-global-top-2" />
                            <Row>
                                <Form.Group as={Col} controlId="firstName">
                                    <Form.Label className="bold-600">Have a Website? [Optional]</Form.Label>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} lg={12} controlId="firstName">
                                    <Form.Label>Enter your URL</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={handleWebUrl}
                                        onBlur={handleWebUrl}
                                        value={webUrl.text}
                                    />
                                </Form.Group>
                            </Row>
                        </Col>
                        <Col className="form-group-left margin-global-top-2-xs" lg={6}>
                            <Row>
                                <Form.Label className="bold-600">Operational Days & Timings</Form.Label>
                            </Row>
                            <Row>
                                <Col className="datetime-col-xs" xs={3} />
                                <Col xs={4}>
                                    <Form.Label className="text-center">Starting Time</Form.Label>
                                </Col>
                                <Col xs={4}>
                                    <Form.Label className="text-center">Ending Time</Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Group className="datetime-col-xs" as={Col} xs={3} controlId="email">
                                    <Form.Check
                                        className="center-relative-vertical"
                                        type='checkbox'
                                        id="service"
                                        label="Monday"
                                        checked={monday.check}
                                        onChange={handleMondayCheck}
                                    />
                                </Form.Group>
                                <Form.Group className="less-padding" as={Col} xs={4} controlId="email">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileTimePicker
                                            label=""
                                            disabled={!monday.check}
                                            value={monday.startValue}
                                            onChange={(newValue) => {
                                                setMonday(prevState => ({ ...prevState, startValue: newValue }));
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Form.Group>
                                <Form.Group className="less-padding" as={Col} xs={4} controlId="email">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileTimePicker
                                            label=""
                                            disabled={!monday.check}
                                            value={monday.endValue}
                                            onChange={(newValue) => {
                                                setMonday(prevState => ({ ...prevState, endValue: newValue }));
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Form.Group>
                            </Row>
                            <div className="margin-global-top-06" />
                            <Row>
                                <Form.Group className="datetime-col-xs" as={Col} xs={3} controlId="email">
                                    <Form.Check
                                        className="center-relative-vertical"
                                        type='checkbox'
                                        id="service"
                                        label="Tuesday"
                                        checked={tuesday.check}
                                        onChange={handleTuesdayCheck}
                                    />
                                </Form.Group>
                                <Form.Group className="less-padding" as={Col} xs={4} controlId="email">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileTimePicker
                                            label=""
                                            disabled={!tuesday.check}
                                            value={tuesday.startValue}
                                            onChange={(newValue) => {
                                                setTuesday(prevState => ({ ...prevState, startValue: newValue }));
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Form.Group>
                                <Form.Group className="less-padding" as={Col} xs={4} controlId="email">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileTimePicker
                                            label=""
                                            disabled={!tuesday.check}
                                            value={tuesday.endValue}
                                            onChange={(newValue) => {
                                                setTuesday(prevState => ({ ...prevState, endValue: newValue }));
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Form.Group>
                            </Row>
                            <div className="margin-global-top-06" />
                            <Row>
                                <Form.Group className="datetime-col-xs" as={Col} xs={3} controlId="email">
                                    <Form.Check
                                        className="center-relative-vertical"
                                        type='checkbox'
                                        id="service"
                                        label="Wednesday"
                                        checked={wednesday.check}
                                        onChange={handleWednesdayCheck}
                                    />
                                </Form.Group>
                                <Form.Group className="less-padding" as={Col} xs={4} controlId="email">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileTimePicker
                                            label=""
                                            disabled={!wednesday.check}
                                            value={wednesday.startValue}
                                            onChange={(newValue) => {
                                                setWednesday(prevState => ({ ...prevState, startValue: newValue }));
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Form.Group>
                                <Form.Group className="less-padding" as={Col} xs={4} controlId="email">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileTimePicker
                                            label=""
                                            disabled={!wednesday.check}
                                            value={wednesday.endValue}
                                            onChange={(newValue) => {
                                                setWednesday(prevState => ({ ...prevState, endValue: newValue }));
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Form.Group>
                            </Row>
                            <div className="margin-global-top-06" />
                            <Row>
                                <Form.Group className="datetime-col-xs" as={Col} xs={3} controlId="email">
                                    <Form.Check
                                        className="center-relative-vertical"
                                        type='checkbox'
                                        id="service"
                                        label="Thursday"
                                        checked={thursday.check}
                                        onChange={handleThursdayCheck}
                                    />
                                </Form.Group>
                                <Form.Group className="less-padding" as={Col} xs={4} controlId="email">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileTimePicker
                                            label=""
                                            disabled={!thursday.check}
                                            value={thursday.startValue}
                                            onChange={(newValue) => {
                                                setThursday(prevState => ({ ...prevState, startValue: newValue }));
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Form.Group>
                                <Form.Group className="less-padding" as={Col} xs={4} controlId="email">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileTimePicker
                                            label=""
                                            disabled={!thursday.check}
                                            value={thursday.endValue}
                                            onChange={(newValue) => {
                                                setThursday(prevState => ({ ...prevState, endValue: newValue }));
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Form.Group>
                            </Row>
                            <div className="margin-global-top-06" />
                            <Row>
                                <Form.Group className="datetime-col-xs" as={Col} xs={3} controlId="email">
                                    <Form.Check
                                        className="center-relative-vertical"
                                        type='checkbox'
                                        id="service"
                                        label="Friday"
                                        checked={friday.check}
                                        onChange={handleFridayCheck}
                                    />
                                </Form.Group>
                                <Form.Group className="less-padding" as={Col} xs={4} controlId="email">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileTimePicker
                                            label=""
                                            disabled={!friday.check}
                                            value={friday.startValue}
                                            onChange={(newValue) => {
                                                setFriday(prevState => ({ ...prevState, startValue: newValue }));
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Form.Group>
                                <Form.Group className="less-padding" as={Col} xs={4} controlId="email">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileTimePicker
                                            label=""
                                            disabled={!friday.check}
                                            value={friday.endValue}
                                            onChange={(newValue) => {
                                                setFriday(prevState => ({ ...prevState, endValue: newValue }));
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Form.Group>
                            </Row>
                            <div className="margin-global-top-06" />
                            <Row>
                                <Form.Group className="datetime-col-xs" as={Col} xs={3} controlId="email">
                                    <Form.Check
                                        className="center-relative-vertical"
                                        type='checkbox'
                                        id="service"
                                        label="Saturday"
                                        checked={saturday.check}
                                        onChange={handleSaturdayCheck}
                                    />
                                </Form.Group>
                                <Form.Group className="less-padding" as={Col} xs={4} controlId="email">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileTimePicker
                                            label=""
                                            disabled={!saturday.check}
                                            value={saturday.startValue}
                                            onChange={(newValue) => {
                                                setSaturday(prevState => ({ ...prevState, startValue: newValue }));
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Form.Group>
                                <Form.Group className="less-padding" as={Col} xs={4} controlId="email">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileTimePicker
                                            label=""
                                            disabled={!saturday.check}
                                            value={saturday.endValue}
                                            onChange={(newValue) => {
                                                setSaturday(prevState => ({ ...prevState, endValue: newValue }));
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Form.Group>
                            </Row>
                            <div className="margin-global-top-06" />
                            <Row>
                                <Form.Group className="datetime-col-xs" as={Col} xs={3} controlId="email">
                                    <Form.Check
                                        className="center-relative-vertical"
                                        type='checkbox'
                                        id="service"
                                        label="Sunday"
                                        checked={sunday.check}
                                        onChange={handleSundayCheck}
                                    />
                                </Form.Group>
                                <Form.Group className="less-padding" as={Col} xs={4} controlId="email">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileTimePicker
                                            label=""
                                            disabled={!sunday.check}
                                            value={sunday.startValue}
                                            onChange={(newValue) => {
                                                setSunday(prevState => ({ ...prevState, startValue: newValue }));
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Form.Group>
                                <Form.Group className="less-padding" as={Col} xs={4} controlId="email">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileTimePicker
                                            label=""
                                            disabled={!sunday.check}
                                            value={sunday.endValue}
                                            onChange={(newValue) => {
                                                setSunday(prevState => ({ ...prevState, endValue: newValue }));
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Form.Group>
                            </Row>
                        </Col>
                    </Row>
                    <div className="margin-global-top-3" />
                    <Row>
                        <Form.Group as={Col} controlId="firstName">
                            <Form.Label className="bold-600">What Category does your Business fall in?</Form.Label>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} lg={8} controlId="firstName">
                            <Form.Label>Choose the Most Relevant Option</Form.Label>
                            <div className="form-yellow-buttons">
                                {
                                    categories.map((value, index) => {
                                        return (
                                            <div onClick={e => handleCategory(value._id)} key={index} className={`form-yellow-btn ${value.active}`}>
                                                {value.name}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-4" />
                    <Row>
                        <Form.Group as={Col} controlId="firstName">
                            <Form.Label className="bold-600">What Features does your Business offer?</Form.Label>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} lg={8} controlId="firstName">
                            <Form.Label>Choose the Option(s) that Apply</Form.Label>
                            <div className="form-yellow-buttons">
                                {
                                    features.map((value, index) => {
                                        return (
                                            <div onClick={e => handleFeatures(value._id)} key={index} className={`form-yellow-btn ${value.active}`}>
                                                {value.name}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-4" />
                    <Row>
                        <Form.Group as={Col} controlId="firstName">
                            <Form.Label className="bold-600">Business Address</Form.Label>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="form-group-right" as={Col} md={6} controlId="firstName">
                            <Form.Label>Province</Form.Label>
                            <AsyncTypeahead
                                filterBy={filterByProvince}
                                isLoading={provinceLoading}
                                id="province"
                                labelKey="name"
                                minLength={2}
                                onSearch={handleProvinceSearch}
                                inputProps={{
                                    readOnly: province.readOnly,
                                }}
                                onChange={changeProvince}
                                options={provinceList}
                                selected={province.value}
                                renderMenuItemChildren={(option, props) => (
                                    <Fragment>
                                        <span>{option.name}</span>
                                    </Fragment>
                                )}
                            />
                            <div className="error-text">{province.errortext}</div>
                        </Form.Group>
                        <Form.Group className="form-group-left" as={Col} md={6} controlId="firstName">
                            <Form.Label>Address Line 1</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={handleAddressLine1}
                                onBlur={handleAddressLine1}
                                value={addressLine1.text}
                            />
                            <div className="error-text">{addressLine1.errorText}</div>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="form-group-right" as={Col} md={6} controlId="firstName">
                            <Form.Label>City</Form.Label>
                            <AsyncTypeahead
                                filterBy={filterByCity}
                                isLoading={cityLoading}
                                id="city"
                                labelKey="name"
                                minLength={2}
                                onSearch={handleCitySearch}
                                inputProps={{
                                    readOnly: city.readOnly,
                                }}
                                onChange={changeCity}
                                options={cityList}
                                selected={city.value}
                                renderMenuItemChildren={(option, props) => (
                                    <Fragment>
                                        <span>{option.name}</span>
                                    </Fragment>
                                )}
                            />
                            <div className="error-text">{city.errortext}</div>
                        </Form.Group>
                        <Form.Group className="form-group-left" as={Col} md={6} controlId="firstName">
                            <Form.Label>Address Line 2 [Optional]</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={handleAddressLine2}
                                onBlur={handleAddressLine2}
                                value={addressLine2.text}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="form-group-right" as={Col} md={6} controlId="firstName">
                            <Form.Label>Area</Form.Label>
                            <AsyncTypeahead
                                filterBy={filterByArea}
                                isLoading={areaLoading}
                                id="area"
                                labelKey="name"
                                minLength={2}
                                onSearch={handleAreaSearch}
                                inputProps={{
                                    readOnly: area.readOnly,
                                }}
                                onChange={changeArea}
                                options={areaList}
                                selected={area.value}
                                renderMenuItemChildren={(option, props) => (
                                    <Fragment>
                                        <span>{option.name}</span>
                                    </Fragment>
                                )}
                            />
                            <div className="error-text">{area.errortext}</div>
                        </Form.Group>
                        <Form.Group className="form-group-left" as={Col} md={6} controlId="firstName">
                            <Form.Label>Nearest Landmark [Optional]</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={handleLandmark}
                                onBlur={handleLandmark}
                                value={landmark.text}
                            />
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-4" />
                    <Row>
                        <Form.Group as={Col} controlId="firstName">
                            <Form.Label className="bold-600">Delivery or Service Areas</Form.Label>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} xs={3} controlId="delivery">
                            <Form.Check
                                type='radio'
                                id="delivery"
                                label="Delivery"
                                checked={radios.delivery}
                                onClick={handleDeliveryClick}
                                onChange={_ => { }}
                            />
                        </Form.Group>
                        <Form.Group as={Col} xs={3} controlId="service">
                            <Form.Check
                                type='radio'
                                id="service"
                                label="Service"
                                checked={radios.service}
                                onClick={handleServiceClick}
                                onChange={_ => { }}
                            />
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-1" />
                    <Row>
                        <Form.Group className="form-group-right" as={Col} lg={6} controlId="firstName">
                            <Form.Label>Province</Form.Label>
                            <AsyncTypeahead
                                filterBy={filterByProvinceDS}
                                isLoading={provinceDSLoading}
                                id="provinceDS"
                                labelKey="name"
                                minLength={2}
                                inputProps={{
                                    readOnly: provinceDS.readOnly,
                                }}
                                multiple
                                onSearch={handleProvinceDSSearch}
                                onChange={changeProvinceDS}
                                options={provinceDSList}
                                selected={provinceDS.value}
                                renderMenuItemChildren={(option, props) => (
                                    <Fragment>
                                        <span>{option.name}</span>
                                    </Fragment>
                                )}
                            />
                            <div className="error-text">{provinceDS.errortext}</div>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="form-group-right" as={Col} lg={6} controlId="firstName">
                            <Form.Label>City [Optional]</Form.Label>
                            <AsyncTypeahead
                                filterBy={filterByCityDS}
                                isLoading={cityDSLoading}
                                id="cityDS"
                                labelKey="name"
                                minLength={2}
                                inputProps={{
                                    readOnly: cityDS.readOnly,
                                }}
                                multiple
                                onSearch={handleCityDSSearch}
                                onChange={changeCityDS}
                                options={cityDSList}
                                selected={cityDS.value}
                                renderMenuItemChildren={(option, props) => (
                                    <Fragment>
                                        <span>{option.name}</span>
                                    </Fragment>
                                )}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="form-group-right" as={Col} lg={6} controlId="firstName">
                            <Form.Label>Area [Optional]</Form.Label>
                            <AsyncTypeahead
                                filterBy={filterByAreaDS}
                                isLoading={areaDSLoading}
                                id="areaDS"
                                labelKey="name"
                                minLength={2}
                                inputProps={{
                                    readOnly: areaDS.readOnly,
                                }}
                                multiple
                                onSearch={handleAreaDSSearch}
                                onChange={changeAreaDS}
                                options={areaDSList}
                                selected={areaDS.value}
                                renderMenuItemChildren={(option, props) => (
                                    <Fragment>
                                        <span>{option.name}</span>
                                    </Fragment>
                                )}
                            />
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row className="justify-content-center">
                        <Button disabled={disabledBtn} type="submit">
                            Submit
                        </Button>
                    </Row>
                </Form>
            </Row>
        </Container>
    );
}

export default Setup;