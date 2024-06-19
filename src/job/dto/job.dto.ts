import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JobDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    image: any;

    @IsNotEmpty()
    status:string
}
