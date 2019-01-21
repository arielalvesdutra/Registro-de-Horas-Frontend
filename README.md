# RegistroDeHoras

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Instalando bootstrap

- `npm i --save bootstrap@4.2.1 jquery`
- Colocar o caminhos node_modules do bootstrap e jquery no app.module:
    
    "styles": [
    "styles.css",
    "../node_modules/bootstrap/dist/css/bootstrap.min.css"
  ],
  "scripts": [
    "../node_modules/jquery/dist/jquery.min.js",
    "../node_modules/bootstrap/dist/js/bootstrap.min.js"
  ],

## Usando Ng-Bootstrap

- ` npm install --save @ng-bootstrap/ng-bootstrap`
- `npm install bootstrap@4.0.0-alpha.6`
- Adicioonar bootstrap no angular.json 
- importar no modules: "import {NgbModule} from '@ng-bootstrap/ng-bootstrap';"

## Introdução a formulários no Angular

- o Angular prove duas formas para lidar com as entradas de usuários através de formulários:
  - `Reactive forms`
  - `Template-driven forms`
- Ambos:
  - caputram eventos de entrada do usuário pela view, 
  - validam as entradas do usuário
  - criam um form model e data model para atualizar
  - e fornecem uma forma de rastrear as modificações
- `Reactive forms`:
  - São mais robustos, mais escaláveis, reusáveis e testáveis
- `Template-driven forms`:
  - São úteis para adicionar um formulário simples para uma aplicação
  - É fácil de adicionar para uma aplicação, mas não são escaláveis como os Reactive Forms
- Blocos que ambos utilizam:
  - `FormControl`: rastreia o valor e status da validação um form control individual
  - `FormGroup`: rastreia o mesmo valor e status para uma coleção de form controls
  - `FormArray`: restreia o mesmo valor e status para um array de form constrols
  - `ControlValueAccessor`: cria um ponto entre instâncias Angular FormContol e elementos DOM nativos

## Configuração do Form model

- Reactive e Template-drive forms utilizam um form model para rastrear mudanças de valors entre Angular Forms e elementos de entrada do formulário

### Em reactive forms


- Importar FormControl: 
  - `import { FormControl } from '@angular/forms';`
  - `<input type="text" [formControl]="favoriteColorControl">`
  - `favoriteColorControl = new FormControl('');`

### Em template-driven forms

- No app.module.ts, importar: `import { FormsModule } from '@angular/forms';`
- `Favorite Color: <input type="text" [(ngModel)]="favoriteColor">`
- `export class FavoriteColorComponent { favoriteColor = ''; }`