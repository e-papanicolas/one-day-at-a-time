import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteResolver } from './note.resolver';
import { PrismaModule } from '../../providers/prisma/prisma.module';
import { PrismaService } from '../../providers/prisma/prisma.service';

@Module({
  providers: [NoteResolver, NoteService, PrismaService],
  imports: [PrismaModule],
  exports: [NoteService],
})
export class NoteModule {}
