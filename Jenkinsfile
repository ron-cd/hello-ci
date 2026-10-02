pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    triggers {
        pollSCM('H/15 * * * *')
    }

    environment {
        SELENIUM_REMOTE_URL = 'http://selenium:4444/wd/hub'
        APP_URL = 'http://jenkins:3000'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Start Application') {
            steps {
                sh 'npm start &'
            }
        }

        stage('UI Tests') {
            steps {
                sh 'npm test'
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true, testResults: 'test-results/results.xml'
            sh 'pkill -f "node src/app.js" || true'
        }
    }
}