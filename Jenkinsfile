pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
              dir("Backend/"){
               sh 'mvnw install -DskipTests'
              }
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker-compose build'
                sh 'docker-compose up -d'
            }
        }
    }
}
