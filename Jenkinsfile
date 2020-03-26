pipeline {
    agent {
        docker {
            image 'node:12.16.1-alpine3.11' 
            args '-p 3000:3000' 
        }
    }

  environment{
   SERVICE_NAME = "mffrontend"
   ORGANIZATION_NAME = "myfinance"
   DOCKERHUB_USER = "holgerfischer"
   VERSION = "0.13.${BUILD_ID}"
   REPOSITORY_TAG = "${DOCKERHUB_USER}/${ORGANIZATION_NAME}-${SERVICE_NAME}:${VERSION}"
 }

 stages{
   stage('preperation'){
     steps {
       cleanWs()
       git credentialsId: 'github', url: "https://github.com/myfinance/mffrontend.git"
       sh '''rm -rf node_modules && npm install'''
       sh '''npm run build'''
     }
   }
   //stage('build'){
    // steps {
       //sh '''npm install -g @angular/cli'''
     //  sh '''npm install'''
     //  sh '''npm run build'''
    // }
   //}
   //stage('build and push Image'){
   //  steps {
   //    sh 'docker image build -t ${REPOSITORY_TAG} ./distributions/mf-docker-images/target/docker-prep/myfinance/'
   //  }
  // }   
 }
}
