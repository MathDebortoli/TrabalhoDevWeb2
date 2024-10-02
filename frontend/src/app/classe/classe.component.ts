import { Component } from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-classe',
  standalone: true,
  imports: [FormsModule,MatNativeDateModule,MatFormFieldModule, MatInputModule,MatButtonModule,MatTableModule,MatDatepickerModule],
  templateUrl: './classe.component.html',
  styleUrl: './classe.component.scss'
})
export class ClasseComponent {

}
