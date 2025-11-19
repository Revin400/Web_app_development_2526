# 4loop+

## Assessment 1
Samengevat: HTML en CSS goed begin maar zal nog wel verbeterd moeten worden. Zie hieronder. TypeScript lopen jullie denk ik een beetje achter. Zorg dat je gelijk zoveel mogelijk volgens functional programming implementeert. Refactor alles naar kleine units. Ik zou als ik jullie was zo snel mogelijk de content opbouwen met data (desnoods fake data), dan is het makkelijker werken voor deze laatste fase.

Check ook de "3.9 Rubric for project evaluation" in de course manual, zodat je weet wat er nodig is voor een goed cijfer.

## CLO1: Core front-end technologies

### CSS: Generic styling zoals dit soort dingen:
```
html,
body{
  margin:0;
  font-family: 'Inter';
  font-size: 23px;
  }
```
weghalen uit de component styling en op 1 plek neerzetten. Dan worden clashes ook meteen duidelijk. Nu hebben jullie ook op meerdere plekken duplicate styling daardoor.

### CSS: Variabelen voor kleur enz ook verplaatsen naar 1 shared plek
Maak bijvoorbeeld een 'shared' folder voor generieke dingen

### CSS: Classnames
Maak namen veel specifieker, en duidelijker gelinkt aan wat het precies is (dus niet .row, etc)
Op sommige plekken is dat al wat beter (zoals bij settings)

### CSS: Scope
Nu is er een groot risico dat de styling van pagina's door verschillende css files wordt beinvloed zonder dat jullie het doorhebben. De inhoud van de css files bij jullie componenten worden namelijk toegepast op alles wat op dat moment geladen is. Unieke naamgeving van classes lost dat op, maar je kunt ook dit implementeren:
https://codefinity.com/courses/v2/1dcaf86a-11aa-492e-8e1d-06e055479aa9/9ec57b72-9bc2-4c0a-b012-d4fdfbd7900e/dee2419e-f229-4ec4-a687-d45925075c46

### Folder/file structuur:
Nu staat alles bij elkaar. Maak mapjes voor de verschillende onderdelen van jullie app.
Ik denk dat jullie per onderdeel van de app een folder zouden kunnen maken, maar de generieke components zoals footer, enz in een mapje shared bijvoorbeeld. Iets als

- /Shared
    - /PageLayout
        - /Footer
        - /Navbar
        - etc...
    - Components
        - /Button
        - etc...
    - Providers
        - /Auth?
        - etc...
    - Styling
        - Base.css
        - Colors.css
        - Fonts.css
        - etc...

### Responsive:
Zorg dat er ook iets gedaan wordt met responsive design, op zijn minst op een simpele manier voor de hele app.

## CLO2: TypeScript and React

### Opsplitsen in componenten:
Jullie hebben nu per pagina een component. Splits dingen op in kleinere units. Bijvoorbeeld een structuur zoals:

- App
    - Dashboard
        - Calendar
            - CardGrid
                - Card
                    - EventCard
                    - ReminderCard
                - Card ... etc
            - Sidebar
                - EventCard
        - NewEvent
        - NewReminder
        - Rooms
            - Room
    - Login

etc...

Tip: Zoek op Google eens naar "react code patterns", voor goede ideeen. Zie bijv:

https://www.geeksforgeeks.org/reactjs/react-design-patterns/

### JSX / JS
Nu hebben jullie alles in JavaScript, dus ik zie nog geen TypeScript code om te beoordelen. Uiteindelijk moet alles in TSX / TS zijn.
Let erop dat je in die code uiteindelijk genoeg laat zien van functional programming en typechecking.
