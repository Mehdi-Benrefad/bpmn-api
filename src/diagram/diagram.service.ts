import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { Repository } from 'typeorm';
import { DiagramEntity } from './models/diagram.entity';
import { Diagram } from './models/diagram.interface';

@Injectable()
export class DiagramService {
    constructor(
        @InjectRepository(DiagramEntity) private readonly diagramRepository: Repository<DiagramEntity>
    ) {}

    create(diagram: Diagram): Observable<Diagram> {
        
                const newDiagram = new DiagramEntity();
                newDiagram.name = diagram.name;
                newDiagram.description = diagram.description;
                newDiagram.version = diagram.version;
                newDiagram.xmlcontent = diagram.xmlcontent;

                return from(this.diagramRepository.save(newDiagram)).pipe(
                    map((user: Diagram) => {
                        const {name, ...result} = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                )
    }


    findOne(id:number): Observable<Diagram>{
        return from(this.diagramRepository.findOne({id})).pipe(
            map((diagram: Diagram) => {
                const {name, ...result} = diagram;
                //console.log(result);
                return result;
            } )
        )
    }


    findAll(): Observable<Diagram[]>{
        return from(this.diagramRepository.find());
    }

    deleteOne(id:number): Observable<any>{
        return from(this.diagramRepository.delete(id));
    }

    updateOne(id:number , diagram:Diagram): Observable<any>{
        return from(this.diagramRepository.update(id , diagram));
    }
}
