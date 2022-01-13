import React from 'react';
import { AdminUserTable, AdminUserForm } from './adminUser';
import { CountryForm, CountryTable } from './country';
import { StateForm, StateTable } from './state';
import { CityForm, CityTable, CityDelete } from './city';
import { CategoryForm, CategoryTable } from './category';
import { StartupTable } from './startup';
import { ProductForm, ProductTable } from './product';
import { FeatureForm, FeatureTable } from './feature';
// import { DescriptionTypeForm, DescriptionTypeTable } from './descriptionType'
// import { CouponForm, CouponTable } from './coupon';
// import { PromotionCodeForm, PromotionCodeTable } from './promotionCode';
// import { ShippingRateForm, ShippingRateTable } from './shippingRate';
// import { GalleryForm, GalleryTable } from './gallery';
import { CreateCategoryData } from './category/categoryTable/CreateCategoryData';
import { CreateStartupData } from './startup/startupTable/CreateStartupData';
import { CreateProductData } from './product/productTable/CreateProductData';
import { CreateAdminUserData } from './adminUser/adminUserTable/CreateAdminUserData';
// import { CreateDescriptionTypeData } from './descriptionType/descriptionTypeTable/CreateDescriptionTypeData';
import { CreateCountryData } from './country/countryTable/CreateCountryData';
import { CreateStateData } from './state/stateTable/CreateStateData';
import { CreateCityData } from './city/cityTable/CreateCityData';
import { CreateFeatureData } from './feature/featureTable/CreateFeatureData';
// import { CreateCouponData } from './coupon/couponTable/CreateCouponData';
// import { CreatePromotionCodeData } from './promotionCode/promotionCodeTable/CreatePromotionCodeData';
// import { CreateShippingRateData } from './shippingRate/shippingRateTable/CreateShippingRateData';
// import { CreateGalleryData } from './gallery/galleryTable/CreateGalleryData';
import {
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import api from '../../api';

function Database(props) {
    const [rows, setRows] = React.useState([]);
    const [filteredRows, setFilteredRows] = React.useState([]);
    const [historyChanged, setHistoryChanged] = React.useState(false);

    let history = useHistory();

    const {
        setLinkDisableObject
    } = props;

    const urlPath = window.location.pathname;
    let fetchUrl = '';
    let chosenFunction = function (params) { };
    if (urlPath === '/admin/admin-user' || urlPath === '/admin/admin-user/add') {
        fetchUrl = 'admin-user/getAllAdminUsers';
        chosenFunction = CreateAdminUserData;
    } else if (urlPath === '/admin/category' || urlPath === '/admin/category/add' || urlPath.includes('/admin/category/edit')) {
        fetchUrl = 'category/getAllCategories';
        chosenFunction = CreateCategoryData;
    } else if (urlPath === '/admin/feature' || urlPath === '/admin/feature/add' || urlPath.includes('/admin/feature/edit')) {
        fetchUrl = 'feature/getAllFeatures';
        chosenFunction = CreateFeatureData;
    } else if (urlPath === '/admin/startup' || urlPath === '/admin/startup/add' || urlPath.includes('/admin/startup/edit')) {
        fetchUrl = 'startup/getAllStartups';
        chosenFunction = CreateStartupData;
    } else if (urlPath === '/admin/product' || urlPath === '/admin/product/add' || urlPath.includes('/admin/product/edit')) {
        fetchUrl = 'product/getAllProducts';
        chosenFunction = CreateProductData;
    } else if (urlPath === '/admin/country' || urlPath === '/admin/country/add' || urlPath.includes('/admin/country/edit')) {
        fetchUrl = 'country/getAllCountries';
        chosenFunction = CreateCountryData;
    } else if (urlPath === '/admin/state' || urlPath === '/admin/state/add' || urlPath.includes('/admin/state/edit')) {
        fetchUrl = 'province/getAllStates';
        chosenFunction = CreateStateData;
    } else if (urlPath === '/admin/city' || urlPath === '/admin/city/add' || urlPath.includes('/admin/city/edit')) {
        fetchUrl = 'city/getAllCities';
        chosenFunction = CreateCityData;
    }

    history.listen((location, action) => {
        setRows([]);
        setFilteredRows([]);
        setHistoryChanged(!historyChanged);
        // if (historyChange) setHistoryChange(true);
        // else setHistoryChange(false);
    })

    // useEffect(() => {
    //     setRows([]);
    //     setFilteredRows([]);
    // }, [])


    React.useEffect(() => {
        // const sample = [
        //     CreateData(1, 'Cupcake', 'Donut', 'example@example.com', false),
        //     CreateData(2, 'Cupcake', 'Donut', 'example@example.com', true),
        //     CreateData(3, 'Cupcake', 'Donut', 'example@example.com', false),
        //     CreateData(4, 'Cupcake', 'Donut', 'example@example.com', false),
        // ];
        if (urlPath === '/admin/admin-user') {
            setLinkDisableObject({
                'dashboard': false,
                'admin': true,
                'category': false,
                'feature': false,
                'startup': false,
                'product': false,
                'country': false,
                'state': false,
                'city': false,
            });
        } else if (urlPath === '/admin/category') {
            setLinkDisableObject({
                'dashboard': false,
                'admin': false,
                'category': true,
                'feature': false,
                'startup': false,
                'product': false,
                'country': false,
                'state': false,
                'city': false,
            });
        } else if (urlPath === '/admin/feature') {
            setLinkDisableObject({
                'dashboard': false,
                'admin': false,
                'category': false,
                'feature': true,
                'startup': false,
                'product': false,
                'country': false,
                'state': false,
                'city': false,
            });
        } else if (urlPath === '/admin/startup') {
            setLinkDisableObject({
                'dashboard': false,
                'admin': false,
                'category': false,
                'feature': false,
                'startup': true,
                'product': false,
                'country': false,
                'state': false,
                'city': false,
            });
        } else if (urlPath === '/admin/product') {
            setLinkDisableObject({
                'dashboard': false,
                'admin': false,
                'category': false,
                'feature': false,
                'startup': false,
                'product': true,
                'country': false,
                'state': false,
                'city': false,
            });
        } else if (urlPath === '/admin/country') {
            setLinkDisableObject({
                'dashboard': false,
                'admin': false,
                'category': false,
                'feature': false,
                'startup': false,
                'product': false,
                'country': true,
                'state': false,
                'city': false,
            });
        } else if (urlPath === '/admin/state') {
            setLinkDisableObject({
                'dashboard': false,
                'admin': false,
                'category': false,
                'feature': false,
                'startup': false,
                'product': false,
                'country': false,
                'state': true,
                'city': false,
            });
        } else if (urlPath === '/admin/city') {
            setLinkDisableObject({
                'dashboard': false,
                'admin': false,
                'category': false,
                'feature': false,
                'startup': false,
                'product': false,
                'country': false,
                'state': false,
                'city': true,
            });
        } else {
            setLinkDisableObject({
                'dashboard': true,
                'admin': false,
                'category': false,
                'feature': false,
                'startup': false,
                'product': false,
                'country': false,
                'state': false,
                'city': false,
            });
        }
        if (fetchUrl !== '') {
            fetch(`${api}/${fetchUrl}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(data => {
                    const rows = data.data.map(obj => {
                        return chosenFunction(obj);
                    });
                    setRows(rows);
                    setFilteredRows(rows);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchUrl, urlPath, historyChanged]);

    return (
        <Switch>
            <Route path="/admin/admin-user/edit/:id">
                <AdminUserForm rows={rows} />
            </Route>
            <Route path="/admin/country/edit/:id">
                <CountryForm rows={rows} />
            </Route>
            <Route path="/admin/state/edit/:id">
                <StateForm rows={rows} />
            </Route>
            <Route path="/admin/city/edit/:id">
                <CityForm rows={rows} />
            </Route>
            <Route path="/admin/product/edit/:id">
                <ProductForm rows={rows} />
            </Route>
            <Route path="/admin/category/edit/:id">
                <CategoryForm rows={rows} />
            </Route>
            <Route path="/admin/feature/edit/:id">
                <FeatureForm rows={rows} />
            </Route>
            <Route path="/admin/city/delete">
                <CityDelete />
            </Route>
            <Route path="/admin/admin-user/add">
                <AdminUserForm rows={rows} />
            </Route>
            <Route path="/admin/country/add">
                <CountryForm rows={rows} />
            </Route>
            <Route path="/admin/state/add">
                <StateForm rows={rows} />
            </Route>
            <Route path="/admin/city/add">
                <CityForm rows={rows} />
            </Route>
            <Route path="/admin/category/add">
                <CategoryForm rows={rows} />
            </Route>
            <Route path="/admin/feature/add">
                <FeatureForm rows={rows} />
            </Route>
            <Route path="/admin/product/add">
                <ProductForm rows={rows} />
            </Route>
            <Route path="/admin/country">
                <CountryTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="name"
                    searchField="name"
                />
            </Route>
            <Route path="/admin/admin-user">
                <AdminUserTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="name"
                    searchField="name"
                />
            </Route>
            <Route path="/admin/state">
                <StateTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="name"
                    searchField="name"
                />
            </Route>
            <Route path="/admin/city">
                <CityTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="name"
                    searchField="name"
                />
            </Route>
            <Route path="/admin/category">
                <CategoryTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="name"
                    searchField="name"
                />
            </Route>
            <Route path="/admin/feature">
                <FeatureTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="name"
                    searchField="name"
                />
            </Route>
            <Route path="/admin/startup">
                <StartupTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="startupName"
                    searchField="startupName"
                />
            </Route>
            <Route path="/admin/product">
                <ProductTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="name"
                    searchField="name"
                />
            </Route>
        </Switch>
    );
}

export default Database;