const { Categorias } = require('../../api/models');
const truncate = require('../utils/truncate');

describe('Caregorias', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('deve validar que o título da categoria não é vazio', async () => {
        const categoria = await Categorias.create({
            titulo: 'javascript',
            cor: '#fcba03'
        });

        expect(categoria.titulo).not.toBe('');
    });
    it('deve validar que a cor da categoria é válida e em formato hexadecimal', async () => {
        const categoria = await Categorias.create({
            titulo: 'css',
            cor: '#b52dac'
        });

        const hexRegEx = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        expect(categoria.cor).toMatch(hexRegEx);
    });
});
