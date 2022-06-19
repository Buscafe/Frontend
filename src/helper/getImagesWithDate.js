import { getMetadata, listAll } from 'firebase/storage'

export const getImagesWithDate = async (ref) => { // args: ref is a reference to firebase storage path
    const imagesList = await listAll(ref);

    const promiseImagesWithDates = Promise.all(imagesList.items.map(async image => {
        const { timeCreated } = await getMetadata(image);

        return {
            image,
            createdAt: new Date(timeCreated),
        };
    }));
    const imagesWithDates = await promiseImagesWithDates;

    const orderByMostRecent = imagesWithDates.sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());
    return orderByMostRecent;
}