import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagramController } from './diagram.controller';
import { DiagramService } from './diagram.service';
import { DiagramEntity } from './models/diagram.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([DiagramEntity])
  ],
  controllers: [DiagramController],
  providers: [DiagramService]
})
export class DiagramModule {}
