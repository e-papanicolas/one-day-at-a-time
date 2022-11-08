import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EntryModule } from 'src/entry/entry.module';
import { EntryService } from 'src/entry/entry.service';

@Module({
  providers: [UserResolver, UserService, EntryService],
  imports: [PrismaModule, EntryModule],
  exports: [UserService],
})
export class UserModule {}
