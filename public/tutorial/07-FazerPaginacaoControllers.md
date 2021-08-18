# Fazer paginação nos controllers

## Categorias Controller

if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
}

        // let page = 0;
        // const pageAsNumber = Number.parseInt(req.query.page);
        // !Number.isNaN(pageAsNumber) && pageAsNumber > 0
        //     ? (page = pageAsNumber)
        //     : null;

-   No arquivo `CategoriaController.js`,
