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
