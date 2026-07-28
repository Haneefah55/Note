import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { auth } from "../lib/auth";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @All("*")
    async handler(@Req() req: Request, @Res() res: Response) {
        return auth.handler(req, res);
    }
}
