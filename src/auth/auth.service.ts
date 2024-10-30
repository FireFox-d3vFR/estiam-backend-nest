import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findByUsername(username);

        const hashMatch = await compare(password, user.password);

        if (!hashMatch) {
            return null;
        }

        const { password: _, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }

    async login(user: any) {
        return {
            access_token: this.jwtService.sign({
                username: user.username,
                sub: user.id,
                role: user.role,
            }),
        };
    }
}
