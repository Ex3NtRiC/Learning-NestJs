import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProdutsController {
  constructor(private readonly productsServie: ProductService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
  ): Promise<{ id: string }> {
    const generatedId = await this.productsServie.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  async getProducts() {
    return await this.productsServie.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productsServie.getProduct(id);
    if (product) {
      return product;
    }
    throw new NotFoundException('Error Occured could not update');
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const foo = await this.productsServie.updateProduct(
      id,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    if (foo) {
      return foo;
    }
    throw new NotFoundException('Error Occured could not update');
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const foo = await this.productsServie.deleteProduct(id);
    if (foo) {
      return foo;
    }
    throw new NotFoundException('Error Occured could not delete');
  }
}
