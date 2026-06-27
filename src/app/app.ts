import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppbarComponent } from './features/appbar/components/appbar-component/appbar-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('portfolio-management');
}
