export function CreateAdminUserData(obj) {
    const data = {
        id: obj.id,
        name: obj.name,
        fileName: obj.fileName,
        imagePath: obj.imagePath,
        comingSoon: obj.comingSoon,
        active: obj.active,
        homePage: obj.homePage,
        ourStoryPage: obj.ourStoryPage,
    };
    return data;
}