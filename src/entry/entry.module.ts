import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryResolver } from './entry.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NoteModule } from 'src/note/note.module';
import { NoteService } from 'src/note/note.service';

@Module({
  providers: [EntryResolver, EntryService, NoteService],
  imports: [PrismaModule, NoteModule],
  exports: [EntryService],
})
export class EntryModule {}
