pipeline {
    agent any

    stages {
         stage('Build') {
             steps {
                 dir("Backend/"){
                     sh 'mvn install -DskipTests'
                 }
                sh 'docker-compose build'
            }
        }
        stage('Deploy') {
            steps {
                sh ' docker-compose up -d'
            }
        }
    }
}
