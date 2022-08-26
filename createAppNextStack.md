# create next app
npx create-next-app proy-name
cd proy-name

# install dependencies of the Tech Stack
npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6
npm i @types/react @types/next @types/node 
npm i @tanstack/react-query formik yup prisma axios

# enter vscode
code .

# Crear el archivo de configuración de prisma
npx prisma init

# agregar a .gitignore
.env

# modificar .env con base de datos
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DBNAME"

# si hay una base de datos existente
npx prisma db pull
npx prisma generate

# si no hay una base de datos existente
- modificar el archivo schema.prisma
npx prisma db push
npx prisma generate