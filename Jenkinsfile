pipeline {
    agent{
        docker { image: 'node:16-alpine' }
    }
    environment {
        HOME = '.'
    }
    stages {
        stage ('run unit tests') {
            steps {
                sh 'npm i'
                sh 'npm run test'
            }
        }
    }
}