export function CreateFeatureData(obj) {
    const data = {
        id: obj._id,
        name: obj.name,
        active: obj.active,
    };
    return data;
}