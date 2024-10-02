import { Component } from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-classe',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule,MatTableModule],
  templateUrl: './classe.component.html',
  styleUrl: './classe.component.scss'
})
export class ClasseComponent {

}
