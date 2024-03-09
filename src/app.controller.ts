import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { runInNewContext } from 'vm';
import { AppService } from './app.service';

interface Test {
  name: string;
  condition: string;
}

interface Data {
  code: string;
  tests: Test[];
}

@Controller('testsJs')
export class AppController {
  @Post()
  async runTests(@Body() data: Data): Promise<{
    success: boolean;
    testPassed: string[];
    testFailed: string[];
  }> {
    try {
      const tests = data.tests;
      const testPassed: string[] = [];
      const testFailed: string[] = [];
      let success = false;
      // Exécuter le code JavaScript dans un contexte sécurisé
      const sandbox = {};
      runInNewContext(data.code, sandbox);

      for (let i = 0; i < tests.length; i++) {
        // Exécuter les tests
        const testResult = AppService.runTestsJsInSandbox(
          tests[i].condition,
          sandbox,
        );
        if (testResult) {
          testPassed.push(tests[i].name);
        } else if (!testResult) {
          testFailed.push(`${tests[i].name}: ${testResult}`);
        }
      }

      if (testPassed.length === tests.length && testFailed.length === 0) {
        success = true;
      }

      return { success, testPassed, testFailed };
    } catch (error) {
      // Gérer les erreurs éventuelles
      throw new HttpException(
        "Une erreur est survenue lors de l'exécution des tests",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
