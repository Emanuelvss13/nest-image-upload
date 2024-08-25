import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { CheckInconsistency } from './syncronize-database-storage';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.createApplicationContext(AppModule);

  const checkInconsistency = app.get(CheckInconsistency);

  try {
    logger.log('Iniciando a verificação de inconsistências...');
    await checkInconsistency.check();
    logger.log('Verificação de inconsistências concluída com sucesso.');
  } catch (error) {
    logger.error('Erro ao verificar inconsistências:', error.stack);
  } finally {
    await app.close(); // Fechar o contexto da aplicação
    logger.log('Contexto da aplicação fechado.');
  }
}

bootstrap();
