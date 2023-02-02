import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { MatTableDataSource } from '@angular/material/table';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component'; 
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Movie } from 'src/interfaces/Movie';

@Component({
  selector: 'app-tabella-film',
  templateUrl: './tabella-film.component.html',
  styleUrls: ['./tabella-film.component.css']
})
export class TabellaFilmComponent implements OnInit {
  movies: any[] = [];
  displayedColumns: string[] = ['title', 'year', 'director', 'actions'];
  dataSource = new MatTableDataSource(this.movies);

  constructor(private movieService: MovieService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllMovies();
  }

  getAllMovies() {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
      this.dataSource = new MatTableDataSource(this.movies);
    }, error => {
      console.error(error);
      // Gestione dell'errore (ad esempio, visualizzazione di un messaggio di errore)
    });
  }

  delete(id: number) {
    this.movieService.deleteMovie(id).subscribe(res => {
      console.log(res)
      this.getAllMovies();
    }, error => {
      console.error(error);
      // Gestione dell'errore (ad esempio, visualizzazione di un messaggio di errore)
    });
  }

  edit(film: Movie) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '400px';
    dialogConfig.position = { top: '0', left: '0' };
    dialogConfig.data = film;
    const dialogRef = this.dialog.open(MovieDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("Prima di result")
      console.log(result)
      if(result) {
        console.log("Devo aggiornare film")
        this.getAllMovies();
      }
    });
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '400px';
    dialogConfig.position = { top: '0', left: '0' };
    dialogConfig.data = null;
    const dialogRef = this.dialog.open(MovieDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log("Prima di result")
      console.log(result)
      if(result) {
        console.log("Devo aggiornare film")
        this.getAllMovies();
      }
    });
  }


}
