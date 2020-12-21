
to install the application manually with helm: 
helm repo update
helm upgrade -i --cleanup-on-fail mffrontend local/mffrontend --set stage=prod --devel

or install the complete bundle see repo mfbundle

if you want to generate a new restclient for the backend connection:
 start a local backend with default credentials. open the url http://127.0.0.1:8181/dac/rest/swagger.json and copy the content in the file myfinance-tsclient-generation/swagger.json 
 run "mvn clean install in folder restclientgeneration

# development

recommended IDE: GitPod
To run and debug mf-frontend with gitPod use the dev environment (https://babcom.myds.me:30022/dac/rest) as a backend. 
SSL usage is import or other wise no connection is allowed from an gitpod envirmonment. 
You can find the description of how to create and update ssl certificates in my wiki itdocs-java-ssl. copy the certificate to /mnt/data/mf/dev_config and restart the container.


# Angular2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

file below src/assets/fonts are pictores generated with a vector-graph-software like LibreOffice Draw

