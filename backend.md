# HAMSTERWARS backend

+ Backend: REST API med Node.js, Express och Firestore
+ Frontend: web app med React (länk kommer senare i kursen)

Bilder och JSON data som du behöver för uppgiften finns i detta repo.


---
## Specifikation
#### Godkänt-nivå
Ett hamster-objekt ska innehålla följande egenskaper. Du får lägga till fler om du behöver, men du får inte ta bort några.

| Egenskap | Datatyp | Värde |
|:---------|:--------|:------|
|id        |string   |Id för hamster-objektet (när man hämtar från databasen) |
|name      |string   |Hamsterns namn |
|age       |number   |Hamsterns ålder i hela år |
|favFood   |string   |Hamsterns favoritmat |
|loves     |string   |Hamsterns favoritaktivitet |
|imgName   |string   |Namn på filen som har bild på hamstern |
|wins      |number   |Antal vinster |
|defeats   |number   |Antal förluster |
|games     |number   |Antal matcher totalt |

Hamster-objekt ska lagras som *documents* i en *collection* i Firestore. Du ska bygga ett API som med hjälp av datan har följande resurser. *Id* ska vara en unik kod, som används i API-resurser när man behöver referera till ett specifikt objekt. (Du ska inte skapa id själv, det görs av Firestore när man lägger till ett objekt. Innan man lagt till ett hamster-objekt i databasen finns alltså inget id.)

| Statisk resurs  | Respons        |
|-----------------|----------------|
| `/:filnamn`       | Frontend-filer |
| `/img/:filnamn`   | Hamsterbild    |

Alla API-resurser ska returnera JSON eller en HTTP statuskod:
+ 200 (ok) - Om servern lyckats med att göra det som resursen motsvarar.
+ 400 (bad request) - Om requestet är felaktigt gjort, så att servern inte kan fortsätta. Exempel: POST /hamsters skickar med ett objekt som inte är ett hamster-objekt.
+ 404 (not found) - Om resursen eller objektet som efterfrågas inte finns. Exempel: id motsvarar inte något dokument i databasen. `GET /hamsters/felaktigt-id`
+ 500 (internal server error) - Om ett fel inträffar på servern. Använd `catch` för att fånga det.

| Metod  | Resurs          | Body | Respons |
|:-------|:----------------|------|----------------------------|
| GET    | `/hamsters`     | -    | Array med alla hamsterobjekt  |
| GET    | `/hamsters/random` | -    | Ett slumpat hamsterobjekt  |
| GET    | `/hamsters/:id` | -    | Hamsterobjekt med ett specifikt id.<br>404 om inget objekt med detta id finns. |
| POST   | `/hamsters`     | Hamster-objekt utan id (ska skapas av databasen) | Ett objekt med id för det nya objekt som skapats i databasen: `{ id: "123..." }` |
| PUT    | `/hamsters/:id` | Ett objekt med ändringar: `{ wins: 10, games: 12 }`    | Bara statuskod. |
| DELETE | `/hamsters/:id` | -    | Bara statuskod. |

---
#### VG-nivå
Appen ska spara resultatet av genomförda matcher i databasen, i matchobjekt.

| Egenskap | Datatyp | Värde |
|:---------|:--------|:------|
|id        |string   |Matchens id |
|winnerId  |string   |Id för vinnande hamstern |
|loserId   |string   |Id för förlorande hamstern |

Nya API-resurser.

| Metod  | Resurs          | Body | Respons |
|:-------|:----------------|------|----------------------------|
| GET    | `/matches`     | -    | Array med alla matchobjekt  |
| GET    | `/matches/:id` | -    | Matchobjekt med ett specifikt id. |
| POST   | `/matches`     | Match-objekt utan id (id skapas av databasen) | Ett objekt med id för det nya objekt som skapats i databasen: `{ id: "123..." }` |
| DELETE | `/matches/:id` | -    | Bara statuskod. |
| GET    | `/matchWinners/:id` | -    | Array med matchobjekt för alla matcher, som hamstern med *id* har vunnit. Statuskod 404 om id inte matchar en hamster som vunnit någon match.  |
| GET    | `/winners`      | -    | En array med hamsterobjekt för de 5 som vunnit flest matcher   |
| GET    | `/losers`       | -    | En array med hamsterobjekt för de 5 som förlorat flest matcher   |


#### Level ups
Resurser som är bra träning, men inte nödvändiga för högsta betyg.

1. `GET /defeated/:hamsterId`  - array med id för alla hamstrar den valda hamstern har besegrat
1. `GET /score/:challenger/:defender`  - två hamster-id som parameter. Respons ska vara ett objekt `{ challengerWins, defenderWins }` med antal vinster för respektive hamster, när de har mött varandra.
1. `GET /fewMatches`  - returnerar en array med id för de hamstrar som spelat minst antal matcher. Arrayen ska ha minst ett element.
1. `GET /manyMatches`  - returnerar en array med id för de hamstrar som spelat flest antal matcher. Arrayen ska ha minst ett element.



---
## Frågor och svar
Q: Kan man importera data i Firestore, så man slipper skriva in allt manuellt? <br>
A: Ja, genom att skriva ett skript. Börja med att titta på [den här videon](https://www.youtube.com/watch?v=Qg2_VFFcAI8) och anpassa sedan filen till ditt projekt.


---
## Bedömning
Observera att du måste följa specifikationen *exakt*. Du *måste* använda de namn och statuskoder som står här.

För *godkänt* krävs
+ du använder teknikerna Node, Express och Firestore
+ ditt API är publicerat online
+ ditt API följer specifikationen
+ ditt API implementerar G-nivån

För *väl godkänt* krävs dessutom
+ ditt API implementerar VG-nivån


---
## Inlämning
Du ska lämna in på ITHS distans: ditt repo och länkar till GitHub och din publicerade app.
+ ladda upp repot som en zip-fil

Exempel - så här ska du skriva länkarna:
```
GitHub: https://github.com/iths-sthm-feu20-effektiv/hamsterwars-assignment
Publicerad: https://my-hamsterswars-submission.herokuapp.com
```
