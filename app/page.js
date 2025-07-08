"use client";

import { useState } from 'react';

const perguntas = [
  "Ich verspüre ein Engegefühl in der Brust oder habe Atemnot, wenn ich an zukünftige Situationen oder Entscheidungen denke, die ich treffen muss.",
  "Ich habe Schwierigkeiten, negative oder besorgniserregende Gedanken, die mir immer wieder durch den Kopf gehen, unter Kontrolle zu bringen.",
  "Ich fühle mich unruhig, gereizt oder unfähig, mich zu entspannen, selbst in Momenten, die eigentlich ruhig sein sollten.",
  "Ich habe erhebliche Schwierigkeiten einzuschlafen oder wache nachts oft auf, weil ich mir Sorgen um verschiedene Dinge mache.",
  "Ich vermeide alltägliche Situationen oder Aufgaben aus übertriebener Angst oder negativer Erwartung dessen, was passieren könnte.",
  "Ich hatte häufig Gedanken, nicht mehr leben zu wollen oder dass es besser wäre zu verschwinden, um dieser ständigen Angst zu entkommen.", // FLAG
  "Ich verspüre körperliche Symptome wie kalten Schweiß, Zittern, Übelkeit oder Herzrasen in angespannten oder nervösen Momenten.",
  "Meine Sorgen beeinträchtigen direkt meine berufliche Leistung oder meine familiären und persönlichen Beziehungen.",
  "Ich denke zwanghaft über schlechte Dinge nach, die mir oder nahestehenden Personen passieren könnten.",
  "Ich habe das Gefühl, dass meine Ängste immer schlimmer und unkontrollierbarer werden."
];

export default function TesteAnsiedade() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) { // FLAG
      setResultado("ROT");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("GRÜN");
      else if (soma <= 35) setResultado("GELB");
      else setResultado("ROT");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Angst-Test</h2>
          <p className="mb-4">{perguntas[indiceAtual]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registrarResposta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">Frage {indiceAtual + 1} von {perguntas.length}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Ergebnis: {resultado}</h2>
          {resultado === "GRÜN" && <p>Sie kommen mit diesem Thema gut zurecht und sind emotional stabil. Sie könnten anderen Menschen, die Hilfe benötigen, eine große Unterstützung sein.</p>}
          {resultado === "GELB" && <p>Es gibt deutliche Anzeichen emotionaler Schwierigkeiten, die bearbeitet werden sollten und mit Entschlossenheit und Unterstützung überwunden werden können.</p>}
          {resultado === "ROT" && <p>Ihre emotionalen Schwierigkeiten in diesem Bereich erfordern unbedingt professionelle Hilfe. Bitte suchen Sie baldmöglichst einen Arzt oder Psychologen auf.</p>}
          <button
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
            onClick={reiniciarTeste}
          >
            Test neu starten
          </button>
        </>
      )}
    </div>
  );
}
