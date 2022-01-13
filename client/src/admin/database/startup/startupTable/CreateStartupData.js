import { formatAMPM } from "../../../../helperFunctions/formatAMPM";

export function CreateStartupData(obj) {
    console.log(obj);
    const imagePath = obj.logo.filePath;
    const activeDaysJSON = [
        { name: 'Monday', workingHourStart: 'Closed', workingHourEnd: 'Closed' },
        { name: 'Tuesday', workingHourStart: 'Closed', workingHourEnd: 'Closed' },
        { name: 'Wednesday', workingHourStart: 'Closed', workingHourEnd: 'Closed' },
        { name: 'Thursday', workingHourStart: 'Closed', workingHourEnd: 'Closed' },
        { name: 'Friday', workingHourStart: 'Closed', workingHourEnd: 'Closed' },
        { name: 'Saturday', workingHourStart: 'Closed', workingHourEnd: 'Closed' },
        { name: 'Sunday', workingHourStart: 'Closed', workingHourEnd: 'Closed' },
    ];
    obj.activeDays.forEach(element => {
        const daytime = activeDaysJSON.find(e => e.name === element.name);
        const startTime = new Date(element.workingHourStart);
        const endTime = new Date(element.workingHourEnd);
        daytime.workingHourStart = formatAMPM(startTime);
        daytime.workingHourEnd = formatAMPM(endTime);
    });
    const featuresString = obj.features.map(function (elem) {
        return elem.name;
    }).join(", ");
    let provincesString = obj.serviceProvinces.map(function (elem) {
        return elem.name;
    }).join(", ");
    if (obj.serviceProvinces.length === 0) provincesString = 'Not provided';

    let citiesString = obj.serviceCities.map(function (elem) {
        return elem.name;
    }).join(", ");
    if (obj.serviceCities.length === 0) citiesString = 'Not provided';

    let areasString = obj.serviceAreas;
    if (obj.serviceAreas.length === 0) areasString = 'Not provided';
    let accountSetup = obj.accountSetup;
    if (!obj.address) accountSetup = false;
    return {
        id: obj._id,
        startupName: obj.startupName,
        startupDescription: obj.description,
        imagePath: imagePath,
        alignment: obj.moneyClass,
        minPrice: obj.minPrice,
        maxPrice: obj.maxPrice,
        webUrl: obj.website,
        activeDaysJSON: activeDaysJSON,
        category: obj.category,
        featuresString: featuresString,
        address: obj.address,
        radios: { delivery: obj.delivery, service: obj.service },
        provincesString: provincesString,
        citiesString: citiesString,
        areasString: areasString,
        facebook: obj.facebookURL,
        instagram: obj.instagramURL,
        twitter: obj.twitterURL,
        youtube: obj.youtubeURL,
        accountSetup: accountSetup,
        active: obj.active,
    };
}