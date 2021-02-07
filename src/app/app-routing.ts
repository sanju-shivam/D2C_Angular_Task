import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
	

	const route: Routes = [
		{path: '', component: AppComponent},
	];

@NgModule({
	imports: [RouterModule.forRoot(route, {useHash:true})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
  