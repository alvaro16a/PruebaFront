import { ModuleModel } from './module.model';
import { CourseModel } from './course.model';
export interface NotaModel{
    studentName: string;
    average:number
    courses: Array<CourseModel>;
    modules: Array<ModuleModel>
}
//this.notas.map(nota => nota.courses.map(course => ))