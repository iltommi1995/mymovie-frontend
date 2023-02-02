import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from 'src/interfaces/Movie';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.css']
})
export class MovieDialogComponent {
  filmForm: FormGroup;

  constructor(
    private movieService: MovieService,
    public dialogRef: MatDialogRef<MovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public movie: Movie,
    private formBuilder: FormBuilder) {
    this.filmForm = this.formBuilder.group({
      id: [movie !== null ? movie.id : 0, Validators.required],
      title: [movie !== null ? movie.title : '', Validators.required],
      year: [movie !== null ? movie.year : '', Validators.required],
      director: [movie !== null ? movie.director : '', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    // Create 
    if (this.filmForm.value.id === 0 || this.filmForm.value.id === "0") {
      console.log("Dentro a create")
      let newMovie: Movie = {
        id: 0,
        title: this.filmForm.value.title,
        year: this.filmForm.value.year,
        director: this.filmForm.value.director
      }
      console.log(newMovie)

      this.movieService.createMovie(this.filmForm.value)
        .subscribe(film => {
          this.dialogRef.close(true);
          console.log(film);
        });

    } else {
      // Update
      console.log("Dentro a update")
      let newMovie: Movie = {
        id: this.filmForm.value.id,
        title: this.filmForm.value.title,
        year: this.filmForm.value.year,
        director: this.filmForm.value.director
      }
      console.log(newMovie)

      
      this.movieService.editMovie(this.filmForm.value.id, newMovie)
        .subscribe(film => {
          this.dialogRef.close(true);
          console.log("Passo da qui a")
          console.log(film);
        });
    }
  }
}
