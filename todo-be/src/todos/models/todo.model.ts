import { ApiProperty } from '@nestjs/swagger';

export class TodoModel {
  @ApiProperty({
    example: '64f2c3d1b1a9c2f1e2d3a456',
    description: 'MongoDB ObjectId',
  })
  readonly _id!: string;

  @ApiProperty({
    example: 'Build NestJS backend',
  })
  readonly title!: string;

  @ApiProperty({
    example: false,
  })
  readonly completed!: boolean;

  @ApiProperty({
    example: '2025-01-01T10:00:00.000Z',
  })
  readonly createdAt!: string;

  @ApiProperty({
    example: '2025-01-01T10:05:00.000Z',
  })
  readonly updatedAt!: string;
}
