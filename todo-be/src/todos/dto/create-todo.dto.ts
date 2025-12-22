import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    example: 'Write Swagger docs',
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title: string;
}
