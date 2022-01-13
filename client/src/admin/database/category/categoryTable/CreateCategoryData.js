export function CreateCategoryData(obj) {
    const data = {
        id: obj.id,
        name: obj.name,
        fileName: obj.fileName,
        filePath: obj.image.filePath,
        active: obj.active,
        featured: obj.featured,
    };
    return data;
}