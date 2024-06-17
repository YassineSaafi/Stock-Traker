import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientComponent} from './Modules/client/client/client.component';
import {FactureComponent} from './Modules/facture/facture/facture.component';
import {FournisseurComponent} from './Modules/fournisseur/fournisseur/fournisseur.component';
import {ProduitComponent} from './Modules/produit/produit/produit.component';
import {ChequeComponent} from './Modules/cheque/cheque/cheque.component';

import {BonDeLivraisonComponent} from './Modules/bl/bl/bl.component';
import {FactureAchatComponent} from './Modules/achat/facture-achat/facture-achat.component'
import {VenteComponent} from './Modules/facture/vente/vente.component'
import {StatistiqueComponent} from './Modules/facture/statistique/statistique.component'
 import {AuthGuard} from './Modules/auth/auth.guard'
import {DevisComponent} from './Modules/devis/devis/devis.component';
import {AchatComponent} from './Modules/achat/achat/achat.component'
import { InventoryListComponent} from './Modules/inventaire/inventory/inventory.component';
import { CategoryInventoryComponent } from './Modules/inventaire/inventory-list/inventory-list.component';
import {LoginComponent } from './Modules/auth/login/login.component'
import {RegisterComponent} from './Modules/auth/register/register.component'
import {CategoryComponent} from './Modules/produit/category/category.component'
import {HomeComponent} from './Modules/auth/home/home.component'
import {UtilisateurComponent} from './Modules/auth/utilisateur/utilisateur.component'
import {BonReceptionComponent} from './Modules/bon-reception/bon-reception/bon-reception.component'
import {FournisseurDevisComponent} from './Modules/fournisseur-devis/fournisseur-devis/fournisseur-devis.component'
import {VentesMensuellesComponent} from './Modules/facture/ventesmensuelle/ventesmensuelle.component'




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'Client', component: ClientComponent  , canActivate: [AuthGuard]},
  { path: 'ventem', component: VentesMensuellesComponent , canActivate: [AuthGuard]},
  { path: 'Home', component: HomeComponent  , canActivate: [AuthGuard]},
  { path: 'Facture', component: FactureComponent , canActivate: [AuthGuard]},
  { path: 'Fournisseur', component: FournisseurComponent , canActivate: [AuthGuard] },
  { path: 'Produit', component: ProduitComponent , canActivate: [AuthGuard]},
  { path: 'Cheque', component: ChequeComponent , canActivate: [AuthGuard]},
  { path: 'Bl', component: BonDeLivraisonComponent  , canActivate: [AuthGuard] },
  { path: 'fa', component: FactureAchatComponent  , canActivate: [AuthGuard]},
  { path: 'fas', component: VenteComponent   , canActivate: [AuthGuard]},
  { path: 'devisFournisseur', component: FournisseurDevisComponent   , canActivate: [AuthGuard]},
  { path: 'achat', component: AchatComponent  , canActivate: [AuthGuard] },
  { path: 'inv', component: CategoryInventoryComponent   , canActivate: [AuthGuard]},
  { path: 'invlist', component: InventoryListComponent , canActivate: [AuthGuard]  },
  { path: 'regs', component: RegisterComponent  , canActivate: [AuthGuard] },
  { path: 'Devis', component: DevisComponent , canActivate: [AuthGuard] },
  { path: 'stat', component: StatistiqueComponent  , canActivate: [AuthGuard]},
  { path: 'Cat', component: CategoryComponent , canActivate: [AuthGuard] },
  { path: 'user', component: UtilisateurComponent  , canActivate: [AuthGuard]} ,
  { path: 'brcr', component: BonReceptionComponent , canActivate: [AuthGuard]} ,

  { path: '', redirectTo: '/login', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }