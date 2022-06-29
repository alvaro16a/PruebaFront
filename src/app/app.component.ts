import { CourseModel } from './models/course.model';
import { GetStudentService } from './services/get-student.service';
import { SerieModel } from './models/serie.model';
import { ModuleModel } from './models/module.model';
import { NotaModel } from './models/nota.model';
import { DataModel } from './models/data.model';
import * as shape from 'd3-shape';
import { Component, NgModule, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  notasConvertida: Array<DataModel> = [];
  studentsName: Array<string> = []
  coursesName: string[] = []
  view: number[] = [1500, 800];
  notas: Array<any> = []
  courses: Array<CourseModel> = []
  studentScore: any

  coursesValues: Array<Array<any>> = []
  //options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Modulos';
  yAxisLabel: string = 'Calificacion';
  timeline: boolean = true;
  roundDomains: boolean = true;
  curve: any = shape.curveBumpX;
  idprogram: string = "ciclo-col-c2";


  constructor(private getStudentService: GetStudentService) {

    this.actualizarGrafica(this.idprogram);
  }

  ngOnInit(): void {

    //console.log(this.notasConvertida)
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


  moduleToserie(module: ModuleModel) {
    const serie: SerieModel = { name:`${module.nameModule} - ${module.nameCourse}` , value: module.score };
    return serie;
  }

  notaToData(nota: NotaModel) {
    const series: Array<SerieModel> = nota.modules.map(module => this.moduleToserie(module));
    const data: DataModel = { name: nota.studentName, series: series };
    return data;
  }

  actualizarGrafica(idProgram: string) {
    this.getStudentService.getStudentsGrades(idProgram)
      .subscribe((respuesta: any) => {
        this.notas = respuesta;
        this.notasConvertida = this.notas.map(nota => this.notaToData(nota));
        this.studentsName = this.notasConvertida.map(notaConvertida => notaConvertida.name)
        this.courses = this.notas.map(nota => nota.courses);
        this.coursesName = this.notas[0].courses.map((course: { nameCourse: string; }) => course.nameCourse);
        this.studentScore = this.notas.map(nota => nota.courses.map((course: { score: number; }) => course.score));
      })
  }
}
