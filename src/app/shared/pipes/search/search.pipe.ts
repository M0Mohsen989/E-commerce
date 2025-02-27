import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arr:any[] , searchkey:any): any[] {
    return arr.filter((current)=>current.title.toLowerCase().includes(searchkey.toLowerCase()))

  }

}