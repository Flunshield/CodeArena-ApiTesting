/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { runInNewContext } from 'vm';

@Injectable()
export class AppService {
  // Fonction utilitaire pour exécuter les tests dans le contexte du sandbox
  static runTestsJsInSandbox(tests: string, sandbox: any): any {
    try {
      // Exécuter les tests dans le contexte du sandbox
      return runInNewContext(tests, sandbox);
    } catch (error) {
      // Si une erreur se produit pendant l'exécution des tests, retourner le message d'erreur
      return "Erreur lors de l'exécution des tests : " + error.message;
    }
  }
}
