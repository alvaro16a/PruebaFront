import { SerieModel } from './serie.model';
export interface DataModel{
    name: string;
    series: Array<SerieModel>; 
}