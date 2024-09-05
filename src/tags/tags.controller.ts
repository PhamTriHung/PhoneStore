import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { FilterTagDto } from './dto/filter-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { DeleteManyTagDto } from './dto/delete-many-tag.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Post()
  createTag(@Body(ValidationPipe) createTagDto: CreateTagDto) {
    return this.tagsService.createTag(createTagDto);
  }

  @Get()
  filterTag(@Query(ValidationPipe) filterTagDto: FilterTagDto) {
    return this.tagsService.filterTag(filterTagDto);
  }

  @Delete(':id')
  deleteTag(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.tagsService.deleteTag(id);
  }

  @Delete()
  deleteMany(@Body(ValidationPipe) deleteManyTagDto: DeleteManyTagDto) {
    return this.tagsService.deleteManyTag(deleteManyTagDto);
  }

  @Patch(':id')
  updatePatch(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updateTagDto: UpdateTagDto,
  ) {
    updateTagDto.id = id;
    return this.tagsService.updateTag(updateTagDto);
  }
}
