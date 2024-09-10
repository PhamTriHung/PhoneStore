import { NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { Repository, FindOptionsWhere } from 'typeorm';

export async function isDuplicate<T>(
  repository: Repository<T>,
  uniqueField: keyof T,
  value: any,
): Promise<boolean> {
  const whereCondition: FindOptionsWhere<T> = {
    [uniqueField]: value,
  } as FindOptionsWhere<T>;

  const existingRecord = await repository.findOne({ where: whereCondition });

  return !!existingRecord;
}

export async function findEntityById<T>(repository: Repository<T>, id) {
  const whereCondition: FindOptionsWhere<T> = {
    id,
  } as FindOptionsWhere<T>;

  try {
    const entity = await repository.findOneByOrFail(whereCondition);
    return entity;
  } catch (error) {
    throw new NotFoundException(
      `${repository.metadata.name} with id ${id} not found`,
    );
  }
}
