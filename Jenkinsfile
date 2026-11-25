// Pipeline de Despliegue Continuo (CD) - Job: cd-asesorias-iudigital
// Puerto de despliegue de la aplicación: 3000
pipeline {
    agent any

    // Revisa el repositorio cada 2 minutos; si hay commits nuevos, despliega solo.
    triggers {
        pollSCM('H/2 * * * *')
    }

    environment {
        DOCKERHUB_USER = 'agm97'            // 
        IMAGE_NAME     = "${DOCKERHUB_USER}/asesorias-iudigital"
        APP_VERSION    = "${BUILD_NUMBER}"
        APP_PORT       = '3000'
    }

    stages {
        stage('1. Checkout') {
            steps {
                checkout scm
            }
        }

        stage('2. Pruebas') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('3. Construir imagen Docker') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$APP_VERSION -t $IMAGE_NAME:latest .'
            }
        }

        stage('4. Publicar en Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials',
                                                  usernameVariable: 'DH_USER',
                                                  passwordVariable: 'DH_PASS')]) {
                    sh 'echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin'
                    sh 'docker push $IMAGE_NAME:$APP_VERSION'
                    sh 'docker push $IMAGE_NAME:latest'
                }
            }
        }

        stage('5. Desplegar') {
            steps {
                sh 'docker compose -p asesorias up -d --remove-orphans'
            }
        }

        stage('6. Verificar despliegue') {
            steps {
                sh '''
                  for i in $(seq 1 15); do
                    if docker exec asesorias-app wget -qO- http://localhost:$APP_PORT/health; then
                      echo ""
                      echo "Aplicación desplegada en http://localhost:$APP_PORT (versión $APP_VERSION)"
                      exit 0
                    fi
                    sleep 2
                  done
                  echo "La aplicación no respondió"; docker logs asesorias-app; exit 1
                '''
            }
        }
    }

    post {
        success { echo "CD OK: build #${BUILD_NUMBER} desplegado en el puerto ${APP_PORT}" }
        failure { echo 'El despliegue falló. Revisa la salida de consola.' }
        always  { sh 'docker logout || true' }
    }
}
