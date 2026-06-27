import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import "./App.css";

export default function App() {
  const [personagens, setPersonagens] = useState([]);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    carregarPersonagens();
  }, []);

  async function carregarPersonagens() {
    const { data, error } = await supabase
      .from("personagens")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    setPersonagens(data);
  }

  async function adicionarPersonagens() {
    const personagensNovos = [
      {
        nome: "mago",
        imagem:
          "https://i.pinimg.com/736x/fe/a7/3f/fea73f52fceaedcf39e6ea25f0dc97b1.jpg",
        descricao:
          "Controla sua mente e usa feitiços usando seu cajado.",
        classe: "Mago",
        vida: 80,
        ataque: 95,
        defesa: 50,
        velocidade: 70,
        habilidade: "Bola de Fogo",
      },
      {
        nome: "escritor",
        imagem:
          "https://i.pinimg.com/736x/8c/15/33/8c15335a9678556188b0b318d5f82875.jpg",
        descricao:
          "Consegue ter vários territórios de acordo com sua inteligência.",
        classe: "Suporte",
        vida: 90,
        ataque: 60,
        defesa: 75,
        velocidade: 65,
        habilidade: "Domínio Literário",
      },
      {
        nome: "arqueiro",
        imagem:
          "https://i.pinimg.com/1200x/22/0d/9c/220d9c3e874ac278b8b3987cca24dfb7.jpg",
        descricao:
          "Guerreiro que atira flechas venenosas.",
        classe: "Arqueiro",
        vida: 75,
        ataque: 85,
        defesa: 60,
        velocidade: 95,
        habilidade: "Flecha Venenosa",
      },
    ];

    const { error } = await supabase
      .from("personagens")
      .insert(personagensNovos);

    if (error) {
      console.log(error);
    } else {
      carregarPersonagens();
    }
  }

  async function salvarAlteracoes() {
  const { error } = await supabase
    .from("personagens")
    .update({
      nome: editando.nome,
      descricao: editando.descricao,
      classe: editando.classe,
      vida: Number(editando.vida),
      ataque: Number(editando.ataque),
      defesa: Number(editando.defesa),
      velocidade: Number(editando.velocidade),
      habilidade: editando.habilidade,
    })
    .eq("id", editando.id);

  if (error) {
    console.error(error);
    alert("Erro ao salvar!");
    return;
  }

  await carregarPersonagens();
  setEditando(null);
}

  return (
    <div className="container">
      <h1>🧙 Catálogo de Personagens</h1>

      <button onClick={adicionarPersonagens}>
        Adicionar Personagens
      </button>

      <div className="catalogo">
        {personagens.map((personagem) => (
          <div key={personagem.id} className="card">
            <img
              src={personagem.imagem}
              alt={personagem.nome}
            />

            <h2>{personagem.nome}</h2>

            <p>{personagem.descricao}</p>
          </div>
        ))}
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Classe</th>
            <th>Vida</th>
            <th>Ataque</th>
            <th>Defesa</th>
            <th>Velocidade</th>
            <th>Habilidade</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {personagens.map((personagem) => (
            <tr key={personagem.id}>
              <td>{personagem.nome}</td>
              <td>{personagem.classe}</td>
              <td>{personagem.vida}</td>
              <td>{personagem.ataque}</td>
              <td>{personagem.defesa}</td>
              <td>{personagem.velocidade}</td>
              <td>{personagem.habilidade}</td>
<td>
  <button
    onClick={() => setEditando({ ...personagem })}
  >
    Editar
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>

      {editando && (
        <div className="editor">
          <h2>Editar Personagem</h2>

          <input
            value={editando.nome}
            onChange={(e) =>
              setEditando({
                ...editando,
                nome: e.target.value,
              })
            }
            placeholder="Nome"
          />

          <input
            value={editando.classe || ""}
            onChange={(e) =>
              setEditando({
                ...editando,
                classe: e.target.value,
              })
            }
            placeholder="Classe"
          />

          <input
            type="number"
            value={editando.vida || 0}
            onChange={(e) =>
              setEditando({
                ...editando,
                vida: Number(e.target.value),
              })
            }
            placeholder="Vida"
          />

          <input
            type="number"
            value={editando.ataque || 0}
            onChange={(e) =>
              setEditando({
                ...editando,
                ataque: Number(e.target.value),
              })
            }
            placeholder="Ataque"
          />

          <input
            type="number"
            value={editando.defesa || 0}
            onChange={(e) =>
              setEditando({
                ...editando,
                defesa: Number(e.target.value),
              })
            }
            placeholder="Defesa"
          />

          <input
            type="number"
            value={editando.velocidade || 0}
            onChange={(e) =>
              setEditando({
                ...editando,
                velocidade: Number(e.target.value),
              })
            }
            placeholder="Velocidade"
          />

          <input
            value={editando.habilidade || ""}
            onChange={(e) =>
              setEditando({
                ...editando,
                habilidade: e.target.value,
              })
            }
            placeholder="Habilidade"
          />

          <button onClick={salvarAlteracoes}>
            Salvar
          </button>

          <button
            onClick={() => setEditando(null)}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}