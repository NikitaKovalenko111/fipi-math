import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { MongooseModule } from '@nestjs/mongoose'
import { TasksModule } from './tasks/tasks.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import ProfileModule from './profile/profile.module'
import AuthMiddleware from './middlewares/auth.middleware'
import { VariantsModule } from './variants/variants.module'

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'tasks'),
        }),
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.CONNECTION_URL),
        TasksModule,
        AuthModule,
        UsersModule,
        ProfileModule,
        VariantsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                '/profile/delete',
                '/profile/change/username',
                '/auth/logout',
                '/profile/save/task',
                '/profile/save/variant',
                '/tasks/set/difficulty'
            )
    }
}
