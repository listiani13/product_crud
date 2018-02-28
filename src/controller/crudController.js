// @flow
import type {$Request as Req, $Response as Res} from 'express';
import Product from '../models/ProductModel';

type ReqBody = {
  id: string,
  name: string,
  description: string,
  price: number,
  photo: string,
};
type ExtReq = {body: ReqBody} & Req;

async function addNewProduct(req: ExtReq, res: Res) {
  console.log('Hello from crud controller!');
  let {id, name, description, price, photo} = req.body;
  if (
    id == null ||
    name == null ||
    description == null ||
    price == null ||
    photo == null
  ) {
    res.status(400).json({
      status: 'ERROR',
      message: 'Some data is not sent to the server',
    });
  } else {
    try {
      await Product.create({
        id,
        name,
        description,
        price,
        photo,
      });
      res.status(200).json({
        status: 'OK',
        message: 'The product has been added',
      });
    } catch (e) {
      res.status(500).json({
        status: 'ERROR',
        message: e.message,
      });
    }
  }
}

async function getProduct(req: ExtReq, res: Res) {
  let id = req.params.id;
  try {
    let productDetails = await Product.findOne({id});
    let dataStat;
    if (productDetails != null) {
      dataStat = {
        statusCode: 200,
        status: 'OK',
        message: `Here's the data : ${productDetails}`,
      };
    } else {
      dataStat = {
        statusCode: 404,
        status: 'NOT FOUND',
        message: `Data can not be found`,
      };
    }
    res.status(dataStat.statusCode).json({
      status: dataStat.status,
      message: dataStat.message,
    });
  } catch (e) {
    res.status(500).json({
      status: 'ERROR',
      message: e.message,
    });
  }
}

async function getAllProducts(req: ExtReq, res: Res) {
  try {
    let productList = await Product.find({});
    let dataStat;
    if (productList != null) {
      dataStat = {
        statusCode: 200,
        status: 'OK',
        message: productList,
      };
    } else {
      dataStat = {
        statusCode: 404,
        status: 'NOT FOUND',
        message: `Data can not be found`,
      };
    }
    res.status(dataStat.statusCode).json({
      status: dataStat.status,
      message: dataStat.message,
    });
  } catch (e) {
    res.status(500).json({
      status: 'ERROR',
      message: e.message,
    });
  }
}

async function editProduct(req: ExtReq, res: Res) {
  let {name, description, price, photo} = req.body;
  let id = req.params.id;
  try {
    await Product.findOneAndUpdate({id}, {name, description, price, photo});
    res.status(200).json({
      status: 'OK',
      message: 'EVERYTHING ISOKE',
    });
  } catch (e) {
    res.status(500).json({
      status: 'ERROR',
      message: e.message,
    });
  }
}

async function deleteProduct(req: ExtReq, res: Res) {
  let id = req.params.id;
  try {
    await Product.deleteOne({id});
    res.status(200).json({
      status: 'OK',
      message: 'Yay record has been deleted',
    });
  } catch (e) {
    res.status(500).json({
      status: 'ERROR',
      message: e.message,
    });
  }
}

export {addNewProduct, getProduct, getAllProducts, editProduct, deleteProduct};
