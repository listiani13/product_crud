// @flow
import File from '../models/FileModel';
import formidable from 'formidable';
import fs from 'fs';
import {insertFileData} from '../globals/helper';
import path from 'path';

import type {$Request as Req, $Response as Res} from 'express';
// QUESTION:how to write types for req in multipart form?
type ExtReq = Req;

export async function deleteFile(req: ExtReq, res: Res) {
  let id = req.params.id;
  try {
    let filePath = await File.findOne({id});
    await fs.unlink(filePath.photoLoc);
    await File.deleteOne({id});
    res.status(200).json({
      status: 'OK',
      message: `This file has been deleted`,
    });
  } catch (e) {
    res.status(500).json({
      status: 'ERROR',
      message: e.message,
    });
  }
}

export async function getFile(req: ExtReq, res: Res) {
  let id = req.params.id;
  try {
    // OPTION ONE: Get file from db
    /*
    let filePath = await File.findOne({id});
    if (filePath != null) {
      let existingFile = fs.createReadStream(filePath.photoLoc);
      existingFile.pipe(res);
      res.status(200);
    } else {
      res.status(404).json({
        status: 'NOT FOUND',
        message: 'NOT FOUND',
      });
    }
    */
    // OPTION TWO: Get file directly from folder
    let filePath = path.join(__dirname, '../uploads/', id);
    let existingFile = fs.createReadStream(filePath);
    if (existingFile) {
      existingFile.pipe(res);
      res.status(200);
    } else {
      res.status(404).json({
        status: 'NOT FOUND',
        message: 'NOT FOUND',
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 'SERVER ERROR',
      message: e.message,
    });
  }
}

export async function uploadFiles(req: ExtReq, res: Res) {
  // QUESTION: Is it ok to use multipart form? How to write flow types for this formidable thingy?
  let form = new formidable.IncomingForm();

  // QUESTION: is there any better way to do this?
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500);
      res.json({success: false});
    } else {
      let oldPath: string = files.myFiles.path;
      let name: string = files.myFiles.name;
      let newPath: string = path.join(__dirname, '../uploads/', name);
      let readStream = fs.createReadStream(oldPath);
      let writeStream = fs.createWriteStream(newPath);
      try {
        readStream.pipe(writeStream);
        insertFileData(newPath);
        res.status(200);
        res.json({status: 'OK', message: 'File has been uploaded!'});
      } catch (e) {
        res.status(500);
        res.json({errorMes: err.message});
      }
    }
  });
}
