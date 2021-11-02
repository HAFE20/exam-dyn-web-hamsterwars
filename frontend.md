# HAMSTERWARS frontend

+ [Backend](backend.md): REST API med Node.js, Express och Firestore
+ Frontend: web app med React och TypeScript

Frontend-uppgiften handlar om att bygga en app, som använder backend från första uppgiften.

---
## Specifikation
Hamster-objekt, match-objekt och endpoints finns beskrivna i [backend.md](backend.md).

Uppgiften är konstruerad så att du ska kunna använda backend-delen som webbserver. Backend servar statiska resurser, API-data och de byggda frontend-filerna. Om du har följt uppgiften, ska du inte behöva ändra något i backend.

---
#### Godkänt-nivå
Först ska du skriva i `README.md` om vad du har jobbat med.

Appen ska ha följande vyer. Med en vy menas att användaren ska kunna välja vad som visas, och bara en vy ska vara synlig samtidigt. Om du använder React Router ska du använda olika *frontend routes* för vyerna. Tänk på att lägga till en *route i backend*, så att servern skickar frontend routes till index.html.

|Vy         |Innehåll |
|-----------|---------|
|Startsida  |Förklara hur man använder appen. Sidan ska också visa den hamster som vunnit mest. |
|Tävla      |Visa två slumpade hamstrar. Låt användaren välja den sötaste. Visa resultatet och initiera nästa match. |
|Galleri    |Visa alla hamstrar som finns i databasen. Från galleriet ska man även kunna lägga till nya hamstrar och ta bort gamla. |
|Statistik (**VG**)  |Visa de 5 hamstrar som vunnit respektive förlorat mest. |
|Historik (**VG**)  |Visa resultatet från alla matcher. Ta bort resultat. |


##### Startsida
Här ska du förklara för användaren hur man använder appen. Länka till vyerna *Tävla* och *Galleri*. (Med React Router-länkar, `<Link />`.)

Visa den hamster som vunnit mest. Vi räknar `(antal vinster) - (antal förluster)`. Om det är oavgjort mellan flera hamstrar, ska appen slumpa en av dem. (Backend endpoint `/hamsters/cutest`.)

Om det av någon anledning inte går att nå backend-servern så ska du visa ett *användarvänligt felmeddelande* här. Användaren ska också få möjligheten att försöka igen.


##### Tävla
När battle-vyn visas ska du slumpa två hamstrar, som visas för användaren. Användaren ska klicka för att rösta på den sötaste. Man ska kunna se bild och namn för varje hamster. När man har röstat ska mer information om hamstern visas, bland annat hur många vinster och förluster den har. (Det kan påverka hur man röstar!)

När användaren klickar ska båda hamster-objekten uppdateras: vinnaren får +1 vinst och förloraren +1 förlust. Nu ska du visa hur många vinster och förluster respektive hamster har. Användaren ska få möjligheten att starta en ny match, med två slumpade hamstrar.

**VG**: *Utöver att uppdatera hamster-objekten i databasen, ska du lägga till ett match-objekt i databasen.*


##### Galleri
Här ska appen visa alla hamstrars namn och bild, i ett CSS grid.

Man ska kunna lägga till en ny hamster via ett formulär. Formuläret ska använda validering.

Man ska kunna ta bort en hamster från galleriet.

*Tänk på att inte visa för mycket information direkt. Låt användaren klicka/hovra över en bild för att visa mer information.*


---
#### VG-nivå

##### Galleri
Förutom G-nivån ska man kunna välja en hamster, och se vilka den har besegrat. (`/matchWinners`)

##### Statistik
Visa de 5 hamstrar som vunnit mest, och de 5 hamstrar som förlorat mest.

##### Historik
Visa resultatet från *alla* matcher: bild och namn för både vinnare och förlorare.


---
#### Level ups
*Dessa uppgifter är förslag, som är till för dig som vill ha en större utmaning. Skriv i README.md om vilka level ups du gör.*

1. Förhöj användarupplevelsen med animationer.

1. Använd Redux för att hantera appens state

1. Använd React Router

1. Klicka på en hamster i galleriet, för att se vilka andra hamstrar den har besegrat i tidigare matcher.
<br>Backend-route: `GET /defeated/:hamsterId`

1. Förbättra **Historik** så att den kan visa de 10 *senaste* matcherna i stället för *alla* matcher. Du behöver lägga till en timestamp i match-objekten för att kunna sortera matcherna efter tid. Firestore sparar inte ordningen.

1. Ny sida, **Rivalitet**: användaren ska välja två hamstrar, och kunna se deras inbördes poängställning. Exempel: `Hanna 5 - Herkules 3`.
<br>Backend-route: `GET /score/:challenger/:defender`

1. Ny sida, **Fighters and slackers**: visa de hamstrar som haft flest respektive minst matcher.
<br>Backend-route: `GET /fewMatches` och `GET /manyMatches`

1. Live-chat med andra som använder din app! Man kan prenumerera på uppdateringar från Firestore med metoden onSnapshot. Använd Firestore i frontend eller socket.io: <br>
https://firebase.google.com/docs/firestore/query-data/listen <br>
https://socket.io/demos/chat/


---
## Bedömning och återkoppling
Du måste följa specifikationen. Om du vill göra något annorlunda, måste detta godkännas av läraren innan inlämning.

**För G krävs:**
+ alla vyer på G-nivå finns
+ inga felmeddelanden i konsolen vid körning
+ appen är publicerad online
+ korrekt inlämning med zip-fil, länk till repot, och länk till appen

**För VG krävs dessutom:**
+ vyerna *statistik* och *historik* finns
+ antal vinster/förluster i hamster-objekten stämmer överens med match-objekten
+ appen är snygg och användarvänlig

Redovisa appen på handledningstid sista kursveckan, för att få direkt bedömning och återkoppling.


---
## Inlämning
Du ska lämna in på LearnPoint: ditt repo och länkar till GitHub och din publicerade app. Observera att repot måste vara *publikt* för att inlämningen ska kunna bedömas.
Du kan dessutom redovisa appen för läraren på handledningstid, för att få feedback och en snabbare bedömning.

Under utvecklingen är det lätt hänt att databasen blir osynkroniserad, till exempel antalet vinster för en hamster och motsvarande match-objekt. Det rekommenderas att du återställer databasen innan du lämnar in. (Exempelvis med skripten vi arbetade med.)

1. ladda upp repot som en **zip-fil**
1. skriv en kommentar med länk till **både GitHub och din publicerade app**
1. skriv en kommentar om det är något specifikt du vill ha feedback på

Exempel - så här kan en kommentar se ut:
```
https://github.com/my-github-username/hamsterwars-fullstack
https://my-hamsterswars-submission.herokuapp.com

Jag vill ha återkoppling på min lösning på galleriet, närmare bestämt...
```

Inuti `README.md` för ditt projekt ska du berätta om ditt projekt. Skriv även vilka level ups du har gjort, som du vill att läraren ska ta med i bedömningen.
Kom ihåg att detta är det första någon ser, som öppnar ditt projekt. Skriv det gärna så att du kan visa upp det för någon du söker LIA eller jobb hos.

*Lycka till!*
