class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: ['MACACO', 'MACACO', 'MACACO'] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: ['GAZELA'] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: ['LEAO'] }
        ];

        this.animais = {
            'LEAO': { tamanho: 3, bioma: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, bioma: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, bioma: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, bioma: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(tipoAnimal, quantidade) {
        const animalInfo = this.animais[tipoAnimal.toUpperCase()];

        if (!animalInfo) {
            return { erro: 'Animal inválido', recintosViaveis: null };
        }

        if (quantidade <= 0) {
            return { erro: 'Quantidade inválida', recintosViaveis: null };
        }

        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            const { bioma, tamanhoTotal, animaisExistentes, numero } = recinto;

            if (tipoAnimal.toUpperCase() === 'CROCODILO') {
                if (numero !== 4) {
                    continue; 
                }

                const contemOutrosAnimais = animaisExistentes.some(animal => !this.animais[animal].carnivoro);
            }

            if (tipoAnimal.toUpperCase() === 'MACACO' && numero > 3) {
                continue;
            }

            let espacoOcupado = animaisExistentes.reduce((soma, a) => soma + this.animais[a].tamanho, 0);
            const espacoRestante = tamanhoTotal - espacoOcupado;

            const espacoNecessario = animalInfo.tamanho * quantidade;
            const numeroDeEspecies = new Set(animaisExistentes.concat(Array(quantidade).fill(tipoAnimal.toUpperCase()))).size;

            const espacoFinalNecessario = espacoNecessario + (numeroDeEspecies > 1 ? 1 : 0);

            if (espacoRestante >= espacoFinalNecessario) {
                recintosViaveis.push({
                    numero: recinto.numero,
                    espacoLivre: espacoRestante - espacoFinalNecessario,
                    espacoTotal: tamanhoTotal
                });
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável', recintosViaveis: [] };
        }

        recintosViaveis.sort((a, b) => a.numero - b.numero);

        const recintosFormatados = recintosViaveis.map(
            recinto => `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivre} total: ${recinto.espacoTotal})`
        );

        return { erro: null, recintosViaveis: recintosFormatados };
    }
}

export { RecintosZoo };


