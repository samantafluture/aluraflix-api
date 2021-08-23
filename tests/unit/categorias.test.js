const truncate = require('../utils/truncate');
const factory = require('../utils/factories');

describe('Caregorias', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('deve validar que o título da categoria não é vazio', async () => {
        const categoria = await factory.create('Categorias', {});
        expect(categoria.titulo).not.toBe('');
    });
    it('deve validar que a cor da categoria é válida e em formato hexadecimal', async () => {
        const categoria = await factory.create('Categorias', {});
        const hexRegEx = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        expect(categoria.cor).toMatch(hexRegEx);
    });
});
