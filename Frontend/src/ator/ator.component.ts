import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-ator',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule],
  templateUrl: './ator.component.html',
  styleUrl: './ator.component.scss'//fgfgf
})
export class AtorComponent {

}
