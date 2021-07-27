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
  addProduct(
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
  ): { id: string } {
    const generatedId = this.productsServie.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  getProducts() {
    return this.productsServie.products;
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsServie.getProduct(id);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const foo = this.productsServie.updateProduct(
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
  deleteProduct(@Param('id') id: string) {
    const foo = this.productsServie.deleteProduct(id);
    if (foo) {
      return foo;
    }
    throw new NotFoundException('Error Occured could not delete');
  }
}
