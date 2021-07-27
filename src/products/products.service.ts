import { Injectable } from '@nestjs/common';

import { Product } from './product.model';

@Injectable()
export class ProductService {
  products: Product[] = [];
  insertProduct(title: string, desc: string, price: number): string {
    const prodId = new Date().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }
  getProducts(): Product[] {
    return [...this.products];
  }
  getProduct(id: string): Product[] {
    return [...this.products.filter((prod) => prod.id === id)];
  }
  updateProduct(id: string, title: string, desc: string, price: number) {
    const product = this.products.filter((prod) => prod.id === id);
    if (product.length > 0) {
      product[0].title = title;
      product[0].description = desc;
      product[0].price = price;
      const copyArray = [...product];
      return copyArray[0];
    }
    return false;
  }
  deleteProduct(id: string) {
    const product = this.products.filter((prod) => prod.id === id);
    if (product.length > 0) {
      this.products = this.products.filter((prod) => prod.id !== id);
      const copyArray = [...product];
      return copyArray[0];
    }
    return false;
  }
}
