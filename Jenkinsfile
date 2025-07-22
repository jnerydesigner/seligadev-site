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
        stage('Send Mail Deploy Success') {
            steps {
                emailext(
                    attachLog: true,
                    body: """
                    <html>
                    <body style="font-family: Arial, sans-serif; color: #333;">
                        <h2 style="color: #4CAF50;">🚀 Deploy Concluído com Sucesso</h2>
                        <p><b>Projeto:</b> ${PROJECT_NAME}</p>
                        <table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
                            <tr style="background-color: #f2f2f2;">
                                <td style="padding: 8px; border: 1px solid #ddd;"><b>Commit</b></td>
                                <td style="padding: 8px; border: 1px solid #ddd;">${COMMIT_MESSAGE} - ${COMMIT_HASH}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border: 1px solid #ddd;"><b>Status</b></td>
                                <td style="padding: 8px; border: 1px solid #ddd; color: ${currentBuild.currentResult == 'SUCCESS' ? 'green' : 'red'};">
                                    ${currentBuild.currentResult}
                                </td>
                            </tr>
                            <tr style="background-color: #f2f2f2;">
                                <td style="padding: 8px; border: 1px solid #ddd;"><b>Tempo de Execução</b></td>
                                <td style="padding: 8px; border: 1px solid #ddd;">${currentBuild.durationString}</td>
                            </tr>
                        </table>
                        <p style="margin-top: 20px;">
                            <a href="${BUILD_URL}" style="text-decoration:none; background-color: #4CAF50; color: white; padding: 8px 16px; border-radius: 4px;">
                                Ver Detalhes da Build
                            </a>
                        </p>
                    </body>
                    </html>
                    """,
                    subject: "[${currentBuild.currentResult}] ${PROJECT_NAME} - Build #${BUILD_NUMBER}",
                    to: "${EMAIL_RECIPIENT}",
                    mimeType: 'text/html'
                )
            }
        }

    }
    
}