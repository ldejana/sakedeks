import { NgModule } from "@angular/core";
import { MdButtonModule, MdCheckboxModule} from '@angular/material';
import { MdMenuModule } from '@angular/material';

@NgModule({
  imports: [MdButtonModule, MdCheckboxModule, MdMenuModule],
  exports: [MdButtonModule, MdCheckboxModule, MdMenuModule],
})
export class CustomMaterialModule { }