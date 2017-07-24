//Questions.remove({});//while test

if (Questions.find().count() === 0) {
    Questions.insert({ title: "Las encuestas son buenas?", createdAt: new Date(), usuario:"Jose", duration: 30, idpreguntas: 1 });
    Questions.insert({ title: "cual es mejor deporte?", createdAt: new Date(), usuario:"Maria", duration: 500, idpreguntas: 2 });
    Questions.insert({ title: "de que color es el cielo?", createdAt: new Date(), usuario:"Jelen", duration: 31230, idpreguntas: 3 });
}

if (Answers.find().count() === 0) {
    Answers.insert({ answer: "Si", idRespuesta: 1});
    Answers.insert({ answer: "No", idRespuesta: 1});
    Answers.insert({ answer: "Futbol", idRespuesta: 2});
    Answers.insert({ answer: "Basket", idRespuesta: 2});
    Answers.insert({ answer: "BAseball", idRespuesta: 2});
    Answers.insert({ answer: "Azul", idRespuesta: 3});
    Answers.insert({ answer: "Verde", idRespuesta: 3});
    Answers.insert({ answer: "Blanco", idRespuesta: 3});
    Answers.insert({ answer: "Morado", idRespuesta: 3});
}


