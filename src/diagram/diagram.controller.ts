import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';
import { DiagramService } from './diagram.service';
import { Diagram } from './models/diagram.interface';

@Controller('diagram')
export class DiagramController {

    constructor(private diagramService: DiagramService) { }
 
    @Post()
    create(@Body() diagram:Diagram): Observable<Diagram | Object>{
        return this.diagramService.create(diagram).pipe(
            map((diagramr: Diagram) => diagram),
            catchError(err => of({ error: err.message }))
        );
        //return this.userService.create(user);
    }

    @Get(':id')
    findOne(@Param()params:Diagram): Observable<Diagram>{
        return this.diagramService.findOne(params.id);
    }
    
    @Get()
    findAll(): Observable<Diagram[]>{
        return this.diagramService.findAll();
    }

    @Delete(':id')
    deleteOne(@Param('id') id:string):Observable<any>{
        return this.diagramService.deleteOne(Number(id));
    }


    @Put(':id')
    updateOne(@Param('id')id:string, @Body() user: Diagram): Observable<any>{
        return this.diagramService.updateOne(Number(id) , user);
    }
}
