import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryResolver } from './entry.resolver';
import { PrismaModule } from '../../providers/prisma/prisma.module';
import { NoteModule } from '../../modules/note/note.module';
import { NoteService } from '../../modules/note/note.service';
import { PrismaService } from '../../providers/prisma/prisma.service';

@Module({
  providers: [EntryResolver, EntryService, NoteService, PrismaService],
  imports: [PrismaModule, NoteModule],
  exports: [EntryService],
})
export class EntryModule {}
