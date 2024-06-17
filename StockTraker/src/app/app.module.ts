import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientModule } from './Modules/client/client.module';
import { FactureModule } from './Modules/facture/facture.module';
import { FournisseurModule } from './Modules/fournisseur/fournisseur.module';
import { ProduitModule } from './Modules/produit/produit.module';
import { HttpClientModule } from '@angular/common/http';
import {ChequeModule} from './Modules/cheque/cheque.module'
import {AuthModule} from './Modules/auth/auth.module'
import {BLModule} from './Modules/bl/bl.module';
import { AchatModule} from './Modules/achat/achat.module'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InventaireModule} from './Modules/inventaire/inventaire.module'
import {BonReceptionModule} from './Modules/bon-reception/bon-reception.module'
import {DevisModule} from './Modules/devis/devis.module';
import { NavbarComponent } from './Modules/Components/navbar/navbar.component';
import { SidebarComponent } from './Modules/Components/sidebar/sidebar.component'
import {FournisseurDevisModule} from './Modules/fournisseur-devis/fournisseur-devis.module'





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent 
  ],
  imports: [
    BrowserModule,
    ChequeModule,
    AppRoutingModule,
    ClientModule,
    FactureModule,
    FournisseurModule,
    ProduitModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpClientModule ,
    AuthModule ,
    BLModule,
    BrowserAnimationsModule ,
    MatSnackBarModule ,
    InventaireModule,
    BonReceptionModule ,
    DevisModule ,
    AchatModule ,
    FournisseurDevisModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
