# Titre de votre projet

## Description
Cette API permet de tester du code (uniquement JavaScript pour le moment).

## Utilisation
Pour lancer le projet, assurez-vous d'avoir Docker et Docker Compose installés sur votre système. Ensuite, exécutez la commande suivante à la racine du projet :
```bash
docker-compose up
```

## Exemple de body à envoyer
```
{
    "code": "function add(a, b) {return a + b}",
    "tests": [
        {
            "name": "Test 1",
            "condition": "add(1, 2) === 3",
            "successMessage": "Test 1 passed",
            "failureMessage": "Test 1 failed"
        },
        {
            "name": "Test 2",
            "condition": "add(2, 6) === 8",
            "successMessage": "Test 2 passed",
            "failureMessage": "Test 2 failed"
        },
        {
            "name": "Test 3",
            "condition": "add(2, 3) === 5",
            "successMessage": "Test 3 passed",
            "failureMessage": "Test 3 failed"
        }
    ]
}
```


## Exemple de retour de l'API
### Cas 1 : Réussi
```
{
    "success": true,
    "testPassed": [
        "Test 1",
        "Test 2",
        "Test 3"
    ],
    "testFailed": []
}
```
### Cas 2 : Echec
```
{
    "success": false,
    "testPassed": [
        "Test 3"
    ],
    "testFailed": [
        "Test 1: false",
        "Test 2: false"
    ]
}
```