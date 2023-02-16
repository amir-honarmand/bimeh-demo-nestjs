import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";

describe('UsersService', () => {
    let usersService: UsersService;
    let usersController: UsersController;

    const mockUsersService = {
        createUser: jest.fn(dto => {
            return {
                ...dto
            }
        })
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService],
        })
            .overrideProvider(UsersService)
            .useValue(mockUsersService)
            .compile();

        usersService = module.get<UsersService>(UsersService);
        usersController = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(usersController).toBeDefined();
        expect(usersService).toBeDefined();
    });

    it('should create a user', () => {
        const dto = {
            mobile: ['88888888888', '99999999999'],
            email: 'amir456@gmail.com',
            password: '12345678'
        };
        
        expect(usersController.createUser(dto)).resolves.toStrictEqual(
            {
                "success": true,
                "msg": "OPERATION_COMPLETE",
                "status": 201,
                "meta": {}
            }
        );

        expect(mockUsersService.createUser).toHaveBeenCalledWith(dto);
    });

});