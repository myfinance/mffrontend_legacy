pipeline {
    agent none

  environment{
   SERVICE_NAME = "mffrontend"
   ORGANIZATION_NAME = "myfinance"
   DOCKERHUB_USER = "holgerfischer"
   VERSION = "0.13.${BUILD_ID}"
   K8N_IP = "192.168.100.73"
   REPOSITORY_TAG = "${DOCKERHUB_USER}/${ORGANIZATION_NAME}-${SERVICE_NAME}:${VERSION}"
   DOCKER_REPO = "${K8N_IP}:31003/repository/mydockerrepo/"
 }

 stages{

   stage('preperation'){
    agent {
        docker {
            image 'node:12.16.1-alpine3.11' 
            args '-p 3000:3000' 
        }
    }
     steps {
       cleanWs()
       git credentialsId: 'github', url: "https://github.com/myfinance/mffrontend.git"
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
       sh 'docker tag ${REPOSITORY_TAG} ${DOCKER_REPO}${REPOSITORY_TAG}'
       sh 'docker push ${DOCKER_REPO}${REPOSITORY_TAG}'
     }
   }
      stage('deploy to cluster'){
     agent any
     steps {
       sh 'envsubst < deploy.yaml | kubectl apply -f -'
     }
   }   
 }
}




  //containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.8.8', command: 'cat', ttyEnabled: true),

  //containerTemplate(name: 'helm', image: 'lachlanevenson/k8s-helm:latest', command: 'cat', ttyEnabled: true)
