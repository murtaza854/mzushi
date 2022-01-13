export function CreateStateData(obj) {
    const data = {
        id: obj.id,
        name: obj.name,
        country: obj.country.name,
        active: obj.active,
    };
    return data;
}