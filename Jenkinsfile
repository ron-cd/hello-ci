pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    options {
        disableConcurrentBuilds()
    }

    environment {
        APP_URL = 'http://jenkins:3000'
        SELENIUM_REMOTE_URL = 'http://selenium:4444'

        JEST_JUNIT_OUTPUT_DIR = 'reports'
        JEST_JUNIT_OUTPUT_NAME = 'junit.xml'
    }

    stages {

        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Unit Test') {
            steps {
                sh '''
                    npx jest tests/math.test.js \
                    --reporters=default \
                    --reporters=jest-junit
                '''
            }
        }

        stage('UI Test') {
            steps {
                sh '''
                    node src/app.js > app.log 2>&1 &
                    APP_PID=$!

                    trap 'kill $APP_PID 2>/dev/null || true' EXIT

                    echo "Waiting for application..."

                    for i in {1..30}; do
                        if curl -s http://localhost:3000 > /dev/null; then
                            echo "Application is ready!"
                            break
                        fi

                        sleep 1
                    done

                    curl --fail http://localhost:3000

                    npx jest --runInBand tests/e2e/home.test.js \
                    --reporters=default \
                    --reporters=jest-junit
                '''
            }
        }
    }

    post {
        always {
            junit 'reports/*.xml'
        }
    }
}