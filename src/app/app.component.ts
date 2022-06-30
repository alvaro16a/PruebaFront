import { CourseModel } from './models/course.model';
import { GetStudentService } from './services/get-student.service';
import { SerieModel } from './models/serie.model';
import { ModuleModel } from './models/module.model';
import { NotaModel } from './models/nota.model';
import { DataModel } from './models/data.model';
import * as shape from 'd3-shape';
import { Component, EventEmitter, NgModule, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


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
  filtrando: boolean=false

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
  legendTitle: string="";

  constructor(private getStudentService: GetStudentService) {
    this.actualizarGrafica(this.idprogram);
  }

  ngOnInit(): void {}

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    console.log("función onSelect");
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
    console.log("función onActivate");
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    console.log("función onDeactivate");
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource(this.notas);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarEstudiante(student: any){
    if(this.filtrando == false){
      this.notasConvertida=this.notasConvertida.filter(nota => nota.name == student)
      this.filtrando=true;
    }else{
      this.notasConvertida = this.notas.map(nota => this.notaToData(nota));
      this.filtrando=false;
    }
  }

  btnActivado: boolean = false;
  activarIcono() {
    let botonVerEstudiantes = document.getElementById('botonVer');
    if(botonVerEstudiantes?.click ){
      if(this.btnActivado == false) {
        botonVerEstudiantes.style.color = "green";
        this.btnActivado = true;
      } else if(this.btnActivado == true){
        botonVerEstudiantes.style.color = "blue";
        this.btnActivado = false;
      }
    }
  }
}
