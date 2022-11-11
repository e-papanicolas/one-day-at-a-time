import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryResolver } from './entry.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NoteModule } from 'src/note/note.module';
import { NoteService } from 'src/note/note.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [EntryResolver, EntryService, NoteService, PrismaService],
  imports: [PrismaModule, NoteModule],
  exports: [EntryService],
})
export class EntryModule {}
