pipeline {
    agent any
    tools {
        nodejs 'NodeJS_22'
    }
     environment {
        EMAIL_RECIPIENT = 'jander.webmaster@gmail.com'  
        COMMIT_HASH = "${env.GIT_COMMIT}"
        COMMIT_MESSAGE = ''
        PROJECT_NAME = 'seligadev'
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    // Faz o checkout do código do repositório Git
                    checkout scm
                    
                    // Obtém a mensagem do commit
                    COMMIT_MESSAGE = sh(script: "git log -1 --pretty=%B", returnStdout: true).trim()
                }
            }
        }
        stage('Check Node Version') {
            steps {
                script {
                    def nodeVersion = sh(script: 'node -v', returnStdout: true).trim()
                    echo "Node.js version: ${nodeVersion}"
                }
            }
        }
        stage("Verificar Instalações") {
            steps {
                sh 'which node'
                sh 'which yarn'
                sh 'which pm2'
            }
        }

        stage("Verificar o Build") {
            steps {
                script {
                    withCredentials([string(credentialsId: 'SSH_PASSWORD', variable: 'SSH_PASSWORD')]) {
                        sh """
                            sshpass -p '${SSH_PASSWORD}' ssh -o StrictHostKeyChecking=no root@deploy-server '
                                export PATH=/var/lib/jenkins/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/NodeJS_22/bin:$PATH

                                node -v
                                yarn -v

                                cd /var/lib/jenkins/workspace/SeLigaDevSite

                                yarn install
                                yarn build                 '
                        """
                    }
                }
            }
        }
        stage('Deploy com PM2') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'SSH_PASSWORD', variable: 'SSH_PASSWORD')]) {
                        sh """
                            sshpass -p '${SSH_PASSWORD}' ssh -o StrictHostKeyChecking=no root@deploy-server '
                                export PATH=/var/lib/jenkins/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/NodeJS_22/bin:$PATH

                                node -v
                                yarn -v

                                cd /var/lib/jenkins/workspace/SeLigaDevSite

                                yarn install
                                yarn build

                                pm2 update ${env.PROJECT_NAME} || true
                                pm2 start my-pm2-start.json --update-env || pm2 restart my-pm2-start.json
                 '
                        """
                    }
                }
            }
        }
        // stage('Send Mail Deploy Success') {
        //     steps {
        //         emailext(attachLog: true,
        //         body: """
        //         <h2>Build Completa - commit: ${COMMIT_MESSAGE} - ${COMMIT_HASH}</h2>
        //         <p><b>Status:</b> ${currentBuild.currentResult}</p>
        //         <p><b>Tempo de Execução:</b> ${currentBuild.durationString}</p>
        //         """,
        //         subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!',
        //         to: "${EMAIL_RECIPIENT}",
        //         mimeType: 'text/html'
        //         )
        //     }
        // }
    }
    
}