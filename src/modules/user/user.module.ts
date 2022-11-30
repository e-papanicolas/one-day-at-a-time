import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaModule } from '../../providers/prisma/prisma.module';
import { EntryModule } from '../../modules/entry/entry.module';
import { EntryService } from '../../modules/entry/entry.service';
import { PrismaService } from '../../providers/prisma/prisma.service';

@Module({
  providers: [UserResolver, UserService, EntryService, PrismaService],
  imports: [PrismaModule, EntryModule],
  exports: [UserService],
})
export class UserModule {}
