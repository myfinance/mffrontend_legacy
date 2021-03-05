pipeline {
    agent none

  environment{
   SERVICE_NAME = "mffrontend"
   ORGANIZATION_NAME = "myfinance"
   DOCKERHUB_USER = "holgerfischer"
   //Snapshot Version
   VERSION = "0.17.0-alpha.${BUILD_ID}"
   //Release Version
   //VERSION = "0.16.0"
   K8N_IP = "192.168.100.73"
   NEXUS_URL = "${K8N_IP}:31001"
   REPOSITORY_TAG = "${DOCKERHUB_USER}/${ORGANIZATION_NAME}-${SERVICE_NAME}:${VERSION}"
   DOCKER_REPO = "${K8N_IP}:31003/repository/mydockerrepo/"
   TARGET_HELM_REPO = "http://${NEXUS_URL}/repository/myhelmrepo/"
   DEV_NAMESPACE = "mfdev"
   TEST_NAMESPACE = "mftest"
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
       sh '''npm --no-git-tag-version version ${VERSION}'''
       sh '''rm -rf node_modules && npm install'''
       sh '''npm run build'''
     }
   }
   stage('build and push Image'){
    agent {
        docker {
            image 'docker'
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
       sh 'envsubst < ./helm/mffrontend/Chart_template.yaml > ./helm/mffrontend/Chart.yaml'
       // no jobs for dev necessary
       // sh 'helm upgrade -i --cleanup-on-fail mffrontend ./helm/mffrontend/ -n ${DEV_NAMESPACE} --set repository=${DOCKER_REPO}/${DOCKERHUB_USER}/${ORGANIZATION_NAME}-'
       sh 'helm upgrade -i --cleanup-on-fail mffrontend ./helm/mffrontend/ -n ${TEST_NAMESPACE} --set stage=test --set mffrontend.http_port_ext=30033 --set repository=${DOCKER_REPO}/${DOCKERHUB_USER}/${ORGANIZATION_NAME}-'
       sh 'helm package helm/mffrontend -u -d helmcharts/'
       sh 'curl ${TARGET_HELM_REPO} --upload-file helmcharts/mffrontend-${VERSION}.tgz -v'
     }
   }
 }
}




