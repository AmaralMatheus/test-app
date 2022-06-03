import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { faTrash, faPen, faPlus, faSave, faClose } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Variables
  faTrash = faTrash;
  faPlus = faPlus;
  faPen = faPen;
  faSave = faSave;
  faCancel = faClose;
  accessToken: any;
  accessTokenDetails: any;
  loading: boolean;
  errors: string;
  apiUrl = 'http://localhost:8000/api';
  options: any;
  categories: any;
  /**
   * Constructor
   * @param http The http client object
   */
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.errors = '';
    this.loading = true;
    this.categories = [];
    this.options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    this.accessToken = localStorage.getItem('access_token');
  }

  ngOnInit(): void {
    this.getCategories();
  }

  /**
   * Logout the user and revoke his token
   */
  logout(): void {
    this.loading = true;
    this.authService.logout()
      .subscribe(() => {
        this.loading = false;
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
      });
  }

  async createCategory() {
    this.loading = true;
    this.categories.push({
      name: 'Insert name',
      isAbleToSave: true,
      depth: 1
    })
    this.loading = false;
  }

  async addCategory(category: any) {
    this.loading = true;
    category.categories.push({
      name: 'Insert name',
      parent_id: category.id,
      isAbleToSave: true,
      depth: category.depth + 1
    })
    this.loading = false;
  }

  async saveCategory(category: any) {
    this.loading = true;
    if (category.id) {
      await this.http.put(this.apiUrl + `/categories/${category.id}`, {
        name: category.name,
      }, this.options).subscribe((res: any) => {
        this.getCategories();
      }, (err: any) => {
        this.loading = false;
        this.errors = err.error.message;
      });
    } else {
      await this.http.post(this.apiUrl + '/categories', {
        name: category.name,
        parent_id: category.parent_id,
        depth: category.depth
      }, this.options).subscribe((res: any) => {
        this.getCategories();
      }, (err: any) => {
        this.loading = false;
        this.errors = err.error.message;
      });
    }
  }

  async deleteCategory(id: number) {
    this.loading = true;
    await this.http.delete(this.apiUrl + `/categories/${id}`, this.options).subscribe((res: any) => {
      this.getCategories();
    });
  }

  async getCategories() {
    await this.http.get(this.apiUrl + '/categories', this.options).subscribe((response: any) => {
      this.categories = response;
      this.loading = false;
    }, (err: any) => {
      this.loading = false;
    });;
  }

  clearError() {
    this.errors = '';
  }

}