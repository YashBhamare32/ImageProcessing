import { ApiProperty } from "@nestjs/swagger"

export class loginDto{
    @ApiProperty({example:"User1" , description:"The username of the user"})
    username:string

    @ApiProperty({example:"password123" , description:"Password of the user"})
    password:string
}