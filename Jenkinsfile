pipeline {
    agent none

  environment{
   SERVICE_NAME = "mffrontend"
   ORGANIZATION_NAME = "myfinance"
   DOCKERHUB_USER = "holgerfischer"
   VERSION = "0.13.${BUILD_ID}"
   REPOSITORY_TAG = "${DOCKERHUB_USER}/${ORGANIZATION_NAME}-${SERVICE_NAME}:${VERSION}"
 }

 stages{

   stage('preperation'){
        agent any {
     steps {
       cleanWs()
       git credentialsId: 'github', url: "https://github.com/myfinance/mffrontend.git"
     }
   }
 }
   stage('build'){
    agent {
        docker {
            image 'node:12.16.1-alpine3.11' 
            args '-p 3000:3000' 
        }
    }
     steps {
       sh '''rm -rf node_modules && npm install'''
       sh '''npm run build'''
     }
   }
   stage('build and push Image'){
    agent {
        docker {
            image 'docker' 
            args '-p 3000:3000' 
        }
    }     
     steps {
       sh 'docker image build -t ${REPOSITORY_TAG} .'
     }
   }   
 }
}




  //containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.8.8', command: 'cat', ttyEnabled: true),

  //containerTemplate(name: 'helm', image: 'lachlanevenson/k8s-helm:latest', command: 'cat', ttyEnabled: true)
