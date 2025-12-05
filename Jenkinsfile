pipeline {
    agent any

    environment {
        PROJECT_NAME = "exu-ayvc"
        COMPOSE_PROJECT = "exu-ayvc"
        NETWORK_NAME = "exu-ayvc-net"
    }

    stages {

        stage('Preparando servicios previos del proyecto') {
            steps {
                bat """
                    docker compose -p %COMPOSE_PROJECT% down || exit /b 0
                """
            }
        }

        stage('Eliminando imágenes anteriores') {
            steps {
                bat """
                    for /f "tokens=*" %%i in ('docker images --filter "label=com.docker.compose.project=%COMPOSE_PROJECT%" -q') do (
                        docker rmi -f %%i
                    )
                    if errorlevel 1 (
                        echo No hay imagenes por eliminar
                    ) else (
                        echo Imagenes eliminadas correctamente
                    )
                """
            }
        }

        stage('Obteniendo actualizacion del código') {
            steps {
                checkout scm
            }
        }

        stage('Construyendo y desplegando servicios Docker') {
            steps {
                bat """
                    docker compose up --build -d
                """
            }
        }
    }

    post {
        success {
            echo 'Pipeline ejecutada correctamente'
        }
        failure {
            echo 'Hubo un error al ejecutar el pipeline'
        }
        always {
            echo 'Pipeline finalizado'
        }
    }
}
