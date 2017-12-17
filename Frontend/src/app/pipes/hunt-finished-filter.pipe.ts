import { Pipe, PipeTransform } from '@angular/core';
import { HuntInstance } from 'app/models/hunt-instance';
import { HuntStatus } from 'app/models/hunt-status';

@Pipe({
  name: 'huntFinishedFilter'
})
export class HuntFinishedFilterPipe implements PipeTransform {

  transform(value: HuntInstance[], args?: any): any {
    if (!value) {
      return value;
    }

    return value.filter(x => x.status === HuntStatus.Finished);
  }

}
