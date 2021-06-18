pipeline {
    agent any

    stages {
       
        stage('Deploy') {
            steps {
                sh 'docker-compose build'
                sh 'docker-compose down'
                sh 'docker rmi -f $(docker images -a -q)'
                sh ' docker-compose up -d'
            }
        }
    }
}
