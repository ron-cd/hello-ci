pipeline {
    agent any
    tools { nodejs 'node20' }
    triggers { pollSCM('* * * * *') }
    environment {
        APP_URL = 'http://localhost:3000/'
        SELENIUM_REMOTE_URL = 'http://selenium:4444/wd/hub'
        JEST_JUNIT_OUTPUT_DIR = 'reports'
        JEST_JUNIT_OUTPUT_NAME = 'junit.xml'
    }
    stages {
        stage('Install') { steps { sh 'npm install' } }
        stage('Test') { steps { sh 'npm test' } }
        stage('UI Test') {
            steps {
                sh 'node src/app.js > app.log 2>&1 &'
                sh 'npx jest --runInBand --reporters=default --reporters=jest-junit tests/e2e/home.test.js'
            }
        }
    }
    post {
        always {
            junit 'reports/*.xml'
        }
    }
}
