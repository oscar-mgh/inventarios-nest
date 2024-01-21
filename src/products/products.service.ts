import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaginationDTO } from '../common/dto/pagination.dto';
import { Product } from './entities';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const { ...productDetails } = createProductDto;
      const product = this.productRepository.create({
        ...productDetails,
      });
      await this.productRepository.save(product);
      return { ...product };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDTO: PaginationDTO) {
    const { limit = 10, offset = 0 } = paginationDTO;
    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
    });

    return products.map((product) => ({
      ...product,
    }));
  }

  async findOne(id: number) {
    let product: Product;
    product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product ${id} could not be found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { ...toUpdate } = updateProductDto;
    const product = await this.productRepository.preload({ id, ...toUpdate });
    if (!product) {
      throw new NotFoundException(`Product with id: ${id} could not be found`);
    }
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(product);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleExceptions(error);
    }
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  private handleExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleExceptions(error);
    }
  }
}
