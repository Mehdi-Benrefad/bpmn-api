import { Body, Controller, Delete, Get, Param, Post, Put,Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { DiagramService } from './diagram.service';
import { Diagram } from './models/diagram.interface';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

export const storage = {
    storage: diskStorage({
        destination: './uploads/diagrams',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`)
        }
    })
}


@Controller('diagram')
export class DiagramController {

    constructor(private diagramService: DiagramService) { }
 
    @Post()
    create(@Body() diagram:Diagram): Observable<Diagram | Object>{
        return this.diagramService.create(diagram).pipe(
            map((diagramr: Diagram) => diagram),
            catchError(err => of({ error: err.message }))
        );
        //return this.diagramService.create(diagram);
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
    updateOne(@Param('id')id:string, @Body() diagram: Diagram): Observable<any>{
        return this.diagramService.updateOne(Number(id) , diagram);
    }

    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file', storage))
    uploadFile(@UploadedFile() file, @Param('id')id:string): Observable<Object> {
        //on recupere l'utilisateur a partir de la requette.
        const diagramid = Number(id);

        return this.diagramService.updateOne(diagramid, {xmlcontent: file.filename}).pipe(
            tap((diagram: Diagram) => console.log(diagram)),
            map((diagram:Diagram) => ({xmlcontent: diagram.xmlcontent}))
        )
        //return of({imagepath: file.path})
    }

}
