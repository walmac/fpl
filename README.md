# FPLDigital

FplDigital is a solution for pilots in Argentina to create a Flight Plan in PDF and then send it over to the Air Traffic Services via mail. It allows the creation of a Flight Plan (FPL) considering Argentina's legislation on FPLs. The pilot fills the form and at the end, he receives via mail a form filled with the data that he entered in the form. This app also allows pilots to save their data, and the data of the aircraft they often use to a database in MongoDB so they fill the FPL only with the data concerning that flight, such as the departure airport, destination, and duration of the flight. Once the form is completed the FPL can be sent to an email address of the pilot's choosing. This is achieved thanks to a server running in NodeJs and with nodemailer. The app is coded in [React](https://reactjs.org/) using [Nextjs](https://nextjs.org/) and [Chakra-ui](https://chakra-ui.com/), the app is deployed in [Vercel](https://vercel.com/) and the backend is deployed in [Heroku](https://www.heroku.com/home)

You can try it out here [FPLDigital](https://fpldigital.vercel.app/)