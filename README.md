## BeMobile - Teste Back-End


## Banco de Dados
- Banco de dados em MySQL
- Observar dados de conexão no arquivo .env

## Populando banco para testes
- php artisan migrate:refresh --seed

## Rotas do Sistema
- http://127.0.0.1:8000/register - cadastro de usuário do sistema (signup)
- http://127.0.0.1:8000/login - login
- clientes:
    - http://127.0.0.1:8000/admin/clients - listar todos os clientes cadastrados (index)
    - http://127.0.0.1:8000/admin/clients/{id} - detalhar um(a) cliente e vendas a ele(a) (show)
    - http://127.0.0.1:8000/admin/clients/create - adicionar um(a) cliente (store)
    - http://127.0.0.1:8000/admin/clients/{id}/edit - editar um(a) cliente (update)
    - http://127.0.0.1:8000/admin/clients/destroy/{id} - excluir um(a) cliente e vendas a ele(a) (delete)
- produtos:
    - http://127.0.0.1:8000/admin/products - listar todos os produtos cadastrados (index)
    - http://127.0.0.1:8000/admin/products/{{id}} - detalhar um produto (show)
    - http://127.0.0.1:8000/admin/products/create - criar um produto (store)
    - http://127.0.0.1:8000/admin/products/{id}/edit - editar um produto (update)
    - http://127.0.0.1:8000/admin/products/destroy/{id} - exclusão lógica ("soft delete") de um produto (delete)
- vendas:
    - http://127.0.0.1:8000/admin/sales - listar todas as vendas, associando cliente e produto.

## OBS:
- Para acessar qualquer rota, precisa estar logado.

## Considerações
- Na autenticação foi usado o laravel UI e não o JWT (não consegui concluir, para não ficar sem autenticação optei pelo UI)
- Foi feito um pequeno trabalho de front para auxiliar na visualização das consultas
- Para mensagens de success foi usado o Flash, caso precise instalar de novo: composer req laravelcasts/flash


