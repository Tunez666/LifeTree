npx @nestjs/cli new backend --strict --package-manager npm
npm install @nestjs/config
npm install class-validator class-transformer
npm install bcrypt
npm install -D @types/bcrypt
npm install @prisma/client@7.9.1 @prisma/adapter-pg pg
npm install -D prisma@7.9.1
npx prisma init

npm create vite@latest frontend -- --template react-ts
npm install react-router-dom
npm install axios
npm install react-hot-toast

docker compose exec backend npm install @nestjs/passport

--- ПРИЗМА ---
docker compose exec backend npx nest generate module prisma
docker compose exec backend npx nest generate service prisma

--- МИГРАЦИИ ---
docker compose exec backend npx prisma migrate dev --name init_user
docker compose exec backend npx prisma migrate status
docker compose exec backend npx prisma generate

--- ПОСТГРЕС ---
docker compose exec postgres psql -U LifeTree -d LifeTree

--- СОЗДАНИЕ МОДУЛЯ ---
docker compose exec backend npx nest generate module workspaces
docker compose exec backend npx nest generate service workspaces
docker compose exec backend npx nest generate controller workspaces
!!! sudo chown -R $USER:$USER backend frontend !!!
