import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(
    title: string,
    desc: string,
    price: number,
  ): Promise<string> {
    const newProduct = new this.productModel({
      title: title,
      description: desc,
      price: price,
    });
    const result = await newProduct.save();
    return result._id as string;
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    console.log(products);
    return products;
  }

  async getProduct(id: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(id);
      if (product) {
        return product;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async updateProduct(
    id: string,
    title: string,
    desc: string,
    price: number,
  ): Promise<Product> {
    try {
      const product = await this.productModel.findById(id);
      if (product) {
        product.title = title;
        product.description = desc;
        product.price = price;
        const result = await product.save();
        return result;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async deleteProduct(id: string) {
    try {
      const product = await this.productModel.findById(id);
      if (product) {
        const result = await product.deleteOne();
        return result;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
