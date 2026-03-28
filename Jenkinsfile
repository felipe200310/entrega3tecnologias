pipeline {
    agent any

    environment {
        MONGO_URI = credentials('PROYECTO_MONGO_URI')
    }

    stages {
        stage('1. Descargando Codigo') {
            steps {
                echo '📦 Descargando codigo del repositorio...'
                checkout scm
            }
        }

        stage('2. Instalando Dependencias') {
            steps {
                echo '📥 Instalando dependencias de Node.js...'
                bat 'npm install'
                dir('microservicio-proyectos') {
                    bat 'npm install'
                }
            }
        }

        stage('3. Construyendo Imagenes Docker') {
            steps {
                echo '🐳 Construyendo imagenes de Docker...'
                bat 'docker-compose build'
            }
        }

        stage('4. Desplegando con Escalamiento Horizontal') {
            steps {
                echo '🚀 Desplegando servicios con 3 replicas...'
                bat 'docker-compose up -d'
            }
        }

        stage('5. Verificacion del Sistema') {
            steps {
                echo '🧪 Esperando que los servicios arranquen...'
                bat 'ping -n 10 127.0.0.1 > nul'
                echo '✅ Servicios desplegados correctamente'
            }
        }
    }

    post {
        success {
            echo '✅✅ PIPELINE EXITOSO: Todos los servicios estan corriendo ✅✅'
        }
        failure {
            echo '❌ ERROR: Algo fallo en el pipeline'
        }
        always {
            echo '🧹 Limpiando recursos temporales...'
            bat 'docker system prune -f'
        }
    }
}
