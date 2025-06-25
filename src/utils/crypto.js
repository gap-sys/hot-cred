// utils/crypto.js - Next.js
import CryptoJS from 'crypto-js';

export class HashGenerator {
    constructor() {
        // Chave secreta - deve ser a mesma no Laravel
        this.secretKey = process.env.NEXT_PUBLIC_CRYPTO_SECRET || 'b9A2XvT3kL8zQwR6JpY1oMfC7NsUeHdZ4xGvBlEtcYrWqPaKmD';
    }

    /**
     * Gera hash criptografado baseado no hash de 50 caracteres + timestamp
     * @param {string} originalHash - Hash de 50 caracteres
     * @returns {string} Hash criptografado
     */
    generateEncryptedHash(originalHash) {
        if (!originalHash || originalHash.length !== 50) {
            throw new Error('Hash deve ter exatamente 50 caracteres');
        }

        // Obter data/hora no fuso horário de São Paulo (considera horário de verão)
        const now = new Date();
        
        // Usar Intl.DateTimeFormat para obter componentes corretos no fuso de São Paulo
        const formatter = new Intl.DateTimeFormat('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        
        const parts = formatter.formatToParts(now);
        const getPartValue = (type) => parts.find(part => part.type === type)?.value || '00';
        
        const timestamp = {
            day: getPartValue('day'),
            month: getPartValue('month'),
            year: getPartValue('year'),
            hour: getPartValue('hour'),
            minute: getPartValue('minute')
        };
        
        // Para created_at, calcular o timestamp Unix correto para São Paulo
        const saoPauloDate = new Date(now.toLocaleString('en-US', {timeZone: 'America/Sao_Paulo'}));
        const utcDate = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
        const saoPauloOffset = saoPauloDate.getTime() - utcDate.getTime();
        const saoPauloTimestamp = now.getTime() + saoPauloOffset;

        // Criar payload com hash + timestamp
        const payload = {
            hash: originalHash,
            timestamp: `${timestamp.day}${timestamp.month}${timestamp.year}${timestamp.hour}${timestamp.minute}`,
            created_at: saoPauloTimestamp
        };

        // Criptografar payload
        const encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(payload),
            this.secretKey
        ).toString();

        return encrypted;
    }

    /**
     * Descriptografa e valida o hash (para testes locais)
     * @param {string} encryptedHash
     * @returns {object|null}
     */
    decryptHash(encryptedHash) {
        try {
            const decrypted = CryptoJS.AES.decrypt(encryptedHash, this.secretKey);
            const payload = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
            
            return payload;
        } catch (error) {
            return null;
        }
    }
}

// Exemplo de uso
export const hashGenerator = new HashGenerator();

// Função para usar em componentes
export function createSecureHash(originalHash) {
    try {
        return hashGenerator.generateEncryptedHash(originalHash);
    } catch (error) {
        console.error('Erro ao gerar hash:', error);
        return null;
    }
}