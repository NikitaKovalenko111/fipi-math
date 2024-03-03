import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
    app.use(cookieParser())
    await app.listen(process.env.PORT)
}
bootstrap()
