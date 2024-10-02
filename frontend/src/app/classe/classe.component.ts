import { Component } from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-classe',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule,MatNativeDateModule, MatDatepickerModule,MatFormFieldModule, MatInputModule,MatButtonModule,MatTableModule],
  templateUrl: './classe.component.html',
  styleUrl: './classe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClasseComponent {

}
