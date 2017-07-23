//Questions.remove({});//while test

if (Questions.find().count() === 0) {
    Questions.insert({ titulo: "Las encuestas son buenas?", createdAt: new Date(), usuario:"Jose", duracion: 30, idpreguntas: 1 });
    Questions.insert({ titulo: "cual es mejor deporte?", createdAt: new Date(), usuario:"Maria", duracion: 500, idpreguntas: 2 });
    Questions.insert({ titulo: "de que color es el cielo?", createdAt: new Date(), usuario:"Jelen", duracion: 31230, idpreguntas: 3 });
}
