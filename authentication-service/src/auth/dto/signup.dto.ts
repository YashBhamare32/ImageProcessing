import { ApiProperty } from "@nestjs/swagger"

export class SignupDto{
    @ApiProperty({example:"User1" , description:"Username of the user"})
    username:string

    @ApiProperty({example:"password123" , description:"Password of the user"})
    password:string

    @ApiProperty({example:"1234" , description:"Tid of the user"})
    tid : string

    @ApiProperty({example:"1234" , description:"Oid of the user"})
    oid : string

    @ApiProperty({example:"1234" , description:"Aud of the user"})
    aud : string

    @ApiProperty({example:"1234" , description:"Azp of the user"})
    azp:string 

    @ApiProperty({example:["User2" , "User3"] , description:"Array of strings"})
    name : string[]
}