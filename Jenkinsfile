pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    environment {
        APP_URL = 'http://localhost:3000'
        JEST_JUNIT_OUTPUT_DIR = 'reports'
        JEST_JUNIT_OUTPUT_NAME = 'junit.xml'
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Unit Test') {
            steps {
                sh 'npx jest tests/math.test.js'
            }
        }

        stage('UI Test') {
            steps {
                sh 'node src/app.js > app.log 2>&1 &'
                sh 'sleep 5'
                sh 'curl http://localhost:3000'
                sh 'npx jest --runInBand tests/e2e/home.test.js'
            }
        }
    }

    post {
        always {
            junit 'reports/*.xml'
        }
    }
}
