import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Permite o uso de funções globais como `describe`, `it`, `expect`
    environment: 'node', // Ambiente de execução dos testes
    coverage: {
      reporter: ['text', 'json', 'html'], // Relatórios de cobertura
    },
    include: ['src/domain/**/**/*.{test,spec}.ts'],
  },
});
