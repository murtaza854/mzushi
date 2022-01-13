export function CreateCityData(obj) {
    const data = {
        id: obj.id,
        name: obj.name,
        state: obj.province.name,
        country: obj.province.country.name,
        active: obj.active,
        featured: obj.featured,
    };
    return data;
}