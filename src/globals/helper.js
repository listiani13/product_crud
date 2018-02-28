// @flow
import File from '../models/FileModel';

export async function insertFileData(newPath: string) {
  try {
    let newID = Number(await getLatestFileID()) + 1;
    await File.create({
      id: newID,
      photoLoc: newPath,
    });
  } catch (e) {
    console.log('error occured', e);
  }
}
async function getLatestFileID() {
  try {
    // Sort desc
    let id = await File.find({})
      .sort({id: -1})
      .limit(1);
    return id[0].id;
  } catch (e) {
    console.log(e);
  }
}
