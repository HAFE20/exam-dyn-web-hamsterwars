# HAMSTERWARS backend

+ Backend: REST API med Node.js, Express och Firestore
+ Frontend: web app med React (länk kommer senare i kursen)

Bilder och JSON data som du behöver för uppgiften finns i detta repo.


---
## Specifikation
#### Godkänt-nivå
##### Hamster-objekt
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

##### Statiska resurser
| Statisk resurs  | Respons        |
|-----------------|----------------|
| `/:filnamn`       | Frontend-filer |
| `/img/:filnamn`   | Hamsterbild    |

*Statiska resurser ska du lägga till med `express.static` middleware.*

##### Statuskoder
Alla API-resurser ska returnera JSON eller en HTTP statuskod:
+ 200 (ok) - Om servern lyckats med att göra det som resursen motsvarar.
+ 400 (bad request) - Om requestet är felaktigt gjort, så att servern inte kan fortsätta. Exempel: om POST /hamsters skickar med ett objekt som inte är ett hamster-objekt.
+ 404 (not found) - Om resursen eller objektet som efterfrågas inte finns. Exempel: id motsvarar inte något dokument i databasen. `GET /hamsters/felaktigt-id`
+ 500 (internal server error) - Om ett fel inträffar på servern. Använd `try + catch` för att fånga det.

##### Endpoints
| Metod  | Resurs          | Body | Respons |
|:-------|:----------------|------|----------------------------|
| GET    | `/hamsters`     | -    | Array med alla hamsterobjekt  |
| GET    | `/hamsters/random` | -    | Ett slumpat hamsterobjekt  |
| GET    | `/hamsters/:id` | -    | Hamsterobjekt med ett specifikt id.<br>404 om inget objekt med detta id finns. |
| POST   | `/hamsters`     | Hamster-objekt (utan id) | Ett objekt med id för det nya objekt som skapats i databasen: `{ id: "123..." }` |
| PUT    | `/hamsters/:id` | Ett objekt med ändringar: `{ wins: 10, games: 12 }`    | Bara statuskod. |
| DELETE | `/hamsters/:id` | -    | Bara statuskod. |
| GET    | `/hamsters/cutest` | -    | Array med objekt för de hamstrar som vunnit flest matcher. |

Endpoint /hamsters/cutest är till för att ni ska kunna visa på appens startsida vilken hamster som är sötast. Vi räknar precis som man räknar målskillnad i sportens värld: vinster minus förluster. Det kan i teorin bli oavgjort ibland. Hur det ska visas för användaren, är ett problem som vi löser i frontend-delen av projektet. Exempel:
* Snurre har vunnit tio matcher och förlorat en. `10 - 1 === 9`
* Pelle har vunnit tre matcher och förlorat noll. `3 - 0 === 3`
* Osvald har vunnit 20 matcher och förlorat 11. `20 - 11 === 9`
* Snurre och Osvald har lika stor målskillnad, fler än alla andra; därför ska bådas hamster-objekt finnas i arrayen.

---
#### VG-nivå
##### Match-objekt
Appen ska spara resultatet av genomförda matcher i databasen, i matchobjekt.

| Egenskap | Datatyp | Värde |
|:---------|:--------|:------|
|id        |string   |Matchens id |
|winnerId  |string   |Id för vinnande hamstern |
|loserId   |string   |Id för förlorande hamstern |

##### Endpoints
| Metod  | Resurs          | Body | Respons |
|:-------|:----------------|------|----------------------------|
| GET    | `/matches`     | -    | Array med alla matchobjekt  |
| GET    | `/matches/:id` | -    | Matchobjekt med ett specifikt id. |
| POST   | `/matches`     | Match-objekt (utan id) | Ett objekt med id för det nya objekt som skapats i databasen: `{ id: "123..." }` |
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
**Q:** Kan man importera data i Firestore, så man slipper skriva in allt manuellt? <br>
**A:** Ja, genom att skriva ett skript, som vi har gått igenom i kursen. [Den här videon](https://www.youtube.com/watch?v=Qg2_VFFcAI8) kan också vara till hjälp.

**Q:** Hur ska man ladda upp nya bilder på hamstrar? <br>
**A:** Man ska inte ladda upp bilder. Användaren ska skriva en URL som är en länk till en bild på nätet. Man ska även kunna skriva en länk till en fil som redan finns på Express-servern - för att det ska vara lättare för dig att testa.

**Q:** Kan jag veta om jag är godkänd? <br>
**A:** Ja, genom att redovisa på en lektion eller genom att köra test-skriptet på ditt API. Se [README.md](README.md).

**Q:** Ska vi använda TypeScript? <br>
**A:** TypeScript är valfritt att använda i backend-delen, men obligatoriskt i frontend.

---
## Bedömning
Observera att du måste följa specifikationen *exakt*. Du *måste* använda de namn och statuskoder som står här.

För *godkänt* krävs
+ korrekt inlämning
+ du använder teknikerna Node, Express och Firestore
+ ditt API är publicerat online
+ ditt API följer specifikationen
+ ditt API implementerar G-nivån

För *väl godkänt* krävs dessutom
+ ditt API implementerar VG-nivån


---
## Inlämning
Du ska lämna in på LearnPoint: ditt repo och länkar till GitHub och din publicerade app.
+ ladda upp repot som en zip-fil
+ skriv länkarna som en kommentar

Exempel - så här ska du skriva länkarna:
```
GitHub: https://github.com/din-github-användare/ditt-repo
Publicerad: https://my-hamsterswars-submission.herokuapp.com
```
