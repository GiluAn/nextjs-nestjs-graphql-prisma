import { NODE_ENV } from '@environments';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: NODE_ENV !== `production`,
      playground: NODE_ENV !== `production`,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      cors: {
        credentials: true,
        origin: true,
      },
      context: (context) => {
        console.log(context);
        return context;
        // console.log(req, connection);
      },
    }),
    PrismaModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
