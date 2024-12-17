import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  title = 'DatingApp';
  users: any = [];
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.http.get('http://localhost:5039/api/user').subscribe({
      next: (response) => {
        this.users = response;
        console.log('Fetched users:', this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.errorMessage = `Failed to fetch users. Status: ${error.status}. Message: ${error.message}`;
      },
      complete: () => {
        console.log('Request has completed');
      },
    });
  }
}
