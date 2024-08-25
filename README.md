<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest



Descrição do Desafio:
Você é responsável por criar uma API usando NestJS que permita o upload, armazenamento e gerenciamento de imagens utilizando o Cloudinary como serviço de armazenamento na nuvem. A API deve ser integrada com um banco de dados Postgres para manter as informações relacionadas às imagens sincronizadas. Além disso, a API deve incluir um sistema de autenticação que permita a criação de usuários, onde cada usuário poderá gerenciar suas próprias imagens.

Requisitos:
1.Tecnologias:
   - NestJS ( https://docs.nestjs.com/ , escolha uma ORM de sua prefrencia)
   - Postgres ( https://www.postgresql.org/ )
   - Cloudinary ( https://cloudinary.com/ , crie um conta gratuita para poder realizar o desafio)
   - JWT (JSON Web Token) para autenticação

2.Funcionalidades:
   -Autenticação de Usuário:
  - Implementar um sistema de autenticação usando JWT.
  - A API deve permitir o registro e login de usuários.
  - Cada usuário deve ter suas próprias credenciais (email e senha).
   -Upload de Imagem:
- A API deve permitir que usuários autenticados façam upload de imagens para o Cloudinary.
- As informações sobre a imagem (URL, ID do Cloudinary, etc.) devem ser salvas no banco de dados Postgres e associadas ao usuário que fez o upload.
   -Listagem de Imagens:
- A API deve permitir que os usuários autenticados listem todas as imagens que eles próprios carregaram, recuperando as informações do banco de dados.
   -Deleção de Imagem:
- A API deve permitir que usuários autenticados deletem suas próprias imagens.
  - A deleção deve ser refletida tanto no Cloudinary quanto no banco de dados.
   -Sincronização:
- A aplicação deve garantir que os dados entre o banco de dados Postgres e o Cloudinary estejam sempre sincronizados.
- Se uma operação falhar, a API deve ser capaz de lidar com isso e garantir que não haja inconsistências nos dados.



   -Desafio Extra (Opcional):
  - Implemente uma função de recuperação que, ao detectar uma inconsistência entre o Cloudinary e o banco de dados (por exemplo, uma imagem existente no banco de dados que foi deletada no Cloudinary), resolva automaticamente o problema.
