import { Controller, Post, Body } from '@nestjs/common';
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
    const tests = data.tests;
    let success = false;
    const testPassed: string[] = [];
    const testFailed: string[] = [];

    try {
      if (!data.code) {
        return returnFullFailled(data.tests);
      }
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
      return returnFullFailled(data.tests);
    }
  }
}

function returnFullFailled(tests: Test[]) {
  const testFailed = [];
  for (let i = 0; i < tests.length; i++) {
    testFailed.push(`${tests[i].name}`);
  }
  return { success: false, testPassed: [], testFailed: testFailed };
}
