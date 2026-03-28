@echo off
echo ============================================
echo   DEPLOY - Entrega 3 Tecnologias Web
echo   Repositorio: entrega3tecnologias
echo ============================================
echo.

echo [1/4] Configurando Git...
git config user.name "felipe200310"
git config user.email "felipe200310@users.noreply.github.com"

echo [2/4] Agregando todos los archivos...
git add .

echo [3/4] Creando commit...
git commit -m "Deploy completo con Jenkinsfile y Pipeline CI/CD"

echo [4/4] Subiendo a GitHub...
git branch -M main
git push -u origin main

echo.
echo ============================================
echo   DEPLOY COMPLETADO EXITOSAMENTE
echo ============================================
pause
